import Image from "next/image";
import Link from "next/link";
import React from "react";

import ROUTES from "@/constants/route";
import { dummyCollections } from "@/data/collections";
import products from "@/data/mock";
import { Collection, Product } from "@/types/global";

import { Button } from "../ui/button";

const RightSidebar = () => {
  return (
    <section className="custom-scrollbar light-border sticky right-0 top-0 flex h-screen w-[250px] flex-col gap-6 overflow-y-auto border-l bg-light-900 p-6 pt-28 shadow-light-300 dark:shadow-none max-md:hidden">
      <div>
        <h3 className="h3-bold primary-text-gradient text-dark-200">Liên hệ</h3>
        <div className="mt-7 flex w-full flex-col gap-[30px]">
          <a
            href="tel:0123456789"
            className="flex cursor-pointer items-center justify-between gap-7"
          >
            <div>
              <p className="subtle-medium text-dark-500">Số điện thoại</p>
              <p className="small-semibold">0374661631</p>
            </div>
            <Button className="small-medium light-border-2 btn-secondary min-h-[41px] w-full rounded-lg border px-4 py-3 text-dark-400 shadow-none">
              Gọi
            </Button>
          </a>
          <a
            href="tel:0123456789"
            className="flex cursor-pointer items-center justify-between gap-7"
          >
            <div>
              <p className="subtle-medium text-dark-500">Zalo</p>
              <p className="small-semibold">0374661631</p>
            </div>
            <Button className="small-medium light-border-2 btn-secondary min-h-[41px] w-full rounded-lg border px-4 py-3 text-dark-400 shadow-none">
              Mở
            </Button>
          </a>
        </div>
        <h3 className="h3-bold mt-8 text-dark-200">Bộ sưu tập</h3>
        <div className="mt-7 flex w-full flex-col gap-[30px]">
          {dummyCollections.map((collection: Collection) => (
            <Link
              key={collection._id}
              href={ROUTES.PRODUCT(collection._id)}
              className="flex cursor-pointer items-center justify-between gap-7"
            >
              <p className="body-medium text-dark-500">{collection.name}</p>
              <Image
                src="/icons/chevron-right.svg"
                alt="chevron"
                width={20}
                height={20}
                className="invert-colors"
              />
            </Link>
          ))}
        </div>
      </div>
      <div className="mt-8">
        <h3 className="h3-bold text-dark-200">Sản phẩm nổi bật</h3>
        <div className="mt-7 flex w-full flex-col gap-[30px]">
          {products.map((product: Product) => (
            <Link
              key={product._id}
              href={ROUTES.PRODUCT(product._id)}
              className="flex cursor-pointer items-center justify-between gap-7"
            >
              <p className="body-medium text-dark-500">{product.title}</p>
              <Image
                src="/icons/chevron-right.svg"
                alt="chevron"
                width={20}
                height={20}
                className="invert-colors"
              />
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default RightSidebar;
