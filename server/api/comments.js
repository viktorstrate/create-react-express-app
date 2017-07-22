/**
 * This is an example route for the api, it is responsible for handling requests to /api/comments
 * It is registered in server.js
 */

import { Router } from 'express'

import Comment from '../models/Comment'

const router = Router()

router.get('/comments', (req, res) => {
  Comment.find((err, messages) => {
    if (handleError(err, res)) return

    return res.send({
      success: true,
      messages
    })
  })
})

router.post('/comments', (req, res) => {
  console.log('Posting comment')
  if (!(req.body.author && req.body.message)) {
    return res.send({
      success: false,
      status: 'Author and message are required'
    })
  }

  let msg = new Comment({
    author: req.body.author,
    message: req.body.message
  })

  msg.save((err, message) => {
    if (handleError(err, res)) return

    res.send({
      success: true,
      status: 'Comment saved to database',
      message
    })
  })
})

router.delete('/comments', (req, res) => {
  console.log('Deleting comment')
  if (!req.body.commentId) {
    return res.send({
      success: false,
      status: 'Comment ID must be specified'
    })
  }

  Comment.remove({ _id: req.body.commentId }, (err) => {
    if (handleError(err, res)) return

    res.send({
      success: true,
      status: 'Delete comment',
      commentId: req.body.commentId
    })
  })
})

function handleError (err, res) {
  if (err) {
    console.log(err)
    res.status(500).send({
      success: false,
      status: 'An internal error occured'
    })
    return true
  } else return false
}

module.exports = router
