import express from "express";
import cors from "cors";
import diagnoseRoutes from "./routes/diagnose.routes";
import patientRoutes from "./routes/patient.routes";

const PORT = 3001;
const app = express();

app.use(cors());
app.use(express.json());

app.get("/api/ping", (_req, res) => {
  res.send("pong");
});

app.use("/api/diagnoses", diagnoseRoutes);
app.use("/api/patients", patientRoutes);

app.listen(PORT, () => "app is running");
