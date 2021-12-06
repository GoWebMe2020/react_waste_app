import React from 'react'
import './Message.css'

const Message = (props) => {

  if (!props.message) {
    return ""
  }

  return (
    <div className="message-display">
      <h1>Hopefully - {props.message}</h1>
    </div>
  )
}

export default Message
