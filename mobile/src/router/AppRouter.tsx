import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import { LoginScreen } from "../screen/login/LoginScreen";
import { RegisterScreen } from "../screen/register/RegisterScreen";

type IRootStackRouter = {
    Login: undefined,
    Register: undefined
}

const Stack = createNativeStackNavigator<IRootStackRouter>()

function AppRouter() {

    return (
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Group screenOptions={{ headerShown: false }}>
                    <Stack.Screen name={'Login'} component={LoginScreen}/>
                    <Stack.Screen name={'Register'} component={RegisterScreen}/>
                </Stack.Group>
            </Stack.Navigator>
        </NavigationContainer>
    )
}

export { AppRouter, IRootStackRouter }