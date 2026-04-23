const db = require("../db");

// Crée un nouveau projet et assigne le créateur comme Chef de projet
const createProject = async (project_name, project_desc, userId) => {
  const connection = await db.getConnection();
  try {
    await connection.beginTransaction();

    // 1. Insérer le nouveau projet
    const [projectResult] = await connection.execute(
      "INSERT INTO projets (project_name, project_desc) VALUES (?, ?)",
      [project_name, project_desc],
    );
    const projectId = projectResult.insertId;

    // 2. Récupérer l'ID du rôle "Chef de projet" (supposons que son ID est 1)
    // Pour plus de robustesse, on pourrait le chercher par son nom.
    const chefDeProjetRoleId = 1; 

    // 3. Lier l'utilisateur au projet avec le rôle de Chef de projet
    await connection.execute(
      "INSERT INTO participer (id_user, id_project, id_role) VALUES (?, ?, ?)",
      [userId, projectId, chefDeProjetRoleId],
    );

    await connection.commit();
    return projectId;
  } catch (error) {
    await connection.rollback();
    console.error("ERREUR SQL DÉTAILLÉE DANS CREATEPROJECT:", error.message);
    throw error;
  } finally {
    connection.release();
  }
};

// Récupère tous les projets
const getProjects = async () => {
  try {
    const [rows] = await db.query("SELECT * FROM projets");
    return rows;
  } catch (error) {
    console.error("ERREUR SQL DÉTAILLÉE DANS GETPROJECTS:", error.message);
    throw error;
  }
};

// Récupère un projet par son ID
const getProjectById = async (id_project) => {
  try {
    const [rows] = await db.query("SELECT * FROM projets WHERE id_project = ?", [
      id_project,
    ]);
    return rows[0]; // Retourne le premier projet trouvé ou undefined
  } catch (error) {
    console.error("ERREUR SQL DÉTAILLÉE DANS GETPROJECTBYID:", error.message);
    throw error;
  }
};

// Met à jour un projet existant
const updateProject = async (id_project, fields) => {
  let connection;
  try {
    connection = await db.getConnection();
    await connection.beginTransaction();

    const allowed = ["project_name", "project_desc"];
    const updates = Object.keys(fields)
      .filter((key) => allowed.includes(key))
      .map((key) => `${key} = ?`);

    if (updates.length === 0)
      throw new Error("Aucun champ valide à mettre à jour.");

    const values = Object.keys(fields)
      .filter((key) => allowed.includes(key))
      .map((key) => fields[key]);

    await connection.execute(
      `UPDATE projets SET ${updates.join(", ")} WHERE id_project = ?`,
      [...values, id_project],
    );

    await connection.commit();
    return true;
  } catch (error) {
    if (connection) await connection.rollback();
    console.error("ERREUR SQL DÉTAILLÉE DANS UPDATEPROJECT:", error.message);
    throw error;
  } finally {
    if (connection) connection.release();
  }
};

// Supprime un projet
const deleteProject = async (id_project) => {
  let connection;
  try {
    connection = await db.getConnection();
    await connection.beginTransaction();

    await connection.execute("DELETE FROM projets WHERE id_project = ?", [
      id_project,
    ]);

    await connection.commit();
    return true;
  } catch (error) {
    if (connection) await connection.rollback();
    console.error("ERREUR SQL DÉTAILLÉE DANS DELETEPROJECT:", error.message);
    throw error;
  } finally {
    if (connection) connection.release();
  }
};

module.exports = {
  createProject,
  getProjects,
  getProjectById,
  updateProject,
  deleteProject,
};
