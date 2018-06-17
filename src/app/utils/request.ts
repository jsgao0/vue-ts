interface Query {
  [key: string]: string
}
export const ReqGet = async (domain: string, path: string, params: Query) => {
  const query = Object.keys(params)
    .map((param) => `${param}=${params[param]}`)
    .join('&')
  return await fetch(`${domain}${path}?${query}`, { method: 'GET' })
    .then((res) => res.json())
    .then((res) => res)
    .catch((exp) => console.error(exp))
}
export const ReqPost = async (domain: string, path: string, params: {}) => {
  return await fetch(`${domain}${path}`, {
    body: JSON.stringify(params),
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((res) => res.json())
    .then((res) => res)
    .catch((exp) => console.error(exp))
}
export const ReqPut = async (domain: string, path: string, params: {}) => {
  return await fetch(`${domain}${path}`, {
    body: JSON.stringify(params),
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((res) => res.json())
    .then((res) => res)
    .catch((exp) => console.error(exp))
}
export const ReqPatch = async (domain: string, path: string, params: {}) => {
  return await fetch(`${domain}${path}`, {
    body: JSON.stringify(params),
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((res) => res.json())
    .then((res) => res)
    .catch((exp) => console.error(exp))
}
export const ReqDelete = async (domain: string, path: string, params: {}) => {
  return await fetch(`${domain}${path}`, {
    body: JSON.stringify(params),
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((res) => res.json())
    .then((res) => res)
    .catch((exp) => console.error(exp))
}
