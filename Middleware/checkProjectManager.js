const { isProjectManager } = require('../Models/Role');

const checkProjectManager = async (req, res, next) => {
  try {
    const userId = req.user.id; // L'ID extrait du token
    const projectId = req.body.project_id; // L'ID du projet envoyé dans le JSON

    console.log('--- Middleware checkProjectManager ---');
    console.log('User ID (from token):', userId, typeof userId);
    console.log('Project ID (from body):', projectId, typeof projectId);

    if (!userId || !projectId) {
      console.log('Validation échouée : userId ou projectId manquant.');
      return res.status(400).json({ message: 'ID utilisateur ou ID projet manquant.' });
    }

    const isAllowed = await isProjectManager(userId, projectId);
    console.log('Résultat de isProjectManager:', isAllowed);

    if (!isAllowed) {
      console.log(`Accès refusé pour l'utilisateur ${userId} sur le projet ${projectId}.`);
      return res
        .status(403)
        .json({ message: 'Vous n\'avez pas les droits pour ajouter une tâche à ce projet.' });
    }

    console.log('Accès autorisé.');
    next();
  } catch (error) {
    console.error('Erreur dans le middleware checkProjectManager:', error);
    res.status(500).json({ message: 'Erreur interne du serveur lors de la vérification des permissions.' });
  }
};

module.exports = { checkProjectManager };
