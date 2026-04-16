// ROUTER produits
//Chemin : /api/tâches

const express = require("express");
const { getAll, getByID } = require("../controllers/taskController");
const { verifyToken } = require("../Middleware/authMiddleware");

const router = express.Router();

//GET /api/tâches - Récupérer toutes les tâches

router.get("/", getAll);

//GET /api/produits/:id récupérer une tâche par son ID

router.get("/:id", getByID);

module.exports = router;
