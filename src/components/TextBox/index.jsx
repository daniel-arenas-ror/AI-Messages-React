import React, { useState, useRef } from "react";

import RoundedBtn from "../Common/RoundedBtn";
import { BiHappy } from "react-icons/bi";
import { MdSearch, MdSend } from "react-icons/md";
import { AiOutlineAudio, AiOutlinePaperClip } from "react-icons/ai";

function TextBox({ threadId }) {
  const [messages, setMessages] = useState({})
  const [typing, setTyping] = useState(false)

  const handleInputSubmit = () => {
    if(inputRef.current.value.length === 0) return;

    let newMessage = {
      message: {
        thread_id: threadId,
        text: inputRef.current.value
      }
    }
    
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');

    fetch('http://localhost:3000/messages', {
      method: 'POST',
      headers: headers,
      body: JSON.stringify(newMessage)
    })
    .then(res => {
      if(res.ok){
        console.log("ok!!")
      }
    })

    inputRef.current.value = "";
    inputRef.current.focus();
  }

  const inputRef = useRef(null)

  return(
    <div
      className="flex flex-row bg-[#202d33] w-100 h-[70px] p-2"
    >
      <input
        type="text"
        placeholder="Escribe tu mensaje..."
        className="bg-[#2c3943] rounded-lg outline-none text-small text-neutral-200 w-full h-[40px] px-2 my-2 placeholder:text-sm placeholder:text-[#8796a1]"
        ref={inputRef}
      />
      <span className="m-2">
        <RoundedBtn icon={<MdSend onClick={handleInputSubmit} />} /> :
      </span>
    </div>
  )
}

export default TextBox;
