import { TextInput, View } from "react-native";
import { FC } from "react";

interface IInput {
    onChange: (val: string) => void
    val: string,
    placeholder: string,
    isSecure?: boolean
}

const Input: FC<IInput> = ({
    val,
    onChange,
    placeholder,
    isSecure = false
}) => {
    return (
        <TextInput
            showSoftInputOnFocus={false}
            autoCapitalize={'none'}
            placeholder={placeholder}
            value={val}
            onChangeText={onChange}
            secureTextEntry={isSecure}
            className='rounded-xl bg-gray-100 mt-3 p-3 no-underliner'
            placeholderTextColor={'#a5a5a5'}
            selectionColor={'black'}
        />
    )
}

export { Input }