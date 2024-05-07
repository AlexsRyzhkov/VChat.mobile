import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import { LoginScreen } from "../screen/login/LoginScreen";
import { RegisterScreen } from "../screen/register/RegisterScreen";
import { HomeScreen } from "../screen/home/HomeScreen";
import {CallScreen} from '../screen/call/CallScreen';
import {InCallScreen} from "../screen/in-call/InCallScreen";

type IRootStackRouter = {
    Login: undefined,
    Register: undefined,
    Home: undefined,
    Call: undefined,
    InCall: undefined
}

const Stack = createNativeStackNavigator<IRootStackRouter>()

function AppRouter() {

    const isAuth = true

    return (
        <NavigationContainer>
            <Stack.Navigator screenOptions={{ headerShown: false }}>
                {isAuth ? (
                    <Stack.Group>
                        <Stack.Screen name={'Home'} component={HomeScreen}/>
                        <Stack.Screen name={'Call'} component={CallScreen}/>
                        <Stack.Screen name={'InCall'} component={InCallScreen}/>
                    </Stack.Group>
                ) : (
                    <Stack.Group>
                        <Stack.Screen name={'Login'} component={LoginScreen}/>
                        <Stack.Screen name={'Register'} component={RegisterScreen}/>
                    </Stack.Group>
                )}
            </Stack.Navigator>
        </NavigationContainer>
    )
}

export { AppRouter, IRootStackRouter }