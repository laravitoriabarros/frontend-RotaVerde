import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image, TextInput, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import Icon from 'react-native-vector-icons/Feather';

export default function UsuarioMotorista() {
  const router = useRouter();
  const [endereco, setEndereco] = useState('');

  const goToPerfil = () => {
    router.push('/perfil');
  };

  const goToHome = () => {
    router.push('/Motorista/pagina-inicial');
  };

  const verRotas = () => {
    router.push('/Usuario/rotas-diarias');
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* Cabeçalho roxo */}
      <View style={styles.header}>
        <Image source={require('../../assets/images/logo.png')} style={styles.logo} />
      </View>

      {/* Título e texto explicativo */}
      <View style={styles.welcomeSection}>
        <Text style={styles.welcomeTitle}>Bem-Vindo!</Text>
        <Text style={styles.welcomeText}>Vamos encontrar as rotas mais próximas de você.</Text>
      </View>

      {/* Campo de pesquisa */}
      <TextInput
        style={styles.searchInput}
        placeholder="Digite o endereço"
        value={endereco}
        onChangeText={setEndereco}
      />

      {/* Imagem do mapa */}
      <Image source={require('../../assets/images/mapa-01.png')} style={styles.mapImage} />

      {/* Botão "Ver rotas cadastradas" */}
      <TouchableOpacity style={styles.button} onPress={verRotas}>
        <Text style={styles.buttonText}>Ver rotas cadastradas</Text>
      </TouchableOpacity>

      {/* Barra inferior */}
      <View style={styles.navBar}>
        <TouchableOpacity style={styles.navIcon} onPress={goToHome}>
          <Icon name="home" size={30} color="#2F2F2F" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.navIcon} onPress={goToPerfil}>
          <Icon name="user" size={30} color="#2F2F2F" />
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: 'white',
    paddingBottom: 60, // Garantir espaço para a barra inferior
  },
  header: {
    backgroundColor: '#3629B7',
    paddingTop: 20,
    paddingBottom: 20,
    alignItems: 'center',
  },
  logo: {
    width: 120,
    height: 40,
    resizeMode: 'contain',
  },
  welcomeSection: {
    marginTop: 20,
    alignItems: 'center',
  },
  welcomeTitle: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#2F2F2F',
  },
  welcomeText: {
    fontSize: 18,
    color: '#888888',
    marginTop: 5,
  },
  searchInput: {
    marginTop: 20,
    height: 50,
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 5,
    paddingHorizontal: 15,
    fontSize: 16,
  },
  mapImage: {
    width: '100%',
    height: 500, // Ajustado para ocupar maior altura da tela
    resizeMode: 'contain',
    marginTop: 20,
  },
  button: {
    backgroundColor: '#3629B7',
    paddingVertical: 15,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 20,
    marginHorizontal: 20,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 18,
  },
  navBar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingBottom: 10,
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
