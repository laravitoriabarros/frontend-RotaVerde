import { Map } from 'lucide-react-native';
import { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, TextInput } from 'react-native';
import { RegisterAdFirstStep, RegisterAdSecondStep, RegisterAdThirdStep } from '../../../../components/cooperativa/anuncio/ads-register-layouts';
import { MaterialSelectionForm } from '../../../../components/cooperativa/anuncio/ads-material-form';
import { MultiStepperForm, Step } from '~/components/ui/multi-stepper-form';
import { Picker } from '@react-native-picker/picker';
import { useRouter } from 'expo-router';
import { CooperativaMenuBar } from '../../../../components/cooperativa/cooperativa-menu-bar';

export default function CadastroAnuncio() {
    const router = useRouter()

    const formSteps: Step[] = [
        {
         container: RegisterAdFirstStep,
         children: (
         <>
            <Text className='font-semibold text-sm mb-1.5 text-zinc-800'>Título</Text>
            <TextInput
                className='border border-gray-300 rounded-lg p-4 mb-4' placeholder="Crie um título bem chamativo!"
             />
            <Text className='font-semibold text-sm mb-1.5 text-zinc-800'>Descrição</Text>
            <View className='min-w-96 max-w-96'>
            <TextInput
                multiline={true}
                numberOfLines={10}
                className='border border-gray-300 rounded-lg p-4 mb-4 h-32 align-top' placeholder="Digite seu método de autenticação"
             />
            </View>
            <Text className='font-semibold text-sm mb-1.5 text-zinc-800'>Adicione a localização</Text>
            <View className='flex flex-row items-center border border-gray-300 rounded-lg px-3 mb-5 gap-10'>
            <TextInput
                className='h-[50px]' placeholder="Clique no ícone para acessar o mapa"
             />
             <TouchableOpacity>
                <Map size={24} color="#999" />
             </TouchableOpacity>
            </View>
          </>
          )
        },
        {
            container: RegisterAdSecondStep,
            children: MaterialSelectionForm(),
        },
        {
            container: RegisterAdThirdStep,
            children: (
         <>
            <Text className='font-semibold text-sm mb-1.5 text-zinc-800'>Adicione o peso</Text>
            <TextInput
                className='border border-gray-300 rounded-lg p-4 mb-4' placeholder="Digite um peso estimado para a coleta"
             />

          <Text className='font-semibold text-sm mb-1.5 text-zinc-800'>Adicione a forma de pagamento</Text>
          <View
            className='border rounded-lg border-[#D3D3D3] mb-4'
            >
            <Picker>
              <Picker.Item label="Clique aqui" value="" />
              <Picker.Item label="Pix" value="pix" />
              <Picker.Item label="Dinheiro" value="money" />
            <Picker.Item label="Cartão" value="card" />
           </Picker>
          </View>

            <Text className='font-semibold text-sm mb-1.5 text-zinc-800'>Deixe o seu contato abaixo</Text>
            <TextInput
                className='border border-gray-300 rounded-lg p-4 mb-4' placeholder="Digite preferencialmente, seu Whatsapp"
             />

            <Text className='font-semibold text-sm mb-1.5 text-zinc-800'>Adicione uma estimativa para o valor</Text>
            <View className='flex flex-row items-center border border-gray-300 rounded-lg px-3 mb-5 gap-10'>
            <TextInput
                className='h-[50px]' placeholder="Digite a estimativa do valor"
             />
            </View>
          </>
          )
        }
    ]

    return (
        <View className='flex flex-1 items-center p-5 bg-white'>
            <MultiStepperForm
                totalSteps={3}
                steps={formSteps}
                handleSubmitForm={() => {
                    router.push('/(private)/(cooperativa)/anuncio/cadastro/sucesso/sucesso')
                }}
             />
             <CooperativaMenuBar />
        </View>
    );
};
