import React, { useMemo } from "react";
import { StyleSheet, Text, View } from "react-native";

import { colors } from "../../theme/colors";
import { typography } from "../../theme/typography";
import { ItemType } from "../../utils/types";

interface BaseTodayItemProps {
  mode: ItemType;

  dotColor: string;
  timeBackgroundColor: string;
  timeTextColor: string;
}

export interface ExamItemProps extends BaseTodayItemProps {
  mode: "Exam";

  id: string;
  date: string;
  time: string;
  name: string;
  address: string;
  preparation: string;
}

export interface AppointmentItemProps extends BaseTodayItemProps {
  mode: "Appointment";

  id: string;
  time: string;
  specialty: string;
  doctorName: string;
  address: string;
  notes: string;
}

export interface MedicationItemProps extends BaseTodayItemProps {
  mode: "Medication";

  id: string;
  name: string;
  dosage: string;
  frequency: string;
  scheduleTimes: string[];
}

export type TodayItemProps =
  | AppointmentItemProps
  | ExamItemProps
  | MedicationItemProps;

const TodayItem: React.FC<TodayItemProps> = (props) => {
  const dynamicStyles = useMemo(
    () =>
      StyleSheet.create({
        timeBadge: {
          backgroundColor: props.timeBackgroundColor,
        },
        timeText: {
          color: props.timeTextColor,
        },
        dot: {
          backgroundColor: props.dotColor,
        },
      }),
    [props],
  );

  return (
    <View style={styles.container}>
      {renderTimeBadge(props, dynamicStyles)}

      <View style={styles.textContainer}>{renderContent(props)}</View>

      <View style={[styles.dot, dynamicStyles.dot]} />
    </View>
  );
};

function renderTimeBadge(props: TodayItemProps, dynamicStyles: any) {
  if (props.mode === "Appointment") {
    return (
      <View style={[styles.timeBadge, dynamicStyles.timeBadge]}>
        <Text style={[styles.timeText, dynamicStyles.timeText]}>
          {props.time}
        </Text>
      </View>
    );
  }

  if (props.mode === "Exam") {
    return (
      <View style={[styles.timeBadge, dynamicStyles.timeBadge]}>
        <Text style={[styles.timeText, dynamicStyles.timeText]}>
          {props.time}
        </Text>
      </View>
    );
  }

  return (
    <View style={[styles.timeBadge, dynamicStyles.timeBadge]}>
      <Text style={[styles.timeText, dynamicStyles.timeText]}>
        {props.scheduleTimes[0]}
      </Text>
    </View>
  );
}

function renderContent(props: TodayItemProps) {
  switch (props.mode) {
    case "Appointment":
      return (
        <>
          <Text style={styles.title}>{props.specialty}</Text>

          <Text style={styles.subtitle}>Doutor: {props.doctorName}</Text>

          <Text style={styles.subtitle}>Endereço: {props.address}</Text>

          <Text style={styles.subtitle}>Lembrete: {props.notes}</Text>
        </>
      );

    case "Exam":
      return (
        <>
          <Text style={styles.title}>{props.name}</Text>

          <Text style={styles.subtitle}>Endereço: {props.address}</Text>

          <Text style={styles.subtitle}>Preparo: {props.preparation}</Text>
        </>
      );

    case "Medication":
      return (
        <>
          <Text style={styles.title}>{props.name}</Text>

          <Text style={styles.subtitle}>Dosagem: {props.dosage}</Text>

          <Text style={styles.subtitle}>Frequência: {props.frequency}</Text>

          <Text style={styles.subtitle}>
            Horários: {props.scheduleTimes.join(", ")}
          </Text>
        </>
      );
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    backgroundColor: colors.surface,
    borderRadius: 10,
    padding: 12,
    borderWidth: 0.5,
    borderColor: colors.border,
  },
  timeBadge: {
    borderRadius: 8,
    paddingHorizontal: 8,
    paddingVertical: 6,
    minWidth: 44,
    alignItems: "center",
  },
  timeText: {
    fontSize: 11,
    fontWeight: "500",
  },
  textContainer: {
    flex: 1,
  },
  title: {
    ...typography.label,
    color: colors.textPrimary,
  },
  subtitle: {
    ...typography.caption,
    color: colors.textSecondary,
    marginTop: 2,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
});

export default TodayItem;
