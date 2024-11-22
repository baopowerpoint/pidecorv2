"use client";

import { useQueryState } from "nuqs";
import { useCallback, useMemo } from "react";

import { searchParams } from "@/lib/searchparams";

export const CATEGORY_OPTIONS = [
  {
    _id: "1",
    value: "rem-cua",
    label: "Rèm cửa",
  },
  {
    _id: "2",
    value: "rem-vai",
    label: "Rèm vải",
  },
  {
    _id: "3",
    value: "rem-roman",
    label: "Rèm Roman",
  },
  {
    _id: "4",
    value: "rem-sao",
    label: "Rèm sáo",
  },
];
export const SORT_OPTIONS = [
  {
    _id: "1",
    value: "newest",
    label: "Mới nhất",
  },
  {
    _id: "2",
    value: "oldest",
    label: "Cũ nhất",
  },
  {
    _id: "3",
    value: "low_to_high",
    label: "Giá tăng dần",
  },
  {
    _id: "4",
    value: "high_to_low",
    label: "Giá giảm dần",
  },
];
export function useProductAction() {
  const [searchQuery, setSearchQuery] = useQueryState(
    "q",
    searchParams.q
      .withOptions({ shallow: false, throttleMs: 1000 })
      .withDefault("")
  );

  const [categoriesFilter, setCategoriesFilter] = useQueryState(
    "categories",
    searchParams.categories.withOptions({ shallow: false }).withDefault("")
  );
  const [sort, setSort] = useQueryState(
    "sort",
    searchParams.sort
      .withOptions({ shallow: false, throttleMs: 500 })
      .withDefault("")
  );

  const [page, setPage] = useQueryState(
    "page",
    searchParams.page.withOptions({ shallow: false }).withDefault(1)
  );

  const resetFilters = useCallback(() => {
    setSearchQuery(null);
    setCategoriesFilter(null);
    setSort(null);
    setPage(1);
  }, [setSearchQuery, setCategoriesFilter, setPage, setSort]);

  const isAnyFilterActive = useMemo(() => {
    return !!searchQuery || !!categoriesFilter || !!sort;
  }, [searchQuery, categoriesFilter, sort]);

  return {
    searchQuery,
    setSearchQuery,
    categoriesFilter,
    setCategoriesFilter,
    sort,
    setSort,
    page,
    setPage,
    resetFilters,
    isAnyFilterActive,
  };
}
