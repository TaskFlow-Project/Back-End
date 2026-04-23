// ROUTER Tâches
// Chemin : /api/taches

const express = require("express");
const { getAll, getByID, create, updateTaskStatus, getByProjectId } = require("../controllers/taskController"); // Import updateTaskStatus
const { verifyToken } = require("../Middleware/authMiddleware");
const { checkProjectManager } = require("../Middleware/checkProjectManager");

const router = express.Router();

router.post("/", verifyToken, checkProjectManager, create);

// GET /api/taches - Récupérer toutes les tâches

router.get("/", verifyToken, getAll);

// GET /api/taches/projet/:id - Récupérer toutes les tâches d'un projet
router.get("/projet/:id", verifyToken, getByProjectId);

// GET /api/taches/:id récupérer une tâche par son ID

router.get("/:id", verifyToken, getByID);

// PUT /api/taches/:id - Mettre à jour une tâche (ex: le statut)
router.put("/:id", verifyToken, updateTaskStatus); // Use the imported updateTaskStatus function

module.exports = router;
