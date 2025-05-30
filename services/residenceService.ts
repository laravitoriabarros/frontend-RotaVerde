import api from './api-client';

export interface Endereco {
  logradouro: string;
  numero: string;
  bairro: string;
  cidade: string;
  estado: string;
  cep: string;
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
    const response = [
  {
    id: "IMOVEL_JTC_001",
    endereco: {
      logradouro: "Avenida Doutor Antônio Gomes de Barros", // Antiga Amélia Rosa
      numero: "1020",
      bairro: "Jatiúca",
      cidade: "Maceió",
      estado: "AL",
      cep: "57036-000", // CEP genérico da Av. Dr. Antônio Gomes de Barros
    },
    location: {
      latitude: -9.6557, // Latitude aproximada para a região
      longitude: -35.7033, // Longitude aproximada para a região
    },
    coletavel: true,
  },
  {
    id: "IMOVEL_JTC_002",
    endereco: {
      logradouro: "Rua Professora Maria Esther da Costa Barros",
      numero: "300",
      bairro: "Jatiúca",
      cidade: "Maceió",
      estado: "AL",
      cep: "57036-420",
    },
    location: {
      latitude: -9.6512, // Latitude aproximada
      longitude: -35.7048, // Longitude aproximada
    },
    coletavel: false,
  },
  {
    id: "IMOVEL_JTC_003",
    endereco: {
      logradouro: "Avenida Júlio Marques Luz",
      numero: "750",
      bairro: "Jatiúca",
      cidade: "Maceió",
      estado: "AL",
      cep: "57035-700",
    },
    location: {
      latitude: -9.6580, // Latitude aproximada
      longitude: -35.7070, // Longitude aproximada
    },
    coletavel: true,
  },
  {
    id: "IMOVEL_MCO_004", // Exemplo fora da Jatiúca, mas em Maceió
    endereco: {
      logradouro: "Avenida da Paz",
      numero: "1100",
      bairro: "Jaraguá", // Outro bairro de Maceió
      cidade: "Maceió",
      estado: "AL",
      cep: "57022-050",
    },
    location: {
      latitude: -9.6710, // Latitude aproximada para Jaraguá
      longitude: -35.7200, // Longitude aproximada para Jaraguá
    },
    coletavel: true,
  },
  {
    id: "IMOVEL_JTC_005",
    endereco: {
      logradouro: "Rua Bancário Rady Gusmão do Nascimento",
      numero: "S/N", // Sem número
      bairro: "Jatiúca",
      cidade: "Maceió",
      estado: "AL",
      cep: "57036-530",
    },
    location: {
      latitude: -9.6500, // Latitude aproximada
      longitude: -35.7011, // Longitude aproximada
    },
    coletavel: false,
  },
];

// Exemplo de como acessar os dados:
// console.log(imoveisMaceio[0].endereco.logradouro);
// console.log(`O imóvel ${imoveisMaceio[1].id} é coletável? ${imoveisMaceio[1].coletavel}`);
// console.log(`Localização do imóvel ${imoveisMaceio[2].id}: Lat ${imoveisMaceio[2].location.latitude}, Lon ${imoveisMaceio[2].location.longitude}`);
    // const response = await api.get(`coop/residencias/area_atuacao/${cooperativaId}`).json<Imovel[]>();
    return response;
  } catch (error) {
    console.error('Error fetching imoveis by cooperativa area:', error);
    throw error;
  }
};
