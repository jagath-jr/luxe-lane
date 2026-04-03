import { getDb } from "./db";

export async function getAllProducts() {
  const db = getDb();
  const { rows } = await db.query(
    `SELECT id, name, description, price, original_price, sku, rating, review_count, images, created_at
     FROM products
     ORDER BY created_at DESC`,
  );

  return rows;
}

export async function getProductById(id) {
  const db = getDb();
  const { rows } = await db.query(
    `SELECT id, name, description, price, original_price, sku, rating, review_count, images, created_at
     FROM products
     WHERE id = $1`,
    [id],
  );

  return rows[0] ?? null;
}

export async function createProduct(product) {
  const db = getDb();

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

  const { rows } = await db.query(
    `INSERT INTO products (name, description, price, original_price, sku, rating, review_count, images)
     VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
     RETURNING id, name, description, price, original_price, sku, rating, review_count, images, created_at`,
    [name, description, price, originalPrice, sku, rating, reviewCount, images],
  );

  return rows[0];
}
