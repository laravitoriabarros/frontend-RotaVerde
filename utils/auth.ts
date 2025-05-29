import { getItemAsync } from 'expo-secure-store';
import { UserRoleEnum } from '~/lib/types/shared-types';

interface TokenPayload {
  sub?: string;
  id?: string;
  role?: UserRoleEnum;
}

export const getTokenData = async (): Promise<{ userId: string | null; role: UserRoleEnum | null }> => {
  try {
    const token = await getItemAsync('token');
    if (!token) return { userId: null, role: null };

    const payload = token.split('.')[1];
    const decodedPayload = JSON.parse(atob(payload)) as TokenPayload;

    return {
      userId: decodedPayload.sub || decodedPayload.id || null,
      role: decodedPayload.role || null
    };
  } catch (error) {
    console.error('Error getting token data:', error);
    return { userId: null, role: null };
  }
};