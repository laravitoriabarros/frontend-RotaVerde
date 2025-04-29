import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { useRouter } from 'expo-router';
import Icon from 'react-native-vector-icons/Feather';

export default function CadastroUsuario() {
  const router = useRouter();

  const handleContinuar = () => {
    router.push('/login');
  };

  return (
    <View style={styles.container}>
      {/* Botão de Voltar */}
      <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
        <Icon name="arrow-left" size={28} color="#4EC063" />
      </TouchableOpacity>

      {/* Imagem do logo*/}
      <Image
        source={require('../../assets/images/logo.png')}
        style={styles.image}
        resizeMode="contain"
      />

      {/* Título */}
      <Text style={styles.title}>Cadastre - se</Text>

      {/* Campos de cadastro */}
      <Text style={styles.label}>Nome</Text>
      <TextInput style={styles.input} placeholder="Digite seu nome..." />

      <Text style={styles.label}>Nome de Usuário</Text>
      <TextInput style={styles.input} placeholder="Digite seu nome de usuário..." />

      <Text style={styles.label}>Método de Contato</Text>
      <TextInput style={styles.input} placeholder="Digite seu número ou email..." />

      <Text style={styles.label}>Senha</Text>
      <TextInput style={styles.input} placeholder="Digite sua senha" secureTextEntry />

      <Text style={styles.label}>Confirmar senha</Text>
      <TextInput style={styles.input} placeholder="Confirme sua senha" secureTextEntry />

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
