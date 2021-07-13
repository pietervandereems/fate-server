import express from 'express'
import errorHandler from './middleware/errorHandler'

// import patchRouterParam from '@shared/middleware/expressAsyncErrors'
import * as OpenApiValidator from 'express-openapi-validator'
import { network } from './utils/logger'
import gameRouter from './controllers/game.controller'
import { checkToken } from './middleware/authorization'
import userRouter from './controllers/user.controller'

const app = express()
// patchRouterParam()
app.use(express.text({ type: 'text/plain' }))
app.use(express.json({ type: 'application/json' }))
app.use(network)
app.use(OpenApiValidator.middleware({
  apiSpec: './openapi.yaml',
  validateRequests: true,
  validateResponses: true,
  formats: [
    {
      name: 'username',
      type: 'string',
      validate: (value: string) => (value.length > 8)
    }]
}))

// -- unprotected handlers go here
// -- END unprotected handlers

app.use(checkToken)

// -- protected handlers go here
app.use('/web/spec', express.static('./openapi.yaml'))
app.use('/v1/games', gameRouter)
app.use('/v1/users', userRouter)

// -- END protected handlers

// -- catching handlers
app.use(errorHandler)
// -- END catching handlers
export {
  app
}
