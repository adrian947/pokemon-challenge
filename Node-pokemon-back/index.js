const express = require('express');
const { swaggerDocs } = require('./swagger');

const cors = require('cors');
const pokemonRouter = require('./src/routes/pokemonRouter');
const authRouter = require('./src/routes/authRouter');
require('dotenv').config();

const app = express();
const port = 5000;

app.use(cors());
app.use(express.json());
swaggerDocs(app, port);
app.use('/api', pokemonRouter);
app.use('/api', authRouter);

app.listen(port, () => {
  console.log(`La aplicación está escuchando en http://localhost:${port}`);
});
