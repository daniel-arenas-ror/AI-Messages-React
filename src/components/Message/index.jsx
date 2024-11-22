function Message({ message }) {
  const msg  = message.content[0]?.text?.value
  const sent = message.role === 'user'

  return (
    <div
      className={`flex justify-center items-center rounded-md w-fit my-1 ${
        sent ? "bg-[#005c4b] ml-auto" : "bg-[#202d33] mr-auto"
      }`}
    >
      <p className="text-white text-sm mr-2">{msg}</p>
    </div>
  )
}

export default Message;