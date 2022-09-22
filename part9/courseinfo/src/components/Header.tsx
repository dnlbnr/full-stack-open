type HeaderProps = {
  name: string;
};

export default function Header({ name }: HeaderProps) {
  return <h1>{name}</h1>;
}
