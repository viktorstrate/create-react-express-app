import express from 'express'
import path from 'path'

import { projectRoot } from '../config'

const app = express()

// Import routes
app.use('/api', require('./api/comments').default)

// Serve client files only in production
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(projectRoot, '/client/build')))

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