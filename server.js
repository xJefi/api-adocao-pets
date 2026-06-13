require('dotenv').config();
const app = require('./src/app');

const PORT = process.env.PORT;

app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`Servidor rodando na porta ${PORT}`);
});
