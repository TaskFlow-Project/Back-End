const express = require('express');
const router = express.Router();
const columnController = require('../Controllers/columnController');

// Quand quelqu'un demande à VOIR les colonnes d'un projet (GET)
// URL : /api/projects/123/columns
router.get('/projects/:id_project/columns', columnController.getColumnsByProject);

// Quand quelqu'un veut CRÉER une nouvelle colonne dans un projet (POST)
// URL : /api/projects/123/columns
router.post('/projects/:id_project/columns', columnController.createColumn);

// Quand quelqu'un veut METTRE À JOUR une colonne existante (PUT)
// URL : /api/columns/456
router.put('/columns/:id_col', columnController.updateColumn);

// Quand quelqu'un veut SUPPRIMER une colonne (DELETE)
// URL : /api/columns/456
router.delete('/columns/:id_col', columnController.deleteColumn);

// On exporte ce panneau de signalisation pour que l'application principale puisse l'utiliser
module.exports = router;
