import { Router } from 'express'

const router = Router()

router.get('/comments', (req, res) => {
  return res.send([
    {
      username: 'John Doe',
      comment: 'Nice work!'
    },
    {
      username: 'Derek',
      comment: 'Amazing'
    }
  ])
})

export default router