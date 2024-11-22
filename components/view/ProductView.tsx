import {
  IconAward,
  IconCoin,
  IconCubeSend,
  IconRotateClockwise,
} from "@tabler/icons-react";
import { Phone } from "lucide-react";
import Link from "next/link";
import React from "react";

import { Product } from "@/types/global";

import Accordions from "../Accordions";
import ProductImages from "../ProductImages";
import ProductInteraction from "../ProductInteraction";
import { Badge } from "../ui/badge";

type TProductViewProps = {
  initialData: Product;
  pageTitle: string;
};
const items = [
  {
    id: 2,
    title: "Chính sách",
    content: (
      <div>
        <div className="my-2 mt-4 flex items-center gap-1">
          <IconAward className="text-primary-500" height={20} width={20} />
          <h6 className="font-medium text-primary-500">Chính sách bảo hành</h6>
        </div>
        <p className=" text-sm leading-relaxed">
          Bảo hành chất lượng sản phẩm lên tới 60 ngày
        </p>
        <div className="my-2 mt-4 flex items-center gap-1">
          <IconRotateClockwise
            className="text-primary-500"
            height={20}
            width={20}
          />
          <h6 className="font-medium text-primary-500">Chính sách đổi trả</h6>
        </div>
        <p className=" text-sm leading-relaxed">
          Đổi trả miễn phí trong vòng 7 ngày
        </p>
        <div className="my-2 mt-4 flex items-center gap-1">
          <IconCubeSend className="text-primary-500" height={20} width={20} />
          <h6 className="font-medium text-primary-500">Giao hàng miễn phí</h6>
        </div>
        <ul>
          <li>
            <p className="  text-sm leading-relaxed">
              1.Miễn phí vận chuyển nội thành khu vực nội thành Hà Nội đơn hàng
              từ 200.000đ
            </p>
          </li>
          <li>
            <p className=" text-sm leading-relaxed">
              2.Hỗ trợ 50% phí vận chuyển với các khu vực ngoại thành và tỉnh
              cho đơn hàng trên 2.000.000đ.
            </p>
          </li>
        </ul>
      </div>
    ),
  },
  {
    id: 3,
    title: "Cam kết",
    content: (
      <ul className="flex flex-col gap-2">
        <li>
          <p className="text-sm font-medium">Sản phẩm cao cấp</p>
        </li>
        <li>
          <p className="text-sm font-medium">Miễn Phí giao hàng Toàn Quốc</p>
        </li>
        <li>
          <p className="text-sm font-medium">
            Hỗ Trợ trọn gói từ A-Z tất cả các phụ kiện phát sinh trong quá trình
            lắp đặt
          </p>
        </li>
        <li>
          <p className="text-sm font-medium">Bảo hành toàn quốc</p>
        </li>
      </ul>
    ),
  },
];
export default function ProductView({ initialData }: TProductViewProps) {
  return (
    <main className="relative  min-h-screen gap-5  gap-x-4 px-3 md:grid md:grid-cols-7">
      <div className="col-span-full self-start md:sticky md:top-28 md:col-span-3">
        <ProductImages images={[initialData.images[0]]} />
        <Accordions items={items} />
      </div>
      <div className="space-y-8 bg-transparent md:col-span-4">
        <h3 className="text-xl font-semibold">{initialData.title}</h3>
        <div className="mt-1 flex items-center justify-start gap-2">
          <Badge
            className="subtle-medium bg-primary-100 text-primary-500"
            variant="secondary"
          >
            Đã bán 100
          </Badge>
          <span>|</span>
          <p className="subtle-medium text-light-400">Mã : Đang cập nhật</p>
        </div>

        <div className=" mt-4 rounded-xl border border-dashed border-primary-500 p-4">
          <div className="flex items-center gap-1  ">
            <IconCoin className="text-primary-500" />
            <p className="primary-text-gradient small-semibold">
              Miễn phí vận chuyển
            </p>
          </div>
          <p className="small-regular mt-4">
            Miễn phí vận chuyển chỉ với đơn hàng từ 200k. Liên hệ ngay để được
            tư vấn!
          </p>
          <Link href="tel:0978850730">
            <button className="small-semibold mt-2 flex items-center gap-1 rounded-lg bg-primary-500 px-4 py-0.5 text-white">
              <Phone color="#fff" height={18} width={18} />
              <p>0978850730</p>
            </button>
          </Link>
        </div>

        <div className="flex flex-col items-start gap-5">
          <div className="">
            <h3 className="primary-text-gradient base-semibold inline-block">
              Mô tả sản phẩm
            </h3>
            <p className="text-justify text-[12px] font-normal leading-[18px]">
              {initialData.description}
            </p>
          </div>
          <div className="">
            <h3 className="primary-text-gradient base-semibold inline-block">
              Thông tin thêm
            </h3>
            {/* {parsedProduct.specification.map((spec: any) => (
            <div key={spec.key} className="flex items-center gap-2 mt-2">
              <p className="text-sm font-semibold">{spec.key}:</p>
              <p className="text-[12px] font-normal leading-[18px] text-justify">
                {spec.value}
              </p>
            </div>
          ))} */}
          </div>
          <div className="">
            <h3 className="primary-text-gradient base-semibold inline-block">
              Nội dung
            </h3>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit.
            Repellendus dolorem harum odio assumenda similique aperiam quas
            quisquam natus adipisci debitis.
          </div>
        </div>
        <div className="sticky bottom-0 left-0 z-[100] w-full">
          <ProductInteraction />
        </div>
      </div>
    </main>
  );
}
