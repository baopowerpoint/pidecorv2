"use client";

import React from "react";

import { Product } from "@/types/global";

import ProductCard from "../cards/ProductCard";
import { Pagination } from "../Pagination";

const ProductGrid = ({
  productData,
  isNext,
}: {
  productData: Product[];
  isNext?: boolean;
}) => {
  return (
    <div>
      <div className="mt-10 grid  w-full grid-cols-1 gap-4 xs:grid-cols-2 sm:grid-cols-3 md:grid-cols-2 md:p-0 min-[1080px]:grid-cols-3 xl:grid-cols-4">
        {productData?.map((product: Product) => (
          <ProductCard key={product._id} product={product} />
        ))}
      </div>
      <Pagination isNext={isNext} />
    </div>
  );
};

export default ProductGrid;
