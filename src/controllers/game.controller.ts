import express from 'express'
import { GameId } from '../models/documents.model'
import { asyncMiddleware } from '../middleware/asyncMiddelware'
import { isGameId } from '../utils/typeGuards'
import { createError } from '../utils/error'
import { getGame } from '../clients/couchdb.client'
import { debug } from '../utils/logger'
const gameRouter = express.Router()

gameRouter.post('/subscribe/:id', asyncMiddleware(async (req: express.Request, res: express.Response) => {
  const gameId: GameId = req.params.id
  if (!isGameId(gameId)) {
    throw createError({
      name: 'Bad Request',
      path: req.path,
      errors: [{ message: 'The supplied id is not the id of a game' }]
    })
  }

  const gameDoc = await getGame(gameId)
  debug({ gameDoc })
  res.status(200).send(gameDoc)
}))

gameRouter.get('/ping', (_req: express.Request, res: express.Response) => {
  res.status(200).send('pong')
})

export default gameRouter
