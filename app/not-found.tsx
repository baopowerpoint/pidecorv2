"use client";

import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";

export default function NotFound() {
  const router = useRouter();

  return (
    <div className="absolute left-1/2 top-1/2 mb-16 -translate-x-1/2 -translate-y-1/2 items-center justify-center text-center">
      <span className="primary-text-gradient bg-clip-text text-[10rem] font-extrabold leading-none text-transparent">
        404
      </span>
      <h2 className="h2-semibold font-bold">Trang bạn tìm không tồn tại</h2>
      <p>Xin lỗi, trang bạn đang tìm không tồn tại hoặc đã bị xóa.</p>
      <div className="mt-8 flex justify-center gap-2">
        <Button onClick={() => router.back()} variant="default" size="lg">
          Trở lại
        </Button>
        <Button onClick={() => router.push("/")} variant="ghost" size="lg">
          Trở lại trang chủ
        </Button>
      </div>
    </div>
  );
}
