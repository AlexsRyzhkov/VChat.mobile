import {StreamVideo, StreamVideoClient, User} from "@stream-io/video-react-native-sdk";
import {FC, PropsWithChildren, useEffect} from "react";
import {useAuth} from "./AuthContext";
import * as SecureStore from "expo-secure-store";

const apiKey = 'utebv5aw3xtw'
const client = new StreamVideoClient({apiKey})

export const StreamClientProvider:FC<PropsWithChildren> = ({children})=>{

    const {userID} = useAuth()

    useEffect(() => {
        (async ()=>{
            await client.disconnectUser()

            if (!userID) return

            const stream_token = SecureStore.getItem('stream_token')

            client.connectUser({id: userID.toString(), name: "ales2xs"}, stream_token)
        })()
    }, [userID]);

    if (!userID){
        return children
    }

    return (
        <StreamVideo client={client}>
            {children}
        </StreamVideo>
    )
}