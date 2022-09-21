import { diagnoses } from "../data/diagnoses";
import { Diagnoses } from "../types/diagnose.types";

export function getAllDiagnoses(): Diagnoses {
  console.log("do it");
  return diagnoses;
}
