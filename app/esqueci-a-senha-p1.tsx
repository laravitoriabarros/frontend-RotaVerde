'use client';
import { useRouter } from 'expo-router';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import { AntDesign, Feather } from '@expo/vector-icons';

export default function EsqueciSenhaP1() {
  const router = useRouter();

  return (
    <View style={{ flex: 1, backgroundColor: '#ffffff', padding: 20 }}>
      
      {/* Botão de voltar */}
      <TouchableOpacity onPress={() => router.back()}>
        <AntDesign name="arrowleft" size={24} color="green" />
      </TouchableOpacity>

      {/* Imagem */}
      <Image 
        source={require('../assets/images/esqueci-senha.png')} 
        style={{ width: 250, height: 250, alignSelf: 'center', marginVertical: 20 }}
        resizeMode="contain"
      />

      {/* Título */}
      <Text style={{ fontSize: 20, fontWeight: 'bold', color: '#5145CD', textAlign: 'center', marginBottom: 20 }}>
        Esqueceu sua senha?
      </Text>

      {/* Subtítulo */}
      <Text style={{ fontSize: 16, color: '#000', textAlign: 'center', marginBottom: 20 }}>
        Primeiro, precisamos verificar sua identidade! 
        Selecione o modo para receber seu código de confirmação.
      </Text>

      {/* Botão via SMS */}
      <TouchableOpacity 
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          borderWidth: 1,
          borderColor: 'black',
          borderRadius: 12,
          padding: 15,
          marginBottom: 20,
        }}
        onPress={() => router.push('/esqueci-a-senha-p2')}
      >
        <Feather name="message-square" size={24} color="black" />
        <View style={{ marginLeft: 10 }}>
          <Text style={{ color: 'black', fontSize: 14 }}>via SMS</Text>
          <Text style={{ color: 'black', fontWeight: 'bold' }}>+55 82 999****34</Text>
        </View>
      </TouchableOpacity>

      {/* Botão via Email */}
      <TouchableOpacity 
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          borderWidth: 1,
          borderColor: 'black',
          borderRadius: 12,
          padding: 15,
        }}
        onPress={() => router.push('/esqueci-a-senha-p2')}
      >
        <Feather name="mail" size={24} color="black" />
        <View style={{ marginLeft: 10 }}>
          <Text style={{ color: 'black', fontSize: 14 }}>via Email</Text>
          <Text style={{ color: 'black', fontWeight: 'bold' }}>joao*****@gmail.com</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
}
