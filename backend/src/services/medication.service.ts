import { Timestamp } from "firebase-admin/firestore";
import { db } from "../firebase/firebase";
import type {
  CreateMedicationInput,
  UpdateMedicationInput,
} from "../schemas/medication.schema";
import type { MedicationResponse, Medication } from "../types/medication.types";
import { AppError } from "../middlewares/app-error";
import { getTodayBrazil } from "../utils";

const medicationsCollection = db.collection("medications");

function validateMedication(
  doc: FirebaseFirestore.DocumentSnapshot,
): MedicationResponse {
  const data = doc.data();

  if (!data) {
    throw new AppError("Medication not found", 404);
  }

  const { createdAt, updatedAt, ...rest } = data;

  return { id: doc.id, ...rest } as unknown as MedicationResponse;
}

export async function createMedication(
  input: CreateMedicationInput,
  userId: string,
): Promise<MedicationResponse> {
  const payload = {
    userId,
    ...input,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };

  const docRef = await medicationsCollection.add(payload);
  const createdDoc = await docRef.get();

  return validateMedication(createdDoc);
}

export async function listMedications(
  userId: string,
): Promise<MedicationResponse[]> {
  const snapshot = await medicationsCollection
    .where("userId", "==", userId)
    .get();
  return snapshot.docs.map(validateMedication);
}

export async function listMedicationsToday(
  userId: string,
): Promise<MedicationResponse[]> {
  const today = getTodayBrazil();
  const snapshot = await medicationsCollection
    .where("userId", "==", userId)
    .get();

  return snapshot.docs
    .map(validateMedication)
    .filter((med) => med.startDate <= today && med.endDate >= today)
    .sort((a, b) => a.endDate.localeCompare(b.endDate));
}

export async function updateMedication(
  userId: string,
  id: string,
  input: UpdateMedicationInput,
): Promise<MedicationResponse> {
  const docRef = medicationsCollection.doc(id);
  const existingDoc = await docRef.get();

  if (!existingDoc.exists) {
    throw new AppError("Medication not found", 404);
  }

  verifyOwnerMedication(userId, existingDoc);

  await docRef.update({
    ...input,
    updatedAt: new Date().toISOString(),
  });

  const updatedDoc = await docRef.get();
  return validateMedication(updatedDoc);
}

export async function deleteMedication(
  userId: string,
  id: string,
): Promise<void> {
  const docRef = medicationsCollection.doc(id);
  const existingDoc = await docRef.get();

  if (!existingDoc.exists) {
    throw new AppError("Medication not found", 404);
  }

  verifyOwnerMedication(userId, existingDoc);

  await docRef.delete();
  throw new AppError("Forbidden", 403);
}

const verifyOwnerMedication = (
  userId: string,
  existingDoc: FirebaseFirestore.DocumentSnapshot<FirebaseFirestore.DocumentData>,
) => {
  const medication = existingDoc.data();

  if (medication?.userId !== userId) {
    throw new AppError("Forbidden", 403);
  }
};
