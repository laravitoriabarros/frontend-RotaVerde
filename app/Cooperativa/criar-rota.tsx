import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  TextInput,
  Alert,
  Platform,
} from 'react-native';
import { useRouter } from 'expo-router';
import * as DocumentPicker from 'expo-document-picker';
import Icon from 'react-native-vector-icons/Feather';

export default function CriarRota() {
  const router = useRouter();
  const [tempoDuracao, setTempoDuracao] = useState('');
  const [arquivo, setArquivo] = useState<DocumentPicker.DocumentPickerAsset | null>(null);

  const handleEnviarArquivo = async () => {
    const result = await DocumentPicker.getDocumentAsync({
      type: '*/*',
      copyToCacheDirectory: true,
      multiple: false,
    });

    if (!result.canceled && result.assets && result.assets.length > 0) {
      setArquivo(result.assets[0]);
    }
  };

  const handleCriarRota = () => {
    if (tempoDuracao && arquivo) {
      Alert.alert('Rota criada com sucesso!');
    } else {
      Alert.alert('Preencha todos os campos!');
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
        <Icon name="arrow-left" size={24} color="#2F2F2F" />
      </TouchableOpacity>

      <Text style={styles.title}>Crie uma nova rota!</Text>

      <Icon name="map" size={80} color="#4EC063" style={styles.bigIcon} />

      <Text style={styles.label}>Escolha o Tempo de Duração</Text>
      <TextInput
        style={styles.input}
        placeholder="Ex: 2h 30min"
        value={tempoDuracao}
        onChangeText={setTempoDuracao}
      />

      <Text style={styles.label}>Envie sua rota</Text>
      <TouchableOpacity style={styles.uploadButton} onPress={handleEnviarArquivo}>
        <Text style={styles.uploadButtonText}>
          {arquivo ? 'Arquivo selecionado: ' + arquivo.name : 'Selecionar arquivo'}
        </Text>
      </TouchableOpacity>

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
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#3629B7',
    textAlign: 'center',
    marginBottom: 20,
  },
  bigIcon: {
    alignSelf: 'center',
    marginBottom: 30,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#2F2F2F',
    marginBottom: 5,
  },
  input: {
    borderWidth: 1,
    borderColor: '#CCCCCC',
    borderRadius: 8,
    padding: 12,
    marginBottom: 20,
  },
  uploadButton: {
    backgroundColor: '#E0E0E0',
    padding: 12,
    borderRadius: 8,
    marginBottom: 30,
  },
  uploadButtonText: {
    color: '#2F2F2F',
    textAlign: 'center',
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
