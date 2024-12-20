import { useEffect, useState } from 'react';
import Messages from "../Messages";
import TextBox from "../TextBox";
import Header from '../Header';
import MessageRepository from './../../repositories/messages'
import ThreadRepository from '../../repositories/thread';
import AssistantRepository from '../../repositories/assistant';
import { CiChat1 } from "react-icons/ci";
import RoundedBtn from "../Common/RoundedBtn";
import { useLocalStorage } from "./../../utils/localStorage";
import Subscription from '../../utils/Subcription';

function AssistanChat() {
  const [chatOpen, setChatOpen] = useState(false)
  const [assistantId, setAssistantId] = useState(null)
  const [assistant, setAssistant] = useState(null)
  const [threadId, setThreadId] = useLocalStorage("AI_ASSISTANT_V1_THREAD_ID", null)
  const [messages, setMessages] = useState([])
  const [isTyping, setisTyping] = useState(false)

  useEffect(() => {
    const queryParameters = new URLSearchParams(window.location.search)
    console.log(queryParameters.get("assistant_id"))
    setAssistantId(queryParameters.get("assistant_id"))

    AssistantRepository.getAssistant(queryParameters.get("assistant_id"))
      .then(response => {

        console.log("obtener informacion assistente")
        setAssistant(response.assistant)
      });
  }, []);

  useEffect(() => {
    if(chatOpen === false)
      return

    if(assistantId && threadId === null){
      console.log("no se ha iniciado ninguna converzacion1!! :<")

      ThreadRepository.newThread(assistantId)
        .then(response => {

          console.log("conversacion iniciada")
          setThreadId(response.thread_id)

          Subscription(
            assistantId,
            response.thread_id,
            setMessages,
            setisTyping
          );
        });
    } else {
      
      console.log("we already have a conversation!!")

      Subscription(
        assistantId,
        threadId,
        setMessages,
        setisTyping
      );
    }
  }, [chatOpen]);

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

    setMessages([...messages, { id: Date.now(), role: "user", content: [{ type: "text", text: { value: message } }]}])
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
              <Header setChat={setChat} assistant={assistant} />
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
