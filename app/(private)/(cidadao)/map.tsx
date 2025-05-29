import { useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { Button, Image, Modal, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import Toast from 'react-native-toast-message';
import Icon from 'react-native-vector-icons/Feather';
import CooperativaModal, { Cooperativa } from '~/app/Usuario/CooperativaModal';
import { useImoveis } from '~/providers/Imoveis-contexts';
import { getCooperativas } from '~/services/cooperativa/cooperativa-service';

export default function TelaMapa() {
  const router = useRouter();
  const [modalVisible, setModalVisible] = React.useState(false);
  const [modalCooperativaVisible, setModalCooperativaVisible] = React.useState(false);
  const [selectedCooperativa, setSelectedCooperativa] = React.useState<Cooperativa | null>(null);
  const [selectedImovel, setSelectedImovel] = React.useState<any>(null);
  const [cooperativas, setCooperativas] = useState<Cooperativa[]>([]);
  const [loading, setLoading] = useState(true);

  // Hook para acessar os imóveis do contexto
  const { imoveis } = useImoveis();

  useEffect(() => {
    fetchCooperativas();
  }, []);

  const fetchCooperativas = async () => {
    try {
      setLoading(true);
      const data = await getCooperativas();
      setCooperativas(data);
    } catch (error) {
      console.error('Error fetching cooperativas:', error);
      Toast.show({
        type: 'error',
        text1: 'Erro ao carregar cooperativas',
        text2: 'Não foi possível carregar as cooperativas. Tente novamente.'
      });
    } finally {
      setLoading(false);
    }
  };

  const handleImovelPress = (imovel: any) => {
    setSelectedImovel(imovel);
    setModalVisible(true);
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image source={require('../../../assets/images/logo.png')} style={styles.logo} />
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
          latitude: -9.6498487,
          longitude: -35.7089492,
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
              latitude: coop.location.latitude,
              longitude: coop.location.longitude,
            }}
            pinColor="#4EC063"
            title={coop.nome_cooperativa}
            description={`Área de atuação: ${coop.area_atuacao.join(', ')}`}
            onPress={() => {
              setSelectedCooperativa(coop);
              setModalCooperativaVisible(true);
            }}
          />
        ))}
      </MapView>

      <View style={styles.navBar}>
        <TouchableOpacity
          style={styles.navIcon}
          onPress={() => router.push('/home')}
        >
          <Icon name="home" size={30} color="#2F2F2F" />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.navIcon}
          onPress={() => router.push('/map')}
        >
          <Icon name="map" size={30} color="#2F2F2F" />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.navIcon}
          onPress={() => router.push('/tutorials')}
        >
          <Icon name="info" size={30} color="#2F2F2F" />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.navIcon}
          onPress={() => router.push('/profile')}
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
