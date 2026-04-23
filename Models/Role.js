const db = require("../db");

const sql = `
  SELECT * FROM participer 
  INNER JOIN roles ON participer.id_role = roles.id_role 
  WHERE participer.id_user = ? 
    AND participer.id_project = ? 
    AND roles.libelle_role = ?
`;

// Les paramètres à envoyer à db.execute()

const isProjectManager = async (userId, projectId) => {
  // On vérifie si l'utilisateur est "admin" pour ce projet
  const [rows] = await db.query(sql, [userId, projectId, "admin"]);

  return rows.length > 0;
};

module.exports = { isProjectManager };
