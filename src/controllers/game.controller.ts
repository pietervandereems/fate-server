import express from 'express'
const gameRouter = express.Router()

gameRouter.get('/subscribe', (_req: express.Request, res: express.Response) => {
  res.sendStatus(200).send('yes')
})

gameRouter.get('/ping', (_req: express.Request, res: express.Response) => {
  res.status(200).send('pong')
})

export default gameRouter
