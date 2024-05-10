import {useEffect, useRef} from "react";
import {mediaDevices, MediaStream} from "react-native-webrtc";

const useWebRTC = ()=>{
    const peerConnection = useRef<MediaStream>(null)
    const localMediaStream = useRef<MediaStream>({} as MediaStream)
    const peerMediaElement = useRef()

    useEffect(()=>{
        async function startCapture() {
            localMediaStream.current = await mediaDevices.getUserMedia({
                audio: true,
                video: false
            })
        }

        startCapture()
    }, [])
}

export {useWebRTC}