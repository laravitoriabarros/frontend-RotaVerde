import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  ScrollView,
  Alert,
} from 'react-native';
import { useRouter } from 'expo-router';
import Icon from 'react-native-vector-icons/Feather';

interface Imovel {
  id: number;
  nome: string;
  endereco: string;
  status: string;
}

export default function MeusImoveis() {
  const router = useRouter();
  const [modoExclusao, setModoExclusao] = useState(false);
  const [selecionados, setSelecionados] = useState<number[]>([]);
  const [imoveis, setImoveis] = useState<Imovel[]>([
    { id: 1, nome: 'Casa 01', endereco: 'Antares - Rua Sol', status: 'Lixo Reciclável Coleta 1234' },
    { id: 2, nome: 'Víctor Oliveira', endereco: 'Farol - Rua Estrela', status: 'Não Reciclável Coleta 1234' },
    { id: 3, nome: 'Loja 01', endereco: 'Benedito Bentes', status: 'Lixo Reciclável Coleta 1234' },
    { id: 4, nome: 'Fábrica 01', endereco: 'Cruz das Almas', status: 'Lixo Reciclável Coleta 1234' },
  ]);

  const toggleSelecionado = (id: number) => {
    if (selecionados.includes(id)) {
      setSelecionados(selecionados.filter((i) => i !== id));
    } else {
      setSelecionados([...selecionados, id]);
    }
  };

  const confirmarExclusao = () => {
    Alert.alert(
      'Confirmar exclusão',
      `Deseja excluir ${selecionados.length} imóvel(is)?`,
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Confirmar',
          onPress: () => {
            setImoveis(imoveis.filter((i) => !selecionados.includes(i.id)));
            setSelecionados([]);
            setModoExclusao(false);
          },
        },
      ]
    );
  };

  const handleCadastrarNovo = () => {
    router.push('/Usuario/cadastrar-imovel');
  };

  const handleCardClick = (id: number) => {
    router.push(`/Usuario/ver-imovel`);
  };

  return (
    <View style={styles.container}>
      {/* Cabeçalho */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <Icon name="arrow-left" size={24} color="white" />
        </TouchableOpacity>
        <Image source={require('../../assets/images/info-imovel.png')} style={styles.image} />
        <Text style={styles.title}>Meus Imóveis</Text>
        <Text style={styles.subtitle}>Aqui você acompanha a coleta dos seus imóveis!</Text>
      </View>

      {/* Lista rolável de imóveis */}
      <ScrollView contentContainerStyle={styles.cardsContainer}>
        {imoveis.map((imovel) => (
          <TouchableOpacity
            key={imovel.id}
            style={[
              styles.card,
              modoExclusao && selecionados.includes(imovel.id) && styles.cardSelecionado,
            ]}
            onPress={() => handleCardClick(imovel.id)} // Enviando para a tela de detalhes
            disabled={modoExclusao}
          >
            <View style={styles.cardContent}>
              <Icon name="home" size={30} color="#4EC063" />
              <View style={styles.cardText}>
                <Text style={styles.cardTitle}>{imovel.nome}</Text>
                <Text style={styles.cardAddress}>{imovel.endereco}</Text>
                <Text style={styles.cardStatus}>{imovel.status}</Text>
              </View>
              {modoExclusao && (
                <Icon
                  name={selecionados.includes(imovel.id) ? 'check-circle' : 'circle'}
                  size={22}
                  color={selecionados.includes(imovel.id) ? '#4EC063' : '#ccc'}
                  style={styles.cardIcon}
                />
              )}
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Ações */}
      <View style={styles.actions}>
        {modoExclusao ? (
          <TouchableOpacity style={styles.confirmButton} onPress={confirmarExclusao}>
            <Text style={styles.buttonText}>Confirmar</Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity style={styles.deleteButton} onPress={() => setModoExclusao(true)}>
            <Text style={styles.buttonText}>Excluir Imóvel</Text>
          </TouchableOpacity>
        )}

        <TouchableOpacity style={styles.addButton} onPress={handleCadastrarNovo}>
          <Text style={styles.buttonText}>Cadastrar Novo</Text>
        </TouchableOpacity>
      </View>

      {/* Barra Inferior */}
      <View style={styles.navBar}>
        <TouchableOpacity style={styles.navIcon} onPress={() => router.push('/Usuario/pagina-inicial')}>
          <Icon name="home" size={30} color="#2F2F2F" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.navIcon} onPress={() => router.push('/Usuario/mapa')}>
          <Icon name="map" size={30} color="#2F2F2F" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.navIcon} onPress={() => router.push('/Usuario/tutoriais')}>
          <Icon name="info" size={30} color="#2F2F2F" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.navIcon} onPress={() => router.push('/perfil')}>
          <Icon name="user" size={30} color="#2F2F2F" />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: 'white' },
  header: {
    width: '100%',
    paddingTop: 20,
    paddingBottom: 20,
    alignItems: 'center',
  },
  backButton: { position: 'absolute', left: 20, top: 20, padding: 10 },
  image: { width: 120, height: 120, resizeMode: 'contain' },
  title: { fontSize: 24, fontWeight: 'bold', color: '#2F2F2F', marginTop: 10 },
  subtitle: { fontSize: 16, color: '#888888' },
  cardsContainer: { paddingHorizontal: 20, paddingBottom: 120 },
  card: {
    backgroundColor: '#F5F5F5',
    padding: 20,
    borderRadius: 10,
    marginVertical: 10,
    elevation: 2,
  },
  cardSelecionado: {
    borderColor: '#4EC063',
    borderWidth: 2,
    backgroundColor: '#E6F8EC',
  },
  cardContent: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  cardText: { marginLeft: 15, flex: 1 },
  cardTitle: { fontSize: 18, fontWeight: 'bold', color: '#2F2F2F' },
  cardAddress: { fontSize: 14, color: '#888888', marginTop: 5 },
  cardStatus: { fontSize: 14, color: '#4EC063', marginTop: 5 },
  cardIcon: { marginLeft: 10 },
  actions: {
    position: 'absolute',
    bottom: 70,
    left: 20,
    right: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  deleteButton: {
    backgroundColor: '#3629B7',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 5,
  },
  confirmButton: {
    backgroundColor: '#4EC063',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 5,
  },
  addButton: {
    backgroundColor: '#3629B7',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 5,
  },
  buttonText: { color: 'white', fontWeight: 'bold', fontSize: 16 },
  navBar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingBottom: 10,
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'white',
    borderTopWidth: 1,
    borderTopColor: '#E0E0E0',
  },
  navIcon: { padding: 10 },
});
