import axios from 'axios'
import { debug } from '../utils/logger'
import { Documents, GameDocument, GameId } from '../models/documents.model'

const options = {
  auth: {
    username: process.env.COUCH_USER as string,
    password: process.env.COUCH_PASSWORD as string
  }
}

const getDocument = async <T extends Documents>({ db, id }: { db: string, id: string }): Promise<T> => {
  const url = `${process.env.DB_SERVER_URL as string}/${db}/${id}`
  debug('Getting document', { url, options })
  return await axios.get<T>(url, options)
    .then((result) => result.data)
    .catch((err) => {
      throw err
    })
}

const getGame = async (id: GameId): Promise<GameDocument> => {
  debug('Getting Game', { id })
  return await getDocument<GameDocument>({ id, db: process.env.DB_MAIN as string })
}

export {
  getGame
}
