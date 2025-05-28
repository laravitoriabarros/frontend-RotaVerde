import React from 'react';
import {Modal, StyleSheet, Text, View,Image, ScrollView,} from 'react-native';
import {FontAwesome5, MaterialCommunityIcons,Entypo,} from '@expo/vector-icons';

export interface Cooperativa {
  id: string;
  nome_usuario: string;
  nome_cooperativa: string;
  area_atuacao: string[];
  location: {
    latitude: number;
    longitude: number;
  };
  endereco: {
    bairros_atendidos: string[];
  };
  imagem?: string;
}

interface CooperativaModalProps {
  visible: boolean;
  onClose: () => void;
  cooperativa: Cooperativa | null;
}

const iconesPorMaterial: { [key: string]: React.ReactNode } = {
  'papéis': <MaterialCommunityIcons name="notebook-outline" size={24} color="white" />,
  'papelão': <MaterialCommunityIcons name="archive" size={24} color="white" />,
  'plásticos': <MaterialCommunityIcons name="bottle-soda" size={24} color="white" />,
  'vidros': <MaterialCommunityIcons name="glass-wine" size={24} color="white" />,
  'metais': <FontAwesome5 name="cog" size={24} color="white" />,
  'podas de árvores': <MaterialCommunityIcons name="leaf" size={24} color="white" />,
  'pilhas': <MaterialCommunityIcons name="battery" size={24} color="white" />,
  'baterias': <MaterialCommunityIcons name="car-battery" size={24} color="white" />,
  'eletrônicos': <MaterialCommunityIcons name="cellphone" size={24} color="white" />,
  'roupas': <MaterialCommunityIcons name="tshirt-crew" size={24} color="white" />,
  'entulhos': <MaterialCommunityIcons name="cube" size={24} color="white" />,
};

export default function CooperativaModal({ visible, onClose, cooperativa }: CooperativaModalProps) {
  if (!cooperativa) return null;

  return (
    <Modal visible={visible} transparent animationType="slide" onRequestClose={onClose}>
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          
          <View style={styles.topBackground} />

          {/* Imagem padrão é icone de reciclagem se a cooperativa nao tiver foto */}
          <View style={styles.fotoContainer}>
            {cooperativa.imagem ? (
              <Image
                source={{ uri: cooperativa.imagem }}
                style={styles.fotoPerfil}
                resizeMode="cover"
              />
            ) : (
              <MaterialCommunityIcons name="recycle" size={50} color="#4EC063" />
            )}
          </View>

          <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
            <Text style={styles.title}>{cooperativa.nome_cooperativa}</Text>
            <Text style={styles.subtitle}>Responsável: {cooperativa.nome_usuario}</Text>

            <Text style={styles.sectionTitle}>Áreas de Atuação:</Text>
            <View style={styles.iconesContainer}>
              {cooperativa.area_atuacao.map((area, index) => (
                <View key={index} style={styles.iconeItem}>
                  <View style={styles.iconeCircle}>
                    {iconesPorMaterial[area.toLowerCase()] || (
                      <FontAwesome5 name="question" size={24} color="white" />
                    )}
                  </View>
                  <Text style={styles.areaLabel}>{area}</Text>
                </View>
              ))}
            </View>

            <Text style={styles.sectionTitle}>Bairros Atendidos:</Text>
            <View style={styles.chipContainer}>
              {cooperativa.endereco.bairros_atendidos.map((bairro, index) => (
                <View key={index} style={styles.chip}>
                  <Text style={styles.chipText}>{bairro}</Text>
                </View>
              ))}
            </View>
          </ScrollView>

          <Text style={styles.closeButton} onPress={onClose}>Fechar</Text>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalContent: {
  backgroundColor: 'white',
  borderRadius: 20,
  paddingTop: 80,
  paddingBottom: 60,
  width: '85%',
  maxHeight: '90%',
  alignItems: 'center',
  position: 'relative',
  overflow: 'hidden',
},

  topBackground: {
  position: 'absolute',
  top: 0,
  left: 0,
  right: 0,
  height: 120,
  backgroundColor: '#3629B7',
  zIndex: -1,
},
  scrollContent: {
    paddingHorizontal: 20,
    paddingBottom: 20,
    alignItems: 'center',
  },
  fotoContainer: {
  position: 'absolute',
  top: 30,
  alignSelf: 'center',
  backgroundColor: 'white',
  borderRadius: 50,
  width: 80,
  height: 80,
  justifyContent: 'center',
  alignItems: 'center',
  zIndex: 2,
  elevation: 5,
  borderWidth: 4,
  borderColor: 'white',
},

  fotoPerfil: {
    width: 70,
    height: 70,
    borderRadius: 35,
  },
  title: {
  fontSize: 24,
  fontWeight: 'bold',
  marginTop: 60,
  color: '#4EC063',
  textAlign: 'center',
},
  subtitle: {
    fontSize: 16,
    color: '#666',
    marginBottom: 15,
    textAlign: 'center',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#2F2F2F',
    alignSelf: 'flex-start',
  },
  iconesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    marginBottom: 20,
  },
  iconeItem: {
    alignItems: 'center',
    margin: 5,
    width: 70,
  },
  iconeCircle: {
    backgroundColor: '#4EC063',
    borderRadius: 35,
    width: 50,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  areaLabel: {
    fontSize: 11,
    color: '#2F2F2F',
    marginTop: 6,
    textAlign: 'center',
  },
  chipContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    marginBottom: 20,
  },
  chip: {
    backgroundColor: '#3629B7',
    borderRadius: 20,
    paddingVertical: 6,
    paddingHorizontal: 15,
    margin: 4,
  },
  chipText: {
    color: 'white',
    fontSize: 14,
  },
  closeButton: {
    fontSize: 16,
    color: '#4EC063',
    textAlign: 'center',
    paddingVertical: 15,
    borderTopWidth: 1,
    borderTopColor: '#eee',
    width: '100%',
    position: 'absolute',
    bottom: 0,
    backgroundColor: 'white',
  },
});
