"use client";

import { Heart, Minus, Plus } from "lucide-react";
import { useState } from "react";
import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import { toggleWishlist } from "@/store/wishlistSlice";
import type { Product } from "@/types/product";

interface ProductInfoProps {
  product: Product;
}

export default function ProductInfo({ product }: ProductInfoProps) {
  const dispatch = useAppDispatch();
  const wishlistItems = useAppSelector((state) => state.wishlist.items);
  const isWishlisted = wishlistItems.includes(product.id);

  const [quantity, setQuantity] = useState(1);

  const comparePrice = product.price * 1.15;

  const formatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  });
  const formattedPrice = formatter.format(product.price);
  const formattedCompare = formatter.format(comparePrice);

  return (
    <div className="flex flex-col">
      <h1 className="text-3xl sm:text-4xl font-bold text-text-heading tracking-tight mb-4">
        {product.title}
      </h1>
      <p className="text-sm text-text-muted leading-relaxed mb-6">
        {product.description}
      </p>

      <div className="flex items-end gap-3 mb-6">
        <span className="text-3xl sm:text-4xl font-bold text-brand-deep leading-none">
          {formattedPrice}
        </span>
        <span className="text-lg text-gray-400 line-through mb-1">
          {formattedCompare}
        </span>
      </div>

      <div className="mb-8">
        <p className="text-xs font-bold uppercase tracking-widest text-text-muted mb-3">
          Category
        </p>
        <span className="inline-block px-3 py-1 bg-brand-light text-brand font-medium text-xs rounded-md capitalize">
          {product.category}
        </span>
      </div>

      <div className="flex items-center gap-4 mb-6">
        <div className="flex items-center h-12 border border-gray-200 rounded-lg shrink-0 overflow-hidden bg-white">
          <button
            type="button"
            className="w-12 h-full flex items-center justify-center text-gray-500 hover:text-brand hover:bg-gray-50 transition-colors"
            onClick={() => setQuantity(Math.max(1, quantity - 1))}
          >
            <Minus size={16} />
          </button>
          <span className="w-8 flex items-center justify-center text-sm font-semibold text-text-heading border-x border-gray-200 h-full">
            {quantity}
          </span>
          <button
            type="button"
            className="w-12 h-full flex items-center justify-center text-gray-500 hover:text-brand hover:bg-gray-50 transition-colors"
            onClick={() => setQuantity(quantity + 1)}
          >
            <Plus size={16} />
          </button>
        </div>

        <button
          type="button"
          className="flex-1 h-12 flex items-center justify-center gap-2 border border-gray-200 rounded-lg text-sm font-semibold hover:border-brand-accent hover:text-brand-accent transition-colors bg-white"
          onClick={() => dispatch(toggleWishlist(product.id))}
        >
          <Heart
            size={16}
            className={
              isWishlisted
                ? "fill-brand-accent text-brand-accent"
                : "text-gray-500"
            }
          />
          {isWishlisted ? "Added to Wishlist" : "Wishlist"}
        </button>
      </div>

      <button
        type="button"
        className="w-full h-12 bg-brand text-white rounded-lg font-semibold hover:bg-brand-deep transition-colors mb-10 shadow-sm"
      >
        Add to Cart
      </button>

      <div className="flex flex-col divide-y divide-gray-100">
        <div className="py-4 flex justify-between items-center text-sm">
          <span className="text-text-muted font-medium">Rating</span>
          <span className="text-text-heading font-semibold">
            {product.rating.rate} / 5
          </span>
        </div>
        <div className="py-4 flex justify-between items-center text-sm">
          <span className="text-text-muted font-medium">Stock</span>
          <span className="text-text-heading font-semibold">
            {product.rating.count} items
          </span>
        </div>
        <div className="py-4 flex justify-between items-center text-sm">
          <span className="text-text-muted font-medium">Location</span>
          <span className="text-text-heading font-semibold">Online Store</span>
        </div>
      </div>

      <div className="mt-6 flex flex-col gap-4">
        <details className="group [&_summary::-webkit-details-marker]:hidden border border-gray-200 rounded-lg overflow-hidden relative">
          <summary className="flex items-center justify-between p-4 cursor-pointer bg-gray-50/50 hover:bg-gray-50">
            <span className="font-semibold text-text-heading text-sm">
              Additional Info
            </span>
            <span className="transition duration-300 group-open:rotate-180 text-gray-500">
              <svg
                aria-hidden="true"
                fill="none"
                height="20"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                viewBox="0 0 24 24"
                width="20"
              >
                <path d="M6 9l6 6 6-6" />
              </svg>
            </span>
          </summary>
          <div className="p-4 text-sm text-text-muted bg-white border-t border-gray-100 leading-relaxed">
            Free shipping available on all orders above $50. Returns are
            accepted within 30 days of the original purchase. Please refer to
            our return policy page for more detailed documentation.
          </div>
        </details>
      </div>
    </div>
  );
}
