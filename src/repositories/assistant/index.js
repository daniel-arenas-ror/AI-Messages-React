import connector from "../../core/connector";

export class AssistatRepository {
  constructor(http){
    this.httpClient = http
  }

  getAssistant(assistantId){
    return this.httpClient.get(`/v1/assistants/${assistantId}`)
  }
}

export default new AssistatRepository(connector)
