export function isRetryable (error) {
  return !!(
    // must be a response error
    error.response &&
    // must be a rate limit error
    error.response.status === 429 &&
    // must have a Retry-After header
    error.response.headers['retry-after']
  )
}

export function wait (error) {
  return new Promise(
    resolve => setTimeout(resolve, error.response.headers['retry-after'])
  )
}

export function retry (axios, error) {
  if (!error.config) {
    throw error
  } else {
    return axios(error.config)
  }
}
