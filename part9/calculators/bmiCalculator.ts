interface BmiResponseType {
  weight: number;
  height: number;
  bmi: string;
}

export function calculateBmi(height: number, weight: number): BmiResponseType {
  if (height <= 0 || weight <= 0) throw new Error("negative number received");

  const heightM = height / 100;
  const bmi = weight / (heightM * heightM);

  let weightEval;
  if (bmi < 18.5) weightEval = "Under Weight";
  else if (bmi < 24.9) weightEval = "Normal weight";
  if (bmi < 29.9) weightEval = "Over Weight";
  if (bmi < 34.9) weightEval = "Obese I";
  if (bmi < 39.9) weightEval = "Obese II";
  else weightEval = "Extremely obese";

  return { weight, height, bmi: weightEval };
}
