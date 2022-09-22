type PartProps = {
  title: string;
  number: number;
  italicsLine?: string;
  regularLine?: string;
};

export default function Part({
  title,
  number,
  italicsLine,
  regularLine,
}: PartProps) {
  return (
    <>
      <b>
        {title} {number}
      </b>
      {italicsLine && (
        <>
          <br />
          <i>{italicsLine}</i>
        </>
      )}
      {regularLine && (
        <>
          <br />
          {regularLine}
        </>
      )}
    </>
  );
}
