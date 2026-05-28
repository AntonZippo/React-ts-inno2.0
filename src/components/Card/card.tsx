import type { Product } from "../../api/products";
import { Link } from "@tanstack/react-router";
import { useCart } from "../../context/CartContext";

interface CardProps {
  product: Product;
}

function Card({ product }: CardProps) {
  const { addToCart } = useCart();
  if (!product) {
    return <div className="card">No Data</div>;
  }

  return (
    <Link
      to="/product/$id"
      params={{ id: String(product.id) }}
      className="block rounded-lg overflow-hidden shadow shadow-gray-300 hover:shadow-lg  hover:-translate-y-1 transition bg-white dark:bg-gray-700 dark:text-white"
    >
      <div className="w-full bg-white overflow-hidden p-[5px_12px_0_12px]">
        {product.thumbnail && (
          <img
            src={product.thumbnail}
            alt={product.title}
            className="w-full h-full object-cover block"
            fetchPriority="high"
            loading="eager"
          />
        )}
      </div>
      <div className="p-4">
        <h3 className="font-semibold text-md truncate">{product.title}</h3>
        <p className="text-gray-600 text-sm mt-1 line-clamp-2 dark:text-white">
          {product.description}
        </p>
        <div className="flex items-center justify-between mt-2">
          <span className="text-xl font-bold text-cyan-800 dark:text-white ">
            ${product.price}
          </span>
          <span className="flex items-center gap-1 text-sm">
            ⭐ {product.rating}
          </span>
        </div>
        <button
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            addToCart(product);
          }}
          className="mt-3 w-full bg-cyan-800 text-white py-1 rounded hover:bg-cyan-700 transition cursor-pointer dark:bg-cyan-700 dark:hover:bg-cyan-600"
        >
          Add to cart
        </button>
      </div>
    </Link>
  );
}

export default Card;
