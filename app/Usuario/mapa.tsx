import { useRouter } from 'expo-router';
import React from 'react';
import { Button, Image, Modal, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import Icon from 'react-native-vector-icons/Feather';
import CooperativaModal, { Cooperativa } from './CooperativaModal';

export default function TelaMapa() {
  const router = useRouter();
  const [modalVisible, setModalVisible] = React.useState(false);
  const [modalCooperativaVisible, setModalCooperativaVisible] = React.useState(false);
  const [selectedCooperativa, setSelectedCooperativa] = React.useState<Cooperativa | null>(null);

  // Mock cooperativas data (pretend this comes from backend)
  const cooperativas = [
    {
      id: 1,
      nome: 'Cooperativa Verde',
      areaDeInfluencia: ['Jatiúca', 'Ponta Verde'],
      localizacao: {
        endereco: 'Av. Dr. Antônio Gomes de Barros, 970 - Jatiúca, Maceió - AL, 57036-000',
        latitude: -9.648846, // Approximate coordinates for the address
        longitude: -35.708377,
      },
      materiaisReciclaveis: ['latinhas', 'garrafas pet', 'papel'],
      image: require('../../assets/images/perfil-roxo-homem.png'),
    },
    // Adicione mais cooperativas aqui no futuro
  ];

  const handleNavigate = () => {
    setModalVisible(true);
  };

  return (
    <View style={styles.container}>
      {/* Cabeçalho com a logo */}
      <View style={styles.header}>
        <Image source={require('../../assets/images/logo.png')} style={styles.logo} />
      </View>

      {/* Modal for property info */}
      <Modal
        visible={modalVisible}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: 'rgba(0,0,0,0.5)'
        }}>
          <View style={{
            backgroundColor: 'white',
            padding: 20,
            borderRadius: 10,
            minWidth: 250,
            alignItems: 'center'
          }}>
            <Text style={{ fontSize: 18, fontWeight: 'bold', marginBottom: 10 }}>Imóvel Selecionado</Text>
            <Text>Maceió, Alagoas</Text>
            {/* Add more property info here if you want */}
            <Button title="Fechar" onPress={() => setModalVisible(false)} />
          </View>
        </View>
      </Modal>

      <CooperativaModal
        visible={modalCooperativaVisible}
        onClose={() => {
          setModalCooperativaVisible(false);
          setSelectedCooperativa(null);
        }}
        cooperativa={selectedCooperativa}
      />

      {/* Mapa real */}
      {/* TODO: initial region vai ser a localização do imóvel selecionado */}
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: -9.6498487,
          longitude: -35.7089492,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
        provider="google"
      >
        {/* User's property marker */}
        <Marker
          coordinate={{ latitude: -9.6498487, longitude: -35.7089492 }}
          title="Maceió"
          description="Maceió, Alagoas"
          onPress={handleNavigate}
        />
        {/* Cooperativa marker (green) */}
        {cooperativas.map((coop) => (
          <Marker
            key={coop.id}
            coordinate={{
              latitude: coop.localizacao.latitude,
              longitude: coop.localizacao.longitude,
            }}
            pinColor="#4EC063" // Green color
            title={coop.nome}
            description={`Área de influência: ${coop.areaDeInfluencia.join(', ')}`}
            onPress={() => {
              const found = cooperativas.find(c => c.id === coop.id) || null;
              setSelectedCooperativa(found);
              setModalCooperativaVisible(true);
            }}
          />
        ))}
      </MapView>

      {/* Barra Inferior */}
      <View style={styles.navBar}>
        <TouchableOpacity
          style={styles.navIcon}
          onPress={() => router.push('/Usuario/pagina-inicial')} // Página inicial (home)
        >
          <Icon name="home" size={30} color="#2F2F2F" />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.navIcon}
          onPress={() => router.push('/Usuario/mapa')} // Mapa
        >
          <Icon name="map" size={30} color="#2F2F2F" />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.navIcon}
          onPress={() => router.push('/Usuario/tutoriais')} // Tutoriais
        >
          <Icon name="info" size={30} color="#2F2F2F" />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.navIcon}
          onPress={() => router.push('/perfil')} // Perfil
        >
          <Icon name="user" size={30} color="#2F2F2F" />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  header: {
    width: '100%',
    height: 70,
    backgroundColor: '#3629B7', // Cabeçalho roxo
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    width: 100,
    height: 40,
    resizeMode: 'contain',
  },
  map: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  greenArea: {
    position: 'absolute',
    left: 50,  // Ajuste o valor conforme a área verde do mapa
    top: 120,  // Ajuste o valor conforme a área verde do mapa
    width: 100, // Ajuste o tamanho da área
    height: 100, // Ajuste o tamanho da área
    backgroundColor: 'transparent', // Torna a área invisível, mas clicável
  },
  infoText: {
    fontSize: 16,
    color: '#2F2F2F',
    textAlign: 'center',
    marginTop: 20,
    paddingHorizontal: 20,
  },
  navBar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingBottom: 10,  // Ajuste do padding para a barra inferior
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'white', // Barra inferior com fundo branco
    borderTopWidth: 1,
    borderTopColor: '#E0E0E0',
  },
  navIcon: {
    padding: 10,
  },
});
