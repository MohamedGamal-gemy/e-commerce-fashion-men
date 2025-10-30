"use client";

import Image from "next/image";

interface CardMediaProps {
  title: string;
  mainImage: string;
  // secondImage: string;
  // hovered: boolean;
}

// export function CardMedia({ title, mainImage, secondImage, hovered }: CardMediaProps) {
export function CardMedia({ title, mainImage }: CardMediaProps) {
  return (
    <Image
      // src={hovered ? secondImage : mainImage}
      src={mainImage}
      alt={title}
      // fill
      width={800}
      height={800}
      priority
      className="object-cover h-full w-full object-top transition-all duration-700 group-hover:scale-105"
    />
  );
}
