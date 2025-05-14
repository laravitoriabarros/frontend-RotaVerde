import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image, Alert, ScrollView, TextInput } from 'react-native';
import { useRouter } from 'expo-router';
import Icon from 'react-native-vector-icons/Feather';
import { Picker } from '@react-native-picker/picker';

export default function ConfirmacaoColeta() {
  const router = useRouter();

  const [residencia, setResidencia] = useState('');
  const [dataColeta, setDataColeta] = useState('');
  const [coletaConfirmada, setColetaConfirmada] = useState('Sim');

  const handleGoBack = () => {
    router.back();
  };

  const handleSalvar = () => {
    Alert.alert('Confirmação efetuada com sucesso!');
  };

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={{ paddingBottom: 120 }}>
        {/* Cabeçalho com a seta verde e imagem maior */}
        <View style={styles.header}>
          <TouchableOpacity onPress={handleGoBack} style={styles.backButton}>
            <Icon name="arrow-left" size={24} color="green" />
          </TouchableOpacity>
          <View style={styles.imageContainer}>
            <Image source={require('../../assets/images/coleta.png')} style={styles.image} />
          </View>
        </View>

        {/* Título */}
        <Text style={styles.title}>Vamos confirmar sua coleta!</Text>

        {/* Escolha a residência */}
        <View style={styles.dropdownContainer}>
          <Text style={styles.label}>Escolha a residência</Text>
          <View style={styles.pickerWrapper}>
            <Picker selectedValue={residencia} onValueChange={setResidencia} style={styles.picker}>
              <Picker.Item label="Casa 1" value="Casa 1" />
              <Picker.Item label="Casa 2" value="Casa 2" />
              <Picker.Item label="Casa 3" value="Casa 3" />
            </Picker>
          </View>
        </View>

        {/* Campo de digitação para data */}
        <View style={styles.dropdownContainer}>
          <Text style={styles.label}>Digite a data da coleta</Text>
          <View style={styles.textInputWrapper}>
            <TextInput
              style={styles.textInput}
              value={dataColeta}
              onChangeText={setDataColeta}
              placeholder="AAAA-MM-DD"
            />
          </View>
        </View>

        {/* Confirmação da coleta */}
        <View style={styles.dropdownContainer}>
          <Text style={styles.label}>Você confirma que seu lixo foi coletado?</Text>
          <View style={styles.pickerWrapper}>
            <Picker
              selectedValue={coletaConfirmada}
              onValueChange={setColetaConfirmada}
              style={styles.picker}
            >
              <Picker.Item label="Sim" value="Sim" />
              <Picker.Item label="Não" value="Não" />
            </Picker>
          </View>
        </View>

        {/* Botão Salvar */}
        <View style={{ paddingHorizontal: 20, marginTop: 30 }}>
          <TouchableOpacity style={styles.saveButton} onPress={handleSalvar}>
            <Text style={styles.saveButtonText}>Salvar Informações</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>

      {/* Barra inferior */}
      <View style={styles.navBar}>
        <TouchableOpacity style={styles.navIcon} onPress={() => router.push('/')}>
          <Icon name="home" size={30} color="#2F2F2F" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.navIcon} onPress={() => router.push('/perfil')}>
          <Icon name="user" size={30} color="#2F2F2F" />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: 'white' },
  header: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
  backButton: { position: 'absolute', left: 20, top: 20, padding: 10 },
  imageContainer: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
  image: {
    width: 150,  // Aumentando o tamanho da imagem
    height: 150, // Aumentando o tamanho da imagem
    resizeMode: 'contain',
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#2F2F2F',
    textAlign: 'center',
    marginTop: 20,
  },
  label: {
    fontSize: 16,
    color: '#2F2F2F',
    marginBottom: 5,
  },
  dropdownContainer: {
    marginBottom: 30,
    paddingHorizontal: 20,
  },
  pickerWrapper: {
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 5,
    overflow: 'hidden',
  },
  picker: {
    height: 50,
    width: '100%',
  },
  textInputWrapper: {
    height: 50,
    width: '100%',
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 5,
    paddingHorizontal: 15,
  },
  textInput: {
    height: '100%',
    fontSize: 16,
  },
  saveButton: {
    backgroundColor: '#4EC063',
    paddingVertical: 15,
    borderRadius: 5,
    alignItems: 'center',
  },
  saveButtonText: {
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
    backgroundColor: 'white',
    borderTopWidth: 1,
    borderTopColor: '#E0E0E0',
  },
  navIcon: { padding: 10 },
});
