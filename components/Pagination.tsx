import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
} from "lucide-react";

import { Button } from "./ui/button";

export function Pagination() {
  const totalItems = 3;
  return (
    <div className="flex w-full items-center justify-between gap-2 sm:justify-end">
      <div className="flex w-[150px] items-center justify-center text-sm font-medium">
        {totalItems > 0 ? <>Trang 1</> : "No pages"}
      </div>
      <div className="flex items-center space-x-2">
        <Button
          aria-label="Go to first page"
          variant="outline"
          className="hidden size-8 p-0 lg:flex"
          // onClick={() => table.setPageIndex(0)}
          // disabled={!table.getCanPreviousPage()}
        >
          <ChevronsLeft className="size-4" aria-hidden="true" />
        </Button>
        <Button
          aria-label="Go to previous page"
          variant="outline"
          className="size-8 p-0"
          // onClick={() => table.previousPage()}
          // disabled={!table.getCanPreviousPage()}
        >
          <ChevronLeft className="size-4" aria-hidden="true" />
        </Button>
        <Button
          aria-label="Go to next page"
          variant="outline"
          className="size-8 p-0"
          // onClick={() => table.nextPage()}
          // disabled={!table.getCanNextPage()}
        >
          <ChevronRight className="size-4" aria-hidden="true" />
        </Button>
        <Button
          aria-label="Go to last page"
          variant="outline"
          className="hidden size-8 p-0 lg:flex"
          // onClick={() => table.setPageIndex(table.getPageCount() - 1)}
          // disabled={!table.getCanNextPage()}
        >
          <ChevronsRight className="size-4" aria-hidden="true" />
        </Button>
      </div>
    </div>
  );
}
