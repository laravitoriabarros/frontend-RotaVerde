import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import Icon from 'react-native-vector-icons/Feather';
import { Picker } from '@react-native-picker/picker';

export default function CadastroCooperativa() {
  const router = useRouter();
  const [areaAtuacao, setAreaAtuacao] = useState('');
  const [outros, setOutros] = useState('');

  const handleFinalizar = () => {
    router.push('/login');
  };

  return (
    <View style={styles.container}>
      {/* Botão Voltar */}
      <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
        <Icon name="arrow-left" size={28} color="#4EC063" />
      </TouchableOpacity>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {/* Imagem */}
        <Image
          source={require('../../assets/images/logo.png')}
          style={styles.image}
          resizeMode="contain"
        />

        {/* Título */}
        <Text style={styles.title}>Cadastre - se</Text>

        {/* Inputs */}
        <Text style={styles.label}>CNPJ</Text>
        <TextInput style={styles.input} placeholder="Digite aqui seu CNPJ [SEM PONTUAÇÃO]" />

        <Text style={styles.label}>Nome da Cooperativa</Text>
        <TextInput style={styles.input} placeholder="Digite o nome da cooperativa..." />

        <Text style={styles.label}>Método de Contato</Text>
        <TextInput style={styles.input} placeholder="Digite seu número ou email..." />

        <Text style={styles.label}>Senha</Text>
        <TextInput style={styles.input} placeholder="Digite sua senha" secureTextEntry />

        <Text style={styles.label}>Confirmar senha</Text>
        <TextInput style={styles.input} placeholder="Confirme sua senha" secureTextEntry />

        {/* Picker Área de Atuação */}
        <Text style={styles.label}>Selecione suas áreas de atuação</Text>
        <View style={styles.pickerContainer}>
          <Picker
            selectedValue={areaAtuacao}
            onValueChange={(itemValue) => setAreaAtuacao(itemValue)}
            style={styles.picker}
          >
            <Picker.Item label="Clique aqui para escolher" value="" />
            <Picker.Item label="Serraria" value="Serraria" />
            <Picker.Item label="Gruta de Lourdes" value="Gruta de Lourdes" />
            <Picker.Item label="Tabuleiro dos Martins" value="Tabuleiro dos Martins" />
            <Picker.Item label="Trapiche" value="Trapiche" />
            <Picker.Item label="Outros" value="Outros" />
          </Picker>
        </View>

        {/* Se escolher "Outros" */}
        {areaAtuacao === 'Outros' && (
          <>
            <Text style={styles.label}>Informe o local</Text>
            <TextInput
              style={styles.input}
              placeholder="Digite o nome do local"
              value={outros}
              onChangeText={setOutros}
            />
          </>
        )}

        {/* Informações de Endereço */}
        <Text style={styles.sectionTitle}>Informações de endereço</Text>

        <Text style={styles.label}>CEP</Text>
        <TextInput style={styles.input} placeholder="Insira o CEP" />

        <Text style={styles.label}>Rua</Text>
        <TextInput style={styles.input} placeholder="Digite a rua do endereço" />

        <Text style={styles.label}>Bairro</Text>
        <TextInput style={styles.input} placeholder="Digite o bairro do endereço" />

        <Text style={styles.label}>Número do Endereço</Text>
        <TextInput style={styles.input} placeholder="Digite o número do endereço" />

        {/* Botão Finalizar */}
        <TouchableOpacity style={styles.button} onPress={handleFinalizar}>
          <Text style={styles.buttonText}>Finalizar</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  backButton: {
    position: 'absolute',
    top: 40,
    left: 20,
    zIndex: 10,
  },
  scrollContent: {
    paddingTop: 100,
    paddingHorizontal: 20,
    paddingBottom: 40,
  },
  image: {
    width: '100%',
    height: 150,
    marginBottom: 10,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#4EC063',
    textAlign: 'center',
    marginBottom: 30,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#4EC063',
    marginTop: 20,
    marginBottom: 10,
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
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
});
