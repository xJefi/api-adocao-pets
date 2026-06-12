const UserModel = require('../models/userModel');

class UserService {
  // Busca todos os usuários
  static async findAllUsers() {
    return await UserModel.findAll();
  }

  //Busca usuário por ID
  static async findById(id) {
    const user = await UserModel.findById(id);

    if (!user) {
      throw new Error('Usuário não encontrado');
    }

    return user;
  }

  // Atualiza informações de um usuário existente
  static async updateUser(id, { name, email, phone }) {
    const updatedRows = await UserModel.update(id, { name, email, phone });
    if (updatedRows === 0) {
      throw new Error('Usuário não encontrado.'); // Caso nenhum usuário tenha sido atualizado
    }
    return updatedRows;
  }

  // Deleta um usuário pelo ID
  static async deleteUser(id) {
    const deletedRows = await UserModel.delete(id);
    if (deletedRows === 0) {
      throw new Error('Usuário não encontrado.'); // Caso nenhum usuário tenha sido deletado
    }
    return deletedRows;
  }
}

module.exports = UserService;
