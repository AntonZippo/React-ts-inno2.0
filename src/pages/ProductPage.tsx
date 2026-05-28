import { useParams } from "@tanstack/react-router";
import { useProductById } from "../api/products";
import { useCart } from "../context/CartContext";

function ProductPage() {
  const { addToCart } = useCart();
  const { id } = useParams({ from: "/product/$id" });
  const productId = id ? parseInt(id, 10) : undefined;

  const { data: product, isLoading, error } = useProductById(productId);

  if (isLoading) {
    return <div className="text-center py-16 text-gray-500">Loading...</div>;
  }

  if (error) {
    return (
      <div className="text-center py-16 text-red-600">
        <p>Error: {error.message}</p>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="text-center py-16 text-gray-500">
        <p>Product not found</p>
      </div>
    );
  }
  return (
    <div className="max-w-6xl mx-auto px-4 py-8 min-h-[70vh]">
      <div className="bg-white rounded-2xl inset-ring-2 inset-ring-gray-500/10 shadow-md overflow-hidden dark:bg-gray-100">
        <div className="grid md:grid-cols-2 gap-8">
          <div className="flex items-center justify-center p-4">
            <img
              src={product.thumbnail}
              alt={product.title}
              className="w-full h-auto max-h-100px object-contain"
            />
          </div>

          <div className="p-6 md:p-8 md:pr-8 md:pl-0">
            <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-4">
              {product.title}
            </h1>
            <p className="text-gray-600 leading-relaxed mb-6">
              {product.description}
            </p>

            <div className="flex items-center gap-4 mb-6">
              <span className="text-3xl font-bold text-cyan-700">
                ${product.price}
              </span>
              {product.discountPercentage > 0 && (
                <span className="bg-orange-100 text-orange-700 px-3 py-1 rounded-full text-sm">
                  -{product.discountPercentage}%
                </span>
              )}
            </div>

            <div className="border-t border-gray-100 pt-4 mb-6 space-y-2 text-sm text-gray-700">
              <p>
                <strong className="font-medium">Brand:</strong>{" "}
                {product.brand || "—"}
              </p>
              <p>
                <strong className="font-medium">Category:</strong>{" "}
                {product.category}
              </p>
              <p>
                <strong className="font-medium">Rating:</strong> ⭐{" "}
                {product.rating} / 5
              </p>
              <p>
                <strong className="font-medium">Stock:</strong>{" "}
                {product.stock > 0 ? `${product.stock} pcs` : "Out of stock"}
              </p>
            </div>

            <button
              onClick={() => addToCart(product)}
              className="w-full bg-cyan-700 hover:bg-cyan-600 text-white font-semibold py-3 px-4 rounded-xl transition duration-200 cursor-pointer"
            >
              Buy
            </button>
          </div>
        </div>
      </div>

      <div className="mt-4 text-center"></div>
    </div>
  );
}

export default ProductPage;
