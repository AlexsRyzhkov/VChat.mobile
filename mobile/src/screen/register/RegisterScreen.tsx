import { SafeAreaView } from "react-native-safe-area-context";
import { classCenter } from "../../const/styles";
import { View, Text, Pressable } from "react-native";
import { Loader } from "../../component/Loader";
import { Input } from "../../component/Input";
import { Button } from "../../component/Button";
import {FC, useEffect, useState} from "react";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { IRootStackRouter } from "../../router/AppRouter";
import { useRegisterForm } from "./registerStore";
import $api from "../../http";
import * as SecureStore from "expo-secure-store";
import {useAuthStore} from "../../context/auth/AuthStore";

type IRegisterScreen = NativeStackScreenProps<IRootStackRouter, "Register">

const RegisterScreen: FC<IRegisterScreen> = ({ navigation }) => {

    const { name, surname, login, password } = useRegisterForm()
    const { changeState, reset } = useRegisterForm()

    const [isLoading, setLoading] = useState(false)
    const {setUserID} = useAuthStore()
    const authHandler = async () => {
        setLoading(true)
        try{
            const response = await $api.post('/register', {name, surname,login,password})

            setUserID(response.data['user']['id'])
            SecureStore.setItem('user_id',response.data['user']['id'].toString())
            SecureStore.setItem('access_token',response.data['access_token'])
            SecureStore.setItem('refresh_token', response.data['refresh_token'])

        }catch(e){
            setLoading(false)
            console.log(e)
        }
    }
    useEffect(reset, [navigation])

    return (
        <SafeAreaView className={classCenter}>
            <View className='mx-5 justify-center items-center h-full'>
                <View className='w-9/12'>
                    <Text className='text-center text-gray-800 text-2xl font-bold mb-2'>Вход</Text>
                    {isLoading ? <Loader/> : (
                        <>
                            <Input onChange={val => changeState({ name: val })} val={name} placeholder={"Имя"}/>
                            <Input onChange={val => changeState({ surname: val })} val={surname} placeholder={"Фамилия"}/>
                            <Input onChange={val => changeState({ login: val })} val={login} placeholder={"Логин"}/>
                            <Input onChange={val => changeState({ password: val })} val={password} placeholder={"Пароль"} isSecure={true}/>
                            <Button onPress={authHandler} title={'Зарегистрироваться'}/>
                            <Pressable onPress={() => navigation.replace("Login")}>
                                <Text className={'text-gray-800 opacity-30 text-right text-sm'}>
                                    Войти
                                </Text>
                            </Pressable>
                        </>
                    )}
                </View>
            </View>
        </SafeAreaView>
    )
}

export { RegisterScreen }