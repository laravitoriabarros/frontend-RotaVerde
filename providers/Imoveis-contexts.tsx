import React, { createContext, ReactNode, useContext, useEffect, useState, useCallback } from 'react';
import api from '../services/api-client';
import { getImoveisByCooperativaArea, Imovel } from '../services/residenceService';
import { useAuth } from './auth-context';

export interface ImoveisContextData {
  imoveis: Imovel[];
  setImoveis: React.Dispatch<React.SetStateAction<Imovel[]>>;
  loading: boolean;
  error: string | null;
  refetchImoveis: () => Promise<void>;
}

const ImoveisContext = createContext<ImoveisContextData | undefined>(undefined);

export const ImoveisProvider = ({ children }: { children: ReactNode }) => {

  const { userId, userRole, isLoading: authLoading } = useAuth();
  const [imoveis, setImoveis] = useState<Imovel[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadImoveis = useCallback(async () => {

    if (authLoading) {
      setLoading(true);
      return;
    }

    if (!userId || !userRole) {
      setImoveis([]);
      setLoading(false);
      setError('Nenhum usuário logado, ID de usuário, ou função não disponível.');
      return;
    }

    try {
      setLoading(true);
      let imoveisData: Imovel[] = [];

      if (userRole === 'cooperativa') {
        imoveisData = await getImoveisByCooperativaArea(userId);
      } else if (userRole === 'cidadao') {
        console.log(`Fazendo requisição para: cidadao/residencias/${userId}`);
        const response = await api.get(`cidadao/residencias/${userId}`).json<Imovel[]>();
        imoveisData = response;
      } else {
        setError('Função de usuário inválida.');
        setLoading(false);
        return;
      }

      setImoveis(imoveisData);
      setError(null);
    } catch (err) {
      setError('Falha ao carregar imóveis. Verifique sua conexão ou tente novamente.');
      console.error('Erro ao carregar imóveis:', err);
    } finally {
      setLoading(false);
    }
  }, [userId, userRole, authLoading]);

  useEffect(() => {
    loadImoveis();
  }, [loadImoveis]);

  return (
    <ImoveisContext.Provider value={{ imoveis, setImoveis, loading, error, refetchImoveis: loadImoveis }}>
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

export type { Imovel };
