import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { colors } from "../../theme/colors";
import { typography } from "../../theme/typography";

interface EmptyListProps {
  icon: string;
  message: string;
}

const EmptyList: React.FC<EmptyListProps> = ({ icon, message }) => {
  return (
    <View style={styles.container}>
      <Ionicons name={icon as any} size={40} color={colors.border} />
      <Text style={styles.message}>{message}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 48,
  },
  message: {
    ...typography.body,
    color: colors.textSecondary,
    textAlign: "center",
    marginTop: 10,
  },
});

export default EmptyList;
