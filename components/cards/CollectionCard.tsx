/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-nocheck
import Image from "next/image";
import Link from "next/link";
import React from "react";

import ROUTES from "@/constants/route";
import { Collection } from "@/types/global";

import { Badge } from "../ui/badge";
import { Button } from "../ui/button";

interface Props {
  collection: Collection;
}
const CollectionCard = ({
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  collection: { _id, description, slug, image, name, products, category },
}: Props) => {
  return (
    <div className="card-wrapper rounded-[10px] px-3 py-8 sm:px-8">
      <div className=" flex items-center gap-8">
        <div className="flex size-fit  flex-col justify-between gap-3.5">
          <div className="size-32 overflow-hidden rounded-full">
            <Image
              src={image}
              alt="product"
              width={300}
              height={300}
              className="size-full rounded-lg object-cover"
            />
          </div>
          <Badge
            className="sm:body-medium subtle-medium w-fit !justify-center bg-primary-100 text-center text-primary-500"
            variant="secondary"
          >
            {products} sản phẩm
          </Badge>
        </div>

        <div className="flex flex-col gap-2">
          <div className="flex w-full justify-start gap-3">
            <h3 className=" base-semibold line-clamp-2 text-dark-200">
              {name}
            </h3>
            <Badge
              className="sm:body-medium subtle-medium w-fit !justify-center bg-primary-100 text-center text-primary-500"
              variant="secondary"
            >
              {category.name}
            </Badge>
          </div>
          <p className="small-regular line-clamp-3 text-dark-400">
            {description}
          </p>
          <Button
            className="primary-gradient w-fit px-4 py-1 !text-light-900"
            asChild
          >
            <Link href={ROUTES.COLLECTION(slug)}>Chi tiết</Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CollectionCard;
