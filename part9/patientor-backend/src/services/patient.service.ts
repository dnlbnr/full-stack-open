import { v1 as uui } from "uuid";
import {
  PatientsNoSsn,
  PatientNoSsn,
  NewPatientData,
} from "../types/patient.types";
import { patients } from "../data/patients";

export function getAllPatients(): PatientsNoSsn {
  return patients.map((p) => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { ssn, ...patient } = p;
    return patient;
  });
}

export function createPatient(data: NewPatientData): PatientNoSsn {
  const id = uui();
  const newPatient = { id, ...data };
  patients.push(newPatient);
  return newPatient;
}
