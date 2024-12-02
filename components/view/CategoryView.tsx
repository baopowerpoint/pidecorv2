import Image from "next/image";
import React from "react";

import { Collection } from "@/types/global";

import ProductCard from "../cards/ProductCard";

type TCategoryViewProps = {
  initialData: Collection;
};

export default function CategoryView({ initialData }: TCategoryViewProps) {
  return (
    <div className="mx-auto flex max-w-5xl flex-col gap-4">
      <div className="flex w-full flex-col items-center gap-3 overflow-hidden rounded-lg">
        <h3 className="base-semibold">{initialData?.name}</h3>
        <Image
          alt="collection picture"
          className=" w-full object-cover"
          src={initialData?.image}
          width={400}
          height={400}
        />
        <p className="small-medium text-dark-400">{initialData?.description}</p>
      </div>
      <div className=" w-full">
        <h2 className="mb-3 mt-5 text-xl font-semibold">
          Những sản phẩm thuộc bộ sưu tập này
        </h2>

        <div className="flex w-full flex-col items-center justify-center">
          <Image
            alt="not found"
            className="w-full max-w-xl"
            height={500}
            src="/svgs/no_data_light.svg"
            width={500}
          />
          <h3 className="text-center text-2xl font-semibold text-primary">
            Chưa có sản phẩm nào trong bộ sưu tập này!
          </h3>
        </div>
      </div>
    </div>
  );
}
