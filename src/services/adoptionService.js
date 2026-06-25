const AdoptionModel = require('../models/adoptionModel');
const PetModel = require('../models/petModel');

class AdoptionService {
  static async getAllAdoptions() {
    return await AdoptionModel.findAll();
  }

  static async createAdoption(userId, petId) {
    const pet = await PetModel.findById(petId);

    if (!pet) {
      const error = new Error('Pet não encontrado');
      error.status = 404;
      throw error;
    }

    if (pet.status !== 'available') {
      const error = new Error('Pet não está disponível');
      error.status = 400;
      throw error;
    }

    const existing = await AdoptionModel.findByUserAndPet(userId, petId);

    if (existing) {
      const error = new Error('Você já adotou este pet');
      error.status = 400;
      throw error;
    }

    const adoptionId = await AdoptionModel.create(userId, petId, new Date());

    await PetModel.updateStatus(petId, 'adopted');

    return {
      id: adoptionId,
      petId,
      userId,
      message: 'A adoção foi realizada com sucesso!',
    };
  }
}

module.exports = AdoptionService;
