import axios from "axios"

import confJson from './configuration.json'

export function buildReadableError(status = 500, err: Error) {
  return {
    error: {
      status: status,
      data: err.message
    }
  }
}

export interface EndPoint {
  [key: string]: string
}

//The API url memoized
const getRootUrl = () => {
  let cache: { [key: string]: string } = {}

  return (cacheKey: string) => {
    if (cacheKey in cache) {
      return cache[cacheKey]
    }
    else {
      const { env } = confJson
      const endPoints: { [key: string]: EndPoint } = confJson.endPoints
      const { protocol, host, port, prefix, version } = endPoints[env]

      let apiUrl = protocol + '://' + host
      apiUrl = port ? `${apiUrl}:${port}` : apiUrl
      apiUrl = prefix ? `${apiUrl}/${prefix}` : apiUrl
      apiUrl = version ? `${apiUrl}/v${version}` : apiUrl
      cache[cacheKey] = apiUrl
      return apiUrl
    }
  }
}

//Istantiate memoized API url
//See API specs on: http://abenergieservices-utils.azurewebsites.net/swagger/index.html
const rootUrl = getRootUrl()
export const getAPIUrl = (cacheKey = "apiUrl") => rootUrl(cacheKey)

export const fetchData = (
  url: string, 
  accessToken: string | null = null, 
  params: {} | null = null
) => {
  let reqHeaders = {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${accessToken}`
  }

  return axios.get(url, { headers: reqHeaders, params })
    .then(response => {
      return response.data
    })
    .catch(function (error) {
      if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        throw new Error(error.response.data.error?.message || error.response.data)
      } else if (error.request) {
        // The request was made but no response was received
        // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
        // http.ClientRequest in node.js
        throw new Error(error.request)
      } else {
        // Something happened in setting up the request that triggered an Error
        console.log('Error', error.message)
      }
    })
}

export const mutateData = (
  url: string,
  accessToken: string | null,
  params: {} | null,
  method: "POST" | "DELETE" | "PUT" | "PATCH"
) => {
  let reqHeaders = {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${accessToken}`
  }

  return axios({
    headers: reqHeaders,
    method: method,
    url: url,
    data: params
  })
    .then(response => {
      return response.data
    })
    .catch(error => {
      if(error.response) {
        throw new Error(error.response.data.erorr?.message || error.response.data)
      }
      else if(error.request) {
        throw new Error(error.request)
      }
      else {
        console.log('Error', error.message)
      }
    })
}