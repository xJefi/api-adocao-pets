const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const UserModel = require('../models/userModel');

class AuthService {
  // Método para registrar um novo usuário
  static async registerUser(user) {
    const { email, password, role } = user;

    // Verifica se o e-mail já está cadastrado
    const existing = await UserModel.findByEmail(email);
    if (existing) {
      throw new Error('Usuário já existe');
    }

    const allowedRoles = ['adopter', 'admin'];

    if (role && !allowedRoles.includes(role)) {
      throw new Error('Role inválida');
    }

    // Criptografa a senha antes de salvar no banco
    const hashed = await bcrypt.hash(password, 10);

    const finalRole = role || 'adopter';

    const newUser = {
      ...user,
      password: hashed,
      role: finalRole,
    };

    // Cria o novo usuário e retorna seu ID
    const id = await UserModel.create(newUser);

    return { message: 'Usuário registrado com sucesso', id };
  }

  // Método para autenticar o usuário e gerar token JWT
  static async loginUser({ email, password }) {
    const user = await UserModel.findByEmail(email);
    if (!user) {
      throw new Error('Usuário não encontrado');
    }

    // Verifica se a senha fornecida é válida
    const valid = await bcrypt.compare(password, user.password);
    if (!valid) {
      throw new Error('Senha inválida');
    }

    // Gera o token JWT
    const token = jwt.sign(
      { id: user.id, email: user.email, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: '1h' },
    );

    // Retorna o token para o controller
    return { token };
  }
}

module.exports = AuthService;
