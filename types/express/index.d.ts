
declare namespace Express {
  interface Request {
    token?: string
    authInfo?: AuthInfo
  }
}
