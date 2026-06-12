const db = require('../config/db');

class UserModel {
  static async create(userData) {
    const { name, email, password, phone, role } = userData;

    const [result] = await db.query(
      'INSERT INTO users (name, email, password, phone, role) VALUES (?, ?, ?, ?, ?)',
      [name, email, password, phone, role],
    );

    return result.insertId;
  }

  //Buscar todos
  static async findAll() {
    const [rows] = await db.query(
      'SELECT id, name, email, phone, role FROM users',
    );

    return rows;
  }

  //Buscar por email
  static async findByEmail(email) {
    const [rows] = await db.query('SELECT * FROM users WHERE email = ?', [
      email,
    ]);

    return rows[0];
  }

  //Buscar por ID
  static async findById(id) {
    const [rows] = await db.query(
      'SELECT id, name, email, phone, role FROM users WHERE id = ?',
      [id],
    );

    return rows[0];
  }

  //Atualizar usuário existente
  static async update(id, { name, email, phone }) {
    const [result] = await db.query(
      'UPDATE users SET name = ?, email = ?, phone = ? WHERE id = ?',
      [name, email, phone, id],
    );
    return result.affectedRows;
  }

  //Deletar usuário
  static async delete(id) {
    const [result] = await db.query('DELETE FROM users WHERE id = ?', [id]);
    return result.affectedRows;
  }
}

module.exports = UserModel;
