import axios from 'axios'

const DEFAULT_TIMEOUT = 5000

export class axiosConf {

  constructor(configuration = {}) {
    this.http = axios.create(configuration)
  }

  instance() {
    this.http.interceptors.response.use((response) => response.data)
    return this.http
  }
}

export default new axiosConf({
  baseURL: process.env.API_URL_HOST,
  timeout: DEFAULT_TIMEOUT,
  headers: { 'content-type': 'application/json' }
}).instance()
