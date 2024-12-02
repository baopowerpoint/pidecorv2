import Image from "next/image";
import Link from "next/link";
import React from "react";

import ROUTES from "@/constants/route";
import { formatCurrency } from "@/lib/utils";
import { Product } from "@/types/global";

import { Badge } from "../ui/badge";
import { Button } from "../ui/button";

interface Props {
  product: Product;
}
const ProductCard = ({ product }: Props) => {
  return (
    <div className="card-wrapper flex max-w-full flex-col justify-between  rounded-[10px] px-3 pb-6 pt-3 sm:px-8">
      <div className=" flex flex-1 flex-col items-start justify-between gap-2">
        <Image
          src={product.featuredImage}
          alt="product"
          width={300}
          height={300}
          className="size-28 rounded-lg"
        />

        <div className="mt-3.5 flex flex-wrap items-center justify-start gap-2">
          <p className="subtle-medium  text-left text-dark-300">
            {product.categoryId.name}
          </p>
          <Badge
            className="subtle-medium bg-primary-100 text-primary-500"
            variant="secondary"
          >
            Giảm giá 7%
          </Badge>
        </div>

        <h3 className=" small-semibold mt-2 line-clamp-2 flex-1 text-dark-200">
          {product.title}
        </h3>
        <div className="flex flex-col">
          <p className="subtle-regular text-light-400 line-through">
            {formatCurrency(600000)}
          </p>
          <p className="body-bold text-dark-100">
            {formatCurrency(product.price)}
          </p>
        </div>
      </div>
      <div className="flex-between mt-3.5 w-full flex-wrap gap-3">
        <Button
          className="primary-gradient flex-1 px-4 py-1 !text-light-900"
          asChild
        >
          <Link href={ROUTES.PRODUCT(product.slug)}>
            <p className="small-semibold">Xem</p>
          </Link>
        </Button>
        <Button
          className=" p-1 !text-light-900"
          variant="ghost"
          size="icon"
          asChild
        >
          <Image
            src="/icons/shopping-bag.svg"
            width={23}
            height={23}
            alt="shopping bag"
          />
        </Button>
      </div>
    </div>
  );
};

export default ProductCard;
