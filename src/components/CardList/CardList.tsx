import Card from "../Card/card";
import type { Product } from "../../api/products";

interface CardListProps {
  products: Product[];
  isLoading?: boolean;
}

function CardList({ products, isLoading }: CardListProps) {
  if (isLoading) {
    return <p>Loading...</p>;
  }
  if (!products || products.length === 0) {
    console.log(isLoading);
    return <div>No products found</div>;
  }
  return (
    <div className="grid grid-cols-3 gap-4">
      {products.map((product) => (
        <Card key={product.id} product={product}></Card>
      ))}
    </div>
  );
}

export default CardList;
