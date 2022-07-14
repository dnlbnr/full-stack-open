const Total = ({ parts }) => {
  const sum = parts.reduce((aggregate, part) => aggregate + part.exercises, 0);
  return <p>Number of exercises {sum}</p>;
};

export default Total;
