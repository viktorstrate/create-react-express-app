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
