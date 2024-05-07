import { TypeRootStackParamList } from "./src/router/types";

declare global {
    namespace ReactNavigation {
        interface RootParamList extends TypeRootStackParamList {
        }
    }
}