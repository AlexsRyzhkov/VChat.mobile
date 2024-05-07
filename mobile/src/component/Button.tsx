import {FC} from "react";
import {Text, TouchableHighlight} from "react-native";

interface IButton{
    onPress: ()=>void;
    title: string;
    colors?: [string, string]
}

const Button:FC<IButton> = ({
    onPress,
    title,
    colors = ['bg-yellow-300', '#fab619'],
}) => {
    return (
        <TouchableHighlight
            onPress={onPress}
            underlayColor={colors[1]}
            className={`${colors[0]} text-gray-800 rounded-xl w-full my-4 py-3`}
        >
            <Text className={'text-center font-semibold'}>{title}</Text>
        </TouchableHighlight>
    )
}

export {Button}