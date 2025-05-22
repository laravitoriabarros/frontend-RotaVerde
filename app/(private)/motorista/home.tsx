import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  TextInput,
  ScrollView,
} from 'react-native';
import { useRouter } from 'expo-router';
import Icon from 'react-native-vector-icons/Feather';

export default function UsuarioMotorista() {
  const router = useRouter();
  const [endereco, setEndereco] = useState('');

  const goToPerfil = () => {
    router.push('/perfil');
  };

  const goToHome = () => {
    router.push('/(private)/motorista/home');
  };

  const verRotas = () => {
    router.push('/Motorista/rotas-diarias');
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Image source={require('../../../assets/images/caminhao.png')} style={styles.headerImage} />

      <View style={styles.welcomeSection}>
        <Text style={styles.welcomeTitle}>Bem-Vindo!</Text>
        <Text style={styles.welcomeText}>Vamos encontrar as rotas mais próximas de você.</Text>
      </View>

      <View style={styles.searchContainer}>
        <Icon name="map-pin" size={20} color="#888" style={styles.searchIcon} />
        <TextInput
          style={styles.searchInput}
          placeholder="Digite o endereço"
          value={endereco}
          onChangeText={setEndereco}
        />
      </View>

      <Image source={require('../../../assets/images/mapa-rota.png')} style={styles.mapImage} />

      <TouchableOpacity style={styles.button} onPress={verRotas}>
        <Text style={styles.buttonText}>Ver rotas cadastradas</Text>
      </TouchableOpacity>

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
    paddingBottom: 60,
  },
  headerImage: {
    width: '100%',
    height: 150,
    resizeMode: 'cover',
  },
  welcomeSection: {
    marginTop: 20,
    paddingHorizontal: 20,
    alignItems: 'center',
  },
  welcomeTitle: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#4EC063',
  },
  welcomeText: {
    fontSize: 18,
    color: '#888888',
    marginTop: 5,
    textAlign: 'center',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F6F6F6',
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 25,
    marginTop: 20,
    marginHorizontal: 20,
    paddingHorizontal: 15,
    height: 50,
  },
  searchIcon: {
    marginRight: 10,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
  },
  mapImage: {
    width: '100%',
    height: 500,
    resizeMode: 'cover',
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
