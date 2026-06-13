const AuthService = require('../services/authService');

class AuthController {
  // Registrar usuário
  static async register(req, res) {
    try {
      const result = await AuthService.registerUser(req.body);

      return res.status(201).json({ result });
    } catch (error) {
      return res.status(400).json({
        error: error.message,
      });
    }
  }

  // Login
  static async login(req, res) {
    try {
      const result = await AuthService.loginUser(req.body);

      return res.json({ result });
    } catch (error) {
      return res.status(401).json({
        error: error.message,
      });
    }
  }
}

module.exports = AuthController;
