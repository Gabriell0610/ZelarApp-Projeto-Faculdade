import React, { useState } from "react";
import { StyleSheet, View } from "react-native";
import Button from "../ui/Button";
import Input from "../ui/Input";

export interface MedicationFormData {
  name: string;
  dosage: string;
  frequency: string;
  scheduleTimes: string[];
  startDate: string;
  endDate?: string;
  notes?: string;
}

interface MedicationFormProps {
  onSubmit: (data: MedicationFormData) => void;
}

const MedicationForm: React.FC<MedicationFormProps> = ({ onSubmit }) => {
  const [name, setName] = useState("");
  const [dosage, setDosage] = useState("");
  const [frequency, setFrequency] = useState("");
  const [scheduleTimes, setScheduleTimes] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [notes, setNotes] = useState("");

  const handleSubmit = () => {
    if (!name || !dosage || !frequency || !scheduleTimes || !startDate) return;

    const times = scheduleTimes
      .split(",")
      .map((t) => t.trim())
      .filter((t) => t.length > 0);

    console.log("scheduleTimes enviado:", JSON.stringify(times));

    onSubmit({
      name,
      dosage,
      frequency,
      scheduleTimes: times,
      startDate,
      endDate: endDate || undefined,
      notes: notes || undefined,
    });

    setName("");
    setDosage("");
    setFrequency("");
    setScheduleTimes("");
    setStartDate("");
    setEndDate("");
    setNotes("");
  };

  return (
    <View style={styles.container}>
      <Input
        label="Nome do medicamento"
        value={name}
        onChangeText={setName}
        placeholder="ex: Dipirona 500 MG"
      />
      <Input
        label="Dosagem"
        value={dosage}
        onChangeText={setDosage}
        placeholder="ex: 2 comprimidos"
      />
      <Input
        label="Frequência"
        value={frequency}
        onChangeText={setFrequency}
        placeholder="ex: 2x ao dia"
      />
      <Input
        label="Horários (separe por vírgula)"
        value={scheduleTimes}
        onChangeText={setScheduleTimes}
        placeholder="08:00, 20:00"
        autoCapitalize="none"
      />
      <Input
        label="Data de início"
        value={startDate}
        onChangeText={setStartDate}
        placeholder="YYYY-MM-DD"
      />
      <Input
        label="Data de término (opcional)"
        value={endDate}
        onChangeText={setEndDate}
        placeholder="YYYY-MM-DD"
      />
      <Input
        label="Observações (opcional)"
        value={notes}
        onChangeText={setNotes}
        placeholder="Informações adicionais"
      />
      <Button
        title="Salvar medicamento"
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

export default MedicationForm;
