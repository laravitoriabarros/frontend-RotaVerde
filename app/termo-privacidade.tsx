import React from 'react';
import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import Icon from 'react-native-vector-icons/Feather';

export default function TermoPrivacidade() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
        <Icon name="arrow-left" size={26} color="#4EC063" />
      </TouchableOpacity>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        <View style={styles.imageWrapper}>
          <Image source={require('../assets/images/seguranca.png')} style={styles.image} resizeMode="contain" />
        </View>

        <Text style={styles.title}>Termos de Uso e Privacidade</Text>

        <Text style={styles.paragraph}>
          Bem-vindo ao nosso aplicativo. Ao utilizar nossos serviços, você concorda com os seguintes termos de uso e políticas de privacidade. 
          Nosso objetivo é fornecer uma experiência segura, transparente e eficiente para todos os usuários, garantindo a proteção de seus dados.
        </Text>

        <Text style={styles.sectionTitle}>1. Coleta de Dados</Text>
        <Text style={styles.paragraph}>
          Coletamos informações pessoais como nome, e-mail, endereço e telefone para permitir a identificação do usuário e viabilizar o uso adequado do sistema.
        </Text>

        <Text style={styles.sectionTitle}>2. Localização</Text>
        <Text style={styles.paragraph}>
          Para funcionamento completo das funcionalidades, coletamos dados de localização com o objetivo de monitorar rotas, otimizar coletas e promover segurança na operação.
        </Text>

        <Text style={styles.sectionTitle}>3. Imagens</Text>
        <Text style={styles.paragraph}>
          Podemos solicitar o envio de imagens para personalização de perfis. As imagens são utilizadas exclusivamente para fins operacionais dentro do aplicativo.
        </Text>

        <Text style={styles.sectionTitle}>4. Armazenamento e Segurança</Text>
        <Text style={styles.paragraph}>
          As informações coletadas são armazenadas de forma segura e utilizadas apenas para os fins propostos. Adotamos medidas técnicas e organizacionais para proteger os dados contra acessos não autorizados.
        </Text>

        <Text style={styles.sectionTitle}>5. Consentimento</Text>
        <Text style={styles.paragraph}>
          Ao utilizar o aplicativo, você concorda com a coleta e uso de suas informações conforme descrito neste termo. Caso não concorde, recomendamos que interrompa o uso imediatamente.
        </Text>

        <Text style={styles.sectionTitle}>6. Atualizações</Text>
        <Text style={styles.paragraph}>
          Podemos atualizar esta política periodicamente. Notificaremos os usuários sempre que alterações significativas forem realizadas.
        </Text>

        <Text style={styles.paragraph}>
          Em caso de dúvidas, entre em contato com nossa equipe de suporte: rotaverde@gmail.com.
        </Text>
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
  backButton: {
    paddingHorizontal: 20,
    marginBottom: 10,
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingBottom: 40,
  },
  imageWrapper: {
    alignItems: 'center',
    marginBottom: 20,
  },
  image: {
    width: 150,
    height: 150,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#3629B7',
    textAlign: 'center',
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2F2F2F',
    marginTop: 20,
    marginBottom: 10,
  },
  paragraph: {
    fontSize: 16,
    color: '#444',
    lineHeight: 24,
    textAlign: 'justify',
  },
});
