import Animated, {Easing, FadeIn, FadeOut} from "react-native-reanimated";
import {Pressable, Text, TouchableHighlight, View} from "react-native";
import {FC, ReactNode} from "react";
import {useSafeAreaInsets} from "react-native-safe-area-context";
import AntDesign from '@expo/vector-icons/AntDesign';
import {IUser} from "../screen/home/HomeScreen";

interface IModal {
    open: boolean,
    onClose: ()=>void,
    onCall: ()=>void,
    user: IUser
    children?: ReactNode
}

const Modal:FC<IModal> = ({
    children,
    open,
    onClose,
    onCall,
    user
}) => {

    const insets = useSafeAreaInsets()

    const entering = FadeIn.duration(100).easing(Easing.linear)
    const exiting = FadeOut.duration(100).easing(Easing.linear)

    return (
        <>
            { open && (
                <Animated.View
                    entering={entering} exiting={exiting}
                    className={'absolute w-full h-full flex justify-center items-center'}
                    style={{top: insets.top}}
                >
                    <View className={'w-full h-full bg-[#0F172A] opacity-50 absolute'}/>
                    <View className={'bg-white w-5/6 rounded-2xl px-4 py-4'}>
                        <View className={'flex-row justify-between'}>
                            <Text className={'font-semibold text-2xl'}>Профиль</Text>
                            <AntDesign name="close" size={32} color="black" onPress={onClose}/>
                        </View>
                        <View className={'flex items-center mt-4'}>
                            <View className={'w-24 h-24 bg-amber-300 flex justify-center items-center rounded-2xl'}>
                                <Text className={'uppercase text-4xl'}>
                                    {user.name[0]+user.surname[0]}
                                </Text>
                            </View>
                            <Text className={'text-3xl mt-2 font-semibold'}>{user.name} {user.surname}</Text>
                            <View className={'flex-row items-center'}>
                                <View className={`w-3 h-3 ${user.online ? 'bg-amber-500' : 'border-2 border-amber-500'} rounded-full mr-2 mt-1`}/>
                                <Text>{user.online? 'онлайн' : 'офлайн'}</Text>
                            </View>
                        </View>
                        <View className={'flex-row justify-between gap-1 pt-4'}>
                            {true && (
                                <TouchableHighlight
                                    onPress={onCall}
                                    underlayColor={'#A2E5B8'}
                                    className={'bg-[#2dc25f] flex-1 px-2 py-2 rounded-[6px] items-center justify-center'}
                                >
                                    <Text className={'text-xl text-white'}>Вызов</Text>
                                </TouchableHighlight>
                            )}
                            <TouchableHighlight
                                onPress={onClose}
                                underlayColor={'#E99FA6'}
                                className={'bg-[#e04252] flex-1 px-2 py-2 rounded-[6px] items-center justify-center'}
                            >
                                <Text className={'text-xl text-white'}>Закрыть</Text>
                            </TouchableHighlight>
                        </View>
                    </View>
                </Animated.View>
            )}
        </>
    )
}
export {Modal}