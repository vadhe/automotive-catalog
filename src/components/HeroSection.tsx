import Image from "next/image";

export default function HeroSection() {
  return (
    <section className="relative w-full h-56 sm:h-64 md:h-72 overflow-hidden">
      <Image
        src="https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1920&q=80"
        alt="Electronics Marketplace background"
        fill
        priority
        className="object-cover object-center"
        sizes="100vw"
      />

      <div className="absolute inset-0 bg-hero-overlay/75" />

      <div className="relative z-10 flex flex-col items-center justify-center h-full px-4 text-center">
        <h1 className="text-white text-3xl sm:text-5xl font-semibold tracking-tight drop-shadow-md">
          Electronics Marketplace
        </h1>
        <p className="mt-3.5 text-white/90 text-sm sm:text-xl font-normal max-w-md leading-relaxed">
          Find your perfect electronics from our premium selection of certified
          products.
        </p>
      </div>
    </section>
  );
}
