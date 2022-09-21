export enum Gender {
  Male = "male",
  Female = "female",
}

export type Patient = {
  id: string;
  name: string;
  dateOfBirth: string;
  ssn: string;
  gender: Gender;
  occupation: string;
};

export type NewPatientRequestFields = {
  name: unknown;
  dateOfBirth: unknown;
  ssn: unknown;
  gender: unknown;
  occupation: unknown;
};

export type NewPatientData = Omit<Patient, "id">;

export type Patients = Patient[];

export type PatientNoSsn = Omit<Patient, "ssn">;
export type PatientsNoSsn = PatientNoSsn[];
