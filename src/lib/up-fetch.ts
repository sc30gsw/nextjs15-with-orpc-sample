import { up } from 'up-fetch'

export const upfetch = up(fetch, () => ({
  baseUrl: 'https://dummyjson.com',
}))
