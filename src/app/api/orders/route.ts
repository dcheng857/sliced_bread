import {
  DATA_DIRECTORY,
  JSON_INDENTATION,
  ORDERS_FILE_NAME,
} from "@/app/constants/file";
import { Order } from "@/app/types/order";
import fs from "fs";
import { NextResponse } from "next/server";
import path from "path";
import { v4 as uuidv4 } from "uuid";

export const ORDER_NUMBER_PREFIX: string = "ORD-";
export const TIMESTAMP_LENGTH: number = 6;
export const RANDOM_STRING_LENGTH: number = 4;
export const ORDER_NUMBER_CHARS: string =
  "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";

const ORDERS_FILE_PATH = path.join(
  process.cwd(),
  DATA_DIRECTORY,
  ORDERS_FILE_NAME
);

const readOrdersFile = () => {
  if (!fs.existsSync(ORDERS_FILE_PATH)) {
    return [];
  }
  const fileContent = fs.readFileSync(ORDERS_FILE_PATH, "utf-8");

  return JSON.parse(fileContent);
};

const writeOrdersFile = (orders: Order[]) => {
  fs.writeFileSync(
    ORDERS_FILE_PATH,
    JSON.stringify(orders, null, JSON_INDENTATION)
  );
};

const ensureDataDirectory = () => {
  const dir = path.dirname(ORDERS_FILE_PATH);

  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
};

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

export async function POST(request: Request) {
  try {
    const order = (await request.json()) as Omit<Order, "id">;
    const orderWithId: Order = {
      ...order,
      orderNumber: generateOrderNumber(),
      id: uuidv4(), // use uuid for order id
    };

    ensureDataDirectory();
    const orders = readOrdersFile();

    orders.push(orderWithId);
    writeOrdersFile(orders);

    return NextResponse.json({ success: true, order: orderWithId });
  } catch (error) {
    console.error("Error saving order:", error);

    return NextResponse.json(
      { success: false, error: "Failed to save order" },
      { status: 500 }
    );
  }
}
