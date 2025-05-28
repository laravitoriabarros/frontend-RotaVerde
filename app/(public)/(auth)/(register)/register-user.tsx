import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { useRouter } from 'expo-router';
import Icon from 'react-native-vector-icons/Feather';
import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod'
import { RegisterCidadaoFormData, registerCidadaoFormSchema, registerUserService } from '~/services/register/register-user-service';
import { maskInputPhone } from '~/lib/masks-input';
import { useMutation } from '@tanstack/react-query';
import { removeMask } from '~/lib/parse';
import Toast from 'react-native-toast-message';
import { ShowHiddenPassword } from '~/components/ui/show-hidden-password';

export default function CadastroUsuario() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState<boolean>(false)
  const { control, handleSubmit, formState: { errors } } = useForm({
    resolver: zodResolver(registerCidadaoFormSchema),
    defaultValues: {
      nome_usuario: '',
      telefone: '',
      email: '',
      senha: '',
      role: 'cidadao'
    }
  })

  const { mutateAsync: registerUserMutation } = useMutation({
    mutationFn: registerUserService,
    onSuccess: () => {
       Toast.show({
        type: 'success',
        text1: 'Cadastro realizado com sucesso!',
       })
       router.push('/signin')
    },
    onError: () => {
       Toast.show({
        type: 'error',
        text1: 'Erro ao realizar o cadastro!',
       })
    }
  })

  const onSubmit = async (data: RegisterCidadaoFormData) => {
    const { telefone, ...userInfo } = data
    const formattedData = {
        telefone: removeMask(telefone),
        ...userInfo
    }
   await registerUserMutation(formattedData)
  }

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
        <Icon name="arrow-left" size={28} color="#4EC063" />
      </TouchableOpacity>

      <Image
        source={require('../../../../assets/images/logo.png')}
        style={styles.image}
        resizeMode="contain"
      />

      <Text style={styles.title}>Cadastre-seeee</Text>

      <Text style={styles.label}>Nome</Text>
      <Controller
        control={control}
        name='nome_usuario'
        render={({ field: { onChange, value, onBlur, ...field } }) => (
          <TextInput
            style={styles.input}
            placeholder="Digite seu nome..."
            value={value}
            onChangeText={onChange}
            onBlur={onBlur}
          />
        )}
      />
      {errors.nome_usuario && (
        <Text className="text-xs mb-4 text-red-500">{errors.nome_usuario?.message}</Text>
      )}

      <Text style={styles.label}>E-mail</Text>
      <Controller
        control={control}
        name='email'
        render={({ field: { onChange, value, onBlur, ...field } }) => (
          <TextInput
            style={styles.input}
            placeholder="Digite seu e-mail..."
            value={value}
            onChangeText={onChange}
            onBlur={onBlur}
          />
        )}
      />
      {errors.email && (
        <Text className="text-xs mb-4 text-red-500">{errors.email?.message}</Text>
      )}

      <Text style={styles.label}>Número de telefone</Text>
      <Controller
        control={control}
        name='telefone'
        render={
          ({ field: { onChange, onBlur, value, ...field } }) => (
            <TextInput
              style={styles.input}
              placeholder="Digite seu número de telefone..."
              value={value}
              onChangeText={(value: string) => {
                const phone = maskInputPhone(value)
                onChange(phone)
              }}
              onBlur={onBlur}
            />
          )
        }
      />
      {errors.telefone && (
        <Text className="text-xs mb-4 text-red-500">{errors.telefone?.message}</Text>
      )}

      <Text style={styles.label}>Senha</Text>
      <View className='flex flex-row items-center border border-gray-300 rounded-lg px-3 mb-5'>
        <Controller
          control={control}
          name='senha'
          render={({ field: { onChange, value, onBlur, ...field } }) => (
            <TextInput
              className='flex-1 h-[50px]'
              placeholder="Digite sua senha..."
              value={value}
              onChangeText={onChange}
              onBlur={onBlur}
              secureTextEntry={!showPassword}
            />
          )}
        />
        <ShowHiddenPassword
          setShowPassword={setShowPassword}
          showPassword={showPassword}
          />
      </View>
      {errors.senha && (
        <Text className="text-xs mb-4 text-red-500">{errors.senha?.message}</Text>
      )}

      <TouchableOpacity style={styles.button} onPress={handleSubmit(onSubmit)}>
        <Text style={styles.buttonText}>Cadastrar</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 20,
    paddingTop: 40,
  },
  backButton: {
    position: 'absolute',
    top: 40,
    left: 20,
    zIndex: 10,
  },
  image: {
    width: '100%',
    height: 150,
    marginTop: 20,
    marginBottom: 10,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#4EC063',
    textAlign: 'center',
    marginBottom: 30,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 5,
    color: '#333',
  },
  input: {
    borderWidth: 1,
    borderColor: '#D3D3D3',
    borderRadius: 8,
    padding: 12,
    marginBottom: 15,
  },
  button: {
    backgroundColor: '#4EC063',
    paddingVertical: 15,
    borderRadius: 30,
    alignItems: 'center',
    marginTop: 20,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
});
