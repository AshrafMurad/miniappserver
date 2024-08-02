import mongoose from "mongoose";
async function databaseConnection() {
  try{
    await mongoose.connect(process.env.MONGODB_URL)
  } catch(err) {
    console.log(err)
    throw new Error('Cannot connect to MongoDB')
  }
}
async function databaseDisconnection() {
  try{
    await mongoose.disconnect()
  } catch(err) {
    console.log(err)
    throw new Error('Cannot Disconnect The DB')
  }
}

export {databaseConnection, databaseDisconnection}
//