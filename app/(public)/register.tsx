import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { useState } from 'react';
import { useRouter } from 'expo-router';
import { Picker } from '@react-native-picker/picker';
import Icon from 'react-native-vector-icons/Feather';

export default function CadastroParte1() {
  const router = useRouter();
  const [identidade, setIdentidade] = useState('');

  const handleContinuar = () => {
    if (identidade === 'cidadao') {
      router.push('/register-user');
    } else if (identidade === 'cooperativa') {
      router.push('/register-cooperativa');
    } else if (identidade === 'motorista') {
      router.push('/register-motorista');
    } else {
      alert('Por favor, selecione como você se identifica.');
    }
  };

  return (
    <View style={styles.container}>
      {/* Botão de Voltar */}
      <TouchableOpacity style={styles.backButton} onPress={() => router.push('/initial-decision')}>
        <Icon name="arrow-left" size={28} color="#4EC063" />
      </TouchableOpacity>

      {/* Imagem */}
      <Image
        source={require('../../assets/images/cadastro-01.png')}
        style={styles.image}
        resizeMode="contain"
      />

      {/* Título */}
      <Text style={styles.title}>Vamos começar!</Text>

      {/* Escolha sua identidade */}
      <Text style={styles.label}>Como você se identifica?</Text>
      <View style={styles.pickerContainer}>
        <Picker
          selectedValue={identidade}
          onValueChange={(itemValue) => setIdentidade(itemValue)}
        >
          <Picker.Item label="Clique aqui para escolher" value="" />
          <Picker.Item label="Cidadão" value="cidadao" />
          <Picker.Item label="Representante de cooperativa" value="cooperativa" />
          <Picker.Item label="Motorista" value="motorista" />
        </Picker>
      </View>

      {/* Botão Continuar */}
      <TouchableOpacity style={styles.button} onPress={handleContinuar}>
        <Text style={styles.buttonText}>Continuar</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 20,
    paddingTop: 40,
  },
  backButton: {
    position: 'absolute',
    top: 40,
    left: 20,
    zIndex: 10,
  },
  image: {
    width: '100%',
    height: 200,
    marginBottom: 20,
    marginTop: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center',
    marginBottom: 30,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 5,
    color: '#333',
  },
  pickerContainer: {
    borderWidth: 1,
    borderColor: '#D3D3D3',
    borderRadius: 8,
    marginBottom: 20,
    overflow: 'hidden',
  },
  button: {
    backgroundColor: '#4EC063',
    paddingVertical: 15,
    borderRadius: 30,
    alignItems: 'center',
    marginTop: 20,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
});
