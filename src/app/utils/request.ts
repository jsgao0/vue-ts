import { apiDomain } from '@/env/env'

interface GetReq {
  path: string
  query?: {
    [key: string]: string
  }
}
interface CommonReq {
  path: string
  payload?: {
    [key: string]: any
  }
}

function handleErrors(res: Response) {
  if (res.status !== 200) {
    throw Error(res.statusText)
  }
  return res
}

class HttpRequest {
  private domain: string
  constructor(domain: string = '/') {
    this.domain = domain
  }
  public async Get(params: GetReq) {
    const { query, path } = params
    const stringifyQuery = query
      ? `?${Object.keys(query)
          .map((param) => `${param}=${query[param]}`)
          .join('&')}`
      : ''
    return await fetch(`${this.domain}${path}${stringifyQuery}`, {
      method: 'GET',
    })
      .then(handleErrors)
      .then((res) => res.json())
      .catch((exp) => ({ msg: exp }))
  }
  public async Delete(params: CommonReq) {
    return await this.common('DELETE', params)
  }
  public async Post(params: CommonReq) {
    return await this.common('POST', params)
  }
  public async Patch(params: CommonReq) {
    return await this.common('PATCH', params)
  }
  public async Put(params: CommonReq) {
    return await this.common('PUT', params)
  }
  private async common(method: string, params: CommonReq) {
    const { path, payload } = params
    return await fetch(`${this.domain}${path}`, {
      body: payload ? JSON.stringify(payload) : '',
      method,
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then(handleErrors)
      .then((res) => res.json())
      .catch((exp) => ({ msg: exp }))
  }
}

export const selfReq = new HttpRequest(apiDomain.self)
