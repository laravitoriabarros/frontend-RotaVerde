import React from 'react';
import { View, Text, Image } from 'react-native';

interface RegisterAdFirstStepProps {
    children: React.ReactNode
}

export const RegisterAdFirstStep = ({ children }: RegisterAdFirstStepProps) => {
  return (
 <View className='flex'>
    <Image
      source={require('../../../../../assets/images/cadastro-01.png')}
      className='w-48 h-48 my-5 self-center'
      resizeMode="contain"
    />
    <Text className='text-2xl font-bold text-center mb-8'>Vamos começar!</Text>
    {children}
  </View>
  );
}

interface RegisterAdSecondStepProps {
    children: React.ReactNode
}

export const RegisterAdSecondStep = ({ children }: RegisterAdSecondStepProps) => {
    return (
        <View className='flex max-h-[732px]'>
            <Text className='text-2xl font-bold text-center mb-4'>Só mais alguns detalhes!</Text>
            {children}
        </View>
    )
}

interface RegisterAdThirdStepProps {
    children: React.ReactNode
}

export const RegisterAdThirdStep = ({ children }: RegisterAdThirdStepProps) => {
    return (
        <View className='flex max-h-[732px]'>
            <Text className='text-2xl font-bold text-center mb-4'>Falta pouco...</Text>
            {children}
        </View>
    )
}
