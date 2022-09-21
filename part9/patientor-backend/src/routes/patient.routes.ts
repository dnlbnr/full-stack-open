import { Router } from "express";
import { PatientsNoSsn } from "../types/patient.types";
import { getAllPatients, createPatient } from "../services/patient.service";
import { toNewPatientData } from "../utils/typeValidators";

const router = Router();

router.get("/", (_req, res) => {
  const patients: PatientsNoSsn = getAllPatients();
  return res.status(200).json(patients);
});

router.post("/", (req, res) => {
  if (typeof req.body !== "object" || req.body === null) {
    return res.status(400).json({ message: "Invalid Data" });
  }
  const newPatientData = toNewPatientData(req.body);
  const newPatient = createPatient(newPatientData);
  return res.status(201).json(newPatient);
});

export default router;
