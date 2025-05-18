import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { Image, Text, TextInput, TouchableOpacity, View } from 'react-native';

import { Eye, EyeOff } from 'lucide-react-native';
import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod'
import { LoginFormData, loginFormSchema, signInService } from '~/services/auth/login-service';
import { useMutation } from '@tanstack/react-query';
import { UserRoleEnum } from '~/lib/types/shared-types';
import Toast from 'react-native-toast-message';

export default function Login() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState<boolean>(false)
  const { control, handleSubmit, formState: { errors }, reset } = useForm({
    resolver: zodResolver(loginFormSchema),
    defaultValues: {
      email: '',
      senha: ''
    }
  })

    const signInMutation = useMutation({
    mutationFn: signInService,
    onSuccess: ({ data: { role }}) => {
      handleRedirectAfterLogin(role)
    },
    onError: () => {
       Toast.show({
        type: 'error',
        text1: 'Erro ao realizar o login!',
        text2: 'Senha ou E-mail estão incorretos.'
       })
    }
  })

  const onSubmit = async (data: LoginFormData) => {
        await signInMutation.mutateAsync(data)
  }

  const handleRedirectAfterLogin = (role: UserRoleEnum) => {
    switch(role) {
        case 'cidadao':
          router.push('/usuario/home')
        case 'cooperativa':
          router.push('/cooperativa/home')
        case 'motorista':
          router.push('/motorista/home')
        default:
         break;
      }
  };

  const redirectToForgotPassword = () => {
    router.push('/esqueci-a-senha-p1');
  };

  const redirectToRegister = () => {
    router.push('/register');
  };

  return (
    <View className="flex bg-white px-5 pt-20">
      <Image
        source={require('../../../assets/images/logo.png')}
        className='w-full h-32 mb-5'
        resizeMode="contain"
      />

      <Text className='text-2xl font-bold text-[##005A53] text-center mb-8'>Faça login para acessar o app</Text>

      <Text className='font-semibold text-sm mb-1.5 text-zinc-800'>Digite seu e-mail</Text>
      <Controller
        control={control}
        name="email"
        render={({ field: { onChange, value, onBlur, ...field } }) => (
          <TextInput className='border border-gray-300 rounded-lg p-4 mb-4' placeholder="Digite seu método de autenticação"
          value={value}
          onChangeText={onChange}
          onBlur={onBlur}
          />
        )}
      />
      {errors.email && (
          <Text className="text-xs mb-4 text-red-500">{errors.email?.message as string}</Text>
      )}

      <Text className='font-semibold text-sm mb-1.5 text-zinc-800'>Senha</Text>
      <View className='flex flex-row items-center border border-gray-300 rounded-lg px-3 mb-5'>
        <Controller
          control={control}
          name='senha'
          render={({ field: { onChange, value, onBlur, ...field }}) => (
            <TextInput
              className='flex-1 h-[50px]'
              placeholder="Digite sua senha aqui"
              secureTextEntry={!showPassword}
              value={value}
              onChangeText={onChange}
              onBlur={onBlur}
            />
          )}
        />
        <TouchableOpacity
          onPress={() => {
            setShowPassword(() => !showPassword)
          }}
          >
          {showPassword ? (
            <>
              <EyeOff size={20} color="#999" />
            </>
          ) : (
            <>
              <Eye size={20} color="#999" />
            </>
          )}
        </TouchableOpacity>
      </View>
      {errors.senha && (
          <Text className="text-xs mb-4 text-red-500">{errors.senha?.message as string}</Text>
      )}

      {/* Botão esqueci a senha */}
      <TouchableOpacity onPress={redirectToForgotPassword}>
        <Text className='text-right text-gray-500 text-sm mb-8'>Esqueci a senha</Text>
      </TouchableOpacity>

      {/* Botão Entrar */}
      <TouchableOpacity className='bg-[#4EC063] py-3.5 items-center rounded-3xl'
        onPress={handleSubmit(onSubmit)}
       >
        <Text className='text-white font-bold text-base'>Entrar</Text>
      </TouchableOpacity>

      {/* Link para cadastro */}
      <Text className='text-center text-gray-500 text-sm'>
        Ainda não tem uma conta?{' '}
        <Text className='text-[#4EC063] font-bold' onPress={redirectToRegister}>
          Clique aqui para se cadastrar
        </Text>
      </Text>
    </View>
  );
}
