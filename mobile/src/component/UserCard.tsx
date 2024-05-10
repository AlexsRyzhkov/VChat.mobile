import { Text, TouchableHighlight, View } from "react-native";
import { FC } from "react";

interface IUserCard {
    userData: {
        id: number
        name: string,
        surname: string,
        online: boolean
    },
    onPress: () => void,
}

const UserCard: FC<IUserCard> = ({ userData, onPress }) => {

    const { name, surname, online } = userData

    return (
        <TouchableHighlight
            className={'mb-0.5 py-4 px-3 flex justify-center bg-white rounded-xl mx-2'}
            underlayColor={'#e1e1e1'}
            onPress={onPress}
        >
            <View className={'flex-row gap-2'}>
                <View className={'w-20 h-20 bg-amber-300 flex justify-center items-center rounded-2xl'}>
                    <Text className={'text-4xl uppercase'}>{name[0] + surname[0]}</Text>
                </View>
                <View className={'flex-col gap-1 pt-1'}>
                    <Text className={'text-2xl capitalize font-semibold'}>{name} {surname}</Text>
                    <View className={'flex-row items-center'}>
                        <View className={`w-3 h-3 ${online ? 'bg-amber-500' : 'border-2 border-amber-500'} rounded-full mr-2 mt-1`}/>
                        <Text>{online ? 'онлайн' : 'офлайн'}</Text>
                    </View>
                </View>
            </View>
        </TouchableHighlight>
    )
}

export { UserCard }