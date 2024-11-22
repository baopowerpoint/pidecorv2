"use client";
import Image from "next/image";
import React from "react";

import { cn } from "@/lib/utils";

import { Button } from "./ui/button";

const ProductImages = ({ images }: { images: string[] }) => {
  const [selectedImage, setSelectedImage] = React.useState(images[0]);

  return (
    <div>
      <Image
        alt="San pham"
        className="h-[300px] w-full rounded-2xl object-cover"
        src={selectedImage}
        width={400}
        height={400}
      />

      <div className={cn("flex gap-2 mt-5 ")}>
        {images.map((image: string) => (
          <Button
            key={image}
            className={cn(
              "w-[64px] h-[64px] p-0 aspect-square btn rounded-lg overflow-hidden ",
              image === selectedImage &&
                "ring-[1px] ring-offset-2 ring-pink-500"
            )}
            onClick={() => setSelectedImage(image)}
          >
            <Image
              alt="san pham"
              className="size-full object-cover"
              height={100}
              src={image}
              width={100}
            />
          </Button>
        ))}
      </div>
    </div>
  );
};

export default ProductImages;
