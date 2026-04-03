import { NextResponse } from "next/server";
import { deleteProductById, getProductById, updateProductById } from "@/lib/products";

function parseId(params) {
  const id = Number(params.id);

  if (Number.isNaN(id)) {
    return null;
  }

  return id;
}

export async function GET(_request, { params }) {
  try {
    const id = parseId(params);

    if (!id) {
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

export async function PATCH(request, { params }) {
  try {
    const id = parseId(params);

    if (!id) {
      return NextResponse.json({ error: "Product id must be a number" }, { status: 400 });
    }

    const body = await request.json();
    const product = await updateProductById(id, body);

    if (!product) {
      return NextResponse.json({ error: "Product not found" }, { status: 404 });
    }

    return NextResponse.json({ data: product });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to update product", details: error.message },
      { status: 500 },
    );
  }
}

export async function DELETE(_request, { params }) {
  try {
    const id = parseId(params);

    if (!id) {
      return NextResponse.json({ error: "Product id must be a number" }, { status: 400 });
    }

    const deleted = await deleteProductById(id);

    if (!deleted) {
      return NextResponse.json({ error: "Product not found" }, { status: 404 });
    }

    return NextResponse.json({ data: { deleted: true } });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to delete product", details: error.message },
      { status: 500 },
    );
  }
}
