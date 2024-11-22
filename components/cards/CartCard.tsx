import { IconTrashXFilled } from "@tabler/icons-react";
import Image from "next/image";
import React from "react";

import { formatCurrency } from "@/lib/utils";
import { Product } from "@/types/global";

import { Button } from "../ui/button";

const CartCard = ({ product }: { product: Product }) => {
  return (
    <div className="card-wrapper flex w-full flex-1 items-center rounded-lg p-5">
      <div className="flex w-full flex-1 items-start gap-4">
        <Image
          src={product.featuredImage}
          width={300}
          height={300}
          className="size-24 shrink-0 rounded-lg"
          alt="product"
        />
        <div className="flex w-full flex-col gap-4">
          <p className="small-medium">{product.title}</p>
          <p className="small-semibold">
            {formatCurrency(product.price)}{" "}
            <span className="small-medium">x 5</span>
          </p>
        </div>
        <Button variant="ghost" size="icon">
          <IconTrashXFilled className="text-red-400" />
        </Button>
      </div>
    </div>
  );
};

export default CartCard;
