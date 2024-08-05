import mongoose from 'mongoose'
import dotenv from 'dotenv'

dotenv.config();

const DB_CONNECTION_STRING = process.env.DB_CONNECTION_STRING

async function connectDB() {
  try {
    await mongoose.connect(DB_CONNECTION_STRING)
  } catch (error) {
    console.log(error)
  }
}

export { connectDB }

