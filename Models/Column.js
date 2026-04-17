const db = require("../../db");

const createColumn = async (id_project, col_title, col_pos) => {
  const connection = await db.getConnection();

  try {
    await connection.beginTransaction();

    const [result] = await connection.execute(
      "INSERT INTO colonnes (id_project, col_title, col_pos) VALUES (?, ?, ?)",
      [id_project, col_title, col_pos],
    );

    const columnId = result.insertId;

    await connection.commit();
    return columnId;
  } catch (error) {
    if (connection) await connection.rollback();
    console.error("ERREUR SQL DÉTAILLÉE DANS CREATECOLUMN:", error.message);
    throw error;
  } finally {
    if (connection) connection.release();
  }
};

const getColumnsByProjectId = async (id_project) => {
  const query = `
    SELECT
      col.id_col,
      col.col_title,
      col.col_pos,
      t.*
    FROM colonnes col
           LEFT JOIN taches t ON col.id_col = t.id_col
    WHERE col.id_project = ?
    ORDER BY col.col_pos ASC;
  `;

  const [rows] = await db.query(query, [id_project]);

  if (rows.length === 0) return [];

  const columns = {};

  rows.forEach((row) => {
    const { id_col, col_title, col_pos, ...taskDetails } = row;

    if (!columns[id_col]) {
      columns[id_col] = {
        id_col,
        col_title,
        col_pos,
        taches: [],
      };
    }

    if (taskDetails.id_tache) {
      columns[id_col].taches.push({ ...taskDetails });
    }
  });

  return Object.values(columns);
};

const updateColumn = async (id_col, fields) => {
  const connection = await db.getConnection();

  try {
    await connection.beginTransaction();

    const allowed = ["col_title", "col_pos"];
    const updates = Object.keys(fields)
      .filter((key) => allowed.includes(key))
      .map((key) => `${key} = ?`);

    if (updates.length === 0)
      throw new Error("Aucun champ valide à mettre à jour.");

    const values = Object.keys(fields)
      .filter((key) => allowed.includes(key))
      .map((key) => fields[key]);

    await connection.execute(
      `UPDATE colonnes SET ${updates.join(", ")} WHERE id_col = ?`,
      [...values, id_col],
    );

    await connection.commit();
    return true;
  } catch (error) {
    if (connection) await connection.rollback();
    console.error("ERREUR SQL DÉTAILLÉE DANS UPDATECOLUMN:", error.message);
    throw error;
  } finally {
    if (connection) connection.release();
  }
};

const deleteColumn = async (id_col) => {
  const connection = await db.getConnection();

  try {
    await connection.beginTransaction();

    await connection.execute("DELETE FROM colonnes WHERE id_col = ?", [id_col]);

    await connection.commit();
    return true;
  } catch (error) {
    if (connection) await connection.rollback();
    console.error("ERREUR SQL DÉTAILLÉE DANS DELETECOLUMN:", error.message);
    throw error;
  } finally {
    if (connection) connection.release();
  }
};

module.exports = {
  createColumn,
  getColumnsByProjectId,
  updateColumn,
  deleteColumn,
};
