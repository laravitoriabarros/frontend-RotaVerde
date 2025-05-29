import React, { useState, useEffect } from 'react';
import {
  View, Text, TouchableOpacity, StyleSheet,
  TextInput, Alert, ScrollView,
} from 'react-native';
import { useRouter, useLocalSearchParams, useFocusEffect } from 'expo-router';
import Icon from 'react-native-vector-icons/Feather';
import { Picker } from '@react-native-picker/picker';
import { useImoveis } from '~/providers/Imoveis-contexts';

export default function VerImovel() {
  const router = useRouter();
  const { imoveis, setImoveis } = useImoveis();
  const params = useLocalSearchParams();
  const imovelId = typeof params.id === 'string' ? params.id : undefined;

  const imovel = imoveis.find(i => i.id === imovelId);

  const [modoEdicao, setModoEdicao] = useState(false);
  const [logradouro, setLogradouro] = useState(imovel?.endereco?.logradouro ?? '');
  const [lixoHoje, setLixoHoje] = useState(imovel?.coletavel ? 'Sim' : 'Não');

  useEffect(() => {
    if (imovel) {
      setLogradouro(imovel.endereco.logradouro ?? ''); 
      setLixoHoje(imovel.coletavel ? 'Sim' : 'Não');
    }
  }, [imovel]);

  const handleGoBack = () => {
    if (router.canGoBack()) {
      router.back();
    } else {
      router.push('/');
    }
  };

  const handleSalvarLixoHoje = () => {
    if (!imovel) return;

    const imoveisAtualizados = imoveis.map(i =>
      i.id === imovel.id
        ? { ...i, coletavel: lixoHoje === 'Sim' }
        : i
    );
    setImoveis(imoveisAtualizados);
    Alert.alert('Sucesso!', 'Informação de coleta atualizada!');
  };

  const handleSalvarEdicao = () => {
    if (!imovel) return;

    const imoveisAtualizados = imoveis.map(i =>
      i.id === imovel.id
        ? {
            ...i,
            endereco: { ...i.endereco, logradouro: logradouro }, 
          }
        : i
    );

    setImoveis(imoveisAtualizados);
    setModoEdicao(false);
    Alert.alert('Tudo certo!', 'Dados salvos com sucesso!');
  };

  if (!imovel) {
    return (
      <View style={styles.container}>
        <Text>Imóvel não encontrado.</Text>
        <TouchableOpacity style={styles.editButton} onPress={handleGoBack}>
          <Text style={styles.buttonText}>Voltar</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={{ paddingBottom: 120 }}>
        <View style={styles.header}>
          <TouchableOpacity onPress={handleGoBack} style={styles.backButton}>
            <Icon name="arrow-left" size={24} color="white" />
          </TouchableOpacity>
          <View style={styles.houseIcon}>
            <Icon name="home" size={50} color="#4EC063" />
          </View>
        </View>

        {modoEdicao ? (
          <View style={styles.form}>
            <Text style={styles.label}>Logradouro</Text>
            <TextInput
              style={styles.input}
              value={logradouro} 
              onChangeText={setLogradouro}
              placeholder="Digite o logradouro"
            />

            <View style={styles.editButtons}>
              <TouchableOpacity style={styles.cancelButton} onPress={() => setModoEdicao(false)}>
                <Text style={styles.cancelButtonText}>Cancelar</Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.saveButton} onPress={handleSalvarEdicao}>
                <Text style={styles.saveButtonText}>Salvar</Text>
              </TouchableOpacity>
            </View>
          </View>
        ) : (
          <>
            <Text style={styles.imovelName}>{imovel.endereco.logradouro}</Text>
            <Text style={styles.imovelAddress}>
                {imovel.endereco.logradouro}, {imovel.endereco.numero} - {imovel.endereco.bairro}, {imovel.endereco.cidade}
            </Text>
            <Text style={styles.infoText}>Lixo Reciclável: {lixoHoje}</Text>
            <Text style={styles.infoText}>Coletas Feitas: 10</Text>
            <Text style={styles.infoText}>Coletas Incompletas: 2</Text>

            <View style={{ paddingHorizontal: 20, marginTop: 30 }}>
              <TouchableOpacity style={styles.editButton} onPress={() => setModoEdicao(true)}>
                <Text style={styles.buttonText}>Editar Imóvel</Text>
              </TouchableOpacity>
            </View>
          </>
        )}

        ---
        <View style={styles.divider}>
          <Text style={styles.dividerText}>Informações de Hoje</Text>
        </View>

        <View style={styles.dropdownContainer}>
          <Text style={styles.label}>Hoje tem lixo reciclável para coleta?</Text>
          <View style={styles.pickerWrapper}>
            <Picker
              selectedValue={lixoHoje}
              onValueChange={setLixoHoje}
              style={styles.picker}
              enabled={!modoEdicao}
            >
              <Picker.Item label="Sim" value="Sim" />
              <Picker.Item label="Não" value="Não" />
            </Picker>
          </View>
          <TouchableOpacity
            style={styles.smallButton}
            onPress={handleSalvarLixoHoje}
            disabled={modoEdicao}
          >
            <Text style={styles.smallButtonText}>Salvar</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>

      <View style={styles.navBar}>
        <TouchableOpacity style={styles.navIcon} onPress={() => router.push('/home')}>
          <Icon name="home" size={30} color="#2F2F2F" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.navIcon} onPress={() => router.push('/map')}>
          <Icon name="map" size={30} color="#2F2F2F" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.navIcon} onPress={() => router.push('/tutorials')}>
          <Icon name="info" size={30} color="#2F2F2F" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.navIcon} onPress={() => router.push('/profile')}>
          <Icon name="user" size={30} color="#2F2F2F" />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: 'white' },
  header: {
    width: '100%',
    backgroundColor: '#3629B7',
    paddingTop: 20,
    paddingBottom: 20,
    alignItems: 'center',
  },
  backButton: { position: 'absolute', left: 20, top: 20, padding: 25 },
  houseIcon: { marginTop: 10 },
  imovelName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#2F2F2F',
    textAlign: 'center',
    marginTop: 20,
  },
  imovelAddress: {
    fontSize: 16,
    color: '#888888',
    textAlign: 'center',
    marginBottom: 10,
    paddingHorizontal: 20,
  },
  infoText: {
    fontSize: 16,
    color: '#2F2F2F',
    marginTop: 8,
    textAlign: 'center',
    paddingHorizontal: 20,
  },
  label: {
    fontSize: 16,
    color: '#2F2F2F',
    marginBottom: 5,
    paddingHorizontal: 20,
  },
  divider: {
    borderTopWidth: 1,
    borderTopColor: '#ccc',
    marginVertical: 30,
    paddingHorizontal: 20,
  },
  dividerText: {
    position: 'absolute',
    top: -12,
    left: 30,
    backgroundColor: 'white',
    paddingHorizontal: 10,
    fontWeight: 'bold',
    color: '#2F2F2F',
  },
  dropdownContainer: {
    marginBottom: 30,
    paddingHorizontal: 20,
  },
  pickerWrapper: {
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 5,
    overflow: 'hidden',
  },
  picker: {
    height: 50,
    width: '100%',
  },
  editButton: {
    backgroundColor: '#3629B7',
    paddingVertical: 15,
    borderRadius: 5,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 18,
  },
  smallButton: {
    backgroundColor: '#4EC063',
    marginTop: 10,
    paddingVertical: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
  smallButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
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
  navIcon: { padding: 10 },
  input: {
    height: 50,
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 5,
    paddingHorizontal: 15,
    fontSize: 16,
    marginBottom: 20,
  },
  form: {
    paddingHorizontal: 20,
    marginTop: 30,
  },
  editButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 10,
  },
  cancelButton: {
    flex: 1,
    backgroundColor: '#E0E0E0',
    paddingVertical: 14,
    borderRadius: 5,
    alignItems: 'center',
  },
  cancelButtonText: {
    color: '#2F2F2F',
    fontWeight: 'bold',
    fontSize: 16,
  },
  saveButton: {
    flex: 1,
    backgroundColor: '#4EC063',
    paddingVertical: 14,
    borderRadius: 5,
    alignItems: 'center',
  },
  saveButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
});