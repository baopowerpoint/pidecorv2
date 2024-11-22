"use client";
import React from "react";

import { Button } from "./ui/button";

const ProductInteraction = () => {
  const [quantity, setQuantity] = React.useState(1);
  const handleIncrease = () => {
    setQuantity((prev) => prev + 1);
  };
  const handleDecrease = () => {
    setQuantity((prev) => (prev > 1 ? prev - 1 : 1));
  };

  return (
    <div className="flex w-full items-center justify-between rounded-lg bg-light-900 p-5 shadow-xl md:p-3">
      <div className="flex items-center justify-start gap-2">
        <Button onClick={handleDecrease} variant="outline" size="icon">
          -
        </Button>
        <p className="text-lg font-semibold text-primary-500">{quantity}</p>
        <Button onClick={handleIncrease} variant="outline" size="icon">
          +
        </Button>
      </div>
      <Button className="primary-gradient">
        <p className="small-regular text-white">Thêm vào giỏ hàng</p>
      </Button>
    </div>
  );
};

export default ProductInteraction;
