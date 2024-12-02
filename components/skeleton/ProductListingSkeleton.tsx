import React from "react";
import ProductSkeleton from "./ProductSkeleton";

const ProductListingSkeleton = () => {
  return (
    <div className="mt-10 grid  w-full grid-cols-1 gap-4 xs:grid-cols-2 sm:grid-cols-3 md:grid-cols-2 md:p-0 min-[1080px]:grid-cols-3 xl:grid-cols-4">
      {Array.from([1, 2, 3, 4, 5]).map((e) => (
        <ProductSkeleton key={e} />
      ))}
    </div>
  );
};

export default ProductListingSkeleton;
