import React, { useEffect, useState, useCallback } from 'react';
import { useImoveis } from '~/providers/Imoveis-contexts';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  ScrollView,
  Alert,
} from 'react-native';
import { useRouter, useFocusEffect } from 'expo-router';
import Icon from 'react-native-vector-icons/Feather';
import { useMutation, useQueryClient } from '@tanstack/react-query';

import { useAuth } from '~/providers/auth-context';

export default function listaImovel() {
  const router = useRouter();
  const [modoExclusao, setModoExclusao] = useState(false);
  const [selecionados, setSelecionados] = useState<string[]>([]);
  const { imoveis, setImoveis, refetchImoveis } = useImoveis();
  const queryClient = useQueryClient();


  const { userId, isLoading: authLoading } = useAuth(); 

  useFocusEffect(
    useCallback(() => {

      if (!authLoading && userId) {
        refetchImoveis();
      }

      return () => {
        setModoExclusao(false);
        setSelecionados([]);
      };
    }, [refetchImoveis, userId, authLoading]) 
  );
 

  const deleteImovelMutation = useMutation({
    mutationFn: async (imovelIdsToDelete: string[]) => {
      
      if (!userId) {
        throw new Error("ID do usuário não disponível. Por favor, faça login novamente.");
      }

      const deletePromises = imovelIdsToDelete.map(id =>
        fetch(`http://192.168.0.18:5000/cidadao/deletar_residencias/${userId}/${id}`, {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
          },
        }).then(async response => {
          if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.detail || `Erro ao excluir imóvel com ID ${id}.`);
          }
          return id;
        })
      );
      return Promise.all(deletePromises);
    },
    onSuccess: (deletedIds) => {
      setImoveis(prev => prev.filter(i => !deletedIds.includes(i.id)));
      Alert.alert('Sucesso!', `Imóvel(is) excluído(s) com sucesso.`);
      setSelecionados([]);
      setModoExclusao(false);
      queryClient.invalidateQueries({ queryKey: ['imoveis', userId] });
      refetchImoveis(); 
    },
    onError: (error) => {
      Alert.alert('Erro ao excluir', `Não foi possível excluir o(s) imóvel(is): ${error.message}`);
    }
  });

  const confirmarExclusao = () => {
    if (selecionados.length === 0) {
      Alert.alert('Atenção', 'Selecione pelo menos um imóvel para excluir.');
      return;
    }

    Alert.alert(
      'Confirmar exclusão',
      `Deseja excluir ${selecionados.length} imóvel(is) selecionado(s)? Esta ação é irreversível.`,
      [
        { text: 'Cancelar', style: 'cancel', onPress: () => setModoExclusao(false) },
        {
          text: 'Confirmar',
          onPress: () => {
            deleteImovelMutation.mutate(selecionados);
          },
        },
      ]
    );
  };

  const handleCadastrarNovo = () => {
    router.push('/Usuario/cadastrar-imovel');
  };

  const handleCardClick = (id: string) => {
    router.push(`/Usuario/ver-imovel?id=${id}`);
  };

  const toggleSelecao = (id: string) => {
    setSelecionados(prev =>
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
    );
  };

  return (
    <View style={styles.container}>
      {/* Cabeçalho */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <Icon name="arrow-left" size={24} color="white" />
        </TouchableOpacity>
        <Image source={require('../../assets/images/info-imovel.png')} style={styles.image} />
        <Text style={styles.title}>Meus Imóveis</Text>
        <Text style={styles.subtitle}>Aqui você acompanha a coleta dos seus imóveis!</Text>
      </View>

      {/* Lista rolável de imóveis */}
      <ScrollView contentContainerStyle={styles.cardsContainer}>
        {imoveis.length === 0 && !authLoading && (
          <Text style={styles.noImoveisText}>Nenhum imóvel cadastrado. Cadastre um novo!</Text>
        )}
        {imoveis.map((imovel) => (
          <TouchableOpacity
            key={imovel.id}
            style={[
              styles.card,
              modoExclusao && selecionados.includes(imovel.id) && styles.cardSelecionado,
            ]}
            onPress={() => modoExclusao ? toggleSelecao(imovel.id) : handleCardClick(imovel.id)}
            onLongPress={() => setModoExclusao(true)}
          >
            <View style={styles.cardContent}>
              <Icon name="home" size={30} color="#4EC063" />
              <View style={styles.cardText}>
                <Text style={styles.cardTitle}>
                  {imovel.endereco.logradouro}, {imovel.endereco.numero}
                </Text>
                <Text style={styles.cardAddress}>
                  {imovel.endereco.bairro}, {imovel.endereco.cidade}
                </Text>
                <Text style={styles.cardStatus}>
                  Status: {imovel.coletavel ? 'Lixo para Coleta' : 'Coleta Feita'}
                </Text>
              </View>
              {modoExclusao && (
                <Icon
                  name={selecionados.includes(imovel.id) ? 'check-circle' : 'circle'}
                  size={22}
                  color={selecionados.includes(imovel.id) ? '#4EC063' : '#ccc'}
                  style={styles.cardIcon}
                />
              )}
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Botões de Ação */}
      <View style={styles.actions}>
        {modoExclusao ? (
          <>
            <TouchableOpacity
              style={styles.cancelDeleteButton}
              onPress={() => { setModoExclusao(false); setSelecionados([]); }}
              disabled={deleteImovelMutation.isPending}
            >
                <Text style={styles.buttonText}>Cancelar</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.confirmButton}
              onPress={confirmarExclusao}
              disabled={selecionados.length === 0 || deleteImovelMutation.isPending}
            >
              <Text style={styles.buttonText}>
                {deleteImovelMutation.isPending ? "Excluindo..." : `Confirmar Exclusão (${selecionados.length})`}
              </Text>
            </TouchableOpacity>
          </>
        ) : (
          <TouchableOpacity style={styles.deleteButton} onPress={() => setModoExclusao(true)}>
            <Text style={styles.buttonText}>Excluir Imóvel</Text>
          </TouchableOpacity>
        )}

        <TouchableOpacity style={styles.addButton} onPress={handleCadastrarNovo} disabled={modoExclusao}>
          <Text style={styles.buttonText}>Cadastrar Novo</Text>
        </TouchableOpacity>
      </View>

      {/* Barra Inferior */}
      <View style={styles.navBar}>
        <TouchableOpacity style={styles.navIcon} onPress={() => router.push('/Usuario/pagina-inicial')}>
          <Icon name="home" size={30} color="#2F2F2F" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.navIcon} onPress={() => router.push('/(private)/(cidadao)/map')}>
          <Icon name="map" size={30} color="#2F2F2F" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.navIcon} onPress={() => router.push('/(private)/(cidadao)/tutorials')}>
          <Icon name="info" size={30} color="#2F2F2F" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.navIcon} onPress={() => router.push('/(private)/(cidadao)/tutorials')}>
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
    paddingTop: 20,
    paddingBottom: 20,
    alignItems: 'center',
  },
  backButton: { position: 'absolute', left: 20, top: 20, padding: 10 },
  image: { width: 120, height: 120, resizeMode: 'contain' },
  title: { fontSize: 24, fontWeight: 'bold', color: '#2F2F2F', marginTop: 10 },
  subtitle: { fontSize: 16, color: '#888888' },
  cardsContainer: { paddingHorizontal: 20, paddingBottom: 120 },
  card: {
    backgroundColor: '#F5F5F5',
    padding: 20,
    borderRadius: 10,
    marginVertical: 10,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
  },
  cardSelecionado: {
    borderColor: '#4EC063',
    borderWidth: 2,
    backgroundColor: '#E6F8EC',
  },
  cardContent: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  cardText: { marginLeft: 15, flex: 1 },
  cardTitle: { fontSize: 18, fontWeight: 'bold', color: '#2F2F2F' },
  cardAddress: { fontSize: 14, color: '#888888', marginTop: 5 },
  cardStatus: { fontSize: 14, color: '#4EC063', marginTop: 5 },
  cardIcon: { marginLeft: 10 },
  actions: {
    position: 'absolute',
    bottom: 70,
    left: 20,
    right: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 10,
  },
  deleteButton: {
    backgroundColor: '#3629B7',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 5,
    flex: 1,
    alignItems: 'center',
  },
  confirmButton: {
    backgroundColor: '#D9534F',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 5,
    flex: 1,
    alignItems: 'center',
  },
  cancelDeleteButton: {
    backgroundColor: '#6c757d',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 5,
    flex: 1,
    alignItems: 'center',
  },
  addButton: {
    backgroundColor: '#4EC063',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 5,
    flex: 1,
    alignItems: 'center',
  },
  buttonText: { color: 'white', fontWeight: 'bold', fontSize: 16 },
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
  noImoveisText: {
    textAlign: 'center',
    marginTop: 50,
    fontSize: 18,
    color: '#555',
  },
});