import * as Location from 'expo-location';

interface Coordinates {
  latitude: number;
  longitude: number;
}

async function requestPermissions() {
  const { status } = await Location.requestForegroundPermissionsAsync();
  if (status !== 'granted') {
    alert('Permissão para acessar localização negada!');
    return false;
  }
  return true;
}


export async function getAddressFromCoordinates(coordinates: Coordinates): Promise<Location.LocationGeocodedAddress[] | null> {
  try {
     const hasPermission = await requestPermissions();
    if (!hasPermission) {
      alert('Permissão para acessar localização negada!');
      return null;
    }
    const { latitude, longitude } = coordinates;
    const reverseGeocodedAddress = await Location.reverseGeocodeAsync({
      latitude,
      longitude,
    });

    if (reverseGeocodedAddress.length > 0) {
      return reverseGeocodedAddress; 
    } else {
      console.warn('Nenhum endereço encontrado para as coordenadas:', coordinates);
      return null;
    }
  } catch (error) {
    console.error('Erro ao fazer a geocodificação reversa:', coordinates, error);
    return null;
  }
}