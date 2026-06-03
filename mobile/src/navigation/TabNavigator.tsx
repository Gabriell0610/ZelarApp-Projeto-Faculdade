import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";

import DashboardScreen from "../screens/DashboardScreen";
import { colors } from "../theme/colors";
import { typography } from "../theme/typography";
import { ItemType } from "../utils/types";
import MedicationScreen from "../screens/MedsScreen";
import ExamsScreen from "../screens/ExamsScreen";
import AppointmentScreen from "../screens/AppointmentScreen";

type IoniconName = keyof typeof Ionicons.glyphMap;

export type MainTabParamList = {
  Home: undefined;
  Meds: undefined;
  Exams: undefined;
  Appointments: undefined;
};

interface PlaceholderScreenProps {
  title: string;
  mode?: ItemType;
}

const tabIcons: Record<
  keyof MainTabParamList,
  {
    active: IoniconName;
    inactive: IoniconName;
  }
> = {
  Home: {
    active: "home",
    inactive: "home-outline",
  },
  Meds: {
    active: "medkit",
    inactive: "medkit-outline",
  },
  Exams: {
    active: "calendar",
    inactive: "calendar-outline",
  },
  Appointments: {
    active: "calendar",
    inactive: "calendar-outline",
  },
};

const Tab = createBottomTabNavigator<MainTabParamList>();

const PlaceholderScreen: React.FC<PlaceholderScreenProps> = ({
  title,
  mode,
}) => {
  return (
    <View style={styles.placeholderContainer}>
      <Text style={styles.placeholderText}>{title}</Text>
    </View>
  );
};
const TabNavigator: React.FC = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: colors.textSecondary,
        tabBarShowLabel: true,
        tabBarLabelStyle: styles.tabBarLabel,
        tabBarStyle: styles.tabBar,
        tabBarIcon: ({ focused, color, size }) => {
          const icon = tabIcons[route.name];
          const iconName = focused ? icon.active : icon.inactive;

          return <Ionicons name={iconName} size={size} color={color} />;
        },
      })}
    >
      <Tab.Screen
        name="Home"
        component={DashboardScreen}
        options={{ title: "Início" }}
      />
      <Tab.Screen
        name="Meds"
        component={MedicationScreen}
        options={{ title: "Remédios" }}
      />
      <Tab.Screen
        name="Exams"
        component={ExamsScreen}
        options={{ title: "Exames" }}
      />
      <Tab.Screen
        name="Appointments"
        component={AppointmentScreen}
        options={{ title: "Consultas" }}
      />
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  tabBar: {
    backgroundColor: colors.white,
    borderTopColor: colors.border,
    borderTopWidth: 0.5,
    height: 60,
    paddingBottom: 8,
  },
  tabBarLabel: {
    fontSize: 11,
  },
  placeholderContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.background,
  },
  placeholderText: {
    ...typography.body,
    color: colors.textSecondary,
  },
});

export default TabNavigator;
