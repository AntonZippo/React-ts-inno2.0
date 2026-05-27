// import React from "react";
import { useCart } from "../context/CartContext";

export default function CartPage() {
  const { cart, removeFromCart, clearCart, totalPrice } = useCart();

  if (cart.length === 0) {
    return (
      <div className="text-center py-16">
        <h2 className="text-2xl font-semibold mb-4 dark:text-white">
          Cart is empty
        </h2>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto dark:text-white">
      <h2 className="text-2xl font-bold mb-6 dark:text-white">Shopping Cart</h2>

      <div className="space-y-4">
        {cart.map((item) => (
          <div
            key={item.id}
            className="flex items-center justify-between border rounded-lg p-4 shadow-sm"
          >
            <div className="flex items-center gap-4">
              <img
                src={item.thumbnail}
                alt={item.title}
                className="w-16 h-16 object-cover rounded dark:bg-gray-100"
              />
              <div>
                <h3 className="font-semibold">{item.title}</h3>
                <p className="text-gray-600 dark:text-gray-200">
                  ${item.price}
                </p>
              </div>
            </div>
            <button
              onClick={() => removeFromCart(item.id)}
              className="text-red-500 dark:text-white hover:text-white hover:bg-red-400 cursor-pointer px-2 py-1 rounded-md"
            >
              Remove
            </button>
          </div>
        ))}
      </div>

      <div className="mt-8 flex justify-between items-center border-t pt-4 dark:text-white">
        <div className="text-xl font-bold">Total: ${totalPrice.toFixed(2)}</div>
        <div className="space-x-3">
          <button
            onClick={clearCart}
            className="px-4 py-2 bg-gray-200 rounded hover:bg-red-400  hover:text-white cursor-pointer dark:bg-gray-500 dark:text-white"
          >
            Clear cart
          </button>
        </div>
      </div>
    </div>
  );
}
