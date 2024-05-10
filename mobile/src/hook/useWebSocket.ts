import {useCallback, useEffect, useRef} from "react";

const useWebSocket = () => {
    const websocket = useRef<WebSocket>(new WebSocket('ws://10.0.2.2:8000/ws'))

    useEffect(()=>{
        return ()=>websocket.current?.close()
    },[])


    const sendMessage = useCallback((data:string) => {
        websocket.current?.send(data)
    },[websocket.current])

    return {
        ws: websocket.current,
        sendMessage
    }
}

export {useWebSocket}