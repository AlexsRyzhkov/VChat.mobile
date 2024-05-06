import {TextInput, View} from "react-native";
import {inputStyle} from './input.style'
import {PropsTextInput} from "./types";

function Input({value, onChange}:PropsTextInput){
    return (
        <View>
            <TextInput
                value={value}
                onChangeText={onChange}
                style={inputStyle.input}
            />
        </View>
    )
}

export {Input}