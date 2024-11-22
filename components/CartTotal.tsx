import Link from "next/link";
import React from "react";

import { formatCurrency } from "@/lib/utils";

import { Button } from "./ui/button";
import { Input } from "./ui/input";

const CartTotal = () => {
  return (
    <div className="flex flex-col gap-4 rounded-lg bg-primary-100/50 p-5">
      <h3 className="base-semibold text-center">Tóm tắt đơn hàng</h3>
      <div className="flex items-center gap-2">
        <Input
          type="text"
          placeholder="Nhập mã giảm giá"
          className="paragraph-regular placeholder no-focus light-border border outline-none placeholder:text-dark-400"
        />
        <Button className="primary-gradient paragraph-semibold">Áp dụng</Button>
      </div>
      <dl className="flex flex-col gap-4 py-4">
        <div className="flex justify-between">
          <dt className="small-medium text-dark-300">Tạm tính</dt>
          <dd className="small-medium font-semibold text-dark-400">
            {formatCurrency(100000)}
          </dd>
        </div>
        <div className="flex justify-between">
          <dt className="small-medium text-dark-300">Giảm giá</dt>
          <dd className="small-medium font-semibold text-green-400">
            - {formatCurrency(10000)}
          </dd>
        </div>
        <hr className=" w-full shrink-0 border-none" />
        <div className="flex justify-between">
          <dt className="small-medium font-semibold text-dark-300">
            Tổng cộng
          </dt>

          <dd className=" font-semibold text-primary-500">
            {formatCurrency(410000)}
          </dd>
        </div>
      </dl>
      <Button className="paragraph-semibold w-full bg-primary-500" asChild>
        <Link href="/checkout">Tiến hành đặt hàng</Link>
      </Button>
    </div>
  );
};

export default CartTotal;
