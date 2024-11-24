import React, { useState } from "react";
import Message from "../Message";

function Messages({ isTyping, messages }){
  return(
    <div
      className="bg-[#0a131a] bg-[url('assets/images/bg.webp')] bg-contain overflow-y-scroll h-100"
      style={{ padding: "12px 7%" }}
    >
      {messages.map((msg) => (
        <Message
          key={msg.id}
          message={msg}
        />
      ))}

      { isTyping && <p className="text-[#16a34a] text-xs" >escribiendo....</p> }
    </div>
  )
}

export default Messages;
