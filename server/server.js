/**
 * This is the entry point for the server, it sets up Express, and starts the server.
 */

import express from 'express'
import bodyParser from 'body-parser'
import compression from 'compression'
import path from 'path'

import { projectRoot } from '../config'

require('dotenv').config()

// Initialize the database
require('./mongoose')

const app = express()

app.use(bodyParser.json())

// Import routes
app.use('/api', require('./api/comments'))

// Serve client files only in production
if (process.env.NODE_ENV === 'production') {
  app.use(compression())
  app.use(express.static(path.join(projectRoot, '/client/build'), {
    maxAge: '1y'
  }))

  app.use('*', (req, res) => {
    res.sendFile(path.join(projectRoot, '/client/build/index.html'))
  })
}

let port = 3001 // Use port 3001 in development

if (process.env.NODE_ENV === 'production') {
  port = process.env.PORT || 3000
}

app.listen(port, function () {
  if (process.env.NODE_ENV === 'production') {
    console.log(`Server running on port ${port}`)
  } else {
    console.log(`Back-end server running on port ${port}`)
  }
})
