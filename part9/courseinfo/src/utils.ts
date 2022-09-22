export function assertNever(value: never): never {
  throw new Error(`Assignement to never: ${value}`);
}
