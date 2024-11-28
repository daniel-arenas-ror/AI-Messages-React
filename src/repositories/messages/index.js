import connector from "../../core/connector";

export class MessageRepository {
  constructor(http){
    this.httpClient = http
  }

  createMessage(){
    return this.httpClient.post()
  }
}

export default new MessageRepository(connector)
