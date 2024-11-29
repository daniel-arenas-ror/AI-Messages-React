import { useEffect, useState } from 'react';
import Messages from "../Messages";
import TextBox from "../TextBox";
import consumer from "../../utils/cable";
import Header from '../Header';
import MessageRepository from './../../repositories/messages'
import { CiChat1 } from "react-icons/ci";
import RoundedBtn from "../Common/RoundedBtn";

function AssistanChat() {
  const [chatOpen, setChatOpen] = useState(false)
  const [assistantId, setAssistantId] = useState(null)
  const [threadId, setThreadId] = useState(null)
  const [messages, setMessages] = useState([])
  const [isTyping, setisTyping] = useState(false)

  useEffect(() => {

    const queryParameters = new URLSearchParams(window.location.search)
    const type = queryParameters.get("assistant_id")

    //setAssistantId()

    consumer.subscriptions.create({
      channel: 'AiMessageChannel',
      assistant_id: 3,
      thread_id: threadId
    }, {
      connected: (data) => {
        console.log('connected', data)
      },
      disconnected: (data) => {
        console.log('disconnected', data)
      },
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

  const setChat = () => {
    setChatOpen(!chatOpen)
  }

  return (
    <div className="static" >
    {
      chatOpen ?
        <div className="absolute bottom-0 right-0 bg-red" >
          <div className="w-96 h-96 overflow-hidden" >
            <div className="flex flex-col">
              <Header setChat={setChat} />
              <Messages messages={messages} isTyping={isTyping} />
              <TextBox threadId={threadId} addMessage={addMessage} />
            </div>
          </div>
        </div>
      :
        <RoundedBtn
          icon={<CiChat1/>}
          onClick={setChat}
          className="bg-[#2c3943] absolute bottom-10 right-10 p-5 bg-red"
        />
    }
    </div>
  ) 
}

export default AssistanChat;
