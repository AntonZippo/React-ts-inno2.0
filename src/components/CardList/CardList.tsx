import Card from "../Card/card";
import type { Product } from "../../api/products";

interface CardListProps {
  products: Product[];
  isLoading?: boolean;
}

function CardList({ products, isLoading }: CardListProps) {
  if (isLoading) {
    return <p className="dark:text-white">Loading...</p>;
  }
  if (!products || products.length === 0) {
    console.log(isLoading);
    return <div className="dark:text-white">No products found</div>;
  }
  return (
    <div className="grid grid-cols-3 gap-4 max-lg:grid-cols-2 max-sm:grid-cols-1">
      {products.map((product) => (
        <Card key={product.id} product={product}></Card>
      ))}
    </div>
  );
}

export default CardList;
