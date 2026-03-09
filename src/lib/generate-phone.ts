export function generateFakePhone(): string {
  // US format using reserved 555 prefix: (555) 01XX-XXXX
  const line = String(Math.floor(Math.random() * 10000)).padStart(4, "0");
  const prefix = String(Math.floor(Math.random() * 100)).padStart(2, "0");
  return `(555) ${prefix}${line.slice(0, 1)}-${line.slice(1)}${prefix.slice(0, 1)}${prefix.slice(1)}`;
}

export function generateFakePhoneBR(): string {
  // BR format using fictional numbers
  const ddd = String(Math.floor(Math.random() * 89) + 11).padStart(2, "0");
  const part1 = String(Math.floor(Math.random() * 10000)).padStart(4, "0");
  const part2 = String(Math.floor(Math.random() * 10000)).padStart(4, "0");
  return `(${ddd}) 99${part1.slice(0, 3)}-${part2}`;
}
