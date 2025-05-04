import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import { Picker } from '@react-native-picker/picker';
import Icon from 'react-native-vector-icons/Feather';

export default function Login() {
  const router = useRouter();
  const [metodoAutenticacao, setMetodoAutenticacao] = useState('');

  const handleEntrar = () => {
    if (metodoAutenticacao === 'CNPJ') {
      // Não faz nada se for CNPJ
      return;
    } else if (metodoAutenticacao !== '') {
      router.push('/Usuario/pagina-inicial');
    }
  };

  const handleEsqueciSenha = () => {
    router.push('/esqueci-a-senha-p1');
  };

  const handleCadastro = () => {
    router.push('/Pagina-De-Cadastro/cadastro-parte1');
  };

  return (
    <View style={styles.container}>
  
      <Image
        source={require('../assets/images/logo.png')}
        style={styles.image}
        resizeMode="contain"
      />

      {/* Título */}
      <Text style={styles.title}>Faça login para acessar o app</Text>

      {/* método de autenticação */}
      <Text style={styles.label}>Escolha um método de autenticação</Text>
      <View style={styles.pickerContainer}>
        <Picker
          selectedValue={metodoAutenticacao}
          onValueChange={(itemValue) => setMetodoAutenticacao(itemValue)}
          style={styles.picker}
        >
          <Picker.Item label="Clique aqui para escolher" value="" />
          <Picker.Item label="CNPJ" value="CNPJ" />
          <Picker.Item label="Nome de usuário" value="NomeUsuario" />
          <Picker.Item label="E-mail" value="Email" />
          <Picker.Item label="Número de celular" value="NumeroCelular" />
        </Picker>
      </View>

      {/* Campo para digitar a forma de login */}
      <Text style={styles.label}>Digite sua forma de login</Text>
      <TextInput style={styles.input} placeholder="Digite seu método de autenticação" />

      {/* Campo senha */}
      <Text style={styles.label}>Senha</Text>
      <View style={styles.inputPasswordContainer}>
        <TextInput
          style={styles.inputPassword}
          placeholder="Digite sua senha aqui"
          secureTextEntry
        />
        <Icon name="eye-off" size={20} color="#999" />
      </View>

      {/* Botão esqueci a senha */}
      <TouchableOpacity onPress={handleEsqueciSenha}>
        <Text style={styles.esqueciSenha}>Esqueci a senha</Text>
      </TouchableOpacity>

      {/* Botão Entrar */}
      <TouchableOpacity style={styles.button} onPress={handleEntrar}>
        <Text style={styles.buttonText}>Entrar</Text>
      </TouchableOpacity>

      {/* Link para cadastro */}
      <Text style={styles.naoTemConta}>
        Ainda não tem uma conta?{' '}
        <Text style={styles.cadastrarLink} onPress={handleCadastro}>
          Clique aqui para se cadastrar
        </Text>
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 20,
    paddingTop: 80,
  },
  image: {
    width: '100%',
    height: 120,
    marginBottom: 20,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#005A53',
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
    marginBottom: 15,
  },
  picker: {
    height: 50,
    width: '100%',
  },
  input: {
    borderWidth: 1,
    borderColor: '#D3D3D3',
    borderRadius: 8,
    padding: 12,
    marginBottom: 15,
  },
  inputPasswordContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#D3D3D3',
    borderRadius: 8,
    paddingHorizontal: 12,
    marginBottom: 10,
  },
  inputPassword: {
    flex: 1,
    height: 50,
  },
  esqueciSenha: {
    textAlign: 'right',
    color: '#666',
    marginBottom: 30,
    fontSize: 13,
  },
  button: {
    backgroundColor: '#4EC063',
    paddingVertical: 15,
    borderRadius: 30,
    alignItems: 'center',
    marginBottom: 20,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  naoTemConta: {
    textAlign: 'center',
    color: '#666',
    fontSize: 13,
  },
  cadastrarLink: {
    color: '#4EC063',
    fontWeight: 'bold',
  },
});
