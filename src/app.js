const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');

const app = express();

// Middlewares globais
app.use(helmet());
app.use(cors());
app.use(express.json());

// Rotas da API
app.use('/auth', authRoutes);
app.use('/users', userRoutes);

module.exports = app;
