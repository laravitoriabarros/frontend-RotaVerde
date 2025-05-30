import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  TextInput,
  ScrollView,
  Image,
  Alert,
} from "react-native";
import { useRouter } from "expo-router";
import Icon from "react-native-vector-icons/Feather";
import MapView, { Marker } from "react-native-maps";
import { Picker } from "@react-native-picker/picker";
import { useMutation } from "@tanstack/react-query";
import { getAddressFromCoordinates } from "~/utils/location";
import { getTokenData } from "~/utils/auth";
import * as Location from 'expo-location';
import api from "~/services/api-client";

export default function CadastrarImovel() {
  const router = useRouter();

  const [userId, setUserId] = useState<string | null>(null);
  const [isLoadingUser, setIsLoadingUser] = useState(true);

  const [nome, setNome] = useState("");
  const [tipoImovel, setTipoImovel] = useState("");
  const [lixoReciclavel, setLixoReciclavel] = useState("");
  const [enderecoFormatado, setEnderecoFormatado] = useState("Nenhuma localização selecionada");
  const [enderecoCompleto, setEnderecoCompleto] = useState<Location.LocationGeocodedAddress | null>(null);
  const [localizacao, setLocalizacao] = useState<{ latitude: number; longitude: number } | null>(null);
  const [mostrarMapa, setMostrarMapa] = useState(false);

  useEffect(() => {
    async function fetchUserId() {
      try {
        setIsLoadingUser(true);
        const { userId: fetchedUserId } = await getTokenData();
        setUserId(fetchedUserId);
      } catch (error) {
        console.error("Erro ao obter userId:", error);
        Alert.alert("Erro de autenticação", "Não foi possível carregar os dados do seu usuário. Tente novamente ou faça login.");
        router.push("/signin");
      } finally {
        setIsLoadingUser(false);
      }
    }

    fetchUserId();
  }, []);

  const handleGoBack = () => {
    router.back();
  };


  const handleMapPress = async (event: { nativeEvent: { coordinate: { latitude: number; longitude: number } } }) => {
    const { latitude, longitude } = event.nativeEvent.coordinate;
    setLocalizacao({ latitude, longitude });

    const addresses = await getAddressFromCoordinates({ latitude, longitude });
    if (addresses && addresses.length > 0) {
      const firstAddress = addresses[0];
      setEnderecoCompleto(firstAddress);


      const formatted = [
        firstAddress.street,
        firstAddress.streetNumber,
        firstAddress.district,
        firstAddress.city,
        firstAddress.region,
        firstAddress.postalCode
      ].filter(Boolean).join(', ');

      setEnderecoFormatado(formatted || "Endereço não encontrado");
    } else {
      setEnderecoFormatado("Endereço não encontrado para este local.");
      setEnderecoCompleto(null);
    }
  };

  const cadastrarImovel = async (dados: any) => {
    if (!userId) {
      throw new Error("ID do usuário não disponível. Por favor, faça login novamente.");
    }
    const response = await fetch(process.env.EXPO_PUBLIC_API_URL + `/cidadao/cadastrar_residencias/${userId}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(dados),
    });
    console.log('bateu na api')
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({ message: "Erro desconhecido" }));
      throw new Error(errorData.message || "Erro ao cadastrar o imóvel");
    }

    return response.json();
  };

  const mutation = useMutation({
    mutationFn: cadastrarImovel,
    onSuccess: () => {
      Alert.alert("Sucesso!", "Imóvel cadastrado com sucesso.");
      router.push("/Usuario/final-cad-imovel");
    },
    onError: (error) => {
      Alert.alert("Erro", `Não foi possível cadastrar o imóvel: ${error.message}`);
    },
  });

  const handleSubmit = () => {

    if (!nome || !tipoImovel || !localizacao || !enderecoCompleto) {
      Alert.alert("Atenção", "Por favor, preencha todos os campos obrigatórios (Nome, Tipo de Imóvel, Localização e Endereço).");
      return;
    }
    if (!lixoReciclavel) {
      Alert.alert("Atenção", "Por favor, informe se há lixo reciclável para coleta.");
      return;
    }

    const dados = {
      nome,
      tipoImovel,
      lixoReciclavel: lixoReciclavel === "sim" ? true : false,
      endereco: {

        logradouro: enderecoCompleto.street || "",
        numero: enderecoCompleto.streetNumber || "",
        bairro: enderecoCompleto.district || "",
        cidade: enderecoCompleto.city || "",
        estado: enderecoCompleto.region || "",
        cep: enderecoCompleto.postalCode || "",
      },
      location: {
        latitude: localizacao.latitude,
        longitude: localizacao.longitude,
      },
    };

    mutation.mutate(dados);
  };

  if (isLoadingUser || !userId) {
    return null;
  }

  return (
    <View style={styles.container}>
      {mostrarMapa ? (
        <View style={{ flex: 1 }}>
          <MapView
            style={styles.fullScreenMap}
            initialRegion={{
              latitude: localizacao?.latitude || -9.6498487,
              longitude: localizacao?.longitude || -35.7089492,
              latitudeDelta: 0.01,
              longitudeDelta: 0.01,
            }}
            provider="google"
            onPress={handleMapPress}
          >
            {localizacao && (
              <Marker
                coordinate={localizacao}
                title="Local selecionado"
                description="Toque para mover o pin"
              />
            )}
          </MapView>

          {localizacao && (
            <TouchableOpacity
              onPress={() => {
                setMostrarMapa(false);
                // Exibe o endereço formatado no alerta de confirmação
                Alert.alert("Localização Capturada", `Latitude: ${localizacao.latitude.toFixed(6)}, Longitude: ${localizacao.longitude.toFixed(6)}\nEndereço: ${enderecoFormatado}`);
              }}
              style={styles.confirmMapButton}
            >
              <Text style={styles.confirmMapText}>Confirmar Localização</Text>
            </TouchableOpacity>
          )}

          <TouchableOpacity
            onPress={() => {
              setLocalizacao(null);
              setEnderecoFormatado("Nenhuma localização selecionada"); // Limpa o endereço formatado
              setEnderecoCompleto(null); // Limpa o objeto de endereço completo
              setMostrarMapa(false);
            }}
            style={styles.cancelMapButton}
          >
            <Text style={styles.cancelMapText}>Cancelar</Text>
          </TouchableOpacity>
        </View>
      ) : (

        <>
          <View style={styles.header}>
            <TouchableOpacity onPress={handleGoBack} style={styles.backButton}>
              <Icon name="arrow-left" size={24} color="#4EC063" />
            </TouchableOpacity>
          </View>

          <Image source={require("../../assets/images/web.png")} style={styles.image} />

          <Text style={styles.title}>Vamos começar!</Text>

          <ScrollView contentContainerStyle={styles.form}>
            <View style={styles.inputContainer}>
              <Text style={styles.label}>Nome</Text>
              <TextInput
                style={styles.input}
                placeholder="Digite como quer chamar seu imóvel"
                value={nome}
                onChangeText={setNome}
              />
            </View>

            <View style={styles.inputContainer}>
              <Text style={styles.label}>Escolha o tipo de imóvel</Text>
              <View style={styles.pickerContainer}>
                <Picker selectedValue={tipoImovel} onValueChange={setTipoImovel} style={styles.picker}>
                  <Picker.Item label="Clique aqui para escolher" value="" />
                  <Picker.Item label="Residência" value="residencia" />
                  <Picker.Item label="Comércio" value="comercio" />
                  <Picker.Item label="Estabelecimento público" value="publico" />
                </Picker>
              </View>
            </View>

            <View style={styles.inputContainer}>
              <Text style={styles.label}>Tem lixo reciclável para coleta?</Text>
              <View style={styles.pickerContainer}>
                <Picker selectedValue={lixoReciclavel} onValueChange={setLixoReciclavel} style={styles.picker}>
                  <Picker.Item label="Clique aqui para escolher" value="" />
                  <Picker.Item label="Sim" value="sim" />
                  <Picker.Item label="Não" value="nao" />
                </Picker>
              </View>
            </View>

            <View style={styles.inputContainer}>
              <Text style={styles.label}>Adicione a Localização</Text>
              <View style={styles.inputWithIcon}>
                <TextInput
                  style={[styles.input, { flex: 1 }]}
                  placeholder="Toque no ícone para abrir o mapa"
                  value={enderecoFormatado} // Exibe o endereço formatado aqui
                  editable={false} // Não permite edição manual, apenas via mapa
                />
                <TouchableOpacity onPress={() => setMostrarMapa(true)} style={styles.iconButton}>
                  <Icon name="map-pin" size={24} color="#3629B7" />
                </TouchableOpacity>
              </View>
            </View>

            <TouchableOpacity
              style={styles.button}
              onPress={handleSubmit}
              disabled={mutation.isPending}
            >
              <Text style={styles.buttonText}>{mutation.isPending ? "Salvando..." : "Criar"}</Text>
            </TouchableOpacity>
          </ScrollView>
        </>
      )}
    </View>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    paddingTop: 40,
  },
  header: {
    alignItems: "flex-start",
    paddingLeft: 20,
    paddingBottom: 20,
  },
  backButton: {
    padding: 10,
  },
  image: {
    width: 100,
    height: 100,
    alignSelf: "center",
    resizeMode: "contain",
    marginBottom: 10,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#3629B7",
    textAlign: "center",
    marginBottom: 20,
  },
  form: {
    paddingHorizontal: 20,
  },
  inputContainer: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    color: "#2F2F2F",
    marginBottom: 5,
  },
  input: {
    height: 50,
    borderWidth: 1,
    borderColor: "#E0E0E0",
    borderRadius: 5,
    paddingHorizontal: 15,
    fontSize: 16,
    color: "#2F2F2F",
  },
  inputWithIcon: {
    flexDirection: "row",
    alignItems: "center",
  },
  iconButton: {
    padding: 10,
    marginLeft: 5,
  },
  pickerContainer: {
    borderWidth: 1,
    borderColor: "#E0E0E0",
    borderRadius: 5,
    overflow: "hidden",
  },
  picker: {
    height: 50,
    width: "100%",
  },
  button: {
    backgroundColor: "#3629B7",
    paddingVertical: 15,
    borderRadius: 5,
    alignItems: "center",
    marginTop: 10,
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 18,
  },
  fullScreenMap: {
    position: "absolute",
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    zIndex: 999,
  },
  confirmMapButton: {
    position: "absolute",
    bottom: 80,
    left: 20,
    right: 20,
    backgroundColor: "#3629B7",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
    zIndex: 1000,
  },
  confirmMapText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },

  cancelMapButton: {
    position: "absolute",
    bottom: 20,
    left: 20,
    right: 20,
    backgroundColor: "#ccc",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
    zIndex: 1000,
  },
  cancelMapText: {
    color: "#333",
    fontSize: 16,
    fontWeight: "bold",
  },
});
