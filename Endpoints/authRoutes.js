// Chemin : /api/users
const express = require('express');

const router = express.Router();
const { register, getMe, logout } = require('../Controllers/authController');

const { login } = require('../controllers/authController');

const { verifyToken } = require('../Middleware/authMiddleware');

// Verification de session du client et mise à jour
// Route protégée
// GET/api/users/me
router.get('/me', verifyToken, getMe);
// PUT /api/users/me
router.put('/me', verifyToken);

// Deconnexion
// Route protégée
// GET/api/users/logout
router.post('/logout', logout);

// Inscription d'un client
// POST /api/users/register
// Body : { Nom, Prenom, Email, Mot_de_passe} - les propriétés à donner à postman pour tester
router.post('/register', register);

// Connexion
// POST /api/users/login
// Body : { Email, Mot_de_passe }
router.post('/login', login);

module.exports = router;
