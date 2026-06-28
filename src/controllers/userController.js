const UserService = require('../services/userService');

class UserController {
  // Método para listar todos os usuários
  static async getAll(req, res) {
    try {
      const users = await UserService.findAllUsers(); // Chama o service para buscar usuários
      return res.json(users);
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }

  //Método para listar usuário por ID
  static async getById(req, res) {
    try {
      const id = req.params.id;
      const user = await UserService.findById(id);
      return res.json(user);
    } catch (error) {
      if (error.message === 'Usuário não encontrado') {
        return res.status(404).json({ error: error.message });
      }
      return res.status(500).json({ error: error.message });
    }
  }

  // Método para atualizar um usuário existente
  static async update(req, res) {
    try {
      const id = req.params.id; // Pega o ID da URL
      const { name, email, phone } = req.body;

      if (!name || !email || !phone) {
        return res.status(400).json({
          error: 'Todos os campos (name, email, phone) são obrigatórios',
        });
      }

      await UserService.updateUser(id, req.body);
      return res.status(200).json({
        message: 'Usuário atualizado com sucesso.',
      });
    } catch (error) {
      if (error.message === 'Usuário não encontrado') {
        return res.status(404).json({ error: error.message });
      }

      return res.status(400).json({ error: error.message });
    }
  }

  // Método para deletar um usuário
  static async deleteUser(req, res) {
    try {
      const id = req.params.id;
      await UserService.deleteUser(id);
      return res.json({ message: 'Usuário deletado com sucesso.' });
    } catch (error) {
      if (error.message === 'Usuário não encontrado') {
        return res.status(404).json({ error: error.message });
      }

      return res.status(400).json({ error: error.message });
    }
  }
}

module.exports = UserController;
