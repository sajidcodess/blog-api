const mongoose = require('mongoose')
const dotenv = require('dotenv')

dotenv.config();

const DB_CONNECTION_STRING = process.env.DB_CONNECTION_STRING

async function connectDB() {
  try {
    await mongoose.connect(DB_CONNECTION_STRING)
    console.log('DB connected')
  } catch (error) {
    console.log(error)
  }
}

module.exports = connectDB

