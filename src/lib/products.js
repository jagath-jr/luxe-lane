import { getDb } from "./db";

const fallbackProducts = [
  {
    id: 1,
    name: "Modern Classic Jacket",
    description:
      "Elevate your wardrobe with our Modern Classic Jacket. Tailored to perfection and made for all-day comfort.",
    price: 2499,
    original_price: 3500,
    sku: "MIRROR-BLACK",
    rating: 4.5,
    review_count: 6,
    images: [
      "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?q=80&w=1000&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?q=80&w=1000&auto=format&fit=crop&sig=1",
      "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?q=80&w=1000&auto=format&fit=crop&sig=2",
      "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?q=80&w=1000&auto=format&fit=crop&sig=3",
    ],
    created_at: new Date().toISOString(),
  },
];

function tryDb() {
  try {
    return getDb();
  } catch {
    return null;
  }
}

export async function getAllProducts() {
  const db = tryDb();

  if (!db) {
    return fallbackProducts;
  }

  const { rows } = await db.query(
    `SELECT id, name, description, price, original_price, sku, rating, review_count, images, created_at
     FROM products
     ORDER BY created_at DESC`,
  );

  return rows;
}

export async function getProductById(id) {
  const db = tryDb();

  if (!db) {
    return fallbackProducts.find((item) => item.id === id) ?? null;
  }

  const { rows } = await db.query(
    `SELECT id, name, description, price, original_price, sku, rating, review_count, images, created_at
     FROM products
     WHERE id = $1`,
    [id],
  );

  return rows[0] ?? null;
}

export async function createProduct(product) {
  const db = tryDb();

  const {
    name,
    description,
    price,
    originalPrice,
    sku,
    rating = 0,
    reviewCount = 0,
    images = [],
  } = product;

  if (!db) {
    const created = {
      id: fallbackProducts.length ? Math.max(...fallbackProducts.map((item) => item.id)) + 1 : 1,
      name,
      description,
      price,
      original_price: originalPrice,
      sku,
      rating,
      review_count: reviewCount,
      images,
      created_at: new Date().toISOString(),
    };

    fallbackProducts.unshift(created);
    return created;
  }

  const { rows } = await db.query(
    `INSERT INTO products (name, description, price, original_price, sku, rating, review_count, images)
     VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
     RETURNING id, name, description, price, original_price, sku, rating, review_count, images, created_at`,
    [name, description, price, originalPrice, sku, rating, reviewCount, images],
  );

  return rows[0];
}

export async function updateProductById(id, updates) {
  const db = tryDb();

  if (!db) {
    const productIndex = fallbackProducts.findIndex((item) => item.id === id);

    if (productIndex === -1) {
      return null;
    }

    const current = fallbackProducts[productIndex];
    const updated = {
      ...current,
      name: updates.name ?? current.name,
      description: updates.description ?? current.description,
      price: updates.price ?? current.price,
      original_price: updates.originalPrice ?? current.original_price,
      sku: updates.sku ?? current.sku,
      rating: updates.rating ?? current.rating,
      review_count: updates.reviewCount ?? current.review_count,
      images: updates.images ?? current.images,
    };

    fallbackProducts[productIndex] = updated;
    return updated;
  }

  const { rows } = await db.query(
    `UPDATE products
     SET
      name = COALESCE($2, name),
      description = COALESCE($3, description),
      price = COALESCE($4, price),
      original_price = COALESCE($5, original_price),
      sku = COALESCE($6, sku),
      rating = COALESCE($7, rating),
      review_count = COALESCE($8, review_count),
      images = COALESCE($9, images)
     WHERE id = $1
     RETURNING id, name, description, price, original_price, sku, rating, review_count, images, created_at`,
    [
      id,
      updates.name ?? null,
      updates.description ?? null,
      updates.price ?? null,
      updates.originalPrice ?? null,
      updates.sku ?? null,
      updates.rating ?? null,
      updates.reviewCount ?? null,
      updates.images ?? null,
    ],
  );

  return rows[0] ?? null;
}

export async function deleteProductById(id) {
  const db = tryDb();

  if (!db) {
    const productIndex = fallbackProducts.findIndex((item) => item.id === id);

    if (productIndex === -1) {
      return false;
    }

    fallbackProducts.splice(productIndex, 1);
    return true;
  }

  const result = await db.query("DELETE FROM products WHERE id = $1", [id]);
  return result.rowCount > 0;
}
