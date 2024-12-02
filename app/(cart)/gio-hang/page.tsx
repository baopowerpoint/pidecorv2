import { ChevronLeft } from "lucide-react";
import Link from "next/link";
import React from "react";

import CartTotal from "@/components/CartTotal";
import { ScrollArea } from "@/components/ui/scroll-area";

const CartPage = () => {
  return (
    <div className="size-full">
      <div className="grid grid-cols-2 ">
        <Link
          href="/"
          className="flex  w-fit items-center justify-between whitespace-nowrap"
        >
          <ChevronLeft className="text-dark-400" />
          <p className="small-medium text-dark-400">Trở lại</p>
        </Link>
        <div className="w-full -translate-x-1/2">
          <h3 className="base-semibold text-center">Giỏ hàng</h3>
        </div>
      </div>
      <div className="flex h-[full] flex-col justify-start gap-5 md:h-screen md:flex-row md:items-center md:justify-center">
        <ScrollArea className="custom-scrollbar h-[350px]">
          {/* <div className="flex w-full flex-col gap-4 ">
            {products.map((product: Product) => (
              <CartCard product={product} key={product._id} />
            ))}
          </div> */}
        </ScrollArea>
        <div>
          <CartTotal />
        </div>
      </div>
    </div>
  );
};

export default CartPage;
