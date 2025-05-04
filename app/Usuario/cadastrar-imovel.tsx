import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  TextInput,
  ScrollView,
  Image,
  Alert,
} from 'react-native';
import { useRouter } from 'expo-router';
import Icon from 'react-native-vector-icons/Feather';
import * as Location from 'expo-location';
import { Picker } from '@react-native-picker/picker';

export default function CadastrarImovel() {
  const router = useRouter();

  const [nome, setNome] = useState('');
  const [tipoImovel, setTipoImovel] = useState('');
  const [lixoReciclavel, setLixoReciclavel] = useState('');
  const [localizacao, setLocalizacao] = useState('');

  const handleGoBack = () => {
    router.back();
  };

  const handleSubmit = () => {
    console.log({
      nome,
      tipoImovel,
      lixoReciclavel,
      localizacao,
    });

    router.push('/Usuario/final-cad-imovel');
  };

  const obterLocalizacao = async () => {
    try {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert('Permissão negada', 'Não foi possível acessar a localização.');
        return;
      }

      const location = await Location.getCurrentPositionAsync({});
      const [address] = await Location.reverseGeocodeAsync(location.coords);

      if (address) {
        const texto = `${address.street ?? ''}, ${address.subregion ?? ''} - ${address.city ?? ''}`;
        setLocalizacao(texto.trim());
      }
    } catch (error) {
      Alert.alert('Erro', 'Não foi possível obter a localização.');
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={handleGoBack} style={styles.backButton}>
          <Icon name="arrow-left" size={24} color="#4EC063" />
        </TouchableOpacity>
      </View>

      <Image source={require('../../assets/images/web.png')} style={styles.image} />

      <Text style={styles.title}>Vamos começar!</Text>

      <ScrollView contentContainerStyle={styles.form}>
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Nome</Text>
          <TextInput
            style={styles.input}
            placeholder="Digite como quer chamar seu imóvel"
            value={nome}
            onChangeText={setNome}
          />
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.label}>Escolha o tipo de imóvel</Text>
          <View style={styles.pickerContainer}>
            <Picker
              selectedValue={tipoImovel}
              onValueChange={(itemValue) => setTipoImovel(itemValue)}
              style={styles.picker}
            >
              <Picker.Item label="Clique aqui para escolher" value="" />
              <Picker.Item label="Residência" value="residencia" />
              <Picker.Item label="Comércio" value="comercio" />
              <Picker.Item label="Estabelecimento público" value="publico" />
            </Picker>
          </View>
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.label}>Tem lixo reciclável para coleta?</Text>
          <View style={styles.pickerContainer}>
            <Picker
              selectedValue={lixoReciclavel}
              onValueChange={(itemValue) => setLixoReciclavel(itemValue)}
              style={styles.picker}
            >
              <Picker.Item label="Clique aqui para escolher" value="" />
              <Picker.Item label="Sim" value="sim" />
              <Picker.Item label="Não" value="nao" />
            </Picker>
          </View>
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.label}>Adicione a Localização</Text>
          <View style={styles.inputWithIcon}>
            <TextInput
              style={[styles.input, { flex: 1 }]}
              placeholder="Digite a localização do imóvel"
              value={localizacao}
              onChangeText={setLocalizacao}
            />
            <TouchableOpacity onPress={obterLocalizacao} style={styles.iconButton}>
              <Icon name="map-pin" size={20} color="#3629B7" />
            </TouchableOpacity>
          </View>
        </View>

        <TouchableOpacity style={styles.button} onPress={handleSubmit}>
          <Text style={styles.buttonText}>Criar</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    paddingTop: 40,
  },
  header: {
    alignItems: 'flex-start',
    paddingLeft: 20,
    paddingBottom: 20,
  },
  backButton: {
    padding: 10,
  },
  image: {
    width: 100,
    height: 100,
    alignSelf: 'center',
    resizeMode: 'contain',
    marginBottom: 10,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#3629B7',
    textAlign: 'center',
    marginBottom: 20,
  },
  form: {
    paddingHorizontal: 20,
  },
  inputContainer: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    color: '#2F2F2F',
    marginBottom: 5,
  },
  input: {
    height: 50,
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 5,
    paddingHorizontal: 15,
    fontSize: 16,
    color: '#2F2F2F',
  },
  inputWithIcon: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconButton: {
    padding: 12,
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderLeftWidth: 0,
    borderTopRightRadius: 5,
    borderBottomRightRadius: 5,
    backgroundColor: '#F4F4F4',
  },
  pickerContainer: {
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 5,
    overflow: 'hidden',
  },
  picker: {
    height: 50,
    width: '100%',
  },
  button: {
    backgroundColor: '#3629B7',
    paddingVertical: 15,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 10,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 18,
  },
});
