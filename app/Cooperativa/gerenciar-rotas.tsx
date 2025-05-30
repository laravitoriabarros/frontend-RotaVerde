import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Alert,
  Image,
  Modal,
  TextInput,
  ScrollView,
} from 'react-native';
import { useRouter } from 'expo-router';
import Icon from 'react-native-vector-icons/Feather';
import { Picker } from '@react-native-picker/picker';

export default function GerenciarRotas() {
  const router = useRouter();

  const [popupVisible, setPopupVisible] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [kgLixo, setKgLixo] = useState('');
  const [statusTempo, setStatusTempo] = useState('');

  const handleCriarRota = () => {
    router.push('/Cooperativa/criar-rota');
  };

  const handleBaixarRelatorio = () => {
    setPopupVisible(true);
    setTimeout(() => setPopupVisible(false), 2000);
  };

  const handleAbrirModal = () => {
    setModalVisible(true);
  };

  const handleFinalizarRota = () => {
    setModalVisible(false);
    Alert.alert('Informações enviadas, seu relatório estará pronto em breve!');
    setKgLixo('');
    setStatusTempo('');
  };

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        <Image source={require('../../assets/images/gerenciar-rota.png')} style={styles.image} />

        <Text style={styles.title}>Gerenciamento de Rotas</Text>
        <Text style={styles.subtitle}>Verifique todas as suas rotas de hoje!</Text>

        <View style={styles.table}>
          <View style={styles.tableHeader}>
            <Text style={styles.headerCell}>Veículo</Text>
            <Text style={styles.headerCell}>Data</Text>
            <Text style={styles.headerCell}>Status</Text>
            <Text style={styles.headerCell}>Rastrear</Text>
            <Text style={styles.headerCell}>Finalizar</Text>
          </View>

          {[
            { placa: 'YXBA12', status: 'A começar' },
            { placa: 'BRC1234', status: 'Em andamento' },
            { placa: 'MGD0098', status: 'Em andamento' },
          ].map((rota, index) => (
            <View key={index} style={styles.tableRow}>
              <Text style={styles.cell}>{rota.placa}</Text>
              <Text style={styles.cell}>{new Date().toLocaleDateString()}</Text>
              <Text style={styles.cell}>{rota.status}</Text>
              <TouchableOpacity style={styles.viewButton} onPress={() => router.push('/Cooperativa/ver-rota')}>
                <Icon name="eye" size={20} color="white" />
              </TouchableOpacity>
              <TouchableOpacity style={styles.finalizarButtonTable} onPress={handleAbrirModal}>
                <Icon name="check" size={20} color="white" />
              </TouchableOpacity>
            </View>
          ))}
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
      </ScrollView>

      {/* Modal */}
      <Modal visible={modalVisible} transparent animationType="fade">
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Tem certeza que quer encerrar?</Text>
            <Text style={styles.modalSubtitle}>
              Antes de continuar, adicione informações para podermos gerar seu relatório!
            </Text>

            <Text style={styles.modalLabel}>Quantos kg de lixo foram recolhidos?</Text>
            <TextInput
              style={styles.modalInput}
              placeholder="Ex: 45"
              keyboardType="numeric"
              value={kgLixo}
              onChangeText={setKgLixo}
            />

            <Text style={styles.modalLabel}>A rota foi concluída no tempo previsto?</Text>
            <View style={styles.pickerWrapper}>
              <Picker
                selectedValue={statusTempo}
                onValueChange={(value) => setStatusTempo(value)}
                style={styles.picker}
              >
                <Picker.Item label="Selecione uma opção" value="" />
                <Picker.Item label="Sim" value="sim" />
                <Picker.Item label="Não, foi concluída antes" value="antes" />
                <Picker.Item label="Não, foi concluída depois" value="depois" />
              </Picker>
            </View>

            <TouchableOpacity style={styles.finalizarButton} onPress={handleFinalizarRota}>
              <Text style={styles.finalizarButtonText}>Finalizar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* Barra de navegação inferior */}
      <View style={styles.navBar}>
        <TouchableOpacity style={styles.navIcon} onPress={() => router.push('/home')}>
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
    backgroundColor: 'white',
  },
  scrollContent: {
    padding: 20,
    paddingBottom: 140,
  },
  image: {
    width: 200,
    height: 200,
    alignSelf: 'center',
    marginTop: 10,
    marginBottom: 10,
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
    width: '18%',
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
    width: '18%',
    textAlign: 'center',
  },
  viewButton: {
    backgroundColor: '#4EC063',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
    width: '18%',
  },
  finalizarButtonTable: {
    backgroundColor: '#3629B7',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
    width: '18%',
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
    backgroundColor: '#4EC063',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 20,
  },
  popupText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  navBar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 10,
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
  modalOverlay: {
    flex: 1,
    backgroundColor: '#00000088',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: 'white',
    width: '90%',
    padding: 20,
    borderRadius: 10,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#4EC063',
    marginBottom: 10,
    textAlign: 'center',
  },
  modalSubtitle: {
    color: '#888888',
    fontSize: 14,
    textAlign: 'center',
    marginBottom: 20,
  },
  modalLabel: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#2F2F2F',
    marginBottom: 5,
  },
  modalInput: {
    borderWidth: 1,
    borderColor: '#D3D3D3',
    borderRadius: 8,
    paddingHorizontal: 10,
    height: 45,
    marginBottom: 15,
  },
  pickerWrapper: {
    borderWidth: 1,
    borderColor: '#D3D3D3',
    borderRadius: 8,
    marginBottom: 20,
    overflow: 'hidden',
  },
  picker: {
    height: 50,
    width: '100%',
  },
  finalizarButton: {
    backgroundColor: '#4EC063',
    paddingVertical: 12,
    borderRadius: 25,
    alignItems: 'center',
  },
  finalizarButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
});
