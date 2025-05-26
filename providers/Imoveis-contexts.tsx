import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { getCoordinatesFromAddress } from '../utils/location';
interface Imovel {
  id: number;
  nome: string;
  endereco: string;
  status: string;
  latitude: number;
  longitude: number;
  lixoParaColetaHoje: boolean;
}

interface ImoveisContextData {
  imoveis: Imovel[];
  setImoveis: React.Dispatch<React.SetStateAction<Imovel[]>>;
}

const ImoveisContext = createContext<ImoveisContextData | undefined>(undefined);

const rawImoveisData = [
  { id: 1, nome: 'Casa 0221', endereco: 'Antares - Rua Sol', status: 'Lixo Reciclável Coleta 1234', latitude: 0, longitude: 0, lixoParaColetaHoje: false },
  { id: 2, nome: 'Víctor Oliveira', endereco: 'Farol - Rua Estrela', status: 'Não Reciclável Coleta 1234', latitude: 0, longitude: 0, lixoParaColetaHoje: true  },
  { id: 3, nome: 'Loja 01', endereco: 'Benedito Bentes', status: 'Lixo Reciclável Coleta 1234', latitude: 0, longitude: 0, lixoParaColetaHoje: true  },
  { id: 4, nome: 'Fábrica 01', endereco: 'Cruz das Almas', status: 'Lixo Reciclável Coleta 1234', latitude: 0, longitude: 0, lixoParaColetaHoje: true  },
];

export const ImoveisProvider = ({ children }: { children: ReactNode }) => {
  const [imoveis, setImoveis] = useState<Imovel[]>([]); // Começa com array vazio

  useEffect(() => {
    const loadImoveisWithCoords = async () => {
      const loadedImoveis: Imovel[] = [];
      for (const rawImovel of rawImoveisData) {
        const fullAddress = `${rawImovel.endereco}, Maceió, Alagoas, Brasil`;
        const coords = await getCoordinatesFromAddress(fullAddress);

        if (coords) {
          loadedImoveis.push({
            ...rawImovel,
            latitude: coords.latitude,
            longitude: coords.longitude,
          });
        } else {
          console.warn(`Não foi possível geocodificar o endereço: ${fullAddress}.`);
          // Opcional: Adicionar com coordenadas padrão (0,0) ou ignorar o imóvel
          loadedImoveis.push({ ...rawImovel, latitude: 0, longitude: 0 });
        }
      }
      setImoveis(loadedImoveis);
    };

    loadImoveisWithCoords();
  }, []); // O array vazio [] garante que isso rode apenas uma vez ao montar

  return (
    <ImoveisContext.Provider value={{ imoveis, setImoveis }}>
      {children}
    </ImoveisContext.Provider>
  );
};

export const useImoveis = () => {
  const context = useContext(ImoveisContext);
  if (!context) {
    throw new Error('useImoveis deve ser usado dentro de um ImoveisProvider');
  }
  return context;
};