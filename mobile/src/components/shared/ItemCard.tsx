import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { colors } from "../../theme/colors";
import { typography } from "../../theme/typography";

interface ItemCardProps {
  title: string;
  lines: { label: string; value: string }[];
  accentColor: string;
  onEdit?: () => void;
  onDelete?: () => void;
}

const ItemCard: React.FC<ItemCardProps> = ({
  title,
  lines,
  accentColor,
  onEdit,
  onDelete,
}) => {
  return (
    <View style={[styles.card, { borderLeftColor: accentColor }]}>
      <View style={styles.header}>
        <Text style={styles.title} numberOfLines={1}>
          {title}
        </Text>
        <View style={styles.actions}>
          {onEdit && (
            <Pressable onPress={onEdit} style={styles.actionBtn}>
              <Ionicons
                name="create-outline"
                size={18}
                color={colors.textSecondary}
              />
            </Pressable>
          )}
          {onDelete && (
            <Pressable onPress={onDelete} style={styles.actionBtn}>
              <Ionicons
                name="trash-outline"
                size={18}
                color={colors.textSecondary}
              />
            </Pressable>
          )}
        </View>
      </View>
      <View style={styles.lines}>
        {lines.map((line, index) => (
          <View key={index} style={styles.lineRow}>
            <Text style={styles.lineLabel}>{line.label}: </Text>
            <Text style={styles.lineValue} numberOfLines={1}>
              {line.value}
            </Text>
          </View>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.surface,
    borderRadius: 12,
    borderWidth: 0.5,
    borderColor: colors.border,
    borderLeftWidth: 3,
    paddingVertical: 12,
    paddingRight: 14,
    paddingLeft: 10,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  title: {
    ...typography.label,
    color: colors.textPrimary,
    flex: 1,
  },
  actions: {
    flexDirection: "row",
    gap: 12,
    marginLeft: 8,
  },
  actionBtn: {
    padding: 2,
  },
  lines: {
    marginTop: 8,
    gap: 4,
  },
  lineRow: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
  lineLabel: {
    ...typography.caption,
    color: colors.textSecondary,
  },
  lineValue: {
    ...typography.caption,
    color: colors.textPrimary,
    fontWeight: "500",
    flex: 1,
  },
});

export default ItemCard;
