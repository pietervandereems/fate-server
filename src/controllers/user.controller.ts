import express from 'express'
import { createUser } from '../clients/jwt-server.client'
import { asyncMiddleware } from '../middleware/asyncMiddelware'
import { UserId } from '../models/documents.model'
import { User } from '../models/users.model'
import { debug } from '../utils/logger'
import { v4 as uuidv4 } from 'uuid'
import { AuthInfo } from '../models/authentication.model'
import { createError } from '../utils/error'

const userRouter = express.Router()

userRouter.get('/ping', (_req: express.Request, res: express.Response) => {
  res.status(200).send('pong')
})

userRouter.post('/:id', asyncMiddleware(async (req: express.Request, res: express.Response) => {
  const authInfo: AuthInfo = req.authInfo
  if (!authInfo.roles.includes('admin')) {
    throw createError({
      name: 'Access Denied',
      path: req.path
    })
  }

  const userId: UserId = req.params.id
  const playerId = `player_${uuidv4()}`

  const user: User = {
    name: userId,
    password: req.body,
    playerName: playerId
  }
  debug('User request', { user })
  const newUser = createUser(user)
  debug('User created', { newUser })
  res.status(200).send(newUser)
}))

export default userRouter
