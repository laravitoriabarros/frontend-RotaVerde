import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  TextInput,
  Alert,
  ScrollView
} from 'react-native';
import { useRouter } from 'expo-router';
import Icon from 'react-native-vector-icons/Feather';
import { Picker } from '@react-native-picker/picker';

export default function CadastroVeiculo() {
  const router = useRouter();

  const [placa, setPlaca] = useState('');
  const [modelo, setModelo] = useState('');
  const [motorista, setMotorista] = useState('');

  const motoristasCooperativa = [
    { id: 1, nome: 'João Silva', email: 'joao@cooperativa.com' },
    { id: 2, nome: 'Maria Oliveira', email: 'maria@cooperativa.com' },
    { id: 3, nome: 'Carlos Santos', email: 'carlos@cooperativa.com' }
  ];

  const handleCadastro = () => {
    Alert.alert('Cadastro efetuado com sucesso!');
    router.push('/Cooperativa/gerenciar-caminhao');
  };

  return (
    <View style={styles.container}>
      {/* Cabeçalho com ícone acima do título */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <Icon name="arrow-left" size={28} color="#4EC063" />
        </TouchableOpacity>
        <View style={styles.iconContainer}>
          <Icon name="truck" size={100} color="#4EC063" />
        </View>
        <Text style={styles.title}>Cadastro de Veículo</Text>
      </View>

      {/* Formulário */}
      <Text style={styles.label}>Placa do Veículo</Text>
      <TextInput
        style={styles.input}
        placeholder="Digite a placa do veículo"
        value={placa}
        onChangeText={setPlaca}
      />

      <Text style={styles.label}>Modelo do Veículo</Text>
      <TextInput
        style={styles.input}
        placeholder="Digite o modelo do veículo"
        value={modelo}
        onChangeText={setModelo}
      />

      {/* Selecione o Motorista */}
      <Text style={styles.label}>Selecione o Motorista</Text>
      <View style={styles.pickerWrapper}>
        <Picker
          selectedValue={motorista}
          onValueChange={(itemValue: string) => setMotorista(itemValue)}
          style={styles.picker}
        >
          <Picker.Item label="Escolha um motorista" value="" />
          {motoristasCooperativa.map((motorista) => (
            <Picker.Item key={motorista.id} label={motorista.nome} value={motorista.nome} />
          ))}
        </Picker>
      </View>

      {/* Botão para salvar */}
      <TouchableOpacity style={styles.button} onPress={handleCadastro}>
        <Text style={styles.buttonText}>Cadastrar Veículo</Text>
      </TouchableOpacity>

      {/* Barra de navegação inferior */}
      <View style={styles.navBar}>
        <TouchableOpacity style={styles.navIcon} onPress={() => router.push('/(private)/(cooperativa)/home')}>
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
    alignItems: 'center',
    marginBottom: 30,
  },
  backButton: {
    position: 'absolute',
    left: 20,
    top: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#4EC063',
  },
  iconContainer: {
    alignItems: 'center',
    marginBottom: 10,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 5,
  },
  input: {
    height: 50,
    borderWidth: 1,
    borderColor: '#D3D3D3',
    borderRadius: 8,
    paddingHorizontal: 15,
    fontSize: 16,
    marginBottom: 20,
  },
  pickerWrapper: {
    borderWidth: 1,
    borderColor: '#D3D3D3',
    borderRadius: 8,
    marginBottom: 15,
    overflow: 'hidden',
  },
  picker: {
    height: 50,
    width: '100%',
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
