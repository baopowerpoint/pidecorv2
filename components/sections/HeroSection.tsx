import Link from "next/link";
import React from "react";

import ROUTES from "@/constants/route";

import { CarouselPlugin } from "../carousel";
import { Button } from "../ui/button";

const HeroSection = () => {
  return (
    <>
      <CarouselPlugin />

      <h1 className="h1-bold text-center text-dark-100">
        Chào mừng bạn đến với{" "}
        <span className="text-primary-500">
          Pi<span>decor</span>
        </span>
      </h1>
      <p className="body-regular text-justify">
        Pidecor là đơn vị chuyên kinh doanh và cung cấp các sản phẩm trang trí
        nhà cửa với sản phẩm chủ lực rèm cửa và phụ kiện nội thất trang trí đa
        dạng. Chúng tôi đã nhận được sự tin tưởng khách hàng trong suốt chặng
        đường nhiều năm qua.
      </p>
      <Button
        className="primary-gradient min-h-[46px] px-4 py-3 !text-light-900 "
        asChild
      >
        <Link href={ROUTES.PRODUCTS}>Bộ sưu tập</Link>
      </Button>
    </>
  );
};

export default HeroSection;
