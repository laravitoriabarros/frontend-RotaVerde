import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, Image } from 'react-native';
import { useRouter } from 'expo-router';
import Icon from 'react-native-vector-icons/Feather';

export default function HistoricoRotas() {
  const router = useRouter();

  const rotas = [
    { id: 1, veiculo: 'YASHA12', data: '2025-05-01', status: 'Concluído' },
    { id: 2, veiculo: 'JOKER22', data: '2025-05-02', status: 'Concluído' },
    { id: 3, veiculo: 'BRL4444', data: '2025-05-03', status: 'Concluído' },
    { id: 4, veiculo: 'MLG3221', data: '2025-05-04', status: 'Concluído' },
    { id: 5, veiculo: 'KAWA777', data: '2025-05-05', status: 'Concluído' },
    { id: 6, veiculo: 'UXR1111', data: '2025-05-06', status: 'Concluído' },
    { id: 7, veiculo: 'MOTO404', data: '2025-05-07', status: 'Concluído' },
    { id: 8, veiculo: 'ROTA88', data: '2025-05-08', status: 'Concluído' },
    { id: 9, veiculo: 'ZETA99', data: '2025-05-09', status: 'Concluído' },
    { id: 10, veiculo: 'VEGAS1', data: '2025-05-10', status: 'Concluído' },
  ];

  const handleGoBack = () => {
    router.back();
  };

  const handleVisualizarRota = (id: number) => {
    router.push(`/Cooperativa/ver-rota?id=${id}`);
  };

  return (
    <View style={styles.container}>
      {/* Cabeçalho */}
      <View style={styles.header}>
        <TouchableOpacity onPress={handleGoBack} style={styles.backButton}>
          <Icon name="arrow-left" size={28} color="#4EC063" />
        </TouchableOpacity>
        <Image source={require('../../assets/images/logo.png')} style={styles.logo} />
      </View>

      {/* Título abaixo do cabeçalho */}
      <Text style={styles.title}>Histórico de Rotas</Text>
      <Text style={styles.subtitle}>Veja todas as rotas realizadas!</Text>

      {/* Tabela */}
      <ScrollView style={styles.tableContainer}>
        <View style={styles.tableHeader}>
          <Text style={styles.tableHeaderCell}>Veículo</Text>
          <Text style={styles.tableHeaderCell}>Data</Text>
          <Text style={styles.tableHeaderCell}>Status</Text>
          <Text style={styles.tableHeaderCell}>Ação</Text>
        </View>

        {rotas.map((rota) => (
          <View key={rota.id} style={styles.tableRow}>
            <Text style={styles.tableCell}>{rota.veiculo}</Text>
            <Text style={styles.tableCell}>{rota.data}</Text>
            <Text style={styles.tableCell}>{rota.status}</Text>
            <TouchableOpacity
              style={styles.viewButton}
              onPress={() => handleVisualizarRota(rota.id)}
            >
              <Icon name="eye" size={20} color="white" />
            </TouchableOpacity>
          </View>
        ))}
      </ScrollView>

      {/* Navegação inferior */}
      <View style={styles.navBar}>
        <TouchableOpacity style={styles.navIcon} onPress={() => router.push('/Cooperativa/pagina-inicial')}>
          <Icon name="map" size={30} color="#2F2F2F" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.navIcon} onPress={() => router.push('/Cooperativa/gerenciar-caminhao')}>
          <Icon name="truck" size={30} color="#2F2F2F" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.navIcon} onPress={() => router.push('/Cooperativa/gerenciar-rotas')}>
          <Icon name="info" size={30} color="#2F2F2F" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.navIcon} onPress={() => router.push('/Cooperativa/perfil-cooperativa')}>
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
    padding: 20,
    paddingBottom: 80,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#3629B7',
    paddingVertical: 20,
    paddingHorizontal: 15,
    justifyContent: 'space-between',
  },
  backButton: {
    paddingRight: 10,
  },
  logo: {
    width: 120,
    height: 40,
    resizeMode: 'contain',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#4EC063',
    marginTop: 20,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 18,
    color: '#888888',
    marginBottom: 20,
    textAlign: 'center',
  },
  tableContainer: {
    marginTop: 10,
  },
  tableHeader: {
    flexDirection: 'row',
    paddingVertical: 10,
    backgroundColor: '#E0E0E0',
    borderRadius: 5,
    marginBottom: 10,
  },
  tableHeaderCell: {
    flex: 1,
    fontWeight: 'bold',
    fontSize: 16,
    color: '#2F2F2F',
    textAlign: 'center',
  },
  tableRow: {
    flexDirection: 'row',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderColor: '#D3D3D3',
    alignItems: 'center',
  },
  tableCell: {
    flex: 1,
    fontSize: 16,
    color: '#2F2F2F',
    textAlign: 'center',
  },
  viewButton: {
    flex: 1,
    backgroundColor: '#4EC063',
    paddingVertical: 8,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 4,
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
