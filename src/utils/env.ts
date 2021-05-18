import dotenv from 'dotenv'
import { debug } from './logger'
const parsedEnv = dotenv.config({ debug: process.env.LOG_LEVEL === 'DEBUG' })
debug('DotEnv parsed', parsedEnv)
