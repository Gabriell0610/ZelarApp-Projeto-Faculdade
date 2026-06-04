import React, { useState } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { StackNavigationProp } from "@react-navigation/stack";
import { useNavigation } from "@react-navigation/native";

import Button from "../components/ui/Button";
import Input from "../components/ui/Input";
import { RootStackParamList } from "../navigation/AppNavigator";
import { colors } from "../theme/colors";
import { typography } from "../theme/typography";
import { BASE_URL, REGISTER_URL, REGISTER_USER } from "../utils/const";
import axios from "axios";
import {
  LoginAndRegisterRequestInterface,
  RegisterRequestInterface,
} from "../utils/types";
import { fetchApi } from "../service/api";
import { saveToken } from "../storage/auth-storage";

type RegisterScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  "Register"
>;

const RegisterScreen: React.FC = () => {
  const navigation = useNavigation<RegisterScreenNavigationProp>();
  const [name, setFullName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const handleCreateAccount = async () => {
    try {
      const responseFireAuth =
        await axios.post<LoginAndRegisterRequestInterface>(REGISTER_URL, {
          email,
          password,
          returnSecureToken: true,
        });

      console.log("Criou usuário no Firebase Auth");
      const token = responseFireAuth.data.idToken;
      await saveToken(token);

      await fetchApi.post<RegisterRequestInterface>(REGISTER_USER, {
        name,
      });

      console.log("Passou da chamada do backend");

      navigation.navigate("Login");
    } catch (error: any) {
      console.log("status:", error.response?.status);
      console.log("erro:", JSON.stringify(error.response?.data));
      console.log("mensagem:", error.message);
      console.log("url chamada:", error.config?.url);
      console.log("baseURL:", error.config?.baseURL);
      console.log("headers enviados:", JSON.stringify(error.config?.headers));
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <KeyboardAvoidingView
        style={styles.keyboardAvoidingView}
        behavior={Platform.OS === "ios" ? "padding" : undefined}
      >
        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={styles.contentContainer}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >
          <Pressable
            onPress={() => navigation.goBack()}
            style={styles.backButton}
          >
            <Ionicons name="chevron-back" size={28} color={colors.primary} />
          </Pressable>

          <View style={styles.heartContainer}>
            <Ionicons name="heart" size={36} color={colors.primary} />
          </View>

          <Text style={styles.title}>Criar conta</Text>
          <Text style={styles.subtitle}>Preencha os dados para começar</Text>

          <View style={styles.formContainer}>
            <Input
              label="Nome completo"
              value={name}
              onChangeText={setFullName}
              placeholder="Seu nome"
              autoCapitalize="words"
            />
            <Input
              label="E-mail"
              value={email}
              onChangeText={setEmail}
              placeholder="seu@email.com"
              keyboardType="email-address"
              autoCapitalize="none"
            />
            <Input
              label="Senha"
              value={password}
              onChangeText={setPassword}
              placeholder="Mínimo 6 caracteres"
              secureTextEntry
            />
          </View>

          <Button
            title="Criar conta"
            onPress={handleCreateAccount}
            variant="primary"
            fullWidth
          />

          <Pressable
            onPress={() => navigation.goBack()}
            style={styles.footerButton}
          >
            <Text style={styles.footerText}>
              Já tem conta? <Text style={styles.footerLinkText}>Entrar</Text>
            </Text>
          </Pressable>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.background,
  },
  keyboardAvoidingView: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  contentContainer: {
    paddingHorizontal: 24,
    paddingBottom: 24,
  },
  backButton: {
    alignSelf: "flex-start",
    marginTop: 16,
    paddingVertical: 4,
  },
  heartContainer: {
    alignItems: "center",
    marginTop: 16,
    marginBottom: 24,
  },
  title: {
    ...typography.heading2,
    color: colors.textPrimary,
  },
  subtitle: {
    ...typography.body,
    color: colors.textSecondary,
    marginTop: 4,
    marginBottom: 32,
  },
  formContainer: {
    gap: 16,
    marginBottom: 16,
  },
  footerButton: {
    alignItems: "center",
    marginTop: 24,
    paddingVertical: 4,
  },
  footerText: {
    ...typography.body,
    color: colors.textSecondary,
  },
  footerLinkText: {
    ...typography.body,
    color: colors.primary,
    textDecorationLine: "underline",
  },
});

export default RegisterScreen;
