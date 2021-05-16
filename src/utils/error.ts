import { requestError } from '../models/error.model'

export const createError = (params: any): requestError => ({
  ...params,
  isAxiosError: false,
  config: {},
  toJSON: () => Object
})
