import { useRouter } from 'expo-router';
import React from 'react';
import { Button, Image, Modal, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import Icon from 'react-native-vector-icons/Feather';
import CooperativaModal, { Cooperativa } from './CooperativaModal';
import { useImoveis } from '~/providers/Imoveis-contexts'; 

export default function TelaMapa() {
  const router = useRouter();
  const [modalVisible, setModalVisible] = React.useState(false);
  const [modalCooperativaVisible, setModalCooperativaVisible] = React.useState(false);
  const [selectedCooperativa, setSelectedCooperativa] = React.useState<Cooperativa | null>(null);
  const [selectedImovel, setSelectedImovel] = React.useState<any>(null); // Estado para o imóvel selecionado

  // Hook para acessar os imóveis do contexto
  const { imoveis } = useImoveis();

  // vai fazer o fetch das cooperativas do backend, por enquanto esses sao os dados que viriam
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

  ];

  const handleImovelPress = (imovel: any) => {
    setSelectedImovel(imovel);
    setModalVisible(true);
  };

  return (
    <View style={styles.container}>
 
      <View style={styles.header}>
        <Image source={require('../../assets/images/logo.png')} style={styles.logo} />
      </View>

   
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
            {selectedImovel && (
              <>
                <Text>Nome: {selectedImovel.nome}</Text>
                <Text>Endereço: {selectedImovel.endereco}</Text>
                <Text>Status: {selectedImovel.status}</Text>
              </>
            )}
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

      
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: -9.6498487, // Latitude padrão (ex: Maceió, Alagoas)
          longitude: -35.7089492, // Longitude padrão
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
        provider="google"
      >
        {imoveis.filter(imovel => imovel.lixoParaColetaHoje === true)
        .map((imovel) => (
          
          <Marker
            key={imovel.id}
            coordinate={{ latitude: imovel.latitude, longitude: imovel.longitude }}
            title={imovel.nome}
            description={imovel.endereco}
            pinColor="#2F2F2F" 
            onPress={() => handleImovelPress(imovel)}
          />
        ))}

      
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
    left: 50,
    top: 120,
    width: 100,
    height: 100,
    backgroundColor: 'transparent',
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
    paddingBottom: 10,
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'white',
    borderTopWidth: 1,
    borderTopColor: '#E0E0E0',
  },
  navIcon: {
    padding: 10,
  },
});