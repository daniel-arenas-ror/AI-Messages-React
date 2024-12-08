import consumer from '../utils/cable'

function Subscription(assistantId, threadId, setMessages, setisTyping) {
  consumer.subscriptions.create({
    channel: 'AiMessageChannel',
    assistant_id: assistantId,
    thread_id: threadId
  }, {
    connected: (data) => {
      console.log('connected', data)
    },
    disconnected: (data) => {
      console.log('disconnected', data)
    },
    received: (data) => {
      console.log("Arrived Data!!")
      console.log(data.action)

      switch (data.action) {
        case 'updateMessages':
          console.log("updateMessages - data.messages.data")
          console.log(data.messages)

          if(data.messages){
            setMessages(data.messages.data)
          }

          break;
        case 'startTyping':
          setisTyping(true)
          break;
        case 'stopTyping':
          setisTyping(false)
          break;
        default:
          console.log("event dont fount!!")
      }
    },
  })
}

export default Subscription;