const db = require('../config/db');

class AdoptionModel {
  static async findAll() {
    const [rows] = await db.query(`
      SELECT
        a.id AS adoption_id,
        a.adoption_date,
        u.id AS user_id,
        u.name AS user_name,
        u.email AS user_email,
        p.id AS pet_id,
        p.name AS pet_name,
        p.species AS pet_species
      FROM adoptions a
      INNER JOIN users u ON a.user_id = u.id
      INNER JOIN pets p ON a.pet_id = p.id
    `);

    return rows;
  }

  //Verifica se o usuário já adotou o pet
  static async findByUserAndPet(userId, petId) {
    const [rows] = await db.query(
      'SELECT * FROM adoptions WHERE user_id = ? AND pet_id = ?',
      [userId, petId],
    );

    return rows[0];
  }

  static async create(userId, petId, adoptionDate) {
    const [result] = await db.query(
      'INSERT INTO adoptions (user_id, pet_id, adoption_date) VALUES (?, ?, ?)',
      [userId, petId, adoptionDate],
    );

    return result.insertId;
  }
}

module.exports = AdoptionModel;
