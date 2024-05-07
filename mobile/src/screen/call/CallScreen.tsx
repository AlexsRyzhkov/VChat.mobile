import {Text, TouchableHighlight, View} from "react-native";
import {NativeStackScreenProps} from "@react-navigation/native-stack";
import {IRootStackRouter} from "../../router/AppRouter";
import {FC} from "react";
import {SafeAreaView} from "react-native-safe-area-context";
import FontAwesome from '@expo/vector-icons/FontAwesome'

type ICallScreen = NativeStackScreenProps<IRootStackRouter, "Call">

const CallScreen: FC<ICallScreen> = ({navigation}) => {

    const {name, surname, isCalling} = {
        name: "Alexs",
        surname: 'petrenko',
        isCalling: true
    }


    return (
        <SafeAreaView className={'w-full h-full'}>
            <View className={'w-full h-full bg-[#0e2337] pt-20'}>
                <View className={'flex-col items-center gap-3'}>
                    <View className={'w-40 h-40 bg-amber-300 flex justify-center items-center rounded-full pt-2'}>
                        <Text className={'text-6xl uppercase'}>{name[0] + surname[0]}</Text>
                    </View>
                    <Text className={'text-white text-lg'}>{isCalling ? 'Calling ...': 'In Call'}</Text>
                </View>
                <View className={'flex-row flex-1 items-end justify-center pb-52'}>
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