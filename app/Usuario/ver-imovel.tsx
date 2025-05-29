import React, { useState, useEffect } from 'react';
import {
  View, Text, TouchableOpacity, StyleSheet,
  TextInput, Alert, ScrollView,
} from 'react-native';
import { useRouter } from 'expo-router';
import Icon from 'react-native-vector-icons/Feather';
import { Picker } from '@react-native-picker/picker';
import { useImoveis } from '~/providers/Imoveis-contexts';


export default function VerImovel() {
  const router = useRouter();
  const { imoveis, setImoveis } = useImoveis();

  // Vamos editar o imóvel com id = 1 (exemplo)
  const imovel = imoveis.find(i => i.id === 1);

  // Estados locais para edição
  const [modoEdicao, setModoEdicao] = useState(false);
  const [nome, setNome] = useState(imovel?.nome ?? '');
  const [tipo, setTipo] = useState('Residencial'); // Seu modelo não tem tipo, você pode adicionar
  const [endereco, setEndereco] = useState(imovel?.endereco ?? '');
  const [lixoHoje, setLixoHoje] = useState('Sim');


  useEffect(() => {
  if (imovel) {
    setNome(imovel.nome);
    setEndereco(imovel.endereco);
    setLixoHoje(imovel.lixoParaColetaHoje ? 'Sim' : 'Não');
  }
}, [imovel]);

  const handleGoBack = () => {
  if (router.canGoBack()) {
    router.back();
  } else {
    router.push('/');
  }
};

  const salvarPopup = () => {
    Alert.alert('Tudo certo!', 'Dados salvos com sucesso!');
  };

  const handleSalvarLixoHoje = () => {
    if (!imovel) return;

    const imoveisAtualizados = imoveis.map(i =>
        i.id === imovel.id
            ? { ...i, lixoParaColetaHoje: lixoHoje === 'Sim' } // <-- ATUALIZA O NOVO CAMPO
            : i
    );
    setImoveis(imoveisAtualizados);
    Alert.alert('Sucesso!', 'Informação de coleta atualizada!');
};

  const handleSalvarEdicao = () => {
    if (!imovel) return;

    // Atualiza imóvel no contexto
    const imoveisAtualizados = imoveis.map(i =>
      i.id === imovel.id
        ? { ...i, nome, endereco /* , tipo se existir */ }
        : i
    );

    <View style={styles.dropdownContainer}>
      <Text style={styles.label}>Hoje tem lixo reciclável para coleta?</Text>
      <View style={styles.pickerWrapper}>
        <Picker
            selectedValue={lixoHoje}
            onValueChange={setLixoHoje} // Permita que o Picker mude o estado local
            style={styles.picker}
            enabled={!modoEdicao} // Mantenha disabled se estiver em modo de edição de outros campos
        >
            <Picker.Item label="Sim" value="Sim" />
            <Picker.Item label="Não" value="Não" />
        </Picker>
      </View>
      <TouchableOpacity
        style={styles.smallButton}
        onPress={handleSalvarLixoHoje} // <-- CHAMA A NOVA FUNÇÃO DE SALVAR
        disabled={modoEdicao}
      >
        <Text style={styles.smallButtonText}>Salvar</Text>
      </TouchableOpacity>
    </View>

    setImoveis(imoveisAtualizados);
    setModoEdicao(false);
    Alert.alert('Tudo certo!', 'Dados salvos com sucesso!');
  };

  if (!imovel) {
    return (
      <View style={styles.container}>
        <Text>Imóvel não encontrado.</Text>
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
            <Text style={styles.label}>Nome do Imóvel</Text>
            <TextInput
              style={styles.input}
              value={nome}
              onChangeText={setNome}
              placeholder="Digite o nome"
            />

            <Text style={styles.label}>Tipo do Imóvel</Text>
            <View style={styles.pickerWrapper}>
              <Picker selectedValue={tipo} onValueChange={setTipo} style={styles.picker}>
                <Picker.Item label="Residencial" value="Residencial" />
                <Picker.Item label="Comercial" value="Comercial" />
              </Picker>
            </View>

            <Text style={styles.label}>Endereço</Text>
            <TextInput
              style={styles.input}
              value={endereco}
              onChangeText={setEndereco}
              placeholder="Digite o endereço"
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
            <Text style={styles.imovelName}>{nome}</Text>
            <Text style={styles.imovelAddress}>{endereco}</Text>
            <Text style={styles.infoText}>Tipo: {tipo}</Text>
            <Text style={styles.infoText}>Lixo Reciclável: Sim</Text>
            <Text style={styles.infoText}>Coletas Feitas: 10</Text>
            <Text style={styles.infoText}>Coletas Incompletas: 2</Text>

            <View style={{ paddingHorizontal: 20, marginTop: 30 }}>
              <TouchableOpacity style={styles.editButton} onPress={() => setModoEdicao(true)}>
                <Text style={styles.buttonText}>Editar Imóvel</Text>
              </TouchableOpacity>
            </View>
          </>
        )}

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
        onPress={handleSalvarLixoHoje} // <-- CHAMA A NOVA FUNÇÃO DE SALVAR
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
    backgroundColor: 'rgba(0,0,0,0.2)',
  },
  imovelAddress: {
    fontSize: 16,
    color: '#888888',
    textAlign: 'center',
    marginBottom: 10,
  },
  infoText: {
    fontSize: 16,
    color: '#2F2F2F',
    marginTop: 8,
    textAlign: 'center',
  },
  label: {
    fontSize: 16,
    color: '#2F2F2F',
    marginBottom: 5,
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
