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
import { useAuth } from '~/providers/auth-context';

export default function Perfil() {
  const router = useRouter();
  const { signOut } = useAuth()
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
      {/* Cabeçalho com imagem */}
      <View style={styles.header}>
        <Image
          source={require('../../assets/images/perfil-roxo-mulher.png')}
          style={styles.profileImage}
        />
        <TouchableOpacity onPress={() => setShowUploadModal(true)}>
          <Text style={styles.changePhoto}>Mudar Foto</Text>
        </TouchableOpacity>
      </View>

      {/* Opções */}
      <View style={styles.options}>
        <TouchableOpacity onPress={() => router.push('/mudar-senha-perfil')}>
          <Text style={styles.optionText}>Mudar Senha</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => router.push('/Cooperativa/editar-perfil-cooperativa')}>
          <Text style={styles.optionText}>Mudar Informações Pessoais</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => router.push('/termo-privacidade')}>
          <Text style={styles.optionText}>Termos de Uso e Privacidade</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setShowDeleteModal(true)}>
          <Text style={styles.optionText}>Excluir Conta</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => {
          signOut()
          router.replace('/signin')
        }}>
          <Text style={[styles.optionText, { color: '#B00020' }]}>Sair da conta</Text>
        </TouchableOpacity>
      </View>

      {/* Envio de imagem */}
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

      {/* Confirmação de exclusão */}
      <Modal visible={showDeleteModal} transparent animationType="fade">
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={[styles.modalTitle, { color: '#4EC063' }]}>Você tem certeza?</Text>
            <View style={styles.modalButtonsRow}>
              <TouchableOpacity
                style={[styles.modalButton, { backgroundColor: '#4EC063' }]}
                onPress={() => {
                  setShowDeleteModal(false);
                  router.push('/initial-decision');
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

      {/* Barra de navegação inferior */}
      <View style={styles.navBar}>
        <TouchableOpacity style={styles.navIcon} onPress={() => router.push('/home')}>
          <Icon name="map" size={28} color="#2F2F2F" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.navIcon} onPress={() => router.push('/Cooperativa/gerenciar-caminhao')}>
          <Icon name="truck" size={28} color="#2F2F2F" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.navIcon} onPress={() => router.push('/Cooperativa/gerenciar-rotas')}>
          <Icon name="info" size={28} color="#2F2F2F" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.navIcon} onPress={() => router.push('/Cooperativa/perfil-cooperativa')}>
          <Icon name="user" size={28} color="#2F2F2F" />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    paddingBottom: 80,
  },
  header: {
    backgroundColor: '#3629B7',
    alignItems: 'center',
    paddingVertical: 20,
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
