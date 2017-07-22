import { join } from 'path'

/**
 * A Function to easily call the backend API
 * @param {String} path - The URL path, eg. '/api/comments'
 * @param {String} method - HTTP method to send, one of the following GET, POST, DELETE, PUT...
 * @param {Object} body - An object to send as the request body, will be converted to JSON
 * @returns {Promise}
 */
const callApi = (path, method = 'GET', body) => {
  return new Promise((resolve, reject) => {
    body = JSON.stringify(body)
    const url = join(process.env.PUBLIC_URL, '/api/comments')

    if (process.env.NODE_ENV !== 'production') {
      console.log(`${method}: ${url}`)
    }

    window.fetch(url, {
      method,
      body,
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    }).then((res) => res.json()) // Convert response to json
    .then((json) => {
      resolve(json)
    }).catch((err) => {
      console.log(`Could not get request to ${path}: ${err}`)
      reject(err)
    })
  })
}

export default callApi
