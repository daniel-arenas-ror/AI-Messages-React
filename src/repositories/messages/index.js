import connector from "../../core/connector";

export class MessageRepository {
  constructor(http){
    this.httpClient = http
  }

  createMessage(data){
    return this.httpClient.post('/messages', data)
  }
}

export default new MessageRepository(connector)
