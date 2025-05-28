import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image, ScrollView } from 'react-native';
import { ScrollView as SV } from 'react-native-gesture-handler';
import { Checkbox } from 'expo-checkbox'
import { useRouter } from 'expo-router';
import Icon from 'react-native-vector-icons/Feather';
import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { ShowHiddenPassword } from '~/components/ui/show-hidden-password';
import { maskInputCnpj, maskInputPhone } from '~/lib/masks-input';
import { removeMask } from '~/lib/parse';
import { useMutation } from '@tanstack/react-query';
import Toast from 'react-native-toast-message';
import { BAIRROS } from '~/lib/constants';
import { registerUserService, RegisterCooperativaFormData, registerCooperativaFormSchema } from '~/services/register/register-user-service';

export default function CadastroCooperativa() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState<boolean>(false)
  const { control, handleSubmit, formState: { errors } } = useForm({
    resolver: zodResolver(registerCooperativaFormSchema),
    defaultValues: {
      nome_usuario: '',
      telefone: '',
      email: '',
      senha: '',
      cnpj: '',
      nome_cooperativa: '',
      confirmar_senha: '',
      area_atuacao: [],
      role: 'cooperativa'
    }
  })

  const { mutateAsync: registerCooperativaMutation } = useMutation({
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


  const onSubmit = async (data: RegisterCooperativaFormData) => {
    const { cnpj, telefone, confirmar_senha, ...userData } = data

    const formattedData = {
      telefone: removeMask(telefone),
      cnpj: removeMask(cnpj),
      ...userData
    }

    await registerCooperativaMutation(formattedData)
  }

  const isSelected = (areas_atuacao: string[], bairro: string) => {
    return areas_atuacao?.includes(bairro);
  };

  const toggleSelection = (areas_atuacao: string[], bairro: string) => {
    if (isSelected(areas_atuacao, bairro)) {
      return areas_atuacao?.filter(i => i !== bairro);
    } else {
      return [...areas_atuacao, bairro];
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
        <Icon name="arrow-left" size={28} color="#4EC063" />
      </TouchableOpacity>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        <Image
          source={require('../../assets/images/logo.png')}
          style={styles.image}
          resizeMode="contain"
        />

        <Text style={styles.title}>Cadastre-se</Text>

        <Text style={styles.label}>CNPJ</Text>
        <Controller
          control={control}
          name='cnpj'
          render={({ field: { onChange, value, onBlur, ...field } }) => (
            <TextInput
              style={styles.input}
              placeholder="Digite seu número de telefone..."
              value={value}
              onChangeText={(value: string) => {
                const cnpj = maskInputCnpj(value)
                onChange(cnpj)
              }}
              onBlur={onBlur}
            />
          )}
        />
        {errors.cnpj && (
          <Text className="text-xs mb-4 text-red-500">{errors.cnpj?.message}</Text>
        )}

        <Text style={styles.label}>Nome do responsável</Text>
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

        <Text style={styles.label}>Nome da Cooperativa</Text>
        <Controller
          control={control}
          name='nome_cooperativa'
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

        <Text style={styles.label}>
          Áreas de atuação
        </Text>
        <Controller
          name='area_atuacao'
          control={control}
          rules={{
            required: 'Selecione pelo menos um bairro',
            validate: value => value.length > 0 || 'Selecione pelo menos um bairro'
          }}
          render={({ field: { onChange, value } }) => (
            <View style={styles.checkboxGroupContainer}>
              <Text style={styles.label}>Bairros de atuação:</Text>
              <SV className='max-h-48 flex-1'>
                {BAIRROS.map((bairro) => (
                <TouchableOpacity
                  key={bairro}
                  style={styles.checkboxContainer}
                  onPress={() => onChange(toggleSelection(value, bairro))}
                  activeOpacity={0.7}
                >
                  <Checkbox
                    value={isSelected(value, bairro)}
                    onValueChange={() => onChange(toggleSelection(value, bairro))}
                    color={isSelected(value, bairro) ? '#4EC063' : undefined}
                    style={styles.checkbox}
                  />
                  <Text style={styles.checkboxLabel}>{bairro}</Text>
                </TouchableOpacity>
              ))}
              </SV>
            </View>
          )}
        />
        {errors.area_atuacao && (
          <Text className="text-xs mb-4 text-red-500">{errors.area_atuacao?.message}</Text>
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

        <Text style={styles.label}>Confirme sua senha</Text>
        <View className='flex flex-row items-center border border-gray-300 rounded-lg px-3 mb-5'>
          <Controller
            control={control}
            name='confirmar_senha'
            render={({ field: { onChange, value, onBlur, ...field } }) => (
              <TextInput
                className='flex-1 h-[50px]'
                placeholder="Confirme sua senha..."
                value={value}
                onChangeText={onChange}
                onBlur={onBlur}
                secureTextEntry
              />
            )}
          />
        </View>
        {errors.confirmar_senha && (
          <Text className="text-xs mb-4 text-red-500">{errors.confirmar_senha?.message}</Text>
        )}

        <TouchableOpacity style={styles.button} onPress={handleSubmit(onSubmit)}>
          <Text style={styles.buttonText}>Cadastrar</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  backButton: {
    position: 'absolute',
    top: 40,
    left: 20,
    zIndex: 10,
  },
  scrollContent: {
    paddingTop: 100,
    paddingHorizontal: 20,
    paddingBottom: 40,
  },
  image: {
    width: '100%',
    height: 150,
    marginBottom: 10,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#4EC063',
    textAlign: 'center',
    marginBottom: 30,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#4EC063',
    marginTop: 20,
    marginBottom: 10,
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
  checkbox: {
    margin: 8,
    borderRadius: 4,
    width: 20,
    height: 20,
  },
  checkboxLabel: {
    fontSize: 16,
    color: '#333',
    flex: 1,
    marginLeft: 8,
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  checkboxGroupContainer: {
    marginBottom: 20,
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
  pickerContainer: {
    borderWidth: 1,
    borderColor: '#D3D3D3',
    borderRadius: 8,
    marginBottom: 15,
  },
  picker: {
    height: 50,
    width: '100%',
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
