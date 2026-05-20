require("dotenv").config();

const express = require("express");
const cors = require("cors");

const supabase = require("./supabase");

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