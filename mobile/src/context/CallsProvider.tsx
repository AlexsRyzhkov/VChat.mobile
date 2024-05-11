import {FC, PropsWithChildren, useEffect} from "react";
import {useCalls} from "@stream-io/video-react-native-sdk";
import { useNavigationContainerRef} from "@react-navigation/native";

export const CallsProvider:FC<PropsWithChildren> = ({children})=>{
    const calls = useCalls()

    const navigation = useNavigationContainerRef()

    useEffect(() => {
        if (calls.length > 0){
            navigation.navigate('Call')
        }
    }, [calls]);

    return children
}