import axios from 'axios'

const customFetch = axios.create({
  baseURL: 'https://subhash-prm-api.herokuapp.com/api',
})

export default customFetch
