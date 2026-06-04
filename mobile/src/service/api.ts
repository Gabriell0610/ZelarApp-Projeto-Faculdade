import axios from "axios";
import { BASE_URL } from "../utils/const";
import { getToken } from "../storage/auth-storage";
import { Alert } from "react-native";

interface InterfaceRequest {
  method: string;
  body: string;
}

export const fetchApi = axios.create({
  baseURL: BASE_URL,
});

fetchApi.interceptors.request.use(async (config) => {
  if (config.headers.Authorization) {
    return config;
  }

  const token = await getToken();

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

export async function useFetchApi<T>(url: string, data: T) {
  try {
    return await fetchApi.post(url, data);
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      const { message, details } = error.response.data;

      if (details && details.length > 0) {
        Alert.alert(
          "Dados inválidos",
          details.map((d: any) => d.message).join("\n"),
        );
      } else {
        Alert.alert("Erro", message ?? "Algo deu errado");
      }
    } else {
      Alert.alert("Erro", "Não foi possível conectar ao servidor");
    }

    throw error;
  }
}
