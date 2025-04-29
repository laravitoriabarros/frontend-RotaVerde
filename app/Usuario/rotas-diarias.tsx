import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { useRouter } from 'expo-router'; 
import Icon from 'react-native-vector-icons/Feather'; 

export default function RotasDiarias() {
  const router = useRouter();

  
  const handleGoBack = () => {
    router.back(); 
  };

  
  const handleAcompanhar = (cooperativa: string) => {
    console.log(`Acompanhando a rota da cooperativa: ${cooperativa}`);
  };

  return (
    <View style={styles.container}>
      {/* Cabeçalho com a seta e a imagem */}
      <View style={styles.header}>
        <TouchableOpacity onPress={handleGoBack} style={styles.backButton}>
          <Icon name="arrow-left" size={24} color="white" />
        </TouchableOpacity>
        <Image source={require('../../assets/images/rota.png')} style={styles.image} />
      </View>

      {/* Título */}
      <Text style={styles.title}>Rotas de Hoje</Text>

      {/* Cards de rotas */}
      <View style={styles.cardsContainer}>
        <TouchableOpacity style={styles.card} onPress={() => handleAcompanhar('Cooperativa Lua Nova')}>
          <Text style={styles.cardTitle}>Cooperativa Lua Nova</Text>
          <Text style={styles.cardTime}>25 minutos</Text>
          <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText}>Acompanhar</Text>
          </TouchableOpacity>
        </TouchableOpacity>

        <TouchableOpacity style={styles.card} onPress={() => handleAcompanhar('Cooperativa Reciclagem')}>
          <Text style={styles.cardTitle}>Cooperativa Reciclagem</Text>
          <Text style={styles.cardTime}>2 horas</Text>
          <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText}>Acompanhar</Text>
          </TouchableOpacity>
        </TouchableOpacity>

        <TouchableOpacity style={styles.card} onPress={() => handleAcompanhar('Cooperativa Sol do Norte')}>
          <Text style={styles.cardTitle}>Cooperativa Sol do Norte</Text>
          <Text style={styles.cardTime}>6 horas</Text>
          <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText}>Acompanhar</Text>
          </TouchableOpacity>
        </TouchableOpacity>
      </View>

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
    alignItems: 'center',
    paddingTop: 20,
    paddingBottom: 20,
  },
  backButton: {
    position: 'absolute',
    left: 20,
    top: 20,
    padding: 10,
  },
  image: {
    width: 120,
    height: 120,
    resizeMode: 'contain',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#3629B7',
    textAlign: 'center',
    marginTop: 30,
  },
  cardsContainer: {
    paddingHorizontal: 20,
    marginTop: 20,
  },
  card: {
    backgroundColor: '#F5F5F5',
    padding: 20,
    borderRadius: 10,
    marginVertical: 10,
    elevation: 2,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2F2F2F',
  },
  cardTime: {
    fontSize: 16,
    color: '#888888',
    marginTop: 5,
  },
  button: {
    backgroundColor: '#3629B7',
    paddingVertical: 12,
    borderRadius: 5,
    marginTop: 15,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
  navBar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingBottom: 10,
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
