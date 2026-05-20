const supabase = require("../supabase");

async function getKnowledge(req, res){
  try {
    const { politicianId } = req.params;

    const { data, error } =
      await supabase
        .from("knowledge")
        .select("*")
        .eq("politician_id", politicianId)
        .order("id", {
          ascending: false
        });

    if (error) {
      throw error;
    }

    res.json(data);
  } catch (err) {
    console.error(err);

    res.status(500).json({
      erro: "Erro ao buscar knowledge"
    });
  }
};

async function createKnowledge(req, res) {
  try {
    const { politicianId } = req.params;
    const {
      title,
      content
    } = req.body;

    const { data, error } =
      await supabase
        .from("knowledge")
        .insert({
          politician_id: politicianId,
          title,
          content
        })
        .select()
        .single();

    if (error) {
      throw error;
    }

    res.status(201).json(data);
  } catch (err) {
    console.error(err);
    res.status(500).json({
      erro: "Erro ao criar knowledge"
    });
  }
}

async function deleteKnowledge(req, res) {
  try {
    const {
      id,
      politicianId
    } = req.params;

    const { error } =
      await supabase
        .from("knowledge")
        .delete()
        .eq("id", id)
        .eq("politician_id", politicianId);

    if (error) {
      throw error;
    }

    res.json({
      message: "Knowledge deletada"
    });
  } catch (err) {
    console.error(err);

    res.status(500).json({
      erro: "Erro ao deletar"
    });
  }
}

async function updateKnowledge(req, res) {
  try {
    const { id } = req.params;

    const {
      title,
      content
    } = req.body;

    const { data, error } =
      await supabase
        .from("knowledge")
        .update({
          title,
          content
        })
        .eq("id", id)
        .select()
        .single();

    if (error) {
      throw error;
    }

    res.json(data);
  } catch (err) {
    console.error(err);

    res.status(500).json({
      erro: "Erro ao atualizar knowledge"
    });
  }
}

module.exports = {
  getKnowledge,
  createKnowledge,
  deleteKnowledge,
  updateKnowledge
};