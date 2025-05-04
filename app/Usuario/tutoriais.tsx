import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image, ScrollView } from 'react-native';
import { useRouter } from 'expo-router'; 
import Icon from 'react-native-vector-icons/Feather'; 

export default function Tutoriais() {
  const router = useRouter();

  const handleTutorialClick = (tutorial: string) => {
    console.log(`Tutorial escolhido: ${tutorial}`);
    router.push('/Usuario/ver-tutorial'); 
  };

  
  const handleNext = () => {
    router.push('/perfil'); 
  };

  return (
    <View style={styles.container}>
  
      <Image
        source={require('../../assets/images/jogando-lixo.png')} 
        style={styles.image}
      />

      {/* Título */}
      <Text style={styles.title}>Vamos Aprender!</Text>
      <Text style={styles.subtitle}>Clique em qual tutorial você quer ver!</Text>

      {/* ScrollView para permitir rolar até o final */}
      <ScrollView contentContainerStyle={styles.scrollView}>
        {/* Cards de opções de tutorial */}
        <TouchableOpacity
          style={styles.card}
          onPress={() => handleTutorialClick('Como separar o lixo')}
        >
          <Text style={styles.cardTitle}>Como separar o lixo</Text>
          <Text style={styles.cardDescription}>Aprenda a facilitar sua coleta!</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.card}
          onPress={() => handleTutorialClick('Como separar lixo orgânico')}
        >
          <Text style={styles.cardTitle}>Como separar lixo orgânico</Text>
          <Text style={styles.cardDescription}>É mais fácil do que parece!</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.card}
          onPress={() => handleTutorialClick('Como lidar com vidro')}
        >
          <Text style={styles.cardTitle}>Como lidar com vidro</Text>
          <Text style={styles.cardDescription}>Cuidado para não machucar quem recolhe!</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.card}
          onPress={() => handleTutorialClick('O que é material reciclável')}
        >
          <Text style={styles.cardTitle}>O que é material reciclável</Text>
          <Text style={styles.cardDescription}>Descubra tudo!</Text>
        </TouchableOpacity>
      </ScrollView>

      {/* Botão "Próximo" */}
      <TouchableOpacity style={styles.button} onPress={handleNext}>
        <Text style={styles.buttonText}>Próximo</Text>
      </TouchableOpacity>

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
  image: {
    width: 200,
    height: 200,
    alignSelf: 'center',
    marginTop: 30,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#3629B7',
    textAlign: 'center',
    marginTop: 30,
  },
  subtitle: {
    fontSize: 18,
    color: '#888888',
    textAlign: 'center',
    marginBottom: 20,
  },
  scrollView: {
    flexGrow: 1,
    justifyContent: 'center',
    paddingBottom: 80, // Para garantir que o botão "Próximo" esteja visível
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
  cardDescription: {
    marginTop: 5,
    color: '#888888',
  },
  button: {
    backgroundColor: '#3629B7',
    paddingVertical: 15,
    borderRadius: 5,
    marginTop: 30,
    alignItems: 'center',
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
    position: 'absolute', // Fixa a barra na parte inferior
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
