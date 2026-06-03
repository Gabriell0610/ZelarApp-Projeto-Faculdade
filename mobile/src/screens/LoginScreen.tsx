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
import { LOGIN_URL } from "../utils/const";
import axios from "axios";
import { LoginAndRegisterRequestInterface } from "../utils/types";
import { getToken, saveToken } from "../storage/auth-storage";

type LoginScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  "Login"
>;

const LoginScreen: React.FC = () => {
  const navigation = useNavigation<LoginScreenNavigationProp>();
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const handleLogin = async (): Promise<void> => {
    try {
      const response = await axios.post<LoginAndRegisterRequestInterface>(
        LOGIN_URL,
        {
          email,
          password,
          returnSecureToken: true,
        },
      );

      const token = response.data.idToken;

      await saveToken(token);

      navigation.navigate("Main");
    } catch (error: any) {
      console.log("erro login", error.response.data);
    }
  };

  const handleRegister = (): void => {
    navigation.navigate("Register");
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
            onPress={() => navigation.navigate("Landing")}
            style={styles.backButton}
          >
            <Ionicons name="chevron-back" size={28} color={colors.primary} />
          </Pressable>

          <View style={styles.heartContainer}>
            <Ionicons name="heart" size={36} color={colors.primary} />
          </View>

          <Text style={styles.title}>Bem-vindo de volta</Text>
          <Text style={styles.subtitle}>Entre na sua conta para continuar</Text>

          <View style={styles.formContainer}>
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
              placeholder="••••••••"
              secureTextEntry
            />
          </View>

          <Button
            title="Entrar"
            onPress={handleLogin}
            variant="primary"
            fullWidth
          />

          <View style={styles.separatorContainer}>
            <View style={styles.separatorLine} />
            <Text style={styles.separatorText}>ou</Text>
            <View style={styles.separatorLine} />
          </View>

          <Pressable onPress={handleRegister} style={styles.footerButton}>
            <Text style={styles.footerText}>
              Não tem conta?{" "}
              <Text style={styles.footerLinkText}>Cadastrar</Text>
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
    marginTop: 48,
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
  separatorContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 24,
  },
  separatorLine: {
    flex: 1,
    height: 1,
    backgroundColor: colors.border,
  },
  separatorText: {
    ...typography.caption,
    color: colors.textSecondary,
    marginHorizontal: 12,
  },
  footerButton: {
    alignItems: "center",
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

export default LoginScreen;
