import { ProductCard } from './ProductCard';

interface Product {
  id: number;
  name: string;
  price: number;
  stock: number;
  image?: string;
  category?: string;
}

interface ProductGridProps {
  products: Product[];
  onQuickView: (product: Product) => void;
}

export function ProductGrid({ products, onQuickView }: ProductGridProps) {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
      {products.map((product) => (
        <ProductCard
          key={product.id}
          product={product}
          onQuickView={onQuickView}
        />
      ))}
    </div>
  );
}
