import React, { useEffect, useRef, useState } from 'react'
import { Button, Input } from 'antd'
import io from 'socket.io-client'

export default function Chat() {
  const ioRef = useRef({})
  const [msgs] = useState([])
  const [input, setInput] = useState('')
  const [input2, setInput2] = useState('')

  useEffect(() => {
    const socket = io('http://127.0.0.1:7001/', {
      transports: ['websocket']
    })
    //const socket2 = io('http://127.0.0.1:7001', {
      //path: '/chat',
    //})
    ioRef.current.s1 = socket
    socket.on('connect', () => {
      console.log('--connect----')
    })
    socket.on('data', data => {
      console.log('------data----', data)
      setInput(data)
    })
    socket.on('disconnect', () => {
      console.log('disconnect')
    })
  }, [])

  const sendMsg = () => {
    ioRef.current.s1.emit('msg', input)
  }
  const sendMsg2 = () => {
    ioRef.current.s2.emit('msg', input2)
  }
  return (
    <div className="page-chat">
      <div className="">Msg: {input}</div>
      <div className="">Msg2: {input2}</div>
      <Input value={input} onChange={e => setInput(e.target.value)} />
      <Button onClick={sendMsg}>发送</Button>
      <hr />
      <Input value={input2} onChange={e => setInput2(e.target.value)} />
      <Button onClick={sendMsg2}>发送</Button>
    </div>
  )
}
