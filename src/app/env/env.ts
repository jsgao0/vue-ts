export const isProd = process.env.NODE_ENV === 'production'
export const apiDomain = {
  self: process.env.self || '',
}
export const assetsPath = process.env.assetsPath
