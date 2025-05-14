import React from 'react';
import { Button, Image, Modal, Text, View } from 'react-native';

// Type for cooperativa
export type Cooperativa = {
  id: number;
  nome: string;
  areaDeInfluencia: string[];
  localizacao: {
    endereco: string;
    latitude: number;
    longitude: number;
  };
  materiaisReciclaveis: string[];
  image?: any; // require() or uri
};

interface CooperativaModalProps {
  visible: boolean;
  onClose: () => void;
  cooperativa: Cooperativa | null;
}

const CooperativaModal: React.FC<CooperativaModalProps> = ({ visible, onClose, cooperativa }) => (
  <Modal
    visible={visible}
    transparent={true}
    animationType="slide"
    onRequestClose={onClose}
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
        minWidth: 280,
        alignItems: 'center'
      }}>
        {cooperativa && (
          <>
            <Image
              source={cooperativa.image}
              style={{ width: 80, height: 80, borderRadius: 40, marginBottom: 10 }}
              resizeMode="cover"
            />
            <Text style={{ fontSize: 18, fontWeight: 'bold', marginBottom: 10 }}>{cooperativa.nome}</Text>
            <Text style={{ marginBottom: 5 }}>Endereço: {cooperativa.localizacao.endereco}</Text>
            <Text style={{ marginBottom: 5 }}>Área de influência: {cooperativa.areaDeInfluencia.join(', ')}</Text>
            <Text style={{ marginBottom: 5 }}>Coletamos: {cooperativa.materiaisReciclaveis.join(', ')}</Text>
          </>
        )}
        <Button title="Fechar" onPress={onClose} />
      </View>
    </View>
  </Modal>
);

export default CooperativaModal;