import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image, ImageBackground } from 'react-native';
import { useRouter } from 'expo-router'; 
import Icon from 'react-native-vector-icons/Feather'; 

export default function TelaMapa() {
  const router = useRouter();

  
  const handleNavigate = () => {
    router.push('/Usuario/mapa-02'); 
  };

  return (
    <View style={styles.container}>
      {/* Cabeçalho com a logo */}
      <View style={styles.header}>
        <Image source={require('../../assets/images/logo.png')} style={styles.logo} />
      </View>

      {/* Mapa com área clicável (parte verde) */}
      <ImageBackground
        source={require('../../assets/images/mapa-01.png')} 
        style={styles.map}
        resizeMode="cover"
      >
        {/* Área clicável sobre a parte verde */}
        <TouchableOpacity
          style={styles.greenArea} // preciso mudar isso, ta meio bugado
          onPress={handleNavigate} 
        />
      </ImageBackground>

      {/* Barra Inferior */}
      <View style={styles.navBar}>
        <TouchableOpacity
          style={styles.navIcon}
          onPress={() => router.push('/Usuario/pagina-inicial')} // Página inicial (home)
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
    width: '100%',
    height: 70,
    backgroundColor: '#3629B7', // Cabeçalho roxo
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    width: 100,
    height: 40,
    resizeMode: 'contain',
  },
  map: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  greenArea: {
    position: 'absolute',
    left: 50,  // Ajuste o valor conforme a área verde do mapa
    top: 120,  // Ajuste o valor conforme a área verde do mapa
    width: 100, // Ajuste o tamanho da área
    height: 100, // Ajuste o tamanho da área
    backgroundColor: 'transparent', // Torna a área invisível, mas clicável
  },
  infoText: {
    fontSize: 16,
    color: '#2F2F2F',
    textAlign: 'center',
    marginTop: 20,
    paddingHorizontal: 20,
  },
  navBar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingBottom: 10,  // Ajuste do padding para a barra inferior
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
