import express from "express";
import { calculateBmi } from "./bmiCalculator";
import { calculateExercise } from "./exerciseCalculator";

const app = express();
const PORT = 3000;

app.use(express.json());

app.get("/hello", (_req, res) => {
  res.send("Hello Fullstack!");
});

app.get("/bmi", (req, res) => {
  const { height, weight } = req.query;
  if (!height || !weight) return res.status(400).end();

  const heightNum = parseFloat(height.toString());
  const weightNum = parseFloat(weight.toString());
  if (isNaN(heightNum) || isNaN(weightNum)) return res.status(400).end();

  return res.send(calculateBmi(heightNum, weightNum));
});

app.post("/exercises", (req, res) => {
  const { daily_exercises, target } = req.body;
  if (!daily_exercises || !target)
    return res.status(400).end({ message: "parameters missing" });

  const targetNum = parseInt(target.toString());
  if (!Array.isArray(daily_exercises) || isNaN(targetNum))
    return res.status(400).end({ message: "malformatted paramters" });

  return res.send(calculateExercise(daily_exercises, targetNum));
});

app.listen(PORT, () => console.log("App is running"));
