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

export async function POST(request: Request) {
  try {
    const order = (await request.json()) as Omit<Order, "id">;
    const orderWithId: Order = {
      ...order,
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
