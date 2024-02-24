const express = require('express');

const cors = require('cors');
const pokemonRouter = require('./src/routes/pokemonRouter');
const app = express();
const port = 5000;

app.use(cors());
app.use(express.json());

app.use("/api", pokemonRouter);

app.listen(port, () => {
  console.log(`La aplicación está escuchando en http://localhost:${port}`);
});
