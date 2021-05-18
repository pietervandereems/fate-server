import { NextFunction, Request, Response } from 'express'
import { verify } from 'jsonwebtoken'
import { debug } from '../utils/logger'
import { createError } from '../utils/error'

export const checkToken = (req: Request, _res: Response, next: NextFunction): void => {
  const authorization = req.headers.authorization

  /* eslint-disable @typescript-eslint/prefer-optional-chain */
  if (authorization != null && authorization.toLowerCase().startsWith('bearer ')) {
    const token = authorization.substring(7)
    debug('Authorization token', token)
    const jwtInfo = verify(token, process.env.JWT_SECRET ?? '', { algorithms: ['HS256'] })
    debug('Token information', jwtInfo)
    return next()
  }
  throw createError({
    name: 'noAuthInfo',
    path: req.path
  })
}
