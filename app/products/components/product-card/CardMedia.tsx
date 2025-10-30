"use client";

import Image from "next/image";

interface CardMediaProps {
  title: string;
  mainImage: string;
  secondImage: string;
  hovered: boolean;
}

export function CardMedia({ title, mainImage, secondImage, hovered }: CardMediaProps) {
  return (
    <Image
      src={hovered ? secondImage : mainImage}
      alt={title}
      // fill
      width={800}
      height={800}
      priority
      className="object-cover object-top transition-all duration-700 group-hover:scale-105"
    />
  );
}


