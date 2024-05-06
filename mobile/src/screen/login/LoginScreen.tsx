import {View, Text, TextInput} from "react-native";
import {SafeAreaView} from "react-native-safe-area-context";
import {useLoginStore} from "./loginStore";
import {Input} from "../../component/input/Input";

function LoginScreen(){

    const {login, changeLogin} = useLoginStore()

    return (
        <SafeAreaView>
            <View className={'flex bg-amber-300 flex-col items-center justify-center h-screen'}>
                <Input
                    value={login}
                    onChange={changeLogin}
                />
            </View>
        </SafeAreaView>
    )
}

export {LoginScreen}