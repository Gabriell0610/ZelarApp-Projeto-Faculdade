import React, { useCallback, useEffect, useMemo, useState } from "react";
import {
  Pressable,
  RefreshControl,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useFocusEffect } from "@react-navigation/native";

import SectionHeader from "../components/dashboard/SectionHeader";
import StatCard from "../components/dashboard/StatCard";
import TodayItem, {
  AppointmentItemProps,
  ExamItemProps,
  MedicationItemProps,
  TodayItemProps,
} from "../components/dashboard/TodayItem";
import { colors } from "../theme/colors";
import { typography } from "../theme/typography";
import { Ionicons } from "@expo/vector-icons";
import {
  APPOINTMENTS_TODAY,
  EXAMS_TODAY,
  MEDICATION_TODAY,
  USER,
} from "../utils/const";
import { fetchApi } from "../service/api";
import {
  ListAppointmentInterface,
  ListExamsInterface,
  ListMedicationInterface,
  ListUserInterface,
} from "../utils/types";

interface StatSummary {
  value: number;
  label: string;
  backgroundColor: string;
  textColor: string;
}

const capitalizeFirstLetter = (value: string): string => {
  return value.charAt(0).toUpperCase() + value.slice(1);
};

const DashboardScreen: React.FC = () => {
  const [refreshing, setRefreshing] = useState(false);
  const [medicationsToday, setMedicationsToday] = useState<
    MedicationItemProps[]
  >([]);

  const [appointmentsToday, setAppointmentsToday] = useState<
    AppointmentItemProps[]
  >([]);

  const [examsToday, setExamsToday] = useState<ExamItemProps[]>([]);
  const [userName, setUserName] = useState<string>("");

  const loadData = useCallback(async () => {
    try {
      const medications =
        await fetchApi.get<ListMedicationInterface[]>(MEDICATION_TODAY);
      const appointments =
        await fetchApi.get<ListAppointmentInterface[]>(APPOINTMENTS_TODAY);
      const exams = await fetchApi.get<ListExamsInterface[]>(EXAMS_TODAY);

      setMedicationsToday(
        medications.data.map((item) => ({
          mode: "Medication",
          id: item.id,
          name: item.name,
          dosage: item.dosage,
          frequency: item.frequency,
          scheduleTimes: item.scheduleTimes,
          dotColor: "#1D9E75",
          timeBackgroundColor: "#E1F5EE",
          timeTextColor: "#085041",
        })),
      );

      setAppointmentsToday(
        appointments.data.map((item) => ({
          mode: "Appointment",
          id: item.id,
          time: item.time,
          specialty: item.specialty,
          doctorName: item.doctorName,
          address: item.address,
          notes: item.notes,
          dotColor: "#CB1958",
          timeBackgroundColor: "#FCE4EC",
          timeTextColor: "#CB1958",
        })),
      );

      setExamsToday(
        exams.data.map((item) => ({
          mode: "Exam",
          id: item.id,
          date: item.date,
          name: item.name,
          time: item.time,
          address: item.address,
          preparation: item.preparation,
          dotColor: "#534AB7",
          timeBackgroundColor: "#EEEDFE",
          timeTextColor: "#3C3489",
        })),
      );

      console.log("exames: ", exams.data);
      console.log("consultas: ", appointments.data);
      console.log("medicações: ", medications.data);
    } catch (error) {
      console.error(error);
    }
  }, []);

  const loadUser = useCallback(async () => {
    try {
      const res = await fetchApi.get<ListUserInterface>(USER);
      setUserName(res.data.name);
    } catch (error) {
      console.error(error);
    }
  }, []);

  // recarrega ao focar na tela
  useFocusEffect(
    useCallback(() => {
      loadData();
      loadUser();
    }, [loadData, loadUser]),
  );

  // pull to refresh
  const handleRefresh = async () => {
    setRefreshing(true);
    await Promise.all([loadData(), loadUser()]);
    setRefreshing(false);
  };

  const stats: StatSummary[] = [
    {
      value: medicationsToday.length,
      label: "Remédios hoje",
      backgroundColor: "#E1F5EE",
      textColor: "#085041",
    },
    {
      value: examsToday.length,
      label: "Exame hoje",
      backgroundColor: "#EEEDFE",
      textColor: "#3C3489",
    },
    {
      value: appointmentsToday.length,
      label: "Consultas hoje",
      backgroundColor: "#FAEEDA",
      textColor: "#633806",
    },
  ];

  const currentDate = useMemo(() => {
    const formattedDate = new Date().toLocaleDateString("pt-BR", {
      weekday: "long",
      day: "numeric",
      month: "long",
    });

    return capitalizeFirstLetter(formattedDate);
  }, []);

  return (
    <SafeAreaView style={styles.safeArea} edges={["top"]}>
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.contentContainer}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={handleRefresh}
            colors={[colors.primary]}
            tintColor={colors.primary}
          />
        }
      >
        <View style={styles.header}>
          <Text style={styles.greeting}>Bom dia,</Text>
          <Text style={styles.userName}>{userName}</Text>
          <Text style={styles.date}>{currentDate}</Text>
        </View>

        <View style={styles.statsContainer}>
          {stats.map((stat) => (
            <StatCard
              key={stat.label}
              value={stat.value}
              label={stat.label}
              backgroundColor={stat.backgroundColor}
              textColor={stat.textColor}
            />
          ))}
        </View>

        <View style={styles.body}>
          <SectionHeader title="Remédios" />
          <View style={styles.itemList}>
            {medicationsToday.map((item) => (
              <TodayItem key={item.name} {...item} />
            ))}
          </View>

          <SectionHeader title="Exames" />
          <View style={styles.itemList}>
            {examsToday.map((item) => (
              <TodayItem key={`${item.id}`} {...item} />
            ))}
          </View>

          <SectionHeader title="Consultas" />
          <View style={styles.itemList}>
            {appointmentsToday.map((item) => (
              <TodayItem key={`${item.id}`} {...item} />
            ))}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.background,
  },
  scrollView: {
    flex: 1,
  },
  backButton: {
    alignSelf: "flex-start",
    marginTop: 16,
    paddingVertical: 2,
    color: colors.white,
  },
  contentContainer: {
    paddingBottom: 32,
  },
  header: {
    backgroundColor: colors.primary,
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 24,
  },
  greeting: {
    ...typography.caption,
    color: "rgba(255,255,255,0.8)",
  },
  userName: {
    ...typography.heading2,
    color: colors.white,
    marginTop: 2,
  },
  date: {
    ...typography.caption,
    color: "rgba(255,255,255,0.75)",
    marginTop: 2,
  },
  statsContainer: {
    flexDirection: "row",
    gap: 8,
    marginTop: -20,
    marginHorizontal: 20,
  },
  body: {
    paddingHorizontal: 20,
  },
  itemList: {
    gap: 10,
  },
});

export default DashboardScreen;
