import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { IRootStackRouter } from "../../router/AppRouter";
import {FC, useEffect, useState} from "react";
import {  ScrollView, Text, TouchableHighlight, View } from "react-native";
import {SafeAreaView} from "react-native-safe-area-context";
import { Loader } from "../../component/Loader";
import { UserCard } from "../../component/UserCard";
import {Modal} from "../../component/Modal";
import * as SecureStore from 'expo-secure-store';
import {useAuth} from "../../context/AuthContext";
import $api from "../../http";
import {useStreamVideoClient} from "@stream-io/video-react-native-sdk";
import {genRandomString} from "../../utils";

type IHomeScreen = NativeStackScreenProps<IRootStackRouter, "Home">

export interface IUser {
    id: number
    name: string,
    surname: string,
    online: boolean
}

const HomeScreen: FC<IHomeScreen> = ({ navigation }) => {

    const [isLoading, setLoading] = useState(false)
    const [open, setOpen] = useState(false)
    const [selectedUser, setSelectedUser] = useState<IUser>({} as IUser)

    const {userID,setUserID} = useAuth()

    const client = useStreamVideoClient()

    const [users, setUsers] =  useState<IUser[]>([])

    const fetchUsers = async ()=>{
        setLoading(true)
        try{
            const response = await $api.get('/users')
            const users = response.data.users as IUser[]
            setUsers(users)
            setLoading(false)
        }catch (e:any){
            console.log(e.message)
        }
    }

    useEffect(()=>{
        fetchUsers()
    },[])

    const onUserCall = ()=>{
        if (!client) return

        const callID = genRandomString(5);
        client.call('default', callID).getOrCreate({
            ring:true,
            data: {
                members: [{user_id: userID.toString()}, {user_id: selectedUser.id.toString()}]
            }
        })
        navigation.push('Call')
    }

    return (
        <SafeAreaView className={'h-full'} style={{ backgroundColor: '#e2e8f0' }}>
            <View>
                <View className={'py-5 px-4 flex-row justify-between bor'}>
                    <Text className={'text-2xl font-semibold #313132'}>Контакты</Text>
                    <TouchableHighlight
                        underlayColor={'#fab619'}
                        className={'bg-amber-300 flex justify-center py-2.5 px-4 rounded-xl'}
                        onPress={() => {
                            SecureStore.deleteItemAsync('access_token')
                            SecureStore.deleteItemAsync('refresh_token')
                            setUserID(0)
                        }}
                    >
                        <Text className={'font-semibold'}>Выйти</Text>
                    </TouchableHighlight>
                </View>

                <TouchableHighlight
                    underlayColor={'#fab619'}
                    className={'bg-amber-300 flex justify-center py-2.5 px-4 mb-1'}
                    onPress={fetchUsers}
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
                            onPress={() => {
                                setSelectedUser(user)
                                setOpen(true)
                            }}/>
                    ))}
                </ScrollView>
            )}
            <Modal
                open={open}
                user={selectedUser}
                onClose={()=>setOpen(false)}
                onCall={()=> {
                    onUserCall()
                    navigation.replace('Call')
                }}
            />
        </SafeAreaView>
    )
}

export { HomeScreen }