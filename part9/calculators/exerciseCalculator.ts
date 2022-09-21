interface TrainingOverview {
  periodLength: number;
  trainingDays: number;
  success: boolean;
  rating: number;
  ratingDescription: string;
  target: number;
  average: number;
}

const ratingDesc = { 1: "Meh", 2: "Ok", 3: "Great" };

export function calculateExercise(
  trainHours: Array<number>,
  target: number
): TrainingOverview {
  if (!trainHours || !target || trainHours.length === 0)
    throw new Error("invalid arguments");

  const periodLength = trainHours.length;
  const trainingDays = trainHours.filter((t) => t > 0).length;
  const average = trainHours.reduce((sum, t) => sum + t, 0) / trainingDays;
  const success = average >= target;
  const rating = average - target > 0.5 ? 3 : target - average > 0.5 ? 1 : 2;
  const ratingDescription = ratingDesc[rating];

  return {
    periodLength,
    trainingDays,
    success,
    rating,
    ratingDescription,
    target,
    average,
  };
}
