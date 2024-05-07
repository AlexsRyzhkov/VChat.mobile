import { SafeAreaView } from "react-native-safe-area-context";
import { useLoginForm } from "./loginStore";
import { classCenter } from "../../const/styles";
import { View, Text, Pressable } from "react-native";
import { Loader } from "../../component/Loader";
import { Input } from "../../component/Input";
import { Button } from "../../component/Button";
import { FC, useEffect } from "react";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { IRootStackRouter } from "../../router/AppRouter";

type ILoginScreen = NativeStackScreenProps<IRootStackRouter, "Login">

const LoginScreen: FC<ILoginScreen> = ({ navigation }) => {

    const { login, password } = useLoginForm()
    const { changeState, reset } = useLoginForm()
    const isLoading = false

    const authHandler = () => {
        navigation.replace('Home')
    }

    useEffect(reset, [])

    return (
        <SafeAreaView className={classCenter}>
            <View className='mx-5 justify-center items-center h-full'>
                <View className='w-9/12'>
                    <Text className='text-center text-gray-800 text-2xl font-bold mb-2'>Вход</Text>
                    {isLoading ? <Loader/> : (
                        <>
                            <Input onChange={(val) => changeState({ login: val })} val={login} placeholder={"Логин"} isSecure={false}/>
                            <Input onChange={(val) => changeState({ password: val })} val={password} placeholder={"Пароль"} isSecure={true}/>
                            <Button onPress={authHandler} title={'Войти'}/>
                            <Pressable onPress={() => navigation.replace("Register")}>
                                <Text className={'text-gray-800 opacity-30 text-right text-sm'}>
                                    Регистрация
                                </Text>
                            </Pressable>
                        </>
                    )}
                </View>
            </View>
        </SafeAreaView>
    )
}

export { LoginScreen }