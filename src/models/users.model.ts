interface User {
  name: string
  password: string
  playerName: string
}

interface JWTUser extends User {
  roles: ['user']
}

interface JWTLogin {
  token: string
  username: string
  name: string
  roles: string[]
  player: string
}

interface JWTCreated {
  id: string
  username: string
  name: string
  player: string
}

export {
  User,
  JWTUser,
  JWTLogin,
  JWTCreated
}
