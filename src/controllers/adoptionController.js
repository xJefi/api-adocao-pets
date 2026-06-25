const AdoptionService = require('../services/adoptionService');

class AdoptionController {
  static async getAllAdoptions(req, res) {
    try {
      const adoptions = await AdoptionService.getAllAdoptions();

      return res.status(200).json(adoptions);
    } catch (error) {
      return res.status(error.status || 500).json({
        message: error.message,
      });
    }
  }

  static async createAdoption(req, res) {
    try {
      const { petId } = req.body;

      if (!petId) {
        return res.status(400).json({
          message: 'petId é obrigatório',
        });
      }

      const adoption = await AdoptionService.createAdoption(req.user.id, petId);

      return res.status(201).json(adoption);
    } catch (error) {
      return res.status(error.status || 500).json({
        message: error.message,
      });
    }
  }
}

module.exports = AdoptionController;
