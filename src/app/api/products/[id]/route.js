import { NextResponse } from "next/server";
import { getProductById } from "@/lib/products";

export async function GET(_request, { params }) {
  try {
    const id = Number(params.id);

    if (Number.isNaN(id)) {
      return NextResponse.json({ error: "Product id must be a number" }, { status: 400 });
    }

    const product = await getProductById(id);

    if (!product) {
      return NextResponse.json({ error: "Product not found" }, { status: 404 });
    }

    return NextResponse.json({ data: product });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch product", details: error.message },
      { status: 500 },
    );
  }
}
