import axios from 'axios'
import { getUserFromLocalStorage } from '../utils/localStorage'

const customFetch = axios.create({
  // baseURL: 'https://subhash-prm-api.herokuapp.com/api',
  baseURL: 'http://localhost:5000/api',
})

// Where you would set stuff like your 'Authorization' header, etc ...
customFetch.defaults.headers.common['Content-Type'] = 'application/json'
customFetch.defaults.headers.common['Accept'] = 'application/json'

const user = getUserFromLocalStorage()
if (user) {
  customFetch.defaults.headers.common[
    'Authorization'
  ] = `Bearer ${user.access_token}`
}

export default customFetch
