import Image from "next/image";

interface ProductImageGalleryProps {
  image: string;
  title: string;
}

export default function ProductImageGallery({
  image,
  title,
}: ProductImageGalleryProps) {
  return (
    <div className="flex flex-col gap-4">
      <div className="relative w-full aspect-square rounded-2xl overflow-hidden bg-gray-50 border border-gray-100 flex items-center justify-center p-8">
        <div className="relative w-full h-full max-w-[80%] max-h-[80%]">
          <Image
            src={image}
            alt={title}
            fill
            className="object-contain drop-shadow-md"
            sizes="(max-width: 768px) 100vw, 50vw"
            priority
          />
        </div>
      </div>
    </div>
  );
}
