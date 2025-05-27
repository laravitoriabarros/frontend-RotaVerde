import api from './api-client';

export interface Endereco {
  logradouro: string;
  numero: string;
  bairro: string;
  cidade: string;
}

export interface Imovel {
  id: string;
  endereco: Endereco;
  location: {
    latitude: number;
    longitude: number;
  };
  coletavel: boolean;
}

export const getImoveisByCooperativaArea = async (cooperativaId: string): Promise<Imovel[]> => {
  try {
    const response = await api.get(`coop/residencias/area_atuacao/${cooperativaId}`).json<Imovel[]>();
    return response;
  } catch (error) {
    console.error('Error fetching imoveis by cooperativa area:', error);
    throw error;
  }
};
