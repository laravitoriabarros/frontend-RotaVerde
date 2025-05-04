import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';

export default function PaginaDeEntrada() {
  const router = useRouter();

  return (
    <View style={styles.container}>

      <Image
        source={require('../assets/images/pagina-decisao-inicial.png')}
        style={styles.image}
        resizeMode="contain"
      />

      {/* Texto principal */}
      <Text style={styles.title}>O que você quer fazer agora?</Text>

      {/* Texto secundário */}
      <Text style={styles.subtitle}>
        Você precisa se autenticar para usar o app!{"\n"}
        Entre em sua conta ou crie uma nova.
      </Text>

      {/* Botões */}
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={[styles.button, { backgroundColor: '#3629B7' }]}
          onPress={() => router.push('/login')}
        >
          <Text style={styles.buttonText}>Entrar</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.button, { backgroundColor: '#4EC063' }]}
          onPress={() => router.push('/Pagina-De-Cadastro/cadastro-parte1')}
        >
          <Text style={styles.buttonText}>Cadastrar</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
    backgroundColor: '#fff',
  },
  image: {
    width: '80%',
    height: 200,
    marginBottom: 30,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#3629B7',
    marginBottom: 10,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 14,
    color: '#4B4B4B',
    textAlign: 'center',
    marginBottom: 30,
  },
  buttonContainer: {
    width: '100%',
    gap: 15,
  },
  button: {
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
});
