import { useEffect, useState } from 'react';
import Messages from "../Messages";
import TextBox from "../TextBox";
import consumer from "../../utils/cable";
import Header from '../Header';
import MessageRepository from './../../repositories/messages'

function AssistanChat() {
  const [threadId, setThreadId] = useState("thread_pHmpwDheaK2zyRzPk0WtQPBE")
  const [messages, setMessages] = useState([])
  const [isTyping, setisTyping] = useState(false)

  useEffect(() => {
    consumer.subscriptions.create({
      channel: 'AiMessageChannel',
      assistant_id: 3,
      thread_id: threadId
    }, {
      connected: (data) => {
        console.log('connected', data)
      },
      disconnected: (data) => console.log('disconnected', data),
      received: (data) => {
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
      consumer.disconnect()
    }
  }, []);

  const addMessage = (threadId, message) => {
    let newMessage = {
      message: {
        thread_id: threadId,
        text: message
      }
    }

    MessageRepository.createMessage(
      newMessage
    ).then(response => {
      console.log(response)
    })

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
