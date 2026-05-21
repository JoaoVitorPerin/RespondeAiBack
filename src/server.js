require("dotenv").config();

const express = require("express");
const cors = require("cors");

const supabase = require("./supabase");

const multer = require("multer");

const storage = multer.memoryStorage();

const upload = multer({
  storage
});

const sharp = require("sharp");

const app = express();

app.use(cors({
  origin: "http://localhost:4200"
}));

app.use(express.json());

const authRoutes = require("./routes/auth.routes");
app.use("/auth", authRoutes);

const knowledgeRoutes = require("./routes/knowledge.routes");
app.use("/knowledge", knowledgeRoutes);

const messageRoutes = require("./routes/message.routes");
app.use("/mensagens", messageRoutes);

const politicianRoutes = require("./routes/politician.routes");
app.use("/politico", politicianRoutes);

app.listen(3000, () => {
  console.log("Servidor rodando");
});

app.post(
  "/upload",
  upload.single("image"),
  async (req, res) => {

    try {

      if (!req.file) {
        return res.status(400).json({
          erro: "Imagem obrigatória"
        });
      }

      // valida imagem
      if (
        !req.file.mimetype.startsWith("image/")
      ) {
        return res.status(400).json({
          erro: "Arquivo inválido"
        });
      }

      /*
      |--------------------------------------------------------------------------
      | OTIMIZAÇÃO IMAGEM
      |--------------------------------------------------------------------------
      */

      const optimizedImage =
        await sharp(req.file.buffer)

          .rotate()

          .resize({
            width: 500,
            height: 500,
            fit: "cover",
            position: "center"
          })

          .flatten({
            background: "#ffffff"
          })

          .webp({
            quality: 65,
            effort: 6
          })

          .toBuffer();

      /*
      |--------------------------------------------------------------------------
      | NOME ARQUIVO
      |--------------------------------------------------------------------------
      */

      const fileName =
        `${Date.now()}.webp`;

      /*
      |--------------------------------------------------------------------------
      | UPLOAD SUPABASE
      |--------------------------------------------------------------------------
      */

      const { error } =
        await supabase.storage
          .from("politicians")
          .upload(
            fileName,
            optimizedImage,
            {
              contentType: "image/webp"
            }
          );

      if (error) {
        throw error;
      }

      /*
      |--------------------------------------------------------------------------
      | URL PÚBLICA
      |--------------------------------------------------------------------------
      */

      const {
        data: publicUrlData
      } = supabase.storage
        .from("politicians")
        .getPublicUrl(fileName);

      res.json({
        url: publicUrlData.publicUrl
      });

    } catch (err) {

      console.error(err);

      res.status(500).json({
        erro: "Erro upload imagem"
      });
    }
  }
);