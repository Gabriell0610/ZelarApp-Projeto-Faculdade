import React, { useEffect, useState } from "react";
import { FlatList, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { colors } from "../theme/colors";
import { typography } from "../theme/typography";
import Button from "../components/ui/Button";
import ItemCard from "../components/shared/ItemCard";
import BottomSheet from "../components/shared/BottomSheet";
import EmptyList from "../components/shared/EmptyList";
import ExamForm, { ExamFormData } from "../components/forms/ExamForm";
import { fetchApi, useFetchApi } from "../service/api";
import { EXAMS } from "../utils/const";

export interface ListExamsInterface {
  id: string;
  name: string;
  date: string;
  time: string;
  address: string;
  preparation?: string;
  notes?: string;
}

const ACCENT = "#EF9F27";

const ExamsScreen: React.FC = () => {
  const [exams, setExams] = useState<ListExamsInterface[]>([]);
  const [bottomSheetVisible, setBottomSheetVisible] = useState(false);

  useEffect(() => {
    async function loadExams() {
      try {
        const response = await fetchApi.get<ListExamsInterface[]>(EXAMS);
        setExams(response.data);
      } catch (error) {
        console.error(error);
      }
    }
    loadExams();
  }, []);

  const handleSubmit = async (data: ExamFormData) => {
    const response = await useFetchApi<ExamFormData>(EXAMS, data);
    setExams((prev) => [response.data, ...prev]);
    setBottomSheetVisible(false);
  };

  return (
    <SafeAreaView style={styles.safeArea} edges={["top"]}>
      <View style={[styles.header, { backgroundColor: ACCENT }]}>
        <Text style={styles.headerTitle}>Exames</Text>
        <Text style={styles.headerSubtitle}>{exams.length} agendado(s)</Text>
      </View>

      <View style={styles.addButtonWrapper}>
        <Button
          title="Agendar exame"
          onPress={() => setBottomSheetVisible(true)}
          variant="primary"
          fullWidth
        />
      </View>

      <FlatList
        data={exams}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContent}
        ListEmptyComponent={
          <EmptyList icon="flask-outline" message="Nenhum exame agendado" />
        }
        renderItem={({ item }) => (
          <ItemCard
            title={item.name}
            accentColor={ACCENT}
            lines={[
              { label: "Data", value: item.date },
              { label: "Horário", value: item.time },
              { label: "Local", value: item.address },
              ...(item.notes
                ? [{ label: "Preparação", value: item.notes }]
                : []),
              ...(item.notes ? [{ label: "Lembrete", value: item.notes }] : []),
            ]}
          />
        )}
      />

      <BottomSheet
        visible={bottomSheetVisible}
        onClose={() => setBottomSheetVisible(false)}
        title="Novo exame"
      >
        <ExamForm onSubmit={handleSubmit} />
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

export default ExamsScreen;
