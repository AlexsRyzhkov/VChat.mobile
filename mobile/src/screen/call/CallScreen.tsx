import {NativeStackScreenProps} from "@react-navigation/native-stack";
import {IRootStackRouter} from "../../router/AppRouter";
import React, {FC, useEffect,  useState} from "react";
import {CallTopView, RingingCallContent, StreamCall,  useCalls} from "@stream-io/video-react-native-sdk";
import {SafeAreaView} from "react-native-safe-area-context";
import {Text} from "react-native";

type ICallScreen = NativeStackScreenProps<IRootStackRouter, "Call">

const CallScreen: FC<ICallScreen> = ({navigation}) => {
    const [loaded, setLoaded] = useState(false);
    const calls = useCalls()
    const call = calls[0]

    useEffect(() => {
        if (!call && loaded) {
            return navigation.replace('Home')
        }

        if (call && !loaded) {
            setLoaded(true)
        }
    }, [call]);

    if (!call){
        return (
            <SafeAreaView>
                <Text>Call not found</Text>
            </SafeAreaView>
        )
    }

    return (
        <StreamCall call={call}>
            <RingingCallContent
                CallTopView={() => <CallTopView title={`ID: ${call.id}`}/>}
            />
        </StreamCall>
    )
}

export {CallScreen}