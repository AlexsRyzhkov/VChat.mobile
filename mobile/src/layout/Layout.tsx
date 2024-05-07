import {FC, ReactNode} from "react";
import {SafeAreaView} from "react-native-safe-area-context";
import {ScrollView} from "react-native";

interface ILayout {
    isScrollView?: boolean,
    children?: ReactNode
}

const classCenter:string = 'h-full w-full bg-white pt-16'

const Layout: FC<ILayout> = ({children, isScrollView}) => {

    return (
        <SafeAreaView className={classCenter}>
            {isScrollView ? <ScrollView>{children}</ScrollView>: children}
        </SafeAreaView>
    )
}

export {Layout, classCenter}