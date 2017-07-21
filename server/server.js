import express from 'express'
import path from 'path'

import { projectRoot } from '../config'

const app = express()

// Serve client files only in production
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(projectRoot, '/client/build')))
}

app.get ('/hello', function (req, res) {
  res.send({message: 'Hello World!'})
})

let port = 3001 // Use port 3001 in development

if (process.env.NODE_ENV === 'production') {
  port = process.env.PORT || 3000
}

app.listen(port, function () {
  console.log(`Back-end server running on port ${port}`)
})