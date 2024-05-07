import { ActivityIndicator } from "react-native";
import { FC } from "react";

interface ILoader {
    size?: number
}

const Loader: FC<ILoader> = ({ size }) => {
    return (
        <ActivityIndicator size={size || 'large'} color={'#f4c160'}/>
    )
}

export { Loader }