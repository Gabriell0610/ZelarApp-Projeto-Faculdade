import React, { useEffect, useState } from "react";
import { FlatList, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { colors } from "../theme/colors";
import { typography } from "../theme/typography";
import Button from "../components/ui/Button";
import ItemCard from "../components/shared/ItemCard";
import BottomSheet from "../components/shared/BottomSheet";
import EmptyList from "../components/shared/EmptyList";
import MedicationForm, {
  MedicationFormData,
} from "../components/forms/MedicationForm";
import { MEDICATION } from "../utils/const";
import { fetchApi } from "../service/api";

export interface ListMedicationInterface {
  id: string;
  name: string;
  dosage: string;
  frequency: string;
  scheduleTimes: string[];
  startDate: string;
  endDate?: string;
  notes?: string;
}

const MedicationScreen: React.FC = () => {
  const [medications, setMedications] = useState<ListMedicationInterface[]>([]);
  const [bottomSheetVisible, setBottomSheetVisible] = useState(false);

  useEffect(() => {
    async function loadMedications() {
      try {
        const response =
          await fetchApi.get<ListMedicationInterface[]>(MEDICATION);
        setMedications(response.data);
      } catch (error) {
        console.error(error);
      }
    }
    loadMedications();
  }, []);

  const handleSubmit = async (data: MedicationFormData) => {
    try {
      const response = await fetchApi.post<ListMedicationInterface>(
        MEDICATION,
        data,
      );
      setMedications((prev) => [response.data, ...prev]);
      setBottomSheetVisible(false);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <SafeAreaView style={styles.safeArea} edges={["top"]}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Medicamentos</Text>
        <Text style={styles.headerSubtitle}>
          {medications.length} cadastrado(s)
        </Text>
      </View>

      <View style={styles.addButtonWrapper}>
        <Button
          title="Adicionar medicamento"
          onPress={() => setBottomSheetVisible(true)}
          variant="primary"
          fullWidth
        />
      </View>

      <FlatList
        data={medications}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContent}
        ListEmptyComponent={
          <EmptyList
            icon="medkit-outline"
            message="Nenhum medicamento cadastrado"
          />
        }
        renderItem={({ item }) => (
          <ItemCard
            title={item.name}
            accentColor={colors.primary}
            lines={[
              { label: "Dosagem", value: item.dosage },
              { label: "Frequência", value: item.frequency },
              {
                label: "Horários",
                value: item.scheduleTimes?.join(", ") ?? "",
              },
            ]}
          />
        )}
      />

      <BottomSheet
        visible={bottomSheetVisible}
        onClose={() => setBottomSheetVisible(false)}
        title="Novo medicamento"
      >
        <MedicationForm onSubmit={handleSubmit} />
      </BottomSheet>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.background,
  },
  header: {
    backgroundColor: colors.primary,
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 24,
  },
  headerTitle: {
    ...typography.heading2,
    color: colors.white,
  },
  headerSubtitle: {
    ...typography.caption,
    color: "rgba(255,255,255,0.8)",
    marginTop: 2,
  },
  addButtonWrapper: {
    marginHorizontal: 20,
    marginTop: 20,
    marginBottom: 8,
  },
  listContent: {
    paddingHorizontal: 20,
    paddingTop: 8,
    paddingBottom: 100,
    gap: 10,
    flexGrow: 1,
  },
});

export default MedicationScreen;
