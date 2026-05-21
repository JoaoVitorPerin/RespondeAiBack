const supabase = require("../supabase");

async function getPolitician(req, res) {
  try {
    const { hash } = req.params;

    const { data: politician, error } =
      await supabase
        .from("politicians")
        .select(`
          id,
          name,
          office,
          photo_url,
          chat_hash,
          party,
          vote_number,
          phone,
          email
        `)
        .eq("chat_hash", hash)
        .single();

    if (error || !politician) {
      return res.status(404).json({
        erro: "Político não encontrado"
      });
    }

    res.json(politician);

  } catch (err) {

    console.error(err);

    res.status(500).json({
      erro: "Erro ao buscar político"
    });
  }
}

async function updatePolitician(req, res) {
  try {
    const { id } = req.params;
    const { name, office, photo_url, chat_hash, party, vote_number, phone, email } = req.body;

    const { data: updatedPolitician, error } = await supabase
      .from("politicians")
      .update({
        name,
        office,
        photo_url,
        chat_hash,
        party,
        vote_number,
        phone,
        email
      })
      .eq("id", id)
      .select()
      .single();

    if (error || !updatedPolitician) {
      return res.status(404).json({
        erro: "Político não encontrado"
      });
    }

    res.json(updatedPolitician);

  } catch (err) {
    console.error(err);
    res.status(500).json({
      erro: "Erro ao atualizar político"
    });
  }
}

module.exports = {
  getPolitician,
  updatePolitician
}
