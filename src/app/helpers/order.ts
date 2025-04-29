import {
  ORDER_NUMBER_CHARS,
  ORDER_NUMBER_PREFIX,
  RANDOM_STRING_LENGTH,
  TIMESTAMP_LENGTH,
} from "../constants/order";
import { firstNames, lastNames } from "../data/customers";

const generateRandomString = (length: number): string => {
  let result: string = "";

  for (let i = 0; i < length; i += 1) {
    result += ORDER_NUMBER_CHARS.charAt(
      Math.floor(Math.random() * ORDER_NUMBER_CHARS.length)
    );
  }

  return result;
};

export const generateOrderNumber = (): string => {
  const timestamp: string = Date.now().toString().slice(-TIMESTAMP_LENGTH);
  const randomString: string = generateRandomString(RANDOM_STRING_LENGTH);

  return `${ORDER_NUMBER_PREFIX}${timestamp}-${randomString}`;
};

export const generateRandomName = (): string => {
  const firstName: string =
    firstNames[Math.floor(Math.random() * firstNames.length)];
  const lastName: string =
    lastNames[Math.floor(Math.random() * lastNames.length)];

  return `${firstName} ${lastName}`;
};
