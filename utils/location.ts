import * as Location from 'expo-location';

interface Coordinates {
  latitude: number;
  longitude: number;
}

// Sua função existente
export async function getCoordinatesFromAddress(address: string): Promise<Coordinates | null> {
  try {
    const geocodedLocation = await Location.geocodeAsync(address);

    if (geocodedLocation.length > 0) {
      const { latitude, longitude } = geocodedLocation[0];
      return { latitude, longitude };
    } else {
      console.warn('Endereço não encontrado para geocodificação:', address);
      return null;
    }
  } catch (error) {
    console.error('Erro ao geocodificar endereço:', address, error);
    return null;
  }
}

// Nova função para geocodificação reversa
export async function getAddressFromCoordinates(coordinates: Coordinates): Promise<Location.LocationGeocodedAddress[] | null> {
  try {
    const { latitude, longitude } = coordinates;
    const reverseGeocodedAddress = await Location.reverseGeocodeAsync({
      latitude,
      longitude,
    });

    if (reverseGeocodedAddress.length > 0) {
      return reverseGeocodedAddress; // Retorna um array de possíveis endereços
    } else {
      console.warn('Nenhum endereço encontrado para as coordenadas:', coordinates);
      return null;
    }
  } catch (error) {
    console.error('Erro ao fazer a geocodificação reversa:', coordinates, error);
    return null;
  }
}