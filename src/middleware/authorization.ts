import { NextFunction, Request, Response } from 'express'
import { verify } from 'jsonwebtoken'
import { debug } from '../utils/logger'
import { createError } from '../utils/error'
import { JWTInfo } from '../models/authentication.model'

export const checkToken = (req: Request, _res: Response, next: NextFunction): void => {
  const authorization = req.headers.authorization

  if (authorization != null && authorization?.toLowerCase().startsWith('bearer ')) {
    let jwtInfo
    const token = authorization.substring(7)
    debug('Authorization token', token)

    try {
      jwtInfo = verify(token, process.env.JWT_SECRET ?? '', { algorithms: ['HS256'] }) as JWTInfo
    } catch (err) {
      throw createError({
        name: 'authError',
        message: 'Error verifying token',
        errors: [{ message: err.message }]
      })
    }
    debug('Token information', jwtInfo)

    if (!jwtInfo.sub.startsWith('jwt-server/')) {
      throw createError({
        name: 'authError',
        message: 'Non valid subject in token',
        path: req.path
      })
    }
    if (new Date(jwtInfo.exp * 1000) < new Date()) {
      throw createError({
        name: 'authError',
        message: 'Token expired',
        path: req.path
      })
    }

    if (new Date(jwtInfo.iat * 1000) > new Date()) {
      throw createError({
        name: 'authError',
        message: 'Token created in the future',
        path: req.path
      })
    }

    req.token = token
    req.authInfo = {
      username: jwtInfo.username,
      player: jwtInfo.player,
      roles: jwtInfo.roles,
      exp: new Date(jwtInfo.exp),
      iat: new Date(jwtInfo.iat)
    }
    return next()
  }

  throw createError({
    name: 'noAuthInfo',
    path: req.path
  })
}
