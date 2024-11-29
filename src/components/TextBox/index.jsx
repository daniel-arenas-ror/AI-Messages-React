import React, { useState, useRef } from "react";

import RoundedBtn from "../Common/RoundedBtn";
import { MdSend } from "react-icons/md";

function TextBox({ threadId, addMessage }) {
  const handleInputSubmit = () => {
    if(inputRef.current.value.length === 0) return;

    addMessage(threadId, inputRef.current.value)

    inputRef.current.value = ""
  }

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      handleInputSubmit();
    }
  }

  const inputRef = useRef(null)

  return(
    <div
      className="flex flex-row bg-[#202d33] w-100 h-[70px] p-2"
    >
      <input
        onKeyDown={handleKeyDown}
        type="text"
        placeholder="Escribe tu mensaje..."
        className="bg-[#2c3943] rounded-lg outline-none text-small text-neutral-200 w-full h-[40px] px-2 my-2 placeholder:text-sm placeholder:text-[#8796a1]"
        ref={inputRef}
      />
      <span className="m-2">
        <RoundedBtn
          icon={<MdSend />}
          onClick={handleInputSubmit}
        />
      </span>
    </div>
  )
}

export default TextBox;
