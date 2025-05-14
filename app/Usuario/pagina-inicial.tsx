import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router'; 
import Icon from 'react-native-vector-icons/Feather'; 

export default function PaginaInicial() {
  const router = useRouter();
  const [selectedCard, setSelectedCard] = useState<number | null>(null); 

  const handleNavigate = (page: string) => {
    router.push(page);
  };

  const handleCardPress = (index: number) => {
    setSelectedCard(index); 
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Olá, Cidadão!</Text>
      <Text style={styles.subtitle}>O que quer fazer hoje?</Text>
      <Text style={styles.instruction}>
        Clique no ícone de mapa do menu inferior para acessar o mapa!
      </Text>

      {/* Card 1 */}
      <TouchableOpacity
        style={[
          styles.card,
          selectedCard === 1 ? { backgroundColor: '#F0F0F0' } : {} 
        ]}
        onPress={() => handleCardPress(1)}
        onLongPress={() => handleNavigate('Usuario/lista-imovel')} 
      >
        <Text style={styles.cardTitle}>Acompanhamento Residencial</Text>
        <Text style={styles.cardDescription}>
          Fique de olho e saiba se seu lixo está sendo coletado corretamente!
        </Text>
        <View style={styles.cardButtons}>
          <TouchableOpacity
            style={styles.buttonSecondary}
            onPress={() => handleNavigate('Usuario/lista-imovel')} 
          >
            <Text style={styles.buttonText}>Ver Meus Imóveis</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.buttonPrimary}
            onPress={() => handleNavigate('Usuario/cadastrar-imovel')}  
          >
            <Text style={styles.buttonText}>Cadastrar</Text>
          </TouchableOpacity>
        </View>
      </TouchableOpacity>

      {/* Card 2 */}
      <TouchableOpacity
        style={[
          styles.card,
          selectedCard === 2 ? { backgroundColor: '#F0F0F0' } : {} 
        ]}
        onPress={() => handleCardPress(2)}
        onLongPress={() => handleNavigate('Usuario/rotas-diarias')}
      >
        <Text style={styles.cardTitle}>Rotas do Dia</Text>
        <Text style={styles.cardDescription}>
          Conheça todas as rotas diárias que as cooperativas planejam atender!
        </Text>
        <View style={styles.cardButtons}>
          <TouchableOpacity
            style={styles.buttonSecondary}
            onPress={() => handleNavigate('Usuario/confirmacao-coleta')}  
          >
            <Text style={styles.buttonText}>Confirmar Coleta</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.buttonPrimary}
            onPress={() => handleNavigate('Usuario/rotas-diarias')} 
          >
            <Text style={styles.buttonText}>Visualizar</Text>
          </TouchableOpacity>
        </View>
      </TouchableOpacity>

      
      <View style={styles.navBar}>
        {/* Ícone de Casa (Home) */}
        <TouchableOpacity
          style={styles.navIcon}
          onPress={() => handleNavigate('/Usuario/pagina-inicial')} // Home (Página inical)
        >
          <Icon name="home" size={30} color="#2F2F2F" />
        </TouchableOpacity>

        {/* Ícone de Mapa */}
        <TouchableOpacity
          style={styles.navIcon}
          onPress={() => handleNavigate('/Usuario/mapa')} // Mapa
        >
          <Icon name="map" size={30} color="#2F2F2F" />
        </TouchableOpacity>

        {/* Ícone de Informações */}
        <TouchableOpacity
          style={styles.navIcon}
          onPress={() => handleNavigate('Usuario/tutoriais')} // Tutoriais
        >
          <Icon name="info" size={30} color="#2F2F2F" />
        </TouchableOpacity>

        {/* Ícone de Perfil */}
        <TouchableOpacity
          style={styles.navIcon}
          onPress={() => handleNavigate('/perfil')} // Perfil
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
    padding: 20,
    backgroundColor: 'white',
  },
  title: {
    fontSize: 30, 
    fontWeight: 'bold',
    color: '#2F2F2F',
  },
  subtitle: {
    fontSize: 18,
    color: '#888888',
  },
  instruction: {
    marginTop: 10,
    color: '#888888',
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
  cardButtons: {
    marginTop: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  buttonPrimary: {
    backgroundColor: '#3629B7',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  buttonSecondary: {
    backgroundColor: '#4EC063',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  navBar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingBottom: 20,
    position: 'absolute', // Fixa a barra na parte inferior
    left: 0,
    right: 0,
    bottom: 0,
    borderTopWidth: 1,
    borderTopColor: '#E0E0E0',
  },
  navIcon: {
    padding: 10,
  },
});
