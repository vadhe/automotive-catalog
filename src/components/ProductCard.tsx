import { Star } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export interface ProductCardProps {
  image: string;
  imageAlt?: string;
  rating: number;
  name: string;
  category: string;
  description: string;
  price: number;
  href: string;
}

const STAR_POSITIONS = [1, 2, 3, 4, 5] as const;

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-1">
      {STAR_POSITIONS.map((position) => {
        const filled = position <= Math.floor(rating);
        const partial = !filled && position <= rating;
        return (
          <span key={position} className="relative inline-block">
            <Star
              size={14}
              strokeWidth={1.5}
              className="text-amber-400"
              fill="none"
            />
            {(filled || partial) && (
              <span
                className="absolute inset-0 overflow-hidden"
                style={{ width: filled ? "100%" : `${(rating % 1) * 100}%` }}
              >
                <Star
                  size={14}
                  strokeWidth={1.5}
                  className="text-amber-400"
                  fill="currentColor"
                />
              </span>
            )}
          </span>
        );
      })}
      <span className="sr-only">{rating} out of 5 stars</span>
    </div>
  );
}

export default function ProductCard({
  image,
  imageAlt = "Product image",
  rating,
  name,
  category,
  description,
  price,
  href,
}: ProductCardProps) {
  const formattedPrice = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
  }).format(price);

  return (
    <article className="flex flex-col w-full rounded-xl overflow-hidden border border-gray-100 bg-white transition-shadow duration-200 hover:shadow-lg">
      <div className="relative w-full aspect-4/3 shrink-0">
        <Image
          src={image}
          alt={imageAlt}
          fill
          sizes="(max-width: 768px) 100vw, 384px"
          className="object-cover object-center"
          priority={false}
        />
      </div>

      <div className="flex flex-col flex-1 px-4 pt-3.5 pb-4 gap-2">
        <StarRating rating={rating} />

        <div>
          <h2 className="text-text-heading text-sm sm:text-base font-semibold leading-snug">
            {name}
          </h2>
          <p className="mt-0.5 text-[10px] font-medium tracking-widest text-text-muted uppercase">
            {category}
          </p>
        </div>
        <p className="text-text-muted sm:text-sm text-xs font-normal leading-relaxed line-clamp-2">
          {description}
        </p>
        <hr className="border-gray-100 mt-auto" />
        <div className="flex items-end justify-between gap-2">
          <div>
            <p className="text-[10px] font-normal text-text-muted">
              Starting at
            </p>
            <p className="text-brand-deep text-base font-semibold leading-tight">
              {formattedPrice}
            </p>
          </div>

          <Link
            href={href}
            className="flex items-center gap-1 text-xs font-bold text-brand-deep hover:text-brand-accent transition-colors duration-150 shrink-0 pb-0.5"
          >
            View
            <span aria-hidden="true" className="text-sm leading-none">
              ›
            </span>
          </Link>
        </div>
      </div>
    </article>
  );
}
