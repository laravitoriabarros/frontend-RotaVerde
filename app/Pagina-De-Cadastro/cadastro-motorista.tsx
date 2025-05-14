import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image, ScrollView, Alert } from 'react-native';
import { useRouter } from 'expo-router';
import Icon from 'react-native-vector-icons/Feather';
import { Picker } from '@react-native-picker/picker'; 

export default function CadastroMotorista() {
  const router = useRouter();
  
  const [nome, setNome] = useState('');
  const [usuario, setUsuario] = useState('');
  const [metodoContato, setMetodoContato] = useState('');
  const [cooperativa, setCooperativa] = useState('');
  const [senha, setSenha] = useState('');
  const [confirmarSenha, setConfirmarSenha] = useState('');

  const handleCriar = () => {
    // Verificando se todos os campos obrigatórios estão preenchidos
    if (!nome || !usuario || !metodoContato || !cooperativa || !senha || !confirmarSenha) {
      Alert.alert('Erro', 'Todos os campos são obrigatórios!');
      return;
    }

    // Verificando se as senhas coincidem
    if (senha !== confirmarSenha) {
      Alert.alert('Erro', 'As senhas não coincidem!');
      return;
    }

    // Se tudo estiver correto, redireciona para a página inicial do motorista
    router.push('/Motorista/pagina-inicial');
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
        <Icon name="arrow-left" size={28} color="#4EC063" />
      </TouchableOpacity>

      <Image
        source={require('../../assets/images/logo.png')}
        style={styles.image}
        resizeMode="contain"
      />

      <Text style={styles.title}>Cadastro Motorista</Text>

      <Text style={styles.label}>Nome</Text>
      <TextInput 
        style={styles.input} 
        placeholder="Digite seu nome..." 
        value={nome} 
        onChangeText={setNome} 
      />

      <Text style={styles.label}>Nome de Usuário</Text>
      <TextInput 
        style={styles.input} 
        placeholder="Digite seu nome de usuário..." 
        value={usuario} 
        onChangeText={setUsuario} 
      />

      <Text style={styles.label}>Método de Contato</Text>
      <TextInput 
        style={styles.input} 
        placeholder="Digite seu número ou email..." 
        value={metodoContato} 
        onChangeText={setMetodoContato} 
      />

      <Text style={styles.label}>Cooperativa</Text>
      <View style={styles.pickerContainer}>
        <Picker
          selectedValue={cooperativa}
          onValueChange={(itemValue) => setCooperativa(itemValue)}
        >
          <Picker.Item label="Escolha uma cooperativa" value="" />
          <Picker.Item label="Cooprel" value="cooprel" />
          <Picker.Item label="Coopvila" value="coopvila" />
          <Picker.Item label="Outro" value="outro" />
        </Picker>
      </View>

      <Text style={styles.label}>Senha</Text>
      <TextInput 
        style={styles.input} 
        placeholder="Digite sua senha" 
        secureTextEntry 
        value={senha} 
        onChangeText={setSenha} 
      />

      <Text style={styles.label}>Confirmar Senha</Text>
      <TextInput 
        style={styles.input} 
        placeholder="Confirme sua senha" 
        secureTextEntry 
        value={confirmarSenha} 
        onChangeText={setConfirmarSenha} 
      />

      <TouchableOpacity style={styles.button} onPress={handleCriar}>
        <Text style={styles.buttonText}>Criar</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 20,
    paddingTop: 40,
    paddingBottom: 60, // Garantir que a barra inferior não cubra o conteúdo
  },
  backButton: {
    position: 'absolute',
    top: 40,
    left: 20,
    zIndex: 10,
  },
  image: {
    width: '100%',
    height: 150,
    marginTop: 20,
    marginBottom: 10,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#4EC063',
    textAlign: 'center',
    marginBottom: 30,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 5,
    color: '#333',
  },
  input: {
    borderWidth: 1,
    borderColor: '#D3D3D3',
    borderRadius: 8,
    padding: 12,
    marginBottom: 15,
  },
  pickerContainer: {
    borderWidth: 1,
    borderColor: '#D3D3D3',
    borderRadius: 8,
    marginBottom: 15,
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
