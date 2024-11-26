require('dotenv').config();
const mongoose = require('mongoose');

async function main() {
  try {
    await mongoose.connect(`mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.3jnha.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`)
    console.log('Conectado ao banco!')
  } catch (error) {
    console.log(error)
  }
}

module.exports = main;