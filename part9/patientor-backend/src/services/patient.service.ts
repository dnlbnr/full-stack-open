import { v1 as uui } from "uuid";
import { PublicPatient, NewPatientData, Patient } from "../types/patient.types";
import { patients } from "../data/patients";

export function getAllPatients(): PublicPatient[] {
  return patients.map((p) => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { ssn, ...patient } = p;
    return patient;
  });
}

export function getPatientWithId(id: string): Patient | undefined {
  return patients.find((p) => p.id === id);
}

export function createPatient(data: NewPatientData): PublicPatient {
  const id = uui();
  const newPatient = { id, entries: [], ...data };
  patients.push(newPatient);

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { ssn, entries: _entries, ...publicPatient } = newPatient;
  return publicPatient;
}
