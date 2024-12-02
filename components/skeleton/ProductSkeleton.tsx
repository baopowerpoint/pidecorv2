import React from "react";

import { Skeleton } from "../ui/skeleton";

const ProductSkeleton = () => {
  return (
    <div className="card-wrapper flex max-w-full flex-col justify-between rounded-[10px] px-3 pb-6 pt-3 sm:px-8">
      <div className="flex flex-1 flex-col items-start justify-between gap-2">
        {/* Skeleton for image */}
        <Skeleton className="h-28 w-full rounded-lg" />

        {/* Skeleton for category and badge */}
        <div className="mt-3.5 flex flex-wrap items-center justify-start gap-2">
          <Skeleton className="h-4 w-24 rounded-md" />
          <Skeleton className="h-4 w-16 rounded-md" />
        </div>

        {/* Skeleton for title */}
        <Skeleton className="mt-2 h-6 w-full rounded-md" />

        {/* Skeleton for price */}
        <div className="mt-3.5 flex flex-col gap-2">
          <Skeleton className="h-4 w-24 rounded-md" />
          <Skeleton className="h-6 w-32 rounded-md" />
        </div>
      </div>

      {/* Skeleton for buttons */}
      <div className="flex-between mt-3.5 w-full flex-wrap gap-3">
        <Skeleton className="h-10 w-full rounded-lg" />
        <Skeleton className="size-10 rounded-full" />
      </div>
    </div>
  );
};

export default ProductSkeleton;
