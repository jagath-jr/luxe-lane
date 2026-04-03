INSERT INTO products (name, description, price, original_price, sku, rating, review_count, images)
VALUES
(
  'Modern Classic Jacket',
  'Elevate your wardrobe with our Modern Classic Jacket. Tailored to perfection and made for all-day comfort.',
  2499.00,
  3500.00,
  'MIRROR-BLACK',
  4.5,
  6,
  ARRAY[
    'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?q=80&w=1000&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?q=80&w=1000&auto=format&fit=crop&sig=1',
    'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?q=80&w=1000&auto=format&fit=crop&sig=2',
    'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?q=80&w=1000&auto=format&fit=crop&sig=3'
  ]
)
ON CONFLICT (sku) DO NOTHING;
