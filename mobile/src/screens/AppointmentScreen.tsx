import React, { useEffect, useState } from "react";
import { FlatList, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { colors } from "../theme/colors";
import { typography } from "../theme/typography";
import Button from "../components/ui/Button";
import ItemCard from "../components/shared/ItemCard";
import BottomSheet from "../components/shared/BottomSheet";
import EmptyList from "../components/shared/EmptyList";
import AppointmentForm, {
  AppointmentFormData,
} from "../components/forms/AppointmentForm";
import { APPOINTMENTS } from "../utils/const";
import { fetchApi, useFetchApi } from "../service/api";

export interface ListAppointmentInterface {
  id: string;
  doctorName: string;
  specialty: string;
  date: string;
  time: string;
  address: string;
  notes?: string;
}

const ACCENT = "#534AB7";

const AppointmentScreen: React.FC = () => {
  const [appointments, setAppointments] = useState<ListAppointmentInterface[]>(
    [],
  );
  const [bottomSheetVisible, setBottomSheetVisible] = useState(false);

  useEffect(() => {
    async function loadAppointments() {
      try {
        const response =
          await fetchApi.get<ListAppointmentInterface[]>(APPOINTMENTS);
        setAppointments(response.data);
      } catch (error) {
        console.error(error);
      }
    }
    loadAppointments();
  }, []);

  const handleSubmit = async (data: AppointmentFormData) => {
    const response = await useFetchApi<AppointmentFormData>(APPOINTMENTS, data);
    setAppointments((prev) => [response.data, ...prev]);
    setBottomSheetVisible(false);
  };

  return (
    <SafeAreaView style={styles.safeArea} edges={["top"]}>
      <View style={[styles.header, { backgroundColor: ACCENT }]}>
        <Text style={styles.headerTitle}>Consultas</Text>
        <Text style={styles.headerSubtitle}>
          {appointments.length} agendada(s)
        </Text>
      </View>

      <View style={styles.addButtonWrapper}>
        <Button
          title="Agendar consulta"
          onPress={() => setBottomSheetVisible(true)}
          variant="primary"
          fullWidth
        />
      </View>

      <FlatList
        data={appointments}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContent}
        ListEmptyComponent={
          <EmptyList
            icon="calendar-outline"
            message="Nenhuma consulta agendada"
          />
        }
        renderItem={({ item }) => (
          <ItemCard
            title={item.doctorName}
            accentColor={ACCENT}
            lines={[
              { label: "Especialidade", value: item.specialty },
              { label: "Data", value: item.date },
              { label: "Horário", value: item.time },
              { label: "Local", value: item.address },
            ]}
          />
        )}
      />

      <BottomSheet
        visible={bottomSheetVisible}
        onClose={() => setBottomSheetVisible(false)}
        title="Nova consulta"
      >
        <AppointmentForm onSubmit={handleSubmit} />
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

export default AppointmentScreen;
