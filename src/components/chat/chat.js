import React, { useState, useEffect } from 'react'
import queryString from 'query-string'
import io from 'socket.io-client'

import './chat.css'
import InfoBar from '../info-bar/info-bar'
import Messages from '../messages/messages'
import Input from '../input/input'

let socket

const Chat = ({ location }) => {

    const ENDPOINT = 'https://chat-nodejs-server.herokuapp.com'
    const [name, setName] = useState('')
    const [room, setRoom] = useState('')
    const [message, setMessage] = useState('')
    const [messages, setMessages] = useState([])

    useEffect(() => {
        const { name, room } = queryString.parse(location.search)

        socket = io(ENDPOINT)
        setName(name)
        setRoom(room)

        socket.emit('join', {name, room}, () => {

        })

        return () => {
            socket.emit('disconnect')
            socket.off()
        }

    }, [ENDPOINT, location.search])

    useEffect(() => {
        socket.on('message', (message) => {
            setMessages([...messages, message])
        })
    }, [messages])

    const sendMessage = (event) => {
        event.preventDefault()
        if (message) {
            socket.emit('send-message', message, () => setMessage(''))
        }

    }

    return (
        <div className="outerContainer">
            <div className="container">
                <InfoBar room={room}></InfoBar>
                <Messages messages={messages} name={name}></Messages>
                <Input message={message} setMessage={setMessage} sendMessage={sendMessage}></Input> 
            </div>
        </div>
    )
}

export default Chat