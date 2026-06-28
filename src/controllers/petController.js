/* eslint-disable consistent-return */
const PetService = require('../services/petService');

class PetController {
  // Método para listar todos os pets
  static async getAll(req, res) {
    try {
      const pets = await PetService.getAllPets(req.user);
      res.json(pets);
    } catch (error) {
      res.status(error.status || 500).json({ error: error.message });
    }
  }

  //Método para listar pet por ID
  static async getById(req, res) {
    try {
      const id = req.params.id;
      const pet = await PetService.getPetById(id);
      res.json(pet);
    } catch (error) {
      res.status(error.status || 404).json({ error: error.message });
    }
  }

  //Método para listar pets disponíveis
  static async getAvailable(req, res) {
    try {
      const pets = await PetService.getAvailablePets();
      res.json(pets);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  //Método para criar um pet
  static async createPet(req, res) {
    try {
      const { name, age, species, size } = req.body;

      if (!name || !age || !species || !size) {
        return res.status(400).json({
          error: 'name, age, species e size são campos obrigatórios',
        });
      }

      const pet = await PetService.createPet(req.body, req.user);
      res.status(201).json({ message: 'Pet criado com sucesso.', pet });
    } catch (error) {
      res.status(error.status || 400).json({ error: error.message });
    }
  }

  //Método para atualizar pet existente
  static async updatePet(req, res) {
    try {
      const id = req.params.id;
      const { name, age, species, size } = req.body;

      if (!name || !age || !species || !size) {
        return res.status(400).json({
          error: 'Campos obrigatórios: name, age, species, size',
        });
      }

      await PetService.updatePet(id, req.body, req.user);
      res.json({ message: 'Pet atualizado com sucesso.' });
    } catch (error) {
      res.status(error.status || 400).json({ error: error.message });
    }
  }

  //Método para deletar um pet
  static async deletePet(req, res) {
    try {
      const id = req.params.id;
      await PetService.deletePet(id, req.user);
      res.json({ message: 'Pet deletado com sucesso.' });
    } catch (error) {
      res.status(error.status || 500).json({ error: error.message });
    }
  }
}

module.exports = PetController;
