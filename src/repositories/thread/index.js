import connector from "../../core/connector";

export class ThreadRepository {
  constructor(http){
    this.httpClient = http
  }

  threadMessage(data){
    return this.httpClient.post('/thread', data)
  }
}

export default new ThreadRepository(connector)
