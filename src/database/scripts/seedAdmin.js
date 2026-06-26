/* eslint-disable no-console */
const bcrypt = require('bcryptjs');
const UserModel = require('../../models/userModel');

async function seedAdmin() {
  try {
    const existingAdmin = await UserModel.findByEmail('admin@pets.com');

    if (existingAdmin) {
      console.log('Admin já existe.');
      process.exit(0);
    }

    const hashedPassword = await bcrypt.hash('admin123', 10);

    await UserModel.create({
      name: 'Administrador',
      email: 'adm@gmail.com',
      password: hashedPassword,
      phone: '00000000000',
      role: 'admin',
    });

    console.log('Admin criado com sucesso!');
    process.exit(0);
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
}

seedAdmin();
