import React from "react";

import products from "@/data/mock";
import { Product } from "@/types/global";

import ProductCard from "../cards/ProductCard";
import { Pagination } from "../Pagination";
import ProductAction from "../ProductAction";

const ProductSection = () => {
  return (
    <>
      <h1 className="h1-bold text-center text-dark-100">
        Khám phá
        <span className="text-primary-500"> Sản phẩm</span>
      </h1>
      <ProductAction />

      <div className="mt-10 grid  w-full grid-cols-1 gap-4 xs:grid-cols-2 sm:grid-cols-3 md:grid-cols-2 md:p-0 min-[1080px]:grid-cols-3 xl:grid-cols-4">
        {products.map((product: Product) => (
          <ProductCard key={product._id} product={product} />
        ))}
      </div>
      <Pagination />
    </>
  );
};

export default ProductSection;
