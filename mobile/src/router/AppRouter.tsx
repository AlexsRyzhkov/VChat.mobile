import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import { LoginScreen } from "../screen/login/LoginScreen";
import { RegisterScreen } from "../screen/register/RegisterScreen";
import { HomeScreen } from "../screen/home/HomeScreen";

type IRootStackRouter = {
    Login: undefined,
    Register: undefined,
    Home: undefined
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