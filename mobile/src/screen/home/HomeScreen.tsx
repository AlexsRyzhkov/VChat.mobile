import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { IRootStackRouter } from "../../router/AppRouter";
import { FC, useState } from "react";
import {  ScrollView, Text, TouchableHighlight, View } from "react-native";
import {SafeAreaView} from "react-native-safe-area-context";
import { Loader } from "../../component/Loader";
import { UserCard } from "../../component/UserCard";
import {Modal} from "../../component/Modal";


type IHomeScreen = NativeStackScreenProps<IRootStackRouter, "Home">

const users = [
    {
        id: 1,
        name: "alexs",
        surname: "petrenko",
        colorIcon: "#12284f",
        online: false
    },
    {
        id: 2,
        name: "dator",
        surname: "nikson",
        colorIcon: "#12284f",
        online: true
    },
    {
        id: 3,
        name: "alexs",
        surname: "petrenko",
        colorIcon: "#12284f",
        online: true
    }, {
        id: 4,
        name: "alexs",
        surname: "petrenko",
        colorIcon: "#12284f",
        online: true
    }, {
        id: 5,
        name: "alexs",
        surname: "petrenko",
        colorIcon: "#12284f",
        online: true
    }, {
        id: 6,
        name: "alexs",
        surname: "petrenko",
        colorIcon: "#12284f",
        online: true
    }, {
        id: 7,
        name: "alexs",
        surname: "petrenko",
        colorIcon: "#12284f",
        online: true
    }, {
        id: 8,
        name: "alexs",
        surname: "petrenko",
        colorIcon: "#12284f",
        online: true
    },
]

interface IUser {
    id: number
    name: string,
    surname: string,
    colorIcon: string
}

const HomeScreen: FC<IHomeScreen> = ({ navigation }) => {

    const [isLoading, setLoading] = useState(false)
    const [open, setOpen] = useState(false)

    return (
        <SafeAreaView className={'h-full'} style={{ backgroundColor: '#e2e8f0' }}>
            <View className={'py-5 px-4 flex-row justify-between bor'}>
                <Text className={'text-2xl font-semibold #313132'}>Контакты</Text>
                <TouchableHighlight
                    underlayColor={'#fab619'}
                    className={'bg-amber-300 flex justify-center py-2.5 px-4 rounded-xl'}
                    onPress={() => {
                        setLoading(true)
                        setTimeout(() => setLoading(false), 1000)
                    }}
                >
                    <Text className={'font-semibold'}>Обновить</Text>
                </TouchableHighlight>
            </View>
            {isLoading ? (
                <View className={'pt-10'}>
                    <Loader size={70}/>
                </View>
            ) : (
                <ScrollView>
                    {users.map((user) => (
                        <UserCard
                            userData={user}
                            key={user.id}
                            onPress={() => {setOpen(true)}}/>
                    ))}
                </ScrollView>
            )}
            <Modal
                open={open}
                closeModal={()=>setOpen(false)}
                onCall={()=>navigation.replace('Call')}
            />
        </SafeAreaView>
    )
}

export { HomeScreen }