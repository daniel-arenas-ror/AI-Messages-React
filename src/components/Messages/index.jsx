import React, { useRef, useEffect } from "react";
import Message from "../Message";

function Messages({ isTyping, messages }){
  const divRef = useRef(null);

  useEffect(() => {
    divRef.current.scrollTo({ top: divRef.current.scrollHeight, behavior: "smooth" });
  }, [messages]);

  return(
    <div
      className="bg-[#0a131a] bg-contain overflow-y-scroll h-64"
      style={{ padding: "12px 7%" }}
      ref={divRef}
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
