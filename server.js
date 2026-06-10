require('dotenv').config();

const express = require('express');
const app = express();

const PORT = process.env.PORT;

app.use(express.json());

app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`Servidor rodando na porta ${PORT}`);
});
