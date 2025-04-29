import { DATA_DIRECTORY, ORDERS_FILE_NAME } from "@/app/constants/file";
import { Order } from "@/app/types/order";
import fs from "fs";
import { NextResponse } from "next/server";
import path from "path";

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

export async function GET(
  request: Request,
  { params }: { params: { orderId: string } }
) {
  try {
    const orders = readOrdersFile();
    const order = orders.find((o: Order) => o.id === params.orderId);

    if (!order) {
      return NextResponse.json({ error: "Order not found" }, { status: 404 });
    }

    return NextResponse.json(order);
  } catch (error) {
    console.error("Error reading order:", error);

    return NextResponse.json(
      { error: "Failed to read order" },
      { status: 500 }
    );
  }
}
