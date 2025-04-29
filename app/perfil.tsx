import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { useRouter } from 'expo-router'; // Importando o useRouter do expo-router
import Icon from 'react-native-vector-icons/Feather'; // Usando Feather para os ícones

export default function Perfil() {
  const router = useRouter();

  // Função para navegar para a tela anterior
  const handleGoBack = () => {
    router.back(); // Volta para a tela anterior
  };

  // Função para navegação clicando nas opções
  const handleOptionPress = (option: string) => {
    // Por enquanto não faz nada, mas você pode adicionar as ações mais tarde
    console.log(`Opção clicada: ${option}`);
  };

  return (
    <View style={styles.container}>
      {/* Cabeçalho com a imagem de perfil */}
      <View style={styles.header}>
        <TouchableOpacity onPress={handleGoBack} style={styles.backButton}>
          <Icon name="arrow-left" size={24} color="white" />
        </TouchableOpacity>
        <Image
          source={require('../assets/images/perfil-roxo-homem.png')} // Caminho correto da imagem de perfil
          style={styles.profileImage}
        />
        <Text style={styles.changePhoto}>Mudar Foto</Text>
      </View>

      {/* Opções clicáveis */}
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
      </View>

      {/* Barra Inferior */}
      <View style={styles.navBar}>
        <TouchableOpacity
          style={styles.navIcon}
          onPress={() => router.push('/')} // Página inicial (home)
        >
          <Icon name="home" size={30} color="#2F2F2F" />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.navIcon}
          onPress={() => router.push('/Usuario/mapa')} // Mapa
        >
          <Icon name="map" size={30} color="#2F2F2F" />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.navIcon}
          onPress={() => router.push('/Usuario/tutoriais')} // Tutoriais
        >
          <Icon name="info" size={30} color="#2F2F2F" />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.navIcon}
          onPress={() => router.push('/perfil')} // Perfil
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
    backgroundColor: '#3629B7', // Cabeçalho roxo
    alignItems: 'center',
    paddingVertical: 20,
  },
  backButton: {
    position: 'absolute',
    left: 20,
    top: 20,
    padding: 10,
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
    backgroundColor: 'white', // Barra inferior com fundo branco
    borderTopWidth: 1,
    borderTopColor: '#E0E0E0',
  },
  navIcon: {
    padding: 10,
  },
});
