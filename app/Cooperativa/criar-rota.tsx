import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from 'react-native';
import { useRouter } from 'expo-router';
import Icon from 'react-native-vector-icons/Feather';
import { Picker } from '@react-native-picker/picker';

export default function CriarRota() {
  const router = useRouter();
  const [area, setArea] = useState('');

  const handleCriarRota = () => {
    Alert.alert('Rota criada com sucesso!');
    router.push('/Cooperativa/gerenciar-rotas');
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
        <Icon name="arrow-left" size={24} color="#2F2F2F" />
      </TouchableOpacity>

      {/* Ícone grande acima do título */}
      <Icon name="map" size={80} color="#4EC063" style={styles.bigIcon} />

      {/* Título abaixo do ícone */}
      <Text style={styles.title}>Crie uma nova rota!</Text>

      {/* Subtexto cinza */}
      <Text style={styles.subtext}>
        Quando você clicar no botão, uma nova rota será gerada pelo nosso sistema e disponibilizada para todos!
      </Text>

      {/* Campo dropdown de área */}
      <Text style={styles.label}>Qual a área da rota?</Text>
      <View style={styles.pickerWrapper}>
        <Picker
          selectedValue={area}
          onValueChange={(value) => setArea(value)}
          style={styles.picker}
        >
          <Picker.Item label="Selecione uma área" value="" />
          <Picker.Item label="Farol" value="Farol" />
          <Picker.Item label="Benedito Bentes" value="Benedito Bentes" />
          <Picker.Item label="Antares" value="Antares" />
        </Picker>
      </View>

      {/* Botão de criação */}
      <TouchableOpacity style={styles.createButton} onPress={handleCriarRota}>
        <Text style={styles.createButtonText}>Criar rota</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    padding: 20,
  },
  backButton: {
    marginBottom: 10,
  },
  bigIcon: {
    alignSelf: 'center',
    marginBottom: 10,
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#3629B7',
    textAlign: 'center',
    marginBottom: 10,
  },
  subtext: {
    color: '#888888',
    textAlign: 'center',
    marginBottom: 30,
    fontSize: 14,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#2F2F2F',
    marginBottom: 5,
  },
  pickerWrapper: {
    borderWidth: 1,
    borderColor: '#CCCCCC',
    borderRadius: 8,
    marginBottom: 30,
    overflow: 'hidden',
  },
  picker: {
    height: 50,
    width: '100%',
  },
  createButton: {
    backgroundColor: '#3629B7',
    padding: 15,
    borderRadius: 30,
    alignItems: 'center',
  },
  createButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
