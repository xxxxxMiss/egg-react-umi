import { useRef, useEffect } from 'react'
import { Terminal } from 'xterm'
import { FitAddon } from 'xterm-addon-fit';
import io from 'socket.io-client'
import styles from './index.less'
const cx = classNames.bind(styles)

export default function SSH(props) {
  const termRef = useRef(null)
  const pageRef = useRef(null)

  useEffect(() => {
    const term = (termRef.current = new Terminal())
    const fitAddon = new FitAddon()
    term.loadAddon(fitAddon)
    const socket = io('http://127.0.0.1:7001/', {
      transports: ['websocket'],
    })
    term.open(pageRef.current)
    fitAddon.fit()
    term.onData(char => {
      console.log('--ar: -', char)
      socket.emit('data', char)
    })

    socket.on('connection', () => {})
    socket.on('data', data => {
      term.write(data)
    })
    socket.emit('data', 'll')
  }, [])

  return <div className={cx('page-ssh')} ref={pageRef}></div>
}
