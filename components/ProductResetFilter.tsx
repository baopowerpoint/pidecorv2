"use client";

import { Button } from "./ui/button";

type ProductResetFilterProps = {
  isFilterActive: boolean;
  onReset: () => void;
};

export function ProductResetFilter({
  isFilterActive,
  onReset,
}: ProductResetFilterProps) {
  return (
    <>
      {isFilterActive ? (
        <Button variant="outline" onClick={onReset}>
          Xoá bộ lọc
        </Button>
      ) : null}
    </>
  );
}
