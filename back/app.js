const express = require("express");
const app = express();
const cors = require("cors");

const mongoose = require("mongoose");
const routes = require("./router/index");
require('dotenv').config();

app.use(express.json());
app.use(cors({ origin: "http://localhost:3000" }));

const PORT = 8080;

const dbUser = process.env.DB_USER;
const dbPassword = process.env.DB_PASSWORD;
const dbName = process.env.DB_NAME;


mongoose.connect(`mongodb+srv://${dbUser}:${dbPassword}@cluster0.jl2mp.mongodb.net/${dbName}`, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
.then(() => console.log('Connexion à MongoDB réussie'))
.catch(err => console.error('Erreur de connexion à MongoDB', err));




app.use("/", routes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

