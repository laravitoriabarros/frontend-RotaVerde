import api from '../api-client';

export interface Cooperativa {
    id: string;
    nome_usuario: string;
    nome_cooperativa: string;
    area_atuacao: string[];
    location: {
        latitude: number;
        longitude: number;
    };
    endereco: {
        bairros_atendidos: string[];
    };
}

export async function getCooperativas(): Promise<Cooperativa[]> {
    try {
        // console.log('Fetching cooperativas...');
        const response = await api.get('cooperativa/listar').json<Cooperativa[]>();
        // console.log('Cooperativas response:', response);
        return response;
    } catch (error) {
        console.error('Error fetching cooperativas:', error);
        return [];
    }
}

export async function getCooperativa(id: string): Promise<Cooperativa> {
    try {
        const response = await api.get(`cooperativa/cooperativa/${id}`).json<Cooperativa>();
        return response;
    } catch (error) {
        throw error;
    }
}
