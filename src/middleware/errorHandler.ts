import { Request, Response, NextFunction } from 'express'
import { logError } from '../utils/logger'
import { ErrorStatuses, requestError, RFC7807 } from '../models/error.model'

const errorHandler = (err: requestError, _request: Request, response: Response, _next: NextFunction): any => {
  const respond = (message: RFC7807): any => response.status(message.status).send(message)

  logError('An error has been caught by the errorHandler, err:', err)

  const msg = {
    type: 'about:blank',
    detail: err?.message ?? '',
    instance: err?.path ?? '',
    errors: (Array.isArray(err?.errors)) ? [...err.errors] : []
  }

  if (err.isAxiosError) {
    return respond({
      ...msg,
      title: 'Request to Database failed',
      status: err.response?.status ?? 400
    })
  }

  switch (err.name) {
    case 'Bad Request':
      return respond({
        ...msg,
        title: 'Bad Request',
        status: ErrorStatuses['Bad Request']
      })
    case 'Bad Gateway':
      return respond({
        ...msg,
        title: 'Bad Gateway',
        status: ErrorStatuses['Bad Gateway']
      })
    case 'Not Found':
      return respond({
        ...msg,
        title: err.name,
        status: ErrorStatuses['Not Found']
      })
    case 'noAuthInfo':
      return respond({
        ...msg,
        title: 'No AuthInfo',
        status: ErrorStatuses.noAuthInfo
      })
    default:
      return respond({
        ...msg,
        title: 'General Error',
        status: ErrorStatuses['General Error']
      })
  }
}

export default errorHandler
