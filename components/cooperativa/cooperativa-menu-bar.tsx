import { Href, useRouter } from "expo-router"
import { Clock, HomeIcon, Map, User } from "lucide-react-native"
import { TouchableOpacity } from "react-native"
import { View } from "react-native"

export const CooperativaMenuBar = () => {
    const router = useRouter()

    const handleCardPress = (route: string): void => {
        console.log(route)
    }

    const handleNavigate = (href: Href): void => {
        router.navigate(href)
    }


    return (
        <View className="flex flex-row justify-around pb-5 absolute left-0 right-0 bottom-0 border-t-[1px] border-[#E0E0E0]">
            <TouchableOpacity
                className="p-2.5"
                onPress={() => handleNavigate('/cooperativa/home')}
            >
                <HomeIcon size={30} color={'#2F2F2F'} />
            </TouchableOpacity>

            <TouchableOpacity
                className="p-2.5"
                onPress={() => handleNavigate('/')}
            >
                <Map size={30} color="#2F2F2F" />
            </TouchableOpacity>

            <TouchableOpacity
                className="p-2.5"
                onPress={() => handleNavigate('/')}
            >
                <Clock size={30} color={'#2F2F2F'} />
            </TouchableOpacity>

            <TouchableOpacity
                className="p-2.5"
                onPress={() => handleNavigate('/')}
            >
                <User size={30} color={'#2F2F2F'} />
            </TouchableOpacity>
        </View>
    )
}
