import React, { useState } from "react";
import Message from "../Message";

function Messages({ messages }){
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
    </div>
  )
}

export default Messages;
