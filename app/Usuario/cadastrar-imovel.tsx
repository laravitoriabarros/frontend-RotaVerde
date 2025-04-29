import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, TextInput, ScrollView } from 'react-native';
import { useRouter } from 'expo-router'; 
import Icon from 'react-native-vector-icons/Feather'; 

export default function CadastrarImovel() {
  const router = useRouter();

  // Estado para armazenar os valores dos campos
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
    // Navega para a tela final
    router.push('/Usuario/final-cad-imovel');
  };

  return (
    <View style={styles.container}>
      {/* Cabeçalho com a imagem */}
      <View style={styles.header}>
        <TouchableOpacity onPress={handleGoBack} style={styles.backButton}>
          <Icon name="arrow-left" size={24} color="#4EC063" />  {/* Seta verde */}
        </TouchableOpacity>
      </View>

      {/* Título e instruções */}
      <Text style={styles.title}>Vamos começar!</Text>

      {/* ScrollView para permitir rolagem */}
      <ScrollView contentContainerStyle={styles.form}>
        {/* Nome */}
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Nome</Text>
          <TextInput
            style={styles.input}
            placeholder="Digite como quer chamar seu imóvel"
            value={nome}
            onChangeText={setNome}
          />
        </View>

        {/* Tipo de imóvel */}
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Escolha o tipo de imóvel</Text>
          <TextInput
            style={styles.input}
            placeholder="Clique aqui para escolher"
            value={tipoImovel}
            onChangeText={setTipoImovel}
          />
        </View>

        {/* Lixo reciclável */}
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Tem lixo reciclável para coleta?</Text>
          <TextInput
            style={styles.input}
            placeholder="Clique aqui para escolher"
            value={lixoReciclavel}
            onChangeText={setLixoReciclavel}
          />
        </View>

        {/* Localização */}
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Adicione a Localização</Text>
          <TextInput
            style={styles.input}
            placeholder="Digite a localização do imóvel"
            value={localizacao}
            onChangeText={setLocalizacao}
          />
        </View>

        {/* Botão Criar */}
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
    paddingLeft: 15,
    fontSize: 16,
    color: '#2F2F2F',
  },
  button: {
    backgroundColor: '#3629B7',
    paddingVertical: 15,
    borderRadius: 5,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 18,
  },
});
