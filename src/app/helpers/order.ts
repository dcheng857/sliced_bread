import { firstNames, lastNames } from "../data/customers";

export const generateRandomName = (): string => {
  const firstName: string =
    firstNames[Math.floor(Math.random() * firstNames.length)];
  const lastName: string =
    lastNames[Math.floor(Math.random() * lastNames.length)];

  return `${firstName} ${lastName}`;
};
