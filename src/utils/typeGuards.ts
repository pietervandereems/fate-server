import { GameId } from '../models/documents.model'

const isGameId = (id: any): id is GameId => {
  return (typeof id === 'string' && id.startsWith('game_'))
}

export {
  isGameId
}
