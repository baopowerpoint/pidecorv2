import Image from "next/image";
import React from "react";

import { Category } from "@/types/global";

const CategoryCard = ({ categoryData }: { categoryData: Category }) => {
  return (
    <div className="group relative size-[300px] overflow-hidden rounded-lg">
      <Image
        src={categoryData.image}
        width={300}
        height={300}
        alt="category image"
        className="size-full object-cover transition-transform duration-300 group-hover:scale-110"
      />
      {/* Overlay mask */}
      <div className="absolute left-0 top-0 flex size-full flex-col justify-end bg-gradient-to-t from-black to-transparent p-5">
        <h1 className="base-semibold text-light-800">{categoryData.name}</h1>
      </div>
    </div>
  );
};

export default CategoryCard;
