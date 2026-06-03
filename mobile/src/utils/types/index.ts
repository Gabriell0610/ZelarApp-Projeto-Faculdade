export interface LoginAndRegisterRequestInterface {
  kind: string;
  localId: string;
  email: string;
  displayName?: string;
  idToken: string;
  registered?: string;
  refreshToken: string;
  expiresIn: number;
}

export interface RegisterRequestInterface {
  email: string;
  id: string;
  name: string;
}

export interface ListMedicationInterface {
  id: string;
  scheduleTimes: string[];
  startDate: string;
  endDate: string;
  frequency: string;
  notes: string;
  userId: string;
  dosage: string;
  name: string;
}
export interface ListExamsInterface {
  id: string;
  address: string;
  notes: string;
  date: string;
  name: string;
  userId: string;
  time: string;
  preparation: string;
}

export interface ListAppointmentInterface {
  id: string;
  userId: string;
  doctorName: string;
  date: string;
  notes: string;
  time: string;
  specialty: string;
  address: string;
}

export interface ListUserInterface {
  id: string;
  email: string;
  createdAt: string;
  name: string;
}

export type ItemType = "Appointment" | "Exam" | "Medication";
