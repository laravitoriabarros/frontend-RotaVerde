import { createContext, useState, useEffect, useContext, ReactNode } from 'react';
import { UserRoleEnum } from '~/lib/types/shared-types';
import { ISignInResponse } from '~/services/auth/login-service';
import { getAuthData, storeAuthData, clearAuthData } from '~/services/auth/storage-service';

const base64UrlDecode = (str: string): string => {
  let output = str.replace(/-/g, '+').replace(/_/g, '/');
  switch (output.length % 4) {
    case 0:
      break;
    case 2:
      output += '==';
      break;
    case 3:
      output += '=';
      break;
    default:
      throw new Error('Base64 string is not of the correct length.');
  }
  try {
    return decodeURIComponent(escape(global.atob(output))); 
  } catch (e) {
    console.error("Erro na decodificação base64Url:", e);
    return ''; 
  }
};

interface TokenPayload {
  sub?: string;
  id?: string;  
  role?: UserRoleEnum; 
 
}

interface IAuthContext {
  token: string | null;
  userRole: UserRoleEnum | null;
  userId: string | null; 
  isLoading: boolean;
  signIn: (authData: ISignInResponse) => Promise<void>;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<IAuthContext | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [token, setToken] = useState<string | null>(null);
  const [userRole, setUserRole] = useState<UserRoleEnum | null>(null);
  const [userId, setUserId] = useState<string | null>(null); 
  const [isLoading, setIsLoading] = useState(true);

  
  const decodeUserIdFromToken = (jwtToken: string | null): string | null => {
    if (!jwtToken) return null;
    try {
      const parts = jwtToken.split('.');
      if (parts.length !== 3) {
        console.warn('decodeUserIdFromToken: Token JWT inválido (não tem 3 partes).', jwtToken);
        return null;
      }
      const payload = parts[1];
      const decodedPayload = JSON.parse(base64UrlDecode(payload)) as TokenPayload;
      return decodedPayload.sub || decodedPayload.id || null;
    } catch (error) {
      console.error('decodeUserIdFromToken: Erro ao decodificar payload do token:', error);
      return null;
    }
  };


  useEffect(() => {
    const loadAuthData = async () => {
      try {
        const { token: storedToken, role: storedRole } = await getAuthData();
        if (storedToken && storedRole) {
          setToken(storedToken);
          setUserRole(storedRole);
          setUserId(decodeUserIdFromToken(storedToken)); 
        }
      } catch (error) {
        console.error("Falha ao carregar dados de autenticação", error);
 
      } finally {
        setIsLoading(false); 
      }
    };
    loadAuthData();
  }, []); 

 
  const signIn = async (authData: ISignInResponse) => {
    setToken(authData.token);
    setUserRole(authData.role);
    setUserId(decodeUserIdFromToken(authData.token)); 
    await storeAuthData(authData); 
  };

 
  const signOut = async () => {
    setToken(null);
    setUserRole(null);
    setUserId(null); 
    await clearAuthData(); 
  };

  return (
    <AuthContext.Provider value={{ token, userRole, userId, isLoading, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): IAuthContext => {
  const context = useContext(AuthContext);

  if (context === undefined) {
    throw new Error('useAuth deve ser usado dentro de um AuthProvider');
  }

  return context;
};