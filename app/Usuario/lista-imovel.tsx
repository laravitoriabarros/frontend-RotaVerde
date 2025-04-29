import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { useRouter } from 'expo-router'; 
import Icon from 'react-native-vector-icons/Feather'; 

export default function MeusImoveis() {
  const router = useRouter();


  const handleGoBack = () => {
    router.back(); 
  };

  
  const handleCadastrarNovo = () => {
    router.push('/Usuario/cadastrar-imovel'); 
  };

  return (
    <View style={styles.container}>
      {/* Cabeçalho com a imagem e seta */}
      <View style={styles.header}>
        <TouchableOpacity onPress={handleGoBack} style={styles.backButton}>
          <Icon name="arrow-left" size={24} color="white" />
        </TouchableOpacity>
        <Image source={require('../../assets/images/info-imovel.png')} style={styles.image} />
        <Text style={styles.title}>Meus Imóveis</Text>
        <Text style={styles.subtitle}>Aqui você acompanha a coleta dos seus imóveis!</Text>
      </View>

      {/* Cards de imóveis */}
      <View style={styles.cardsContainer}>
        <TouchableOpacity style={styles.card}>
          <View style={styles.cardContent}>
            <Icon name="home" size={30} color="#4EC063" />
            <View style={styles.cardText}>
              <Text style={styles.cardTitle}>Casa 01</Text>
              <Text style={styles.cardAddress}>Antares - Rua Sol</Text>
              <Text style={styles.cardStatus}>Lixo Reciclável Coleta 1234</Text>
            </View>
          </View>
        </TouchableOpacity>

        <TouchableOpacity style={styles.card}>
          <View style={styles.cardContent}>
            <Icon name="home" size={30} color="#4EC063" />
            <View style={styles.cardText}>
              <Text style={styles.cardTitle}>Víctor Oliveira</Text>
              <Text style={styles.cardAddress}>Farol - Rua Estrela</Text>
              <Text style={styles.cardStatus}>Não Reciclável Coleta 1234</Text>
            </View>
          </View>
        </TouchableOpacity>

        <TouchableOpacity style={styles.card}>
          <View style={styles.cardContent}>
            <Icon name="home" size={30} color="#4EC063" />
            <View style={styles.cardText}>
              <Text style={styles.cardTitle}>Loja 01</Text>
              <Text style={styles.cardAddress}>Benedito Bentes</Text>
              <Text style={styles.cardStatus}>Lixo Reciclável Coleta 1234</Text>
            </View>
          </View>
        </TouchableOpacity>

        <TouchableOpacity style={styles.card}>
          <View style={styles.cardContent}>
            <Icon name="home" size={30} color="#4EC063" />
            <View style={styles.cardText}>
              <Text style={styles.cardTitle}>Fábrica 01</Text>
              <Text style={styles.cardAddress}>Cruz das Almas</Text>
              <Text style={styles.cardStatus}>Lixo Reciclável Coleta 1234</Text>
            </View>
          </View>
        </TouchableOpacity>
      </View>

      {/* Botões de ação */}
      <View style={styles.actions}>
        <TouchableOpacity style={styles.deleteButton}>
          <Text style={styles.buttonText}>Excluir Imóvel</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.addButton} onPress={handleCadastrarNovo}>
          <Text style={styles.buttonText}>Cadastrar Novo</Text>
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
    width: '100%',
    paddingTop: 20,
    paddingBottom: 20,
    alignItems: 'center',
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
    fontSize: 24,
    fontWeight: 'bold',
    color: '#2F2F2F',
    marginTop: 10,
  },
  subtitle: {
    fontSize: 16,
    color: '#888888',
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
  cardContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  cardText: {
    marginLeft: 15,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2F2F2F',
  },
  cardAddress: {
    fontSize: 14,
    color: '#888888',
    marginTop: 5,
  },
  cardStatus: {
    fontSize: 14,
    color: '#4EC063',
    marginTop: 5,
  },
  actions: {
    marginTop: 20,
    paddingHorizontal: 20,
  },
  deleteButton: {
    backgroundColor: '#E0E0E0',
    paddingVertical: 12,
    borderRadius: 5,
    marginBottom: 10,
    alignItems: 'center',
  },
  addButton: {
    backgroundColor: '#3629B7',
    paddingVertical: 12,
    borderRadius: 5,
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
    backgroundColor: 'white', 
    borderTopWidth: 1,
    borderTopColor: '#E0E0E0',
  },
  navIcon: {
    padding: 10,
  },
});
