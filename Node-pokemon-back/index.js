const express = require('express');

const cors = require('cors');
const pokemonRouter = require('./src/routes/pokemonRouter');
const authRouter = require('./src/routes/authRouter');
const app = express();
const port = 5000;

app.use(cors());
app.use(express.json());

app.use("/api", pokemonRouter);
app.use("/api", authRouter);

app.listen(port, () => {
  console.log(`La aplicación está escuchando en http://localhost:${port}`);
});
