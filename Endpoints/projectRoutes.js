const express = require('express');
const router = express.Router();
const projectController = require('../Controllers/projectController');
const { verifyToken } = require('../Middleware/authMiddleware'); // Importer le middleware

// Route pour récupérer tous les projets
router.get('/projects', verifyToken, projectController.getProjects);

// Route pour récupérer un projet par son ID
router.get('/projects/:id_project', verifyToken, projectController.getProjectById);

// Route pour récupérer toutes les tâches d'un projet
router.get('/projects/:id_project/tasks', verifyToken, projectController.getProjectTasks);

// Route pour créer un nouveau projet
router.post('/projects', verifyToken, projectController.createProject);

// Route pour mettre à jour un projet
router.put('/projects/:id_project', verifyToken, projectController.updateProject);

// Route pour supprimer un projet
router.delete('/projects/:id_project', verifyToken, projectController.deleteProject);

module.exports = router;
