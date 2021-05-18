import { NextFunction, Request, Response } from 'express'
import { LogLevel } from '../models/error.model'

const logError = (...args: any): void => {
  console.error(new Date(), ...args)
}

const debug = (...args: any): void => {
  if (process.env.LOG_LEVEL?.toUpperCase() === LogLevel.DEBUG) {
    console.debug(new Date(), ...args)
  }
}

const info = (...args: any): void => {
  if (process.env.LOG_LEVEL === LogLevel.DEBUG || process.env.LOG_LEVEL === LogLevel.INFO) {
    console.info(new Date(), ...args)
  }
}

const network = (req: Request, _res: Response, next: NextFunction): void => {
  debug('Request', { method: req.method, path: req.path, body: req.body })
  next()
}

export {
  logError,
  debug,
  info,
  network
}
