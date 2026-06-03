import React, { useState } from "react";
import { StyleSheet, View } from "react-native";
import Button from "../ui/Button";
import Input from "../ui/Input";

export interface AppointmentFormData {
  doctorName: string;
  specialty: string;
  date: string;
  time: string;
  address: string;
  notes?: string;
}

interface AppointmentFormProps {
  onSubmit: (data: AppointmentFormData) => void;
}

const AppointmentForm: React.FC<AppointmentFormProps> = ({ onSubmit }) => {
  const [doctorName, setDoctorName] = useState("");
  const [specialty, setSpecialty] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [address, setAddress] = useState("");
  const [notes, setNotes] = useState("");

  const handleSubmit = () => {
    if (!doctorName || !specialty || !date || !time || !address) return;

    onSubmit({
      doctorName,
      specialty,
      date,
      time,
      address,
      notes: notes || undefined,
    });

    setDoctorName("");
    setSpecialty("");
    setDate("");
    setTime("");
    setAddress("");
    setNotes("");
  };

  return (
    <View style={styles.container}>
      <Input
        label="Nome do médico"
        value={doctorName}
        onChangeText={setDoctorName}
        placeholder="ex: Dr. João"
      />
      <Input
        label="Especialidade"
        value={specialty}
        onChangeText={setSpecialty}
        placeholder="ex: Cardiologia"
      />
      <Input
        label="Data"
        value={date}
        onChangeText={setDate}
        placeholder="YYYY-MM-DD"
      />
      <Input
        label="Horário"
        value={time}
        onChangeText={setTime}
        placeholder="ex: 14:30"
      />
      <Input
        label="Local"
        value={address}
        onChangeText={setAddress}
        placeholder="ex: Hospital Central"
      />
      <Input
        label="Observações (opcional)"
        value={notes}
        onChangeText={setNotes}
        placeholder="Informações adicionais"
      />
      <Button
        title="Salvar consulta"
        onPress={handleSubmit}
        variant="primary"
        fullWidth
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    gap: 12,
    paddingBottom: 16,
  },
  multiline: {
    minHeight: 80,
    textAlignVertical: "top",
  },
});

export default AppointmentForm;
