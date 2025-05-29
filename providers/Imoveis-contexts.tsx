import React, { createContext, ReactNode, useContext, useEffect, useState } from 'react';
import api from '../services/api-client';
import { getImoveisByCooperativaArea, Imovel } from '../services/residenceService';
import { getTokenData } from '../utils/auth';

interface ImoveisContextData {
  imoveis: Imovel[];
  setImoveis: React.Dispatch<React.SetStateAction<Imovel[]>>;
  loading: boolean;
  error: string | null;
}

const ImoveisContext = createContext<ImoveisContextData | undefined>(undefined);

export const ImoveisProvider = ({ children }: { children: ReactNode }) => {
  const [imoveis, setImoveis] = useState<Imovel[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadImoveis = async () => {
      try {
        setLoading(true);
        const { userId, role } = await getTokenData();

        if (!userId || !role) {
          setError('User data not found');
          return;
        }

        let imoveisData: Imovel[];
        if (role === 'cooperativa') {
          imoveisData = await getImoveisByCooperativaArea(userId);
        } else if (role === 'cidadao') {
          // fetch nos imoveis do usuario
          const response = await api.get(`usuarios/${userId}/residencias`).json<Imovel[]>();
          imoveisData = response;
        } else {
          setError('Invalid user role');
          return;
        }

        setImoveis(imoveisData);
        setError(null);
      } catch (err) {
        setError('Failed to load imoveis');
        console.error('Error loading imoveis:', err);
      } finally {
        setLoading(false);
      }
    };

    loadImoveis();
  }, []);

  return (
    <ImoveisContext.Provider value={{ imoveis, setImoveis, loading, error }}>
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