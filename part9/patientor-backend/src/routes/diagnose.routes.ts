import { Router } from "express";
import { getAllDiagnoses } from "../services/diagnose.service";
import { Diagnoses } from "../types/diagnose.types";

const router = Router();

router.get("/", (_req, res) => {
  const diagnoses: Diagnoses = getAllDiagnoses();
  return res.status(200).json(diagnoses);
});

export default router;
