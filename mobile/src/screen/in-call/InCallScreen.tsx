import {View, Text, TouchableHighlight} from "react-native";
import {SafeAreaView} from "react-native-safe-area-context";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import {NativeStackScreenProps} from "@react-navigation/native-stack";
import {IRootStackRouter} from "../../router/AppRouter";
import {FC, useEffect, useState} from "react";
import {Audio} from "expo-av";
import {Sound} from "expo-av/build/Audio/Sound";

type ICallScreen = NativeStackScreenProps<IRootStackRouter, "InCall">

const InCallScreen:FC<ICallScreen> = ({navigation}) => {
    const {name, surname, isCalling} = {
        name: "Alexs",
        surname: 'petrenko',
        isCalling: true
    }
    const [sound, setSound] = useState<Sound | null>(null)

    useEffect(() => {
        if (sound === null){
            (async ()=>{
                const { sound } = await Audio.Sound.createAsync( require('../../../assets/samsung_glaxy.mp3'));
                await sound.setIsLoopingAsync(true)
                setSound(sound);

                await sound.playAsync();
            })()
        }

        return sound
            ? () => {
                console.log('Unloading Sound');
                sound.unloadAsync();
            }
            : undefined;
    }, [sound]);

    return (
        <SafeAreaView className={'w-full h-full'}>
            <View className={'w-full h-full bg-[#0e2337] pt-20'}>
                <View className={'flex-col items-center gap-3'}>
                    <View className={'w-40 h-40 bg-amber-300 flex justify-center items-center rounded-full pt-2'}>
                        <Text className={'text-6xl uppercase'}>{name[0] + surname[0]}</Text>
                    </View>
                    <Text className={'text-white text-lg'}>{isCalling ? 'Calling ...': 'In Call'}</Text>
                </View>
                <View className={'m-auto flex-row flex-1 items-end justify-between pb-28 w-[280px]'}>
                    <TouchableHighlight
                        className={'bg-[#38cd56] px-6 py-5 rounded-full'}
                        underlayColor={'#14892C'}
                        onPress={()=>{}}
                    >
                        <FontAwesome name="phone" size={34} color="white"/>
                    </TouchableHighlight>
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

export {InCallScreen}