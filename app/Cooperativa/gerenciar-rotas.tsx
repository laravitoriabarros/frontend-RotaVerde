import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Alert,
  Image,
} from 'react-native';
import { useRouter } from 'expo-router';
import Icon from 'react-native-vector-icons/Feather';

export default function GerenciarRotas() {
  const router = useRouter();
  const [popupVisible, setPopupVisible] = useState(false);

  const handleCriarRota = () => {
    router.push('/Cooperativa/criar-rota');
  };

  const handleBaixarRelatorio = () => {
    setPopupVisible(true);
    setTimeout(() => setPopupVisible(false), 2000);
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image source={require('../../assets/images/logo.png')} style={styles.logo} />
      </View>

      <Text style={styles.title}>Gerenciamento de Rotas</Text>
      <Text style={styles.subtitle}>Verifique todas as suas rotas de hoje!</Text>

      <View style={styles.table}>
        <View style={styles.tableHeader}>
          <Text style={styles.headerCell}>Veículo</Text>
          <Text style={styles.headerCell}>Data</Text>
          <Text style={styles.headerCell}>Status</Text>
          <Text style={styles.headerCell}>Rastrear</Text>
        </View>

        <View style={styles.tableRow}>
          <Text style={styles.cell}>YXBA12</Text>
          <Text style={styles.cell}>{new Date().toLocaleDateString()}</Text>
          <Text style={styles.cell}>A começar</Text>
          <TouchableOpacity
            style={styles.viewButton}
            onPress={() => router.push('/Cooperativa/ver-rota')}
          >
            <Icon name="eye" size={20} color="white" />
          </TouchableOpacity>
        </View>

        <View style={styles.tableRow}>
          <Text style={styles.cell}>YXBA13</Text>
          <Text style={styles.cell}>{new Date().toLocaleDateString()}</Text>
          <Text style={styles.cell}>Em andamento</Text>
          <TouchableOpacity
            style={styles.viewButton}
            onPress={() => router.push('/Cooperativa/ver-rota')}
          >
            <Icon name="eye" size={20} color="white" />
          </TouchableOpacity>
        </View>
      </View>

      <TouchableOpacity style={styles.createButton} onPress={handleCriarRota}>
        <Text style={styles.buttonText}>Criar Rota</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.createButton}
        onPress={() => router.push('/Cooperativa/historico-rotas')}
      >
        <Text style={styles.buttonText}>Histórico</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.createButton} onPress={handleBaixarRelatorio}>
        <Text style={styles.buttonText}>Baixar Relatório do Dia</Text>
      </TouchableOpacity>

      {popupVisible && (
        <View style={styles.popup}>
          <Text style={styles.popupText}>Documento baixado com sucesso!</Text>
        </View>
      )}

      <View style={styles.navBar}>
        <TouchableOpacity style={styles.navIcon} onPress={() => router.push('/Cooperativa/pagina-inicial')}>
          <Icon name="map" size={30} color="#2F2F2F" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.navIcon} onPress={() => router.push('/Cooperativa/gerenciar-caminhao')}>
          <Icon name="truck" size={30} color="#2F2F2F" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.navIcon} onPress={() => router.push('/Cooperativa/gerenciar-rotas')}>
          <Icon name="info" size={30} color="#2F2F2F" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.navIcon} onPress={() => router.push('/Cooperativa/perfil-cooperativa')}>
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
  header: {
    width: '100%',
    backgroundColor: '#3629B7',
    paddingTop: 20,
    paddingBottom: 20,
    alignItems: 'center',
    marginBottom: 20,
  },
  logo: {
    width: 120,
    height: 40,
    resizeMode: 'contain',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#4EC063',
    textAlign: 'center',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 18,
    color: '#888888',
    marginBottom: 30,
    textAlign: 'center',
  },
  table: {
    marginBottom: 20,
  },
  tableHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 10,
    marginBottom: 10,
    backgroundColor: '#E0E0E0',
    borderRadius: 5,
  },
  headerCell: {
    fontWeight: 'bold',
    fontSize: 14,
    color: '#2F2F2F',
    width: '23%',
    textAlign: 'center',
  },
  tableRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderColor: '#D3D3D3',
  },
  cell: {
    fontSize: 14,
    color: '#888888',
    width: '23%',
    textAlign: 'center',
  },
  viewButton: {
    backgroundColor: '#4EC063',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
    width: '23%',
  },
  createButton: {
    backgroundColor: '#3629B7',
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
  popup: {
    position: 'absolute',
    bottom: 100,
    left: '20%',
    right: '20%',
    backgroundColor: '#4EC063',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  popupText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
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
