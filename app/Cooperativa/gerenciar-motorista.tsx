import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Modal,
  Alert,
  ScrollView,
  Image,
} from 'react-native';
import { useRouter } from 'expo-router';
import Icon from 'react-native-vector-icons/Feather';

export default function GerenciarMotoristas() {
  const router = useRouter();

  const motoristas = [
    { id: 1, nome: 'João Silva', email: 'joao@cooperativa.com', rotasCompletadas: 5 },
    { id: 2, nome: 'Maria Oliveira', email: 'maria@cooperativa.com', rotasCompletadas: 8 },
    { id: 3, nome: 'Carlos Santos', email: 'carlos@cooperativa.com', rotasCompletadas: 3 },
  ];

  const [isModalVisible, setIsModalVisible] = useState(false);

  const handleGoBack = () => {
    router.back();
  };

  const handleCadastrarMotorista = () => {
    setIsModalVisible(true);
  };

  const handleConfirmarCadastro = (confirmar: boolean) => {
    setIsModalVisible(false);
    if (confirmar) {
      router.push('/register-motorista');
    }
  };

  return (
    <View style={styles.container}>
      {/* Seta de voltar + imagem no topo */}
      <TouchableOpacity onPress={handleGoBack} style={styles.backButton}>
        <Icon name="arrow-left" size={28} color="#4EC063" />
      </TouchableOpacity>

      <Image
        source={require('../../assets/images/motorista.png')}
        style={styles.image}
      />

      <Text style={styles.title}>Gerenciamento de Motoristas</Text>
      <Text style={styles.subtitle}>Veja todos os seus motoristas associados!</Text>

      <ScrollView
        style={styles.tableContainer}
        contentContainerStyle={{ paddingBottom: 120 }}
      >
        <View style={styles.tableHeader}>
          <Text style={styles.tableHeaderText}>Nome</Text>
          <Text style={styles.tableHeaderText}>E-mail</Text>
          <Text style={styles.tableHeaderText}>Rotas</Text>
        </View>

        {motoristas.map((motorista) => (
          <View key={motorista.id} style={styles.tableRow}>
            <Text style={styles.tableCell}>{motorista.nome}</Text>
            <Text style={styles.tableCell}>{motorista.email}</Text>
            <Text style={styles.tableCell}>{motorista.rotasCompletadas}</Text>
          </View>
        ))}

        <TouchableOpacity style={styles.button} onPress={handleCadastrarMotorista}>
          <Text style={styles.buttonText}>Cadastrar Motorista</Text>
        </TouchableOpacity>
      </ScrollView>

      <Modal
        visible={isModalVisible}
        transparent={true}
        animationType="fade"
        onRequestClose={() => setIsModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalText}>
              Você vai ser direcionado para a tela de cadastro dos motoristas.
              Tem certeza que quer continuar?
            </Text>
            <View style={styles.modalButtons}>
              <TouchableOpacity
                style={styles.modalButton}
                onPress={() => handleConfirmarCadastro(true)}
              >
                <Text style={styles.modalButtonText}>Sim</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.modalButton}
                onPress={() => handleConfirmarCadastro(false)}
              >
                <Text style={styles.modalButtonText}>Não</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      <View style={styles.navBar}>
        <TouchableOpacity
          style={styles.navIcon}
          onPress={() => router.push('/Cooperativa/pagina-inicial')}
        >
          <Icon name="map" size={30} color="#2F2F2F" />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.navIcon}
          onPress={() => router.push('/Cooperativa/gerenciar-caminhao')}
        >
          <Icon name="truck" size={30} color="#2F2F2F" />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.navIcon}
          onPress={() => router.push('/Cooperativa/gerenciar-rotas')}
        >
          <Icon name="info" size={30} color="#2F2F2F" />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.navIcon}
          onPress={() => router.push('/Cooperativa/perfil-cooperativa')}
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
    padding: 20,
    paddingBottom: 80,
  },
  backButton: {
    marginTop: 10,
    marginBottom: 10,
  },
  image: {
    width: 200,
    height: 200,
    alignSelf: 'center',
    marginBottom: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#3629B7',
    marginTop: 10,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 18,
    color: '#888888',
    marginBottom: 20,
    textAlign: 'center',
  },
  tableContainer: {
    marginTop: 20,
  },
  tableHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10,
    backgroundColor: '#E0E0E0',
    borderRadius: 5,
  },
  tableHeaderText: {
    fontWeight: 'bold',
    fontSize: 16,
    color: '#2F2F2F',
  },
  tableRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10,
    borderBottomWidth: 1,
    borderColor: '#D3D3D3',
  },
  tableCell: {
    fontSize: 16,
    color: '#2F2F2F',
  },
  button: {
    backgroundColor: '#4EC063',
    paddingVertical: 15,
    borderRadius: 30,
    alignItems: 'center',
    marginTop: 20,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    width: '80%',
    alignItems: 'center',
  },
  modalText: {
    fontSize: 18,
    color: '#333',
    marginBottom: 20,
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
  },
  modalButton: {
    backgroundColor: '#4EC063',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  modalButtonText: {
    color: 'white',
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
