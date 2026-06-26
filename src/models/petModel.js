const db = require('../config/db');

class PetModel {
  static async create(petData) {
    const { name, age, species, size, description } = petData;

    const [result] = await db.query(
      'INSERT INTO pets (name, age, species, size, status, description) VALUES (?, ?, ?, ?, "available", ?)',
      [name, age, species, size, description],
    );

    return result.insertId;
  }

  //Buscar todos
  static async findAll() {
    const [rows] = await db.query('SELECT * FROM pets');

    return rows;
  }

  //Buscar por ID
  static async findById(id) {
    const [rows] = await db.query('SELECT * FROM pets WHERE id = ?', [id]);

    return rows[0];
  }

  //Buscar pets disponíveis
  static async findAvailable() {
    const [rows] = await db.query(
      'SELECT * FROM pets WHERE status = "available"',
    );

    return rows;
  }

  //Atualizar pet existente
  static async update(id, { name, age, species, size, status, description }) {
    const [result] = await db.query(
      'UPDATE pets SET name = ?, age = ?, species = ?, size = ?, status = ?, description = ? WHERE id = ?',
      [name, age, species, size, status, description, id],
    );

    return result.affectedRows;
  }

  //Deletar pet
  static async deletePet(id) {
    const [result] = await db.query('DELETE FROM pets WHERE id = ?', [id]);
    return result.affectedRows;
  }

  //Método para alterar o status após ser realizada uma adoção
  static async updateStatus(id, status) {
    const [result] = await db.query('UPDATE pets SET status = ? WHERE id = ?', [
      status,
      id,
    ]);
    return result.affectedRows;
  }
}

module.exports = PetModel;
