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
      id: fallbackProducts.length + 1,
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
