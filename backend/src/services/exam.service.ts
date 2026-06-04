import { db } from "../firebase/firebase";
import { AppError } from "../middlewares/app-error";
import type { CreateExamInput, UpdateExamInput } from "../schemas/exame.schema";
import type { Exam } from "../types/exam.types";
import { getTodayBrazil } from "../utils";

const examsCollection = db.collection("exams");

function validateExam(doc: FirebaseFirestore.DocumentSnapshot): Exam {
  const data = doc.data();

  if (!data) {
    throw new AppError("Exam not found", 404);
  }

  return {
    id: doc.id,
    ...(data as Omit<Exam, "id">),
  };
}

export async function createExam(
  input: CreateExamInput,
  userId: string,
): Promise<Exam> {
  const now = new Date().toISOString();

  const payload = {
    userId,
    ...input,
    createdAt: now,
    updatedAt: now,
  };

  const docRef = await examsCollection.add(payload);
  const createdDoc = await docRef.get();

  return validateExam(createdDoc);
}

export async function listExams(userId: string): Promise<Exam[]> {
  const snapshot = await examsCollection.where("userId", "==", userId).get();

  return snapshot.docs.map(validateExam);
}

export async function listExamsToday(userId: string): Promise<Exam[]> {
  const today = getTodayBrazil();
  const snapshot = await examsCollection
    .where("userId", "==", userId)
    .where("date", "==", today)
    .get();

  const exams = snapshot.docs.map(validateExam);

  return exams.sort((a, b) => a.time.localeCompare(b.time));
}

export async function updateExam(
  userId: string,
  id: string,
  input: UpdateExamInput,
): Promise<Exam> {
  const docRef = examsCollection.doc(id);
  const existingDoc = await docRef.get();

  if (!existingDoc.exists) {
    throw new AppError("Exam not found", 404);
  }

  verifyOwnerExam(userId, existingDoc);

  await docRef.update({
    ...input,
    updatedAt: new Date().toISOString(),
  });

  const updatedDoc = await docRef.get();
  return validateExam(updatedDoc);
}

export async function deleteExam(userId: string, id: string): Promise<void> {
  const docRef = examsCollection.doc(id);
  const existingDoc = await docRef.get();

  if (!existingDoc.exists) {
    throw new AppError("Exam not found", 404);
  }

  verifyOwnerExam(userId, existingDoc);

  await docRef.delete();
}

const verifyOwnerExam = (
  userId: string,
  existingDoc: FirebaseFirestore.DocumentSnapshot<FirebaseFirestore.DocumentData>,
) => {
  const exam = existingDoc.data();

  if (exam?.userId !== userId) {
    throw new AppError("Forbidden", 403);
  }
};
