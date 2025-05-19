import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image, Alert } from 'react-native';
import { useRouter } from 'expo-router';
import Icon from 'react-native-vector-icons/Feather';

export default function GerenciarCaminhoes() {
  const router = useRouter();

  const [caminhoes, setCaminhoes] = useState([
    { placa: 'ABC1234', motorista: 'João', status: 'Em rota' },
    { placa: 'XYZ5678', motorista: 'Carlos', status: 'Na garagem' },
  ]);

  const handleNavigate = (page: string) => {
    router.push(page);
  };

  const handleDelete = (placa: string) => {
    Alert.alert('Confirmação', 'Você tem certeza que deseja excluir este caminhão?', [
      { text: 'Cancelar', style: 'cancel' },
      {
        text: 'Sim',
        onPress: () => {
          setCaminhoes(caminhoes.filter(c => c.placa !== placa));
        },
      },
    ]);
  };

  const handleVisualizar = (placa: string) => {
    router.push(`/Cooperativa/ver-rota`);
  };

  return (
    <View style={styles.container}>
      {/* Imagem substituindo o cabeçalho */}
      <Image
        source={require('../../assets/images/gerenciar-caminhao.png')}
        style={styles.image}
      />

      <Text style={styles.title}>Gerenciamento de Caminhões</Text>
      <Text style={styles.subtitle}>Veja a lista de caminhões associados!</Text>

      <View style={styles.tableContainer}>
        <View style={styles.tableHeader}>
          <Text style={styles.tableHeaderText}>Veículo</Text>
          <Text style={styles.tableHeaderText}>Motorista</Text>
          <Text style={styles.tableHeaderText}>Status</Text>
          <Text style={styles.tableHeaderText}>Ações</Text>
        </View>

        {caminhoes.map((caminhao, index) => (
          <View key={index} style={styles.tableRow}>
            <Text style={styles.tableCell}>{caminhao.placa}</Text>
            <Text style={styles.tableCell}>{caminhao.motorista}</Text>
            <Text style={styles.tableCell}>{caminhao.status}</Text>
            <View style={styles.tableCellActions}>
              <TouchableOpacity onPress={() => handleVisualizar(caminhao.placa)}>
                <Icon name="eye" size={20} color="#3629B7" style={styles.iconSpacing} />
              </TouchableOpacity>
              <TouchableOpacity onPress={() => handleDelete(caminhao.placa)} style={styles.deleteIcon}>
                <Icon name="trash-2" size={20} color="#B00020" />
              </TouchableOpacity>
            </View>
          </View>
        ))}
      </View>

      <View style={styles.buttonsContainer}>
        <TouchableOpacity style={styles.button} onPress={() => handleNavigate('/Cooperativa/cadastro-veiculo')}>
          <Text style={styles.buttonText}>Cadastrar Veículo</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => handleNavigate('/Cooperativa/gerenciar-motorista')}>
          <Text style={styles.buttonText}>Gerenciar Motoristas</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.navBar}>
        <TouchableOpacity style={styles.navIcon} onPress={() => handleNavigate('/Cooperativa/pagina-inicial')}>
          <Icon name="map" size={30} color="#2F2F2F" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.navIcon} onPress={() => handleNavigate('/Cooperativa/gerenciar-caminhao')}>
          <Icon name="truck" size={30} color="#2F2F2F" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.navIcon} onPress={() => handleNavigate('/Cooperativa/gerenciar-rotas')}>
          <Icon name="info" size={30} color="#2F2F2F" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.navIcon} onPress={() => handleNavigate('/Cooperativa/perfil-cooperativa')}>
          <Icon name="user" size={30} color="#2F2F2F" />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 20,
    paddingTop: 40,
    paddingBottom: 80,
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
    textAlign: 'center',
    marginVertical: 20,
  },
  subtitle: {
    fontSize: 16,
    color: '#888888',
    textAlign: 'center',
    marginBottom: 30,
  },
  tableContainer: {
    marginBottom: 40,
  },
  tableHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  tableHeaderText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#2F2F2F',
    flex: 1,
    textAlign: 'center',
  },
  tableRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  tableCell: {
    flex: 1,
    fontSize: 16,
    color: '#2F2F2F',
    textAlign: 'center',
  },
  tableCellActions: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconSpacing: {
    marginRight: 10,
  },
  deleteIcon: {
    marginLeft: 10,
  },
  buttonsContainer: {
    marginTop: 20,
    marginBottom: 30,
  },
  button: {
    backgroundColor: '#4EC063',
    paddingVertical: 15,
    borderRadius: 30,
    alignItems: 'center',
    marginBottom: 20,
  },
  buttonText: {
    color: '#fff',
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
