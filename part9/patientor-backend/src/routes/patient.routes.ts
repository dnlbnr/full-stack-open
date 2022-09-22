import { Router } from "express";
import { PublicPatient } from "../types/patient.types";
import {
  getAllPatients,
  getPatientWithId,
  createPatient,
} from "../services/patient.service";
import { toNewPatientData } from "../utils/typeValidators";

const router = Router();

router.get("/", (_req, res) => {
  const patients: PublicPatient[] = getAllPatients();
  return res.status(200).json(patients);
});

router.get("/:id", (req, res) => {
  const id = req.params.id;
  const patient = getPatientWithId(id);
  if (!patient) return res.status(400).end();
  return res.status(200).json(patient);
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
