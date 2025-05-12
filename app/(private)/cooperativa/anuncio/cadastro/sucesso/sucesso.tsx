import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { useRouter } from 'expo-router';
import { CooperativaMenuBar } from '../../../../../../components/cooperativa/cooperativa-menu-bar';

export default function CadastroSucesso() {
    const router = useRouter();

    const redirectToAdsList = () => {
        router.push('/');
    };

    const redirectToCreateAnotherAd = () => {
        router.push('/cooperativa/anuncio/cadastro');
    };

    return (
        <View className='flex-1'>
            <View className='items-center justify-center mt-[60px]'>
                <Image
                className='w-64 h-64'
                source={require('../../../../../../assets/images/tudo-certo.png')}
                resizeMode='contain'
                />
                <Text className='text-[28px] font-bold color-[#4EC063] mt-5'>Tudo certo!</Text>
                <Text className='text-base text-center mt-2.5 mx-5 text-[#2F2F2F]'>
                    Seu anúncio de compra foi cadastrado
                    com sucesso e em breve estará sendo
                    visto por todos os catadores da cidade!
                </Text>
            </View>

            <View className='mt-10 px-5'>
             <TouchableOpacity
                className='py-[15px] rounded-md bg-[#4EC063] items-center mb-[15px]'
                onPress={redirectToAdsList}>
                    <Text className='text-white text-lg font-bold'>Ver meus anúncios</Text>
                </TouchableOpacity>
                <TouchableOpacity className='py-[15px] rounded-md bg-[#3629B7] items-center mb-[15px]' onPress={redirectToCreateAnotherAd}>
                    <Text
                     className='text-white text-lg font-bold'
                     >Criar outro anúncio</Text>
                </TouchableOpacity>
            </View>
            <CooperativaMenuBar />
        </View>
    );
}
