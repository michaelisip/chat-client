import React from 'react'
import ScrollToBottom from 'react-scroll-to-bottom'

import './messages'
import Message from './message/message'

const Messages = ({messages, name}) => (
    <ScrollToBottom className="messages">
        {messages.map((message, i) => <div key={i}>
            <Message message={message} name={name}></Message>
        </div>)}
    </ScrollToBottom>
)

export default Messages