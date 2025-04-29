import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { useRouter } from 'expo-router'; // Importando o useRouter do expo-router
import Icon from 'react-native-vector-icons/Feather'; // Usando Feather para os ícones

export default function FinalCadImovel() {
  const router = useRouter();

  // Função para navegar para a tela "lista-imovel"
  const handleVerLista = () => {
    router.push('/Usuario/lista-imovel'); // Navega para a tela lista-imovel
  };

  // Função para navegar para a tela "cadastrar-imovel"
  const handleCriarOutros = () => {
    router.push('/Usuario/cadastrar-imovel'); // Navega para a tela cadastrar-imovel
  };

  // Função para navegar para a página inicial
  const handleHome = () => {
    router.push('/Usuario/pagina-inicial'); // Navega para a página inicial
  };

  return (
    <View style={styles.container}>
      {/* Imagem e Título */}
      <View style={styles.content}>
        <Image source={require('../../assets/images/tudo-certo.png')} style={styles.image} />
        <Text style={styles.title}>Tudo certo!</Text>
        <Text style={styles.subtitle}>
          Seu imóvel já foi adicionado na sua lista e está pronto para ser acompanhado!
        </Text>
      </View>

      {/* Botões de Ação */}
      <View style={styles.actions}>
        <TouchableOpacity style={styles.buttonGreen} onPress={handleCriarOutros}>
          <Text style={styles.buttonText}>Criar Outros</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.buttonPurple} onPress={handleVerLista}>
          <Text style={styles.buttonText}>Ver Lista</Text>
        </TouchableOpacity>
      </View>

      {/* Barra Inferior */}
      <View style={styles.navBar}>
        <TouchableOpacity
          style={styles.navIcon}
          onPress={handleHome} // Página inicial (home)
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
  content: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 60,
  },
  image: {
    width: 150,
    height: 150,
    resizeMode: 'contain',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#4EC063',
    marginTop: 20,
  },
  subtitle: {
    fontSize: 16,
    color: '#2F2F2F',
    textAlign: 'center',
    marginTop: 10,
    marginHorizontal: 20,
  },
  actions: {
    marginTop: 40,
    paddingHorizontal: 20,
  },
  buttonGreen: {
    backgroundColor: '#4EC063',
    paddingVertical: 15,
    borderRadius: 5,
    marginBottom: 15,
    alignItems: 'center',
  },
  buttonPurple: {
    backgroundColor: '#3629B7',
    paddingVertical: 15,
    borderRadius: 5,
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
