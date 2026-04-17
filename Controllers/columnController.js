const columnModel = require("../models/colonnes");

const getColumnsByProject = async (req, res) => {
  try {
    const { id_project } = req.params;
    const columns = await columnModel.getColumnsByProjectId(id_project);
    res.status(200).json(columns);
  } catch (error) {
    console.error("ERREUR DANS GETCOLUMNSBYPROJECT:", error.message);
    res.status(500).json({
      message: "Erreur serveur lors de la récupération des colonnes.",
    });
  }
};

const createColumn = async (req, res) => {
  try {
    const { id_project } = req.params;
    const { col_title, col_pos } = req.body;

    if (!col_title || col_pos === undefined) {
      return res
        .status(400)
        .json({ message: "Les champs 'col_title' et 'col_pos' sont requis." });
    }

    const columnId = await columnModel.createColumn(
      id_project,
      col_title,
      col_pos,
    );
    res.status(201).json({ message: "Colonne créée avec succès.", columnId });
  } catch (error) {
    console.error("ERREUR DANS CREATECOLUMN:", error.message);
    res
      .status(500)
      .json({ message: "Erreur serveur lors de la création de la colonne." });
  }
};

const updateColumn = async (req, res) => {
  try {
    const { id_col } = req.params;
    const { col_title, col_pos } = req.body;

    if (!col_title && col_pos === undefined) {
      return res.status(400).json({
        message: "Au moins un champ ('col_title' ou 'col_pos') est requis.",
      });
    }

    const fields = {};
    if (col_title) fields.col_title = col_title;
    if (col_pos !== undefined) fields.col_pos = col_pos;

    await columnModel.updateColumn(id_col, fields);
    res.status(200).json({ message: "Colonne mise à jour avec succès." });
  } catch (error) {
    console.error("ERREUR DANS UPDATECOLUMN:", error.message);
    res.status(500).json({
      message: "Erreur serveur lors de la mise à jour de la colonne.",
    });
  }
};

const deleteColumn = async (req, res) => {
  try {
    const { id_col } = req.params;
    await columnModel.deleteColumn(id_col);
    res.status(200).json({ message: "Colonne supprimée avec succès." });
  } catch (error) {
    console.error("ERREUR DANS DELETECOLUMN:", error.message);
    res.status(500).json({
      message: "Erreur serveur lors de la suppression de la colonne.",
    });
  }
};

module.exports = {
  getColumnsByProject,
  createColumn,
  updateColumn,
  deleteColumn,
};
