import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, TextInput, Alert } from 'react-native';
import { useRouter } from 'expo-router';
import Icon from 'react-native-vector-icons/Feather'; // Para a seta verde

export default function TelaCriarSenha() {
  const router = useRouter();
  
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handlePasswordChange = (text: string, isConfirm: boolean) => {
    if (isConfirm) {
      setConfirmPassword(text);
    } else {
      setPassword(text);
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = () => {
    if (password === confirmPassword) {
      router.push('/esqueci-a-senha-p4'); // Redireciona para a próxima tela
    } else {
      Alert.alert("As senhas não coincidem. Tente novamente.");
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
        <Icon name="arrow-left" size={30} color="#4EC063" />
      </TouchableOpacity>

      <Text style={styles.title}>Crie uma nova senha!</Text>
      
      <TextInput
        secureTextEntry={!showPassword}
        value={password}
        onChangeText={(text) => handlePasswordChange(text, false)}
        placeholder="Digite a senha"
        style={styles.input}
      />
      
      <TextInput
        secureTextEntry={!showPassword}
        value={confirmPassword}
        onChangeText={(text) => handlePasswordChange(text, true)}
        placeholder="Confirme a senha"
        style={styles.input}
      />
      
      <TouchableOpacity onPress={togglePasswordVisibility} style={styles.showPasswordText}>
        <Text>{showPassword ? "Ocultar senha" : "Mostrar senha"}</Text>
      </TouchableOpacity>
      
      <TouchableOpacity style={styles.button} onPress={handleSubmit}>
        <Text style={styles.buttonText}>Finalizar</Text>
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
  backButton: {
    position: 'absolute',
    top: 40,
    left: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#000',
    marginBottom: 30,
  },
  input: {
    width: '80%',
    height: 50,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 10,
    paddingLeft: 15,
    fontSize: 16,
    marginBottom: 20,
  },
  showPasswordText: {
    alignSelf: 'flex-start',
    marginLeft: '10%',
    marginBottom: 20,
    color: '#3629B7',
  },
  button: {
    backgroundColor: '#3629B7',
    paddingVertical: 12,
    paddingHorizontal: 50,
    borderRadius: 25,
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
