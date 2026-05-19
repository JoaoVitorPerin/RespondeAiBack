const bcrypt = require("bcrypt");

const jwt = require("jsonwebtoken");

const crypto = require("crypto");

const supabase = require("../supabase");

async function register(req, res) {

  try {

    const {
        name,
        email,
        password,
        office,
        phone,
        photoUrl,
        party,
        voteNumber
    } = req.body;

    // verifica email existente
    const { data: existingUser } =
      await supabase
        .from("politicians")
        .select("*")
        .eq("email", email)
        .single();

    if (existingUser) {
      return res.status(400).json({
        erro: "Email já cadastrado"
      });
    }

    // hash senha
    const hashedPassword =
      await bcrypt.hash(password, 10);

    // gera hash pública
    const chatHash =
      crypto.randomUUID();

    // cria político
    const { data, error } =
      await supabase
        .from("politicians")
        .insert({
          name,
          email,
          password: hashedPassword,
          office,
          phone,
          photo_url: photoUrl,
          chat_hash: chatHash,
          party,
          vote_number: voteNumber
        })
        .select()
        .single();

    if (error) {
      throw error;
    }

    res.status(201).json({
      message: "Político cadastrado",
      politician: data
    });

  } catch (err) {

    console.error(err);

    res.status(500).json({
      erro: "Erro ao cadastrar"
    });
  }
}

async function login(req, res) {

  try {

    const {
      email,
      password
    } = req.body;

    // busca político
    const { data: politician } =
      await supabase
        .from("politicians")
        .select("*")
        .eq("email", email)
        .single();

    if (!politician) {
      return res.status(401).json({
        erro: "Email ou senha inválidos"
      });
    }

    // compara senha
    const validPassword =
      await bcrypt.compare(
        password,
        politician.password
      );

    if (!validPassword) {
      return res.status(401).json({
        erro: "Email ou senha inválidos"
      });
    }

    // gera token
    const token = jwt.sign(
      {
        politicianId: politician.id
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "7d"
      }
    );

    res.json({
      token,
      politician: {
        id: politician.id,
        name: politician.name,
        email: politician.email,
        office: politician.office,
        photoUrl: politician.photo_url,
        chatHash: politician.chat_hash,
        party: politician.party,
        voteNumber: politician.vote_number
      }
    });

  } catch (err) {

    console.error(err);

    res.status(500).json({
      erro: "Erro no login"
    });
  }
}

module.exports = {
  register,
  login
};