import { Href, useRouter } from "expo-router";
import { Mic } from "lucide-react-native";
import {  Text, TextInput, TouchableOpacity, View } from "react-native";
import { Card } from "~/components/ui/card";
import { CooperativaMenuBar } from "../../../components/cooperativa/cooperativa-menu-bar";

export default function Home() {
    const router = useRouter()

    const handleCardPress = (route: string): void => {
        console.log(route)
    }

    const handleNavigate = (href: Href): void => {
        router.navigate(href)
    }

    return (
           <View className="flex flex-1 p-5 bg-white">
             <Text className="text-3xl font-bold text-[#2F2F2F]">Bem-vinda, Coopvila!</Text>
             <Text className="text-lg text-[#888888]">Encontre o vendendor mais próximo!</Text>
             <View className="flex flex-row items-center border border-gray-300 rounded-lg p-4 my-4">
                <TextInput className='flex-1' placeholder="Digite a localização"
                />
                <Mic size={20} />
             </View>
            <TouchableOpacity className='bg-[#4EC063] py-3.5 items-center rounded-3xl w-32'
            onPress={() => {
                console.log('pesquisou!')
            }}
            >
            <Text className='text-white font-bold text-base'>Pesquisar</Text>
            </TouchableOpacity>

             <TouchableOpacity
               className="bg-[#F5F5F5] p-5 rounded-[10px] my-2.5 elevation-[2]"
               onPress={() => handleCardPress('')}
               onLongPress={() => handleNavigate('/')}
             >
               <Card
                 minorDescription="Contribua com a comunidade!"
                 title="Avaliações"
                 description="Faça avaliações para ajudar outras pessoas a contratarem profissionais competentes!"
                >
                <View className="mt-5 flex-row justify-between">
                 <TouchableOpacity
                   className="py-2.5 px-5 bg-[#4EC063] rounded-[5px]"
                   onPress={() => handleNavigate('/')}
                 >
                   <Text className="font-bold text-white">Ver histórico</Text>
                 </TouchableOpacity>
                 <TouchableOpacity
                   className="py-2.5 px-5 bg-[#3629B7] rounded-[5px]"
                   onPress={() => handleNavigate('/')}
                 >
                   <Text className="font-bold text-white">Criar</Text>
                 </TouchableOpacity>
               </View>
               </Card>
             </TouchableOpacity>

             <TouchableOpacity
               className="bg-[#F5F5F5] p-5 rounded-[10px] my-2.5 elevation-[2]"
               onPress={() => handleCardPress('route')}
               onLongPress={() => handleNavigate('/')}
             >
                <Card
                 minorDescription="Adquira praticidade!"
                 title="Compra de Materiais!"
                 description="Cadastre anúncios de compra de materiais para os catadores da sua região!"
                >
                <View className="mt-5 flex-row justify-between">
                    <TouchableOpacity
                        className="py-2.5 px-5 bg-[#4EC063] rounded-[5px]"
                        onPress={() => handleNavigate('/')}
                        >
                        <Text className="font-bold text-white">Ver minhas compras</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                    className="py-2.5 px-5 bg-[#3629B7] rounded-[5px]"
                    onPress={() => handleNavigate('/cooperativa/anuncio/cadastro')}
                    >
                    <Text className="font-bold text-white">Cadastrar</Text>
                    </TouchableOpacity>
                </View>
              </Card>
             </TouchableOpacity>
            <CooperativaMenuBar />
           </View>
    )
}
