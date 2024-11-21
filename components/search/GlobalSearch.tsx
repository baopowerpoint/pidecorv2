"use client";

import { IconSearch } from "@tabler/icons-react";
import { useState } from "react";

import { Button } from "@/components/ui/button";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";

export default function GlobalSearch() {
  const [isOpen, setIsOpen] = useState(false);

  const handleOpen = () => setIsOpen(true);

  return (
    <div className="relative">
      <Button variant="ghost" onClick={handleOpen} size="icon">
        <IconSearch stroke={1.5} className="text-dark-400" />
      </Button>
      <Dialog
        open={isOpen}
        onOpenChange={(open) => {
          // Cập nhật trạng thái khi dialog bị đóng (bao gồm click outside)
          setIsOpen(open);
        }}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Tìm kiếm</DialogTitle>
            <DialogDescription>
              Tìm kiếm sản phẩm, danh mục, bộ sưu tập, ....
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
}
