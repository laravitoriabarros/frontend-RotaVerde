import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { useRouter } from 'expo-router';
import Icon from 'react-native-vector-icons/Feather';
import { useAuth } from '~/providers/auth-context';

export default function Perfil() {
  const router = useRouter();
  const { signOut } = useAuth()

  const handleOptionPress = (option: string) => {
    if (option === 'Sair da conta') {
      signOut()
      router.replace('/signin');
    } else {
      console.log(`Opção clicada: ${option}`);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image
          source={require('../../../assets/images/perfil-roxo-mulher.png')}
          style={styles.profileImage}
        />
        <Text style={styles.changePhoto}>Mudar Foto</Text>
      </View>

      <View style={styles.options}>
        <TouchableOpacity onPress={() => handleOptionPress('Mudar Senha')}>
          <Text style={styles.optionText}>Mudar Senha</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => handleOptionPress('Mudar Informações Pessoais')}>
          <Text style={styles.optionText}>Mudar Informações Pessoais</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => handleOptionPress('Mudar forma de entrar')}>
          <Text style={styles.optionText}>Mudar forma de entrar</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => handleOptionPress('Adicionar Autenticação 2 Fatores')}>
          <Text style={styles.optionText}>Adicionar Autenticação 2 Fatores</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => handleOptionPress('Termos de Uso e Privacidade')}>
          <Text style={styles.optionText}>Termos de Uso e Privacidade</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => handleOptionPress('Excluir Conta')}>
          <Text style={styles.optionText}>Excluir Conta</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => handleOptionPress('Sair da conta')}>
          <Text style={[styles.optionText, { color: '#B00020' }]}>Sair da conta</Text>
        </TouchableOpacity>
      </View>

      {/* Barra inferior */}
      <View style={styles.navBar}>
        <TouchableOpacity
          style={styles.navIcon}
          onPress={() => router.push('/home')}
        >
          <Icon name="home" size={30} color="#2F2F2F" />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.navIcon}
          onPress={() => router.push('/profile')}
        >
          <Icon name="user" size={30} color="#2F2F2F" />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  header: {
    backgroundColor: '#3629B7',
    alignItems: 'center',
    paddingVertical: 20,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 10,
  },
  changePhoto: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
  options: {
    marginTop: 20,
    paddingHorizontal: 20,
  },
  optionText: {
    fontSize: 18,
    color: '#2F2F2F',
    marginBottom: 15,
  },
  navBar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingBottom: 20,
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'white',
    borderTopWidth: 1,
    borderTopColor: '#E0E0E0',
  },
  navIcon: {
    padding: 10,
  },
});
