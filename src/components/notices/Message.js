import React from 'react'
import './Message.css'

const Message = (props) => {
  return (
    <div className="message-display">
      <h1>Hopefully - {props.message}</h1>
    </div>
  )
}

export default Message
