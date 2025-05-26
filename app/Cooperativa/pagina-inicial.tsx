import { useRouter } from 'expo-router';
import React from 'react';
import { Image, StyleSheet, TouchableOpacity, View } from 'react-native';
import MapView from 'react-native-maps';
import Icon from 'react-native-vector-icons/Feather';

export default function TelaCooperativa() {
  const router = useRouter();

  const goToPaginaInicial = () => {
    router.push('/Cooperativa/pagina-inicial');
  };

  const goToGerenciarCaminhao = () => {
    router.push('/Cooperativa/gerenciar-caminhao');
  };

  const goToGerenciarRotas = () => {
    router.push('/Cooperativa/gerenciar-rotas');
  };

  const goToPerfil = () => {
    router.push('/Cooperativa/perfil-cooperativa');
  };

  return (
    <View style={styles.container}>
      {/* Cabeçalho com a logo */}
      <View style={styles.header}>
        <Image source={require('../../assets/images/logo.png')} style={styles.logo} />
      </View>

      {/* Mapa real */}
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: -9.6498487,
          longitude: -35.7089492,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
        provider="google"
      />

      {/* Barra inferior */}
      <View style={styles.navBar}>
        <TouchableOpacity style={styles.navIcon} onPress={goToPaginaInicial}>
          <Icon name="map" size={30} color="#2F2F2F" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.navIcon} onPress={goToGerenciarCaminhao}>
          <Icon name="truck" size={30} color="#2F2F2F" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.navIcon} onPress={goToGerenciarRotas}>
          <Icon name="info" size={30} color="#2F2F2F" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.navIcon} onPress={goToPerfil}>
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
  map: {
    flex: 1,
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
