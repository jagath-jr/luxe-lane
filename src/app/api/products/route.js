import { NextResponse } from "next/server";
import { createProduct, getAllProducts } from "@/lib/products";

export async function GET() {
  try {
    const products = await getAllProducts();
    return NextResponse.json({ data: products });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch products", details: error.message },
      { status: 500 },
    );
  }
}

export async function POST(request) {
  try {
    const body = await request.json();

    const requiredFields = ["name", "description", "price", "originalPrice", "sku"];
    const missing = requiredFields.filter((field) => !body[field]);

    if (missing.length > 0) {
      return NextResponse.json(
        { error: `Missing required fields: ${missing.join(", ")}` },
        { status: 400 },
      );
    }

    const product = await createProduct(body);
    return NextResponse.json({ data: product }, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to create product", details: error.message },
      { status: 500 },
    );
  }
}
