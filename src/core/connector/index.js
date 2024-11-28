import axiosConf from './../axiosConf'

export class Connector {
  constructor(http) {
    this.httpClient = http
  }

  get(url, config = {}) {
    return new Promise((resolve, reject) => {
      this.httpClient
        .get(url, config)
        .then((response) => resolve(response))
        .catch((error) => reject(error))
    })
  }

  post(url, body = {}, config = {}) {
    return new Promise((resolve, reject) => {
      this.httpClient
        .post(url, body, config)
        .then((response) => resolve(response))
        .catch((error) => reject(error))
    })
  }

  put(url, body, config = {}) {
    return new Promise((resolve, reject) => {
      this.httpClient
        .put(url, body, config)
        .then((response) => resolve(response))
        .catch((error) => reject(error))
    })
  }

  patch(url, body, config = {}) {
    return new Promise((resolve, reject) => {
      this.httpClient
        .patch(url, body, config)
        .then((response) => resolve(response))
        .catch((error) => reject(error))
    })
  }

  delete(url, config = {}) {
    return new Promise((resolve, reject) => {
      this.httpClient
        .delete(url, config)
        .then((response) => resolve(response))
        .catch((error) => reject(error))
    })
  }
}

export default new Connector(axiosConf)
