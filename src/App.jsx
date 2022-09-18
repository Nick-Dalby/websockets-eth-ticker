import { useEffect, useState } from 'react'

const url = 'wss://stream.binance.com:9443/ws/etheur@trade'

function App() {
  const [eth, setEth] = useState('loading...')

  useEffect(() => {
    const ws = new WebSocket(url)

    ws.onopen = function open() {
      console.log('connected')
    }

    let data
    ws.onmessage = (e) => {
      data = JSON.parse(e.data)
    }

    ws.onclose = function close() {
      console.log('closed')
    }

    const timer = setInterval(() => {
      setEth(parseFloat(data?.p).toFixed(2))
    }, 3000)

    return () => {
      clearInterval(timer)
      ws.onclose()
    }
  }, [])

  return <div className="price">{eth}</div>
}

export default App
