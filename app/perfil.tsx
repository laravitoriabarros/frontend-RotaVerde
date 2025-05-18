import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  Modal,
  Alert,
} from 'react-native';
import { useRouter } from 'expo-router';
import Icon from 'react-native-vector-icons/Feather';
import * as DocumentPicker from 'expo-document-picker';

export default function Perfil() {
  const router = useRouter();
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showUploadModal, setShowUploadModal] = useState(false);

  const handleSelectImage = async () => {
    const result = await DocumentPicker.getDocumentAsync({
      type: 'image/*',
      copyToCacheDirectory: true,
    });

    if (!result.canceled && result.assets?.length > 0) {
      Alert.alert('Foto enviada com sucesso!');
      setShowUploadModal(false);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <Icon name="arrow-left" size={26} color="white" />
        </TouchableOpacity>
        <Image
          source={require('../assets/images/perfil-roxo-mulher.png')}
          style={styles.profileImage}
        />
        <TouchableOpacity onPress={() => setShowUploadModal(true)}>
          <Text style={styles.changePhoto}>Mudar Foto</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.options}>
        <TouchableOpacity onPress={() => router.push('/mudar-senha-perfil')}>
          <Text style={styles.optionText}>Mudar Senha</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => router.push('/editar-perfil')}>
          <Text style={styles.optionText}>Mudar Informações Pessoais</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => router.push('/termo-privacidade')}>
          <Text style={styles.optionText}>Termos de Uso e Privacidade</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setShowDeleteModal(true)}>
          <Text style={styles.optionText}>Excluir Conta</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => router.replace('/signin')}>
          <Text style={[styles.optionText, { color: '#B00020' }]}>Sair da conta</Text>
        </TouchableOpacity>
      </View>

      <Modal visible={showUploadModal} transparent animationType="fade">
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Enviar nova foto</Text>
            <TouchableOpacity style={styles.modalButton} onPress={handleSelectImage}>
              <Text style={styles.modalButtonText}>Selecionar imagem</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setShowUploadModal(false)}>
              <Text style={styles.modalCancel}>Cancelar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      <Modal visible={showDeleteModal} transparent animationType="fade">
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={[styles.modalTitle, { color: '#4EC063' }]}>Você tem certeza?</Text>
            <View style={styles.modalButtonsRow}>
              <TouchableOpacity
                style={[styles.modalButton, { backgroundColor: '#4EC063' }]}
                onPress={() => {
                  setShowDeleteModal(false);
                  router.push('/pagina-decisao-inicial');
                }}
              >
                <Text style={styles.modalButtonText}>Sim</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.modalButton, { backgroundColor: '#B00020' }]}
                onPress={() => setShowDeleteModal(false)}
              >
                <Text style={styles.modalButtonText}>Não</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    paddingBottom: 40,
  },
  header: {
    backgroundColor: '#3629B7',
    alignItems: 'center',
    paddingTop: 60,
    paddingBottom: 20,
    position: 'relative',
  },
  backButton: {
    position: 'absolute',
    top: 60,
    left: 20,
    zIndex: 1,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 10,
  },
  changePhoto: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
  options: {
    marginTop: 20,
    paddingHorizontal: 20,
  },
  optionText: {
    fontSize: 18,
    color: '#2F2F2F',
    marginBottom: 15,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: '#00000088',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: 'white',
    width: '80%',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 15,
    textAlign: 'center',
  },
  modalButton: {
    backgroundColor: '#3629B7',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 25,
    marginTop: 10,
  },
  modalButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  modalCancel: {
    marginTop: 15,
    color: '#B00020',
    fontWeight: 'bold',
  },
  modalButtonsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    gap: 10,
    marginTop: 10,
  },
});
