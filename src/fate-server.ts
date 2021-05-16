import './utils/env'
import { app } from './app'
import http from 'http'

const server = http.createServer(app)

const { PORT = 4004 } = process.env

server.listen(PORT, () => {
  console.info(`Server running on port ${PORT}`)
})
