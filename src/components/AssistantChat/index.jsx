import { useLayoutEffect, useEffect, useState } from 'react';
import Messages from "../Messages";
import TextBox from "../TextBox";
import consumer from "../../utils/cable";
import Header from '../Header';

function AssistanChat() {
  const [threadId, setThreadId] = useState("thread_PS4ybSKVZmIFlh5nbF4nMlcJ")
  const [messages, setMessages] = useState([])
  const [isTyping, setisTyping] = useState(false)

  useEffect(() => {
    console.log("componentDidMount")

    consumer.subscriptions.create({
      channel: 'AiMessageChannel',
      assistant_id: 1,
      thread_id: "thread_PS4ybSKVZmIFlh5nbF4nMlcJ"
    }, {
      connected: (data) => {
        console.log('connected', data)
      },
      disconnected: (data) => console.log('disconnected', data),
      received: (data) => {
        console.log("Receibe data!!")
        console.log(data)

        switch (data.action) {
          case 'updateMessages':
            setMessages(data.messages.data)
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

    return () => {
      console.log(" ** disconect !! ** ")
      consumer.disconnect()
    }
  }, []);

  const addMessage = (message) => {
    setMessages([...messages, { id: "123", role: "user", content: [{ type: "text", text: { value: message } }]}])
  }

  return (
    <div className="flex flex-col h-screen">
      <Header />
      <Messages messages={messages} isTyping={isTyping} />
      <TextBox threadId={threadId} addMessage={addMessage} />
    </div>
  ) 
}

export default AssistanChat;
