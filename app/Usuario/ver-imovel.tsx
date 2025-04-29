import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router'; // Importando o useRouter do expo-router
import Icon from 'react-native-vector-icons/Feather'; // Usando Feather para os ícones
import { Picker } from '@react-native-picker/picker'; // Importando o Picker corretamente

export default function VerImovel() {
  const router = useRouter();

  // Estado para armazenar a coleta de hoje
  const [coletaRealizada, setColetaRealizada] = useState('Sim');

  // Função para navegar para a página anterior
  const handleGoBack = () => {
    router.back(); // Volta para a tela anterior
  };

  // Função para navegar para a tela de editar imóvel
  const handleEditarImovel = () => {
    router.push('/Usuario/mapa'); // Navega para a tela "editar-imovel"
  };

  return (
    <View style={styles.container}>
      {/* Cabeçalho com a seta e o ícone da casa */}
      <View style={styles.header}>
        <TouchableOpacity onPress={handleGoBack} style={styles.backButton}>
          <Icon name="arrow-left" size={24} color="white" />
        </TouchableOpacity>
        <View style={styles.houseIcon}>
          <Icon name="home" size={50} color="#4EC063" />
        </View>
      </View>

      {/* Informações do Imóvel */}
      <Text style={styles.imovelName}>Casa 01</Text>
      <Text style={styles.imovelAddress}>Antares - Rua Sol</Text>

      <Text style={styles.infoText}>Lixo Reciclável: Sim</Text>
      <Text style={styles.infoText}>Coletas Feitas: 10</Text>
      <Text style={styles.infoText}>Coletas Incompletas: 2</Text>

      {/* Pergunta de sucesso da coleta */}
      <View style={styles.dropdownContainer}>
        <Text style={styles.label}>A coleta de hoje foi realizada com sucesso?</Text>
        <Picker
          selectedValue={coletaRealizada}
          onValueChange={setColetaRealizada}
          style={styles.picker}
        >
          <Picker.Item label="Sim" value="Sim" />
          <Picker.Item label="Não" value="Não" />
        </Picker>
      </View>

      {/* Botão para editar o imóvel */}
      <TouchableOpacity style={styles.button} onPress={handleEditarImovel}>
        <Text style={styles.buttonText}>Editar Imóvel</Text>
      </TouchableOpacity>

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
    width: '100%',
    backgroundColor: '#3629B7', // Cabeçalho roxo
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
  houseIcon: {
    marginTop: 10,
  },
  imovelName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#2F2F2F',
    textAlign: 'center',
    marginTop: 20,
  },
  imovelAddress: {
    fontSize: 16,
    color: '#888888',
    textAlign: 'center',
  },
  infoText: {
    fontSize: 16,
    color: '#2F2F2F',
    marginTop: 10,
    textAlign: 'center',
  },
  dropdownContainer: {
    marginTop: 20,
    paddingHorizontal: 20,
  },
  label: {
    fontSize: 16,
    color: '#2F2F2F',
    marginBottom: 5,
  },
  picker: {
    height: 40,
    borderColor: '#E0E0E0',
    borderWidth: 1,
    borderRadius: 5,
  },
  button: {
    backgroundColor: '#4EC063', // Botão verde
    paddingVertical: 15,
    borderRadius: 5,
    marginTop: 30,
    alignItems: 'center',
    width: '50%', // Tamanho do botão
    alignSelf: 'flex-start', // Alinhamento à esquerda
    marginLeft: 20, // Espaçamento da esquerda
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
