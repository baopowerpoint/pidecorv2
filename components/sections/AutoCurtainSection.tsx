import Link from "next/link";
import React from "react";

import ROUTES from "@/constants/route";

import { Button } from "../ui/button";

const AutoCurtainSection = () => {
  return (
    <>
      <h1 className="h1-bold text-center text-dark-100">
        Giới thiệu bộ sưu tập
        <span className="text-primary-500"> Rèm tự động</span>
      </h1>
      <div className="mt-5 grid grid-cols-2 gap-x-5 gap-y-10">
        <video
          className="col-span-full w-full lg:col-span-1 "
          playsInline
          width="100%"
          muted
          height="240"
          controls
        >
          <source
            src="https://utfs.io/f/da469b2c-55c5-4cb9-a712-19924ca71a34-or7i7d.mp4"
            type="video/mp4"
          />
          Your browser does not support the video tag.
        </video>
        <div className="col-span-full flex flex-col items-start gap-3 lg:col-span-1">
          <p className="body-regular text-justify">
            Rèm tự động đang ngày càng trở nên phổ biến và đang là xu hướng
            trong thiết kế nội thất hiện đại ngày nay. Sự phát triển mang tính
            đột phá, hơi hướng hiện đại giúp giải quyết một số khuyết điểm của
            rèm cuốn thông thường. Đặc biệt động cơ rèm tự động sử dụng rất êm
            ái và bền bỉ, được bảo hành lên đến 5 năm.
          </p>
          <Button variant="link" asChild>
            <Link href={ROUTES.PRODUCTS} className="!p-0 text-primary-500">
              Rèm tự động
            </Link>
          </Button>
        </div>
      </div>
    </>
  );
};

export default AutoCurtainSection;
