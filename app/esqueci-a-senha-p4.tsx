import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { useRouter } from 'expo-router';

export default function TelaSucesso() {
  const router = useRouter();

  const handlePress = () => {
    router.push('/login'); 
  };

  return (
    <View style={styles.container}>
      <Image 
        source={require('../assets/images/tudo-certo.png')} 
        style={styles.image}
      />
      <Text style={styles.title}>Tudo certo!</Text>
      <Text style={styles.subtitle}>Você conseguiu criar sua nova senha!</Text>
      <Text style={styles.subtitle}>Agora entre em sua conta e vá aproveitar tudo que o app tem pra oferecer!</Text>
      
      <TouchableOpacity style={styles.button} onPress={handlePress}>
        <Text style={styles.buttonText}>Entrar</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    padding: 20,
  },
  image: {
    width: 120,
    height: 120,
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#4EC063',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    color: 'gray',
    textAlign: 'center',
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#4EC063',
    paddingVertical: 12,
    paddingHorizontal: 40,
    borderRadius: 25,
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
