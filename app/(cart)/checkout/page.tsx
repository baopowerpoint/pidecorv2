import { ChevronLeft } from "lucide-react";
import Link from "next/link";
import React from "react";

import UserForm from "@/components/forms/UserForm";
import CartTotal from "@/components/CartTotal";

const CheckoutPage = () => {
  return (
    <section className="">
      <div className="grid grid-cols-2 ">
        <Link
          href="/gio-hang"
          className="flex  w-fit items-center justify-between whitespace-nowrap"
        >
          <ChevronLeft className="text-dark-400" />
          <p className="small-medium text-dark-400">Giỏ hàng</p>
        </Link>
        <div className="w-full -translate-x-1/2">
          <h3 className="base-semibold text-center">Xem lại đơn hàng</h3>
        </div>
      </div>

      <div className="mx-auto mt-10 flex max-w-[800px] flex-col gap-5 md:flex-row">
        <CartTotal />
        <div className="flex flex-1 flex-col gap-4 rounded-lg bg-primary-100/50 p-5">
          <h3 className="base-semibold text-center">Thông tin khách hàng</h3>
          <div className="w-full flex-1">
            <UserForm />
          </div>
        </div>
      </div>
    </section>
  );
};

export default CheckoutPage;
