import { apiPath } from '@/env/env'
interface Query {
  [key: string]: string
}
export const ReqGet = async (
  url: string,
  params: Query,
  option: RequestInit = {},
) => {
  const query = Object.keys(params)
    .map((param) => `${param}=${params[param]}`)
    .join('&')
  return await fetch(`${apiPath}${url}?${query}`, option)
    .then((res) => res.json())
    .then((res) => res)
    .catch((exp) => console.error(exp))
}
