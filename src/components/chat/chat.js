import React, { useState, useEffect } from 'react'
import queryString from 'query-string'
import io from 'socket.io-client'

import InfoBar from '../info-bar/info-bar'
import Messages from '../messages/messages'
import Input from '../input/input'

import './chat.css'

let socket

const Chat = ({ location }) => {

    const ENDPOINT = process.env.REACT_APP_API_ENDPOINT
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
        socket.on('room-data', (data) => {
            console.log(data)
        })
    }, [messages])

    const sendMessage = (event) => {
        event.preventDefault()
        if (message) {
            socket.emit('send-message', message, () => setMessage(''))
        }

    }

    return (
        <div className="d-flex justify-content-center align-items-center bg-dark chat-bg">
            <div className="d-flex flex-column justify-content-between rounded bg-white chat-box">
                <InfoBar room={room}></InfoBar>
                <Messages messages={messages} name={name}></Messages>
                <Input message={message} setMessage={setMessage} sendMessage={sendMessage}></Input> 
            </div>
        </div>
    )
}

export default Chat