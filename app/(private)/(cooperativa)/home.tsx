import { useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, Image, Modal, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import Icon from 'react-native-vector-icons/Feather';
import { useAuth } from '~/providers/auth-context';
import { useImoveis } from '~/providers/Imoveis-contexts';
import { Cooperativa, getCooperativa } from '~/services/cooperativa/cooperativa-service';

export default function TelaCooperativa() {
  const router = useRouter();
  const { imoveis, loading: imoveisLoading, error: imoveisError } = useImoveis();
  const { userRole, token } = useAuth();
  const [cooperativa, setCooperativa] = useState<Cooperativa | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    const fetchCooperativa = async () => {
      try {
        setLoading(true);

        if (!userRole || !token) {
          setError('User data not found');
          return;
        }

        if (userRole !== 'cooperativa') {
          setError('User is not a cooperativa');
          return;
        }

        // Extract userId from token
        const payload = token.split('.')[1];
        const decodedPayload = JSON.parse(atob(payload));
        console.log('Token payload:', decodedPayload);
        const userId = decodedPayload.sub || decodedPayload.id;
        console.log('Extracted userId:', userId);

        if (!userId) {
          setError('User ID not found in token');
          return;
        }

        console.log('Fetching cooperativa with ID:', userId);
        const response = await getCooperativa(userId);
        console.log('Cooperativa response:', response);
        setCooperativa(response);
      } catch (err) {
        console.error('Error loading cooperativa:', err);
        if (err instanceof Error) {
          setError(`Failed to load cooperativa data: ${err.message}`);
        } else {
          setError('Failed to load cooperativa data');
        }
      } finally {
        setLoading(false);
      }
    };

    fetchCooperativa();
  }, [userRole, token]);

  const goToGerenciarCaminhao = () => {
    router.push('/Cooperativa/gerenciar-caminhao');
  };

  const goToGerenciarRotas = () => {
    router.push('/Cooperativa/gerenciar-rotas');
  };

  const goToPerfil = () => {
    router.push('/Cooperativa/perfil-cooperativa');
  };

  return (
    <View style={styles.container}>
      {/* Cabeçalho com a logo */}
      <View style={styles.header}>
        <Image source={require('../../../assets/images/logo.png')} style={styles.logo} />
        {cooperativa && (
          <Text style={styles.cooperativaName}>{cooperativa.nome_cooperativa}</Text>
        )}
      </View>

      {/* Mapa real */}
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: cooperativa?.location.latitude ?? -9.6498487,
          longitude: cooperativa?.location.longitude ?? -35.7089492,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
        provider="google"
      >
        {cooperativa && (
          <Marker
            coordinate={{
              latitude: cooperativa.location.latitude,
              longitude: cooperativa.location.longitude,
            }}
            title={cooperativa.nome_cooperativa}
            description={`Áreas de atuação: ${cooperativa.area_atuacao.join(', ')}`}
            pinColor="#4EC063"
            onPress={() => setModalVisible(true)}
          />
        )}
        {imoveis.map(imovel => (
          <Marker
            key={imovel.id}
            coordinate={{
              latitude: imovel.location.latitude,
              longitude: imovel.location.longitude,
            }}
            title={`${imovel.endereco.logradouro}, ${imovel.endereco.numero}`}
            description={`${imovel.endereco.bairro} - ${imovel.coletavel ? 'Coletável' : 'Não coletável'}`}
          />
        ))}
      </MapView>

      {/* Modal de detalhes da cooperativa */}
      <Modal
        visible={modalVisible}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            {cooperativa && (
              <>
                <Text style={styles.modalTitle}>{cooperativa.nome_cooperativa}</Text>
                <Text style={styles.modalSubtitle}>Responsável: {cooperativa.nome_usuario}</Text>
                <Text style={styles.modalSectionTitle}>Áreas de Atuação:</Text>
                <View style={styles.areasContainer}>
                  {cooperativa.area_atuacao.map((area, index) => (
                    <Text key={index} style={styles.areaItem}>
                      • {area}
                    </Text>
                  ))}
                </View>
                <Text style={styles.modalSectionTitle}>Bairros Atendidos:</Text>
                <View style={styles.areasContainer}>
                  {cooperativa.endereco.bairros_atendidos.map((bairro, index) => (
                    <Text key={index} style={styles.areaItem}>
                      • {bairro}
                    </Text>
                  ))}
                </View>
                <TouchableOpacity style={styles.closeButton} onPress={() => setModalVisible(false)}>
                  <Text style={styles.closeButtonText}>Fechar</Text>
                </TouchableOpacity>
              </>
            )}
          </View>
        </View>
      </Modal>

      {(loading || imoveisLoading) && (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#3629B7" />
        </View>
      )}

      {(error || imoveisError) && (
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>{error || imoveisError}</Text>
        </View>
      )}

      {/* Barra inferior */}
      <View style={styles.navBar}>
        <TouchableOpacity style={styles.navIcon} onPress={() => {}}>
          <Icon name="map" size={30} color="#3629B7" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.navIcon} onPress={goToGerenciarCaminhao}>
          <Icon name="truck" size={30} color="#2F2F2F" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.navIcon} onPress={goToGerenciarRotas}>
          <Icon name="info" size={30} color="#2F2F2F" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.navIcon} onPress={goToPerfil}>
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
    backgroundColor: '#3629B7',
    paddingTop: 20,
    paddingBottom: 20,
    alignItems: 'center',
  },
  logo: {
    width: 120,
    height: 40,
    resizeMode: 'contain',
  },
  cooperativaName: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 10,
  },
  map: {
    flex: 1,
  },
  navBar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingBottom: 20,
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
  loadingContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
  },
  errorContainer: {
    position: 'absolute',
    top: 100,
    left: 20,
    right: 20,
    backgroundColor: '#ff6b6b',
    padding: 10,
    borderRadius: 5,
  },
  errorText: {
    color: 'white',
    textAlign: 'center',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    width: '90%',
    maxHeight: '80%',
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#3629B7',
  },
  modalSubtitle: {
    fontSize: 16,
    marginBottom: 15,
    color: '#666',
  },
  modalSectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 15,
    marginBottom: 10,
    color: '#3629B7',
  },
  areasContainer: {
    marginBottom: 10,
  },
  areaItem: {
    fontSize: 16,
    marginBottom: 5,
    color: '#666',
  },
  closeButton: {
    backgroundColor: '#3629B7',
    padding: 15,
    borderRadius: 8,
    marginTop: 20,
    alignItems: 'center',
  },
  closeButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
