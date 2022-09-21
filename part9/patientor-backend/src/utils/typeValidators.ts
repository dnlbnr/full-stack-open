import {
  Gender,
  NewPatientRequestFields,
  NewPatientData,
} from "../types/patient.types";

function isString(value: unknown): value is string {
  return value instanceof String || typeof value === "string";
}

function parseString(value: unknown): string {
  if (!isString(value)) throw new Error(`Invalid string value: ${value}`);
  return value;
}

function isGender(value: any): value is Gender {
  return Object.values(Gender).includes(value);
}

function parseGender(value: unknown): Gender {
  if (!isGender(value)) throw new Error(`Invalid Gender value: ${value}`);
  return value;
}

export function toNewPatientData(obj: NewPatientRequestFields): NewPatientData {
  const newPatientData: NewPatientData = {
    name: parseString(obj.name),
    dateOfBirth: parseString(obj.dateOfBirth),
    ssn: parseString(obj.ssn),
    gender: parseGender(obj.gender),
    occupation: parseString(obj.occupation),
  };
  return newPatientData;
}
