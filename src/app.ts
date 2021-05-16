import express from 'express'
import errorHandler from './middleware/errorHandler'

// import patchRouterParam from '@shared/middleware/expressAsyncErrors'
import * as OpenApiValidator from 'express-openapi-validator'
import { network } from './utils/logger'
import gameRouter from './controllers/game.controller'

const app = express()
// patchRouterParam()

app.use(express.json())
app.use(network)

// -- unprotected handlers go here
// -- END unprotected handlers

app.use(OpenApiValidator.middleware({
  apiSpec: './openapi.yaml',
  validateRequests: true,
  validateResponses: true
}))

// -- protected handlers go here
app.use('/web/spec', express.static('./openapi.yaml'))
app.use('/v1/games', gameRouter)

// -- END protected handlers

// -- catching handlers
app.use(errorHandler)
// -- END catching handlers
export {
  app
}
