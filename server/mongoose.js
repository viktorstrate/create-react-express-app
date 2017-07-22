/**
 * This is responsible for connecting to the MongoDB server
 * it is called by server.js
 */

import mongoose from 'mongoose'

const mongoAddress = process.env.MONGO_ADDRESS || 'mongodb://localhost/mongo'

mongoose.Promise = Promise

mongoose.connect(mongoAddress, { useMongoClient: true })
  .then(() => {
    console.log(`Connected to mongodb: ${mongoAddress}`)
  })
  .catch((err) => {
    console.log('Database connection error: ', err)
  })
