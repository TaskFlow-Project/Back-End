// Importe le modèle de colonne pour interagir avec la base de données
const columnModel = require("../models/column");

// Récupère toutes les colonnes d'un projet spécifique
const getColumnsByProject = async (req, res) => {
  try {
    // Récupère l'ID du projet depuis les paramètres de la requête
    const { id_project } = req.params;
    // Appelle la fonction du modèle pour obtenir les colonnes par ID de projet
    const columns = await columnModel.getColumnsByProjectId(id_project);
    // Envoie les colonnes récupérées avec un statut 200 (OK)
    res.status(200).json(columns);
  } catch (error) {
    // Log l'erreur en cas de problème
    console.error("ERREUR DANS GETCOLUMNSBYPROJECT:", error.message);
    // Envoie une réponse d'erreur avec un statut 500 (Erreur interne du serveur)
    res.status(500).json({
      message: "Erreur serveur lors de la récupération des colonnes.",
    });
  }
};

// Crée une nouvelle colonne dans un projet
const createColumn = async (req, res) => {
  try {
    // Récupère l'ID du projet depuis les paramètres de la requête
    const { id_project } = req.params;
    // Récupère le titre et la position de la colonne depuis le corps de la requête
    const { col_title, col_pos } = req.body;

    // Vérifie si le titre ou la position sont manquants
    if (!col_title || col_pos === undefined) {
      return res
        .status(400)
        .json({ message: "Les champs 'col_title' et 'col_pos' sont requis." });
    }

    // Appelle la fonction du modèle pour créer une nouvelle colonne
    const columnId = await columnModel.createColumn(
      id_project,
      col_title,
      col_pos,
    );
    // Envoie une réponse de succès avec un statut 201 (Créé)
    res.status(201).json({ message: "Colonne créée avec succès.", columnId });
  } catch (error) {
    // Log l'erreur en cas de problème
    console.error("ERREUR DANS CREATECOLUMN:", error.message);
    // Envoie une réponse d'erreur avec un statut 500
    res
      .status(500)
      .json({ message: "Erreur serveur lors de la création de la colonne." });
  }
};

// Met à jour une colonne existante
const updateColumn = async (req, res) => {
  try {
    // Récupère l'ID de la colonne depuis les paramètres de la requête
    const { id_col } = req.params;
    // Récupère le titre et la position de la colonne depuis le corps de la requête
    const { col_title, col_pos } = req.body;

    // Vérifie si au moins un des champs (titre ou position) est fourni
    if (!col_title && col_pos === undefined) {
      return res.status(400).json({
        message: "Au moins un champ ('col_title' ou 'col_pos') est requis.",
      });
    }

    // Crée un objet pour stocker les champs à mettre à jour
    const fields = {};
    if (col_title) fields.col_title = col_title;
    if (col_pos !== undefined) fields.col_pos = col_pos;

    // Appelle la fonction du modèle pour mettre à jour la colonne
    await columnModel.updateColumn(id_col, fields);
    // Envoie une réponse de succès avec un statut 200
    res.status(200).json({ message: "Colonne mise à jour avec succès." });
  } catch (error) {
    // Log l'erreur en cas de problème
    console.error("ERREUR DANS UPDATECOLUMN:", error.message);
    // Envoie une réponse d'erreur avec un statut 500
    res.status(500).json({
      message: "Erreur serveur lors de la mise à jour de la colonne.",
    });
  }
};

// Supprime une colonne
const deleteColumn = async (req, res) => {
  try {
    // Récupère l'ID de la colonne depuis les paramètres de la requête
    const { id_col } = req.params;
    // Appelle la fonction du modèle pour supprimer la colonne
    await columnModel.deleteColumn(id_col);
    // Envoie une réponse de succès avec un statut 200
    res.status(200).json({ message: "Colonne supprimée avec succès." });
  } catch (error) {
    // Log l'erreur en cas de problème
    console.error("ERREUR DANS DELETECOLUMN:", error.message);
    // Envoie une réponse d'erreur avec un statut 500
    res.status(500).json({
      message: "Erreur serveur lors de la suppression de la colonne.",
    });
  }
};

// Exporte les fonctions du contrôleur pour les utiliser dans les routes
module.exports = {
  getColumnsByProject,
  createColumn,
  updateColumn,
  deleteColumn,
};
