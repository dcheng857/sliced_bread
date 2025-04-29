/**
 * @jest-environment node
 */

import fs from "fs"; // also import fs normally
import { GET } from "../api/orders/[orderId]/route";

describe("GET /api/orders/[orderId]", () => {
  it("should return 200 and the correct order if found", async () => {
    const fakeOrders = [
      { id: "1", name: "Order 1" },
      { id: "2", name: "Order 2" },
    ];

    jest.spyOn(fs, "existsSync").mockReturnValue(true);
    jest
      .spyOn(fs, "readFileSync")
      .mockImplementation(() => JSON.stringify(fakeOrders));

    const response = await GET(new Request("http://localhost/api/orders/1"), {
      params: { orderId: "1" },
    });

    const data = await response.json();

    expect(response.status).toBe(200);
    expect(data).toEqual({ id: "1", name: "Order 1" });
  });

  it("should return a 404 error when the order is not found", async () => {
    const response = await GET(new Request("http://localhost/api/orders/999"), {
      params: { orderId: "999" },
    });

    const data = await response.json();

    expect(response.status).toBe(404);
    expect(data.error).toBe("Order not found");
  });

  it("should return a 500 error when there is an error reading the orders", async () => {
    // Mock the readOrdersFile function to throw an error
    jest.spyOn(fs, "existsSync").mockReturnValue(true);
    jest.spyOn(fs, "readFileSync").mockImplementation(() => {
      throw new Error("File read error");
    });
    const response = await GET(new Request("http://localhost/api/orders/1"), {
      params: { orderId: "1" },
    });

    const data = await response.json();

    expect(response.status).toBe(500);
    expect(data.error).toBe("Failed to read order");
  });
});
