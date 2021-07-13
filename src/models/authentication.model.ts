export interface JWTInfo {
  username: string
  id: string
  roles: string[]
  player: string
  jti: string
  sub: string
  '_couchdb.roles': string[]
  iat: number
  exp: number
}

export interface AuthInfo {
  username: string
  player: string
  roles: string[]
  exp: Date
  iat: Date
}
