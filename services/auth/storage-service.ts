import { deleteItemAsync, getItemAsync, setItemAsync } from "expo-secure-store";
import { UserRoleEnum } from "~/lib/types/shared-types";

export const storeAuthData = async (data: {
    token: string,
    role: UserRoleEnum
}) => {
    const { token, role } = data
    await setItemAsync('token', token)
    await setItemAsync('userRole', role)
};

export const getAuthData = async (): Promise<{ token: string | null; role: UserRoleEnum | null}> => {
    const token = await getItemAsync('token')
    const role = await getItemAsync('userRole') as UserRoleEnum
    return { token, role }
};

export const clearAuthData = async () => {
    await deleteItemAsync('token')
    await deleteItemAsync('userRole')
};
