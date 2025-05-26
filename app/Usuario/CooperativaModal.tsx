import React from 'react';
import { Modal, StyleSheet, Text, View } from 'react-native';

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
}

interface CooperativaModalProps {
  visible: boolean;
  onClose: () => void;
  cooperativa: Cooperativa | null;
}

export default function CooperativaModal({ visible, onClose, cooperativa }: CooperativaModalProps) {
  if (!cooperativa) return null;

  return (
    <Modal
      visible={visible}
      transparent={true}
      animationType="slide"
      onRequestClose={onClose}
    >
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <Text style={styles.title}>{cooperativa.nome_cooperativa}</Text>
          <Text style={styles.subtitle}>Responsável: {cooperativa.nome_usuario}</Text>
          <Text style={styles.sectionTitle}>Áreas de Atuação:</Text>
          <View style={styles.areasContainer}>
            {cooperativa.area_atuacao.map((area, index) => (
              <Text key={index} style={styles.areaItem}>
                • {area}
              </Text>
            ))}
          </View>
          <Text style={styles.sectionTitle}>Bairros Atendidos:</Text>
          <View style={styles.areasContainer}>
            {cooperativa.endereco.bairros_atendidos.map((bairro, index) => (
              <Text key={index} style={styles.areaItem}>
                • {bairro}
              </Text>
            ))}
          </View>
          <Text style={styles.closeButton} onPress={onClose}>
            Fechar
          </Text>
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
    padding: 20,
    borderRadius: 10,
    width: '80%',
    maxHeight: '80%',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#2F2F2F',
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    marginBottom: 15,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#2F2F2F',
  },
  areasContainer: {
    marginBottom: 20,
  },
  areaItem: {
    fontSize: 16,
    color: '#666',
    marginBottom: 5,
  },
  closeButton: {
    fontSize: 16,
    color: '#4EC063',
    textAlign: 'center',
    padding: 10,
    borderTopWidth: 1,
    borderTopColor: '#eee',
  },
});