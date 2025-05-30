import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { Image, Modal, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import { tutorialContent } from '~/app/Usuario/util/tutorialContent';

export default function Tutoriais() {
  const router = useRouter();
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedMaterial, setSelectedMaterial] = useState('');

  const handleMaterialClick = (material: string) => {
    setSelectedMaterial(material);
    setModalVisible(true);
  };

  const renderModalContent = () => {
    const content = tutorialContent[selectedMaterial];
    if (!content) return null;

    const renderText = (item: string | { text: string; style: any }, index: number) => {
      if (typeof item === 'string') {
        return <Text key={index} style={styles.modalListItem}>• {item}</Text>;
      }
      return <Text key={index} style={[styles.modalListItem, item.style]}>• {item.text}</Text>;
    };

    return (
      <View style={styles.modalContentContainer}>
        <View style={styles.modalSection}>
          <Text style={styles.modalSectionTitle}>Separação</Text>
          <View style={styles.separacaoContainer}>
            <View style={styles.separacaoColumn}>
              <Text style={styles.separacaoTitleGreen}>Pode:</Text>
              {content.content.separacao.pode.map((item, index) => (
                <Text key={index} style={styles.separacaoItemGreen}>• {item}</Text>
              ))}
            </View>
            <View style={styles.separacaoColumn}>
              <Text style={styles.separacaoTitleRed}>Não pode:</Text>
              {content.content.separacao.naoPode.map((item, index) => (
                <Text key={index} style={styles.separacaoItemRed}>• {item}</Text>
              ))}
            </View>
          </View>
        </View>

        <View style={styles.modalSection}>
          <Text style={styles.modalSectionTitle}>Limpeza</Text>
          {content.content.limpeza.map((item, index) => (
            renderText(item, index)
          ))}
        </View>

        <View style={styles.modalSection}>
          <Text style={styles.modalSectionTitle}>Preparação</Text>
          {content.content.preparacao.map((item, index) => (
            renderText(item, index)
          ))}
        </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollView}>
        <Image source={require('../../../assets/images/reciclar.png')} style={styles.topImage} />

        <Text style={styles.h1}>Como participar da coleta seletiva?</Text>

        <Text style={styles.h3}>
          Tudo o que você precisa saber para separar, preparar e entregar seus recicláveis corretamente.
        </Text>

        <View style={styles.divider} />

        <Text style={styles.h1}>Por que reciclar?</Text>

        <View style={styles.listContainer}>
          <Text style={styles.listItem}>
            • Protege o meio ambiente - Reduzimos a quantidade de lixo nos aterros e evitamos a poluição do solo, da água e do ar.
          </Text>
          <Text style={styles.listItem}>
            • Damos uma nova vida aos materiais - Materiais recicláveis podem virar novos produtos, economizando energia e recursos naturais como água e petróleo.
          </Text>
          <Text style={styles.listItem}>
            • Apoiamos o trabalho das cooperativas - Você fortalece o sustento de centenas de famílias que vivem da reciclagem, promovendo inclusão social e dignidade.
          </Text>
          <Text style={styles.listItem}>
            • Cuidamos do futuro - Cada embalagem reciclada hoje ajuda a construir um planeta mais limpo e equilibrado para as próximas gerações.
          </Text>
        </View>

        <Text style={styles.h1}>Como separar e tratar os materiais?</Text>

        <View style={styles.materialButtonsContainer}>
          <TouchableOpacity
            style={[styles.materialButton, { backgroundColor: '#E31B1B' }]}
            onPress={() => handleMaterialClick('plastico')}
          >
            <Text style={styles.materialButtonText}>Plástico</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.materialButton, { backgroundColor: '#F9C534' }]}
            onPress={() => handleMaterialClick('metal')}
          >
            <Text style={styles.materialButtonText}>Metal</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.materialButton, { backgroundColor: '#4EC063' }]}
            onPress={() => handleMaterialClick('vidro')}
          >
            <Text style={styles.materialButtonText}>Vidro</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.materialButton, { backgroundColor: '#3629B7' }]}
            onPress={() => handleMaterialClick('papel')}
          >
            <Text style={styles.materialButtonText}>Papel</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <TouchableOpacity
              style={styles.closeButton}
              onPress={() => setModalVisible(false)}
            >
              <Text style={styles.closeButtonText}>x</Text>
            </TouchableOpacity>
            {selectedMaterial && (
              <ScrollView style={styles.modalScrollView} showsVerticalScrollIndicator={false}>
                <View style={styles.staticContent}>
                  <View style={styles.imageContainer}>
                    <Image source={tutorialContent[selectedMaterial].image} style={styles.modalImage} />
                  </View>
                  <View style={styles.darkenedBackground} />
                </View>
                <Text style={styles.modalTitle}>{tutorialContent[selectedMaterial].title}</Text>
                {renderModalContent()}
              </ScrollView>
            )}
          </View>
        </View>
      </Modal>

      <View style={styles.navBar}>
        <TouchableOpacity
          style={styles.navIcon}
          onPress={() => router.push('/(private)/(cooperativa)/home')}
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
  scrollView: {
    flexGrow: 1,
    padding: 20,
    paddingBottom: 80,
  },
  topImage: {
  width: 250,
  height: 250,
  resizeMode: 'contain',
  alignSelf: 'center',
  marginBottom: 20,
},
  h1: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#3629B7',
    marginTop: 20,
    marginBottom: 10,
  },
  h3: {
    fontSize: 18,
    color: '#666666',
    marginBottom: 20,
    lineHeight: 24,
  },
  divider: {
    height: 1,
    backgroundColor: '#E0E0E0',
    marginVertical: 20,
  },
  listContainer: {
    marginBottom: 20,
  },
  listItem: {
    fontSize: 16,
    color: '#444444',
    marginBottom: 15,
    lineHeight: 22,
  },
  materialButtonsContainer: {
    marginTop: 20,
    gap: 15,
  },
  materialButton: {
    backgroundColor: '#3629B7',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
  },
  materialButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  staticContent: {
    position: 'relative',
    width: '100%',
    marginBottom: 20,
  },
  imageContainer: {
    position: 'relative',
    alignItems: 'center',
    width: '100%',
    zIndex: 1,
  },
  darkenedBackground: {
    position: 'absolute',
    top: 50,
    left: -20,
    right: -20,
    bottom: -1000,
    backgroundColor: 'white',
    borderRadius: 50,
    zIndex: 0,
  },
  modalImage: {
    borderRadius: 50,
    width: 100,
    height: 100,
    zIndex: 1,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: '#3629B7',
    borderRadius: 20,
    width: '90%',
    maxWidth: 400,
    height: '90%',
    maxHeight: 700,
    elevation: 5,
    position: 'relative',
    overflow: 'hidden',
  },
  modalScrollView: {
    padding: 20,
    paddingTop: 60,
    paddingBottom: 100,
    width: '100%',
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#3629B7',
    marginBottom: 10,
    textAlign: 'center',
  },
  modalContentContainer: {
    marginTop: 15,
    paddingBottom: 60,
  },
  modalSection: {
    marginBottom: 15,
    paddingBottom: 5,
  },
  modalSectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#3629B7',
    marginBottom: 8,
  },
  separacaoContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 15,
  },
  separacaoColumn: {
    flex: 1,
  },
  separacaoTitleGreen: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#4EC063',
    marginBottom: 6,
  },
  separacaoTitleRed: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#E31B1B',
    marginBottom: 6,
  },
  separacaoItemGreen: {
    fontSize: 14,
    color: '#4EC063',
    marginBottom: 4,
  },
  separacaoItemRed: {
    fontSize: 14,
    color: '#E31B1B',
    marginBottom: 4,
  },
  modalListItem: {
    fontSize: 14,
    color: '#444444',
    marginBottom: 4,
  },
  closeButton: {
    position: 'absolute',
    top: 10,
    right: 20,
    backgroundColor: '#E0E0E0',
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 2,
    zIndex: 2,
  },
  closeButtonText: {
    color: '#444444',
    fontSize: 28,
    fontWeight: 'bold',
    fontFamily: 'System',
    lineHeight: 28,
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
