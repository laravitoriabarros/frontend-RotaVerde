import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, TextInput, Alert } from 'react-native';
import { useRouter } from 'expo-router';
import Icon from 'react-native-vector-icons/Feather';

export default function TelaVerificacao() {
  const router = useRouter();
  
  const [code, setCode] = useState<string[]>(["", "", "", ""]);
  const [timer, setTimer] = useState(30); // Iniciar com 30 segundos
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);

  useEffect(() => {
    let interval: number | undefined; // Garantir que a variável é opcional inicialmente

    if (isButtonDisabled && timer > 0) {
      interval = window.setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
    } else if (timer === 0) {
      setIsButtonDisabled(false);
      if (interval) { // Garantir que o intervalo foi definido
        window.clearInterval(interval);
      }
    }

    return () => {
      if (interval) {
        window.clearInterval(interval); // Limpar o intervalo ao sair do efeito
      }
    };
  }, [isButtonDisabled, timer]);

  const handleChange = (text: string, index: number): void => {
    const newCode = [...code];
    newCode[index] = text;
    setCode(newCode);
  };

  const handleSubmit = () => {
    if (code.join("").length === 4) {
      router.push('/esqueci-a-senha-p3');
    } else {
      Alert.alert("Por favor, insira o código completo.");
    }
  };

  const handleReenviar = () => {
    if (!isButtonDisabled) {
      setIsButtonDisabled(true); // Desabilitar o botão
      setTimer(30); // Reiniciar o cronômetro
      Alert.alert("Código reenviado!");
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
        <Icon name="arrow-left" size={30} color="#4EC063" />
      </TouchableOpacity>
      
      <Text style={styles.title}>Hora de Verificar!</Text>
      <Text style={styles.subtitle}>Digite abaixo o código enviado para você!</Text>
      
      <View style={styles.codeContainer}>
        {code.map((digit, index) => (
          <TextInput
            key={index}
            value={digit}
            onChangeText={(text) => handleChange(text, index)}
            keyboardType="numeric"
            maxLength={1}
            style={styles.codeInput}
            autoFocus={index === 0}
          />
        ))}
      </View>

      <TouchableOpacity onPress={handleReenviar} disabled={isButtonDisabled}>
        <Text style={[styles.reenviarText, isButtonDisabled && styles.disabledText]}>
          {isButtonDisabled ? `Reenviar Código (${timer}s)` : 'Não recebeu o código? Reenviar Código'}
        </Text>
      </TouchableOpacity>

      <Text style={styles.pageIndicator}>1 de 2</Text>

      <View style={styles.progressBar}>
        <View style={[styles.progress, { width: `${(30 - timer) / 30 * 100}%` }]} />
      </View>

      <TouchableOpacity style={styles.button} onPress={handleSubmit}>
        <Text style={styles.buttonText}>Enviar</Text>
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
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    color: '#000',
    marginBottom: 30,
  },
  codeContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '60%',
    marginBottom: 20,
  },
  codeInput: {
    width: 50,
    height: 50,
    borderWidth: 1,
    borderColor: '#000',
    borderRadius: 10,
    textAlign: 'center',
    fontSize: 20,
    fontWeight: 'bold',
  },
  reenviarText: {
    color: '#3629B7',
    fontSize: 14,
    marginBottom: 20,
  },
  disabledText: {
    color: 'gray',
  },
  pageIndicator: {
    fontSize: 12,
    color: 'gray',
    marginBottom: 10,
  },
  progressBar: {
    width: '80%',
    height: 5,
    backgroundColor: '#ddd',
    borderRadius: 10,
    marginBottom: 20,
  },
  progress: {
    height: '100%',
    backgroundColor: '#3629B7',
    borderRadius: 10,
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
