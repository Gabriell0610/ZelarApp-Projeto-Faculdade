export const BASE_URL = process.env.EXPO_PUBLIC_BASE_URL;
const API_KEY = process.env.EXPO_PUBLIC_FIREBASE_API_KEY;

export const REGISTER_URL = `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${API_KEY}`;
export const LOGIN_URL = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${API_KEY}`;
export const MEDICATION_TODAY = `medications/today`;
export const EXAMS_TODAY = `exams/today`;
export const APPOINTMENTS_TODAY = `appointments/today`;
export const MEDICATION = `medications`;
export const APPOINTMENTS = `appointments`;
export const EXAMS = `exams`;

export const USER = `users/me`;
export const REGISTER_USER = `users`;
