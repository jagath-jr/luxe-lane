# Backend setup (Node.js + PostgreSQL)

You now have two ways to run the backend stack:

- **Docker (recommended)**
- **Local Node + local PostgreSQL**

## Option A: Run with Docker (recommended)

### 1) Build and start everything

```bash
docker compose up --build
```

This starts:

- **web**: Next.js app at `http://localhost:3000`
- **db**: PostgreSQL at `localhost:5432`

The database auto-initializes with:

- `db/schema.sql`
- `db/seed.sql`

### 2) Stop containers

```bash
docker compose down
```

To also remove DB data volume:

```bash
docker compose down -v
```

## Option B: Run locally without Docker

### 1) Install dependencies

```bash
npm install
```

### 2) Configure env

```bash
cp .env.example .env.local
```

### 3) Create database and tables

```bash
createdb luxe_lane
psql "$DATABASE_URL" -f db/schema.sql
psql "$DATABASE_URL" -f db/seed.sql
```

### 4) Start Next.js

```bash
npm run dev
```

## API Endpoints

- `GET /api/products` → list all products
- `POST /api/products` → create a product
- `GET /api/products/:id` → fetch a product by id

### POST body example

```json
{
  "name": "Oversized Linen Shirt",
  "description": "Lightweight linen shirt for summer",
  "price": 1899,
  "originalPrice": 2499,
  "sku": "LINEN-SHIRT-001",
  "rating": 4.2,
  "reviewCount": 14,
  "images": ["https://example.com/image1.jpg"]
}
```
