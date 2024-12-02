"use client";
import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
} from "lucide-react";
import { parseAsInteger, useQueryState } from "nuqs";

import { Button } from "./ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";

export function Pagination({
  pageNumber,
  isNext,
  pageSizeOptions = [10, 20, 30],
}: {
  pageNumber?: number;
  isNext?: boolean;
  pageSizeOptions?: number[];
}) {
  const totalItems = 3;
  const [currentPage, setCurrentPage] = useQueryState(
    "page",
    parseAsInteger.withOptions({ shallow: false }).withDefault(1)
  );
  const [pageSize, setPageSize] = useQueryState(
    "limit",
    parseAsInteger
      .withOptions({ shallow: false, history: "push" })
      .withDefault(10)
  );
  const paginationState = {
    pageIndex: currentPage - 1,
    pageSize,
  };
  const pageCount = Math.ceil(totalItems / pageSize);
  const handlePaginationChange = (value: {
    pageIndex: number;
    pageSize: number;
  }) => {
    const pagination = value;
    setCurrentPage(pagination.pageIndex + 1);
    setPageSize(pagination.pageSize);
  };

  return (
    <div className="mt-5 flex w-full items-center justify-between gap-2 ">
      <div className="flex flex-col items-center gap-4 sm:flex-row sm:gap-6 lg:gap-8">
        <div className="flex items-center space-x-2">
          <p className="whitespace-nowrap text-sm font-medium">
            Số sản phẩm mỗi trang
          </p>
          <Select
            value={`${paginationState.pageSize}`}
            onValueChange={(value) => {
              setPageSize(parseInt(value));
            }}
          >
            <SelectTrigger className="h-8 w-[70px]">
              <SelectValue placeholder={paginationState.pageSize} />
            </SelectTrigger>
            <SelectContent side="top">
              {pageSizeOptions.map((pageSize) => (
                <SelectItem key={pageSize} value={`${pageSize}`}>
                  {pageSize}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="flex items-center space-x-2">
        <Button
          aria-label="Go to previous page"
          variant="outline"
          className="size-8 p-0"
          onClick={() =>
            handlePaginationChange({
              pageIndex: paginationState.pageIndex - 1,
              pageSize,
            })
          }
          disabled={paginationState.pageIndex === 0}
        >
          <ChevronLeft className="size-4" aria-hidden="true" />
        </Button>
        <div className="flex w-fit items-center justify-center text-sm font-medium">
          {totalItems > 0 ? <>Trang 1</> : "No pages"}
        </div>
        <Button
          aria-label="Go to next page"
          variant="outline"
          className="size-8 p-0"
          onClick={() =>
            handlePaginationChange({
              pageIndex: paginationState.pageIndex + 1,
              pageSize,
            })
          }
          disabled={!isNext}
        >
          <ChevronRight className="size-4" aria-hidden="true" />
        </Button>
      </div>
    </div>
  );
}
