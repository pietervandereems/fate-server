const enum SelectorTypes {
  character = 'character',
  game = 'game',
  player = 'player'
}

interface ReplicatorDocument {
  _id: string
  _rev?: string
  source: string
  target: string
  selector: {
    type: SelectorTypes
    player: {
      $in: string[]
    }
  }
  user_ctx: {
    name: 'admin'
    roles: [
      '_admin',
      '_reader',
      '_writer'
    ]
  }
  owner: 'admin'
  create_target: false
  continuous: true
}

interface GameDocument {
  _id: string
  _rev: string
  type: SelectorTypes.game
  name: string
  players: string[]
}

type Documents = GameDocument | ReplicatorDocument

type GameId = string
type UserId = string

export {
  ReplicatorDocument,
  GameDocument,
  Documents,
  GameId,
  UserId,
  SelectorTypes
}
