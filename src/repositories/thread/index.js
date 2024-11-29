import connector from "../../core/connector";

export class ThreadRepository {
  constructor(http){
    this.httpClient = http
  }

  newThread(assistantId){
    const data = {
      assistant_id: assistantId
    }

    return this.httpClient.post('/v1/threads', data)
  }
}

export default new ThreadRepository(connector)
