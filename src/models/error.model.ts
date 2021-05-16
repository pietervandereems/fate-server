import { AxiosError } from 'axios'

interface requestError extends AxiosError {
  status?: number
  path?: string
  errors?: any[]
}

interface RFC7807 {
  type: string
  title: string
  detail: string
  instance: string
  status: number
  errors?: any
}

const ErrorStatuses = {
  'Bad Request': 400,
  noAuthInfo: 401,
  accessDeniedIP: 403,
  'Not Found': 404,
  'General Error': 500,
  'Bad Gateway': 502
}

const enum LogLevel {
  ERROR = 'ERROR',
  INFO = 'INFO',
  DEBUG = 'DEBUG'
}

export {
  RFC7807,
  requestError,
  ErrorStatuses,
  LogLevel
}
