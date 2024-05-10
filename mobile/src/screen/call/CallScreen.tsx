import {Text, TouchableHighlight, View} from "react-native";
import {NativeStackScreenProps} from "@react-navigation/native-stack";
import {IRootStackRouter} from "../../router/AppRouter";
import {FC, useEffect, useRef} from "react";
import {SafeAreaView} from "react-native-safe-area-context";
import FontAwesome from '@expo/vector-icons/FontAwesome'
import {mediaDevices,RTCPeerConnection} from "react-native-webrtc";

type ICallScreen = NativeStackScreenProps<IRootStackRouter, "Call">

const CallScreen: FC<ICallScreen> = ({navigation}) => {

    const {name, surname, isCalling} = {
        name: "Alexs",
        surname: 'petrenko',
        isCalling: true
    }

    const localMediaStream = useRef<MediaStream>({} as MediaStream)
    const peerConnection = useRef<RTCPeerConnection>({} as RTCPeerConnection)

    useEffect(()=>{
        async function startCapture() {
            localMediaStream.current = await mediaDevices.getUserMedia({
                audio: true,
                video: false
            })

            let peerConstraints = {
                iceServers: [
                    {
                        urls: 'stun:stun.l.google.com:19302'
                    }
                ]
            };

            peerConnection.current = new RTCPeerConnection( peerConstraints );

            peerConnection.current.addEventListener( 'connectionstatechange', event => {} );
            peerConnection.current.addEventListener( 'icecandidate', event => {} );
            peerConnection.current.addEventListener( 'icecandidateerror', event => {} );
            peerConnection.current.addEventListener( 'iceconnectionstatechange', event => {} );
            peerConnection.current.addEventListener( 'icegatheringstatechange', event => {} );
            peerConnection.current.addEventListener( 'negotiationneeded', event => {} );
            peerConnection.current.addEventListener( 'signalingstatechange', event => {} );
            peerConnection.current.addEventListener( 'track', event => {} );

            localMediaStream.current.getTracks().forEach(track => peerConnection.current.addTrack( track, localMediaStream.current ))

            let datachannel = peerConnection.current.createDataChannel( 'my_channel' );

            datachannel.addEventListener( 'open', event => {} );
            datachannel.addEventListener( 'close', event => {} );
            datachannel.addEventListener( 'message', message => {} );

            peerConnection.current.addEventListener( 'datachannel', event => {
                let datachannel = event.channel;

            } );
        }


        startCapture()
    }, [])

    return (
        <SafeAreaView className={'w-full h-full'}>
            <View className={'w-full h-full bg-[#0e2337] pt-20'}>
                <View className={'flex-col items-center gap-3'}>
                    <View className={'w-40 h-40 bg-amber-300 flex justify-center items-center rounded-full pt-2'}>
                        <Text className={'text-6xl uppercase'}>{name[0] + surname[0]}</Text>
                    </View>
                    <Text className={'text-white text-lg'}>{isCalling ? 'Calling ...': 'In Call'}</Text>
                </View>
                <View className={'flex-row flex-1 items-end justify-center pb-28'}>
                    <TouchableHighlight
                        className={'bg-[#e04252] px-6 py-5 rounded-full'}
                        underlayColor={'#A61C2A'}
                        onPress={()=>{navigation.replace('Home')}}
                    >
                        <FontAwesome name="phone" size={34} color="white" style={{transform: [{rotate: '136deg'}]}}/>
                    </TouchableHighlight>
                </View>
            </View>
        </SafeAreaView>
    )
}

export {CallScreen}