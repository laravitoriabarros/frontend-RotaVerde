import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image, Alert, ScrollView, KeyboardAvoidingView, Platform } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { useRouter } from 'expo-router';
import Icon from 'react-native-vector-icons/Feather';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

export default function EditarPerfil() {
  const router = useRouter();

  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [descricao, setDescricao] = useState('');
  const [area, setArea] = useState('');
  const [outraArea, setOutraArea] = useState('');
  const [materiaisSelecionados, setMateriaisSelecionados] = useState<string[]>([]);

  const iconesPorMaterial: { [key: string]: React.ReactNode } = {
    'Papéis': <MaterialCommunityIcons name="notebook-outline" size={36} color="white" />,
    'Papelão': <MaterialCommunityIcons name="archive" size={36} color="white" />,
    'Plásticos': <MaterialCommunityIcons name="bottle-soda" size={36} color="white" />,
    'Vidros': <MaterialCommunityIcons name="glass-wine" size={36} color="white" />,
    'Metais': <FontAwesome5 name="cog" size={34} color="white" />,
    'Podas de árvores': <MaterialCommunityIcons name="leaf" size={36} color="white" />,
    'Pilhas': <MaterialCommunityIcons name="battery" size={36} color="white" />,
    'Baterias': <MaterialCommunityIcons name="car-battery" size={36} color="white" />,
    'Eletrônicos': <MaterialCommunityIcons name="cellphone" size={36} color="white" />,
    'Roupas': <MaterialCommunityIcons name="tshirt-crew" size={36} color="white" />,
    'Entulhos': <MaterialCommunityIcons name="cube" size={36} color="white" />,
  };

  const toggleMaterial = (material: string) => {
    if (materiaisSelecionados.includes(material)) {
      setMateriaisSelecionados(prev => prev.filter(m => m !== material));
    } else {
      setMateriaisSelecionados(prev => [...prev, material]);
    }
  };

  const handleConfirmar = () => {
    Alert.alert('Alterações feitas!');
  };

  return (
    <KeyboardAvoidingView style={{ flex: 1 }} behavior="padding" enabled>
      <ScrollView contentContainerStyle={styles.scrollContainer} keyboardShouldPersistTaps="handled" showsVerticalScrollIndicator={false}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <Icon name="arrow-left" size={26} color="#4EC063" />
        </TouchableOpacity>

        <Image source={require('../../assets/images/editar.png')} style={styles.image} resizeMode="contain" />

        <Text style={styles.title}>Vamos editar seu perfil!</Text>

        <Text style={styles.label}>Nome</Text>
        <TextInput style={styles.input} value={nome} onChangeText={setNome} placeholder="Digite seu nome" />

        <Text style={styles.label}>Email</Text>
        <TextInput style={styles.input} value={email} onChangeText={setEmail} placeholder="Digite seu e-mail" keyboardType="email-address" />

        <Text style={styles.label}>Descrição</Text>
        <TextInput style={styles.input} value={descricao} onChangeText={setDescricao} placeholder="Fale um pouco sobre sua cooperativa" multiline />

        <Text style={styles.label}>Área de atuação</Text>
        <View style={styles.pickerWrapper}>
          <Picker selectedValue={area} onValueChange={(value) => setArea(value)} style={styles.picker}>
            <Picker.Item label="Selecione uma área" value="" />
            <Picker.Item label="Farol" value="farol" />
            <Picker.Item label="Antares" value="antares" />
            <Picker.Item label="Outros" value="outros" />
          </Picker>
        </View>

        {area === 'outros' && (
          <TextInput
            style={styles.input}
            value={outraArea}
            onChangeText={setOutraArea}
            placeholder="Digite sua área"
          />
        )}

        <Text style={styles.label}>Selecione todos os materiais recicláveis que você trabalha:</Text>
        <View style={styles.materialGrid}>
  {Object.entries(iconesPorMaterial).map(([material, icon]) => {
    const selecionado = materiaisSelecionados.includes(material);
    return (
      <TouchableOpacity
        key={material}
        style={styles.materialWrapper}
        onPress={() => toggleMaterial(material)}
        activeOpacity={0.8}
      >
        <View style={[
          styles.circle,
          { backgroundColor: selecionado ? '#3629B7' : '#4EC063' }
        ]}>
          {icon}
        </View>
        <Text style={styles.materialText}>{material}</Text>
      </TouchableOpacity>
    );
  })}
</View>

        <TouchableOpacity style={styles.button} onPress={handleConfirmar}>
          <Text style={styles.buttonText}>Confirmar</Text>
        </TouchableOpacity>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'flex-start',
    paddingBottom: 100,
    backgroundColor: 'white',
    paddingHorizontal: 20,
    paddingTop: 40,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#3629B7',
    textAlign: 'center',
    marginBottom: 20,
  },
  backButton: {
    marginBottom: 10,
  },
  image: {
    width: 160,
    height: 160,
    alignSelf: 'center',
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 5,
    color: '#2F2F2F',
  },
  input: {
    height: 50,
    borderWidth: 1,
    borderColor: '#D3D3D3',
    borderRadius: 8,
    paddingHorizontal: 15,
    fontSize: 16,
    marginBottom: 15,
  },
  pickerWrapper: {
    borderWidth: 1,
    borderColor: '#D3D3D3',
    borderRadius: 8,
    marginBottom: 15,
    overflow: 'hidden',
  },
  picker: {
    height: 50,
    width: '100%',
  },
  materialGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    marginBottom: 30,
  },
    materialWrapper: {
    alignItems: 'center',
    margin: 10,
    width: 80,
  },
  circle: {
    width: 64,
    height: 64,
    borderRadius: 32,
    alignItems: 'center',
    justifyContent: 'center',
  },
  materialText: {
    marginTop: 6,
    fontSize: 13,
    color: '#000000',
    textAlign: 'center',
  },

  materialItemSelecionado: {
    borderColor: '#3629B7',
    borderWidth: 2,
    borderRadius: 40,
  },
  button: {
    backgroundColor: '#4EC063',
    paddingVertical: 15,
    borderRadius: 30,
    alignItems: 'center',
    marginTop: 10,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
});
