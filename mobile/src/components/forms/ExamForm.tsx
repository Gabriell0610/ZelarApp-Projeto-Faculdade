import React, { useState } from "react";
import { StyleSheet, View } from "react-native";
import Button from "../ui/Button";
import Input from "../ui/Input";

export interface ExamFormData {
  name: string;
  date: string;
  time: string;
  address: string;
  preparation?: string;
  notes?: string;
}

interface ExamFormProps {
  onSubmit: (data: ExamFormData) => void;
}

const ExamForm: React.FC<ExamFormProps> = ({ onSubmit }) => {
  const [name, setName] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [address, setAddress] = useState("");
  const [preparation, setPreparation] = useState("");
  const [notes, setNotes] = useState("");

  const handleSubmit = () => {
    if (!name || !date || !time || !address) return;

    onSubmit({
      name,
      date,
      time,
      address,
      preparation: preparation || undefined,
      notes: notes || undefined,
    });

    setName("");
    setDate("");
    setTime("");
    setAddress("");
    setPreparation("");
    setNotes("");
  };

  return (
    <View style={styles.container}>
      <Input
        label="Nome do exame"
        value={name}
        onChangeText={setName}
        placeholder="ex: Hemograma"
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
        placeholder="ex: 08:00"
      />
      <Input
        label="Local"
        value={address}
        onChangeText={setAddress}
        placeholder="ex: Laboratório Central"
      />
      <Input
        label="Preparo necessário (opcional)"
        value={preparation}
        onChangeText={setPreparation}
        placeholder="ex: Jejum de 8 horas"
      />
      <Input
        label="Observações (opcional)"
        value={notes}
        onChangeText={setNotes}
        placeholder="Informações adicionais"
      />
      <Button
        title="Salvar exame"
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

export default ExamForm;
