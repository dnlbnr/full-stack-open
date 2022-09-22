type TotalProps = {
  sum: number;
};

export default function Total({ sum }: TotalProps) {
  return <p>Number of exercises: {sum}</p>;
}
