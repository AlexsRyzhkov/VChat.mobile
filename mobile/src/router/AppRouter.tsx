import {createNativeStackNavigator} from "@react-navigation/native-stack";
import {NavigationContainer} from "@react-navigation/native";
import {ScreenRoute} from "../const/navigation";
import {LoginScreen} from "../screen/login/LoginScreen";


const Stack = createNativeStackNavigator()

function AppRouter(){

    return (
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Group screenOptions={{headerShown: false}}>
                    <Stack.Screen name={ScreenRoute.LOGIN} component={LoginScreen}/>
                </Stack.Group>
            </Stack.Navigator>
        </NavigationContainer>
    )
}

export {AppRouter}