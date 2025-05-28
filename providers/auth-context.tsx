import { createContext, useState, useEffect, useContext, ReactNode } from 'react';
import { UserRoleEnum } from '~/lib/types/shared-types';
import { ISignInResponse } from '~/services/auth/login-service';
import { getAuthData, storeAuthData, clearAuthData } from '~/services/auth/storage-service';

interface IAuthContext {
    token: string | null;
    userRole: UserRoleEnum | null;
    isLoading: boolean;
    signIn: (authData: ISignInResponse) => Promise<void>;
    signOut: () => Promise<void>;
}

const AuthContext = createContext<IAuthContext | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [token, setToken] = useState<string | null>(null);
    const [userRole, setUserRole] = useState<UserRoleEnum | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const loadAuthData = async () => {
            try {
                const { token: storedToken, role: storedRole } = await getAuthData();
                if (storedToken && storedRole) {
                    setToken(storedToken);
                    setUserRole(storedRole);
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
        const { role, token } = authData
        setToken(authData.token);
        setUserRole(authData.role);
        await storeAuthData(authData);
    };

    const signOut = async () => {
        setToken(null);
        setUserRole(null);
        await clearAuthData();
    };

    return (
        <AuthContext.Provider value={{ token, userRole, isLoading, signIn, signOut }}>
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
