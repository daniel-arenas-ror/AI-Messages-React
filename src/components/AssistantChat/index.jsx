import { useLayoutEffect, useEffect, useState } from 'react';
import Messages from "../Messages";
import TextBox from "../TextBox";
import consumer from "../../utils/cable";

function AssistanChat() {
  const [threadId, setThreadId] = useState("thread_PS4ybSKVZmIFlh5nbF4nMlcJ")
  const [messages, setMessages] = useState([])

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

  return (
    <div className="flex flex-col h-screen">
      <p>Header</p>
      <Messages messages={messages}/>
      <TextBox threadId={threadId} />
    </div>
  ) 
}

export default AssistanChat;
