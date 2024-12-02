"use client";
import React from "react";

import { SORT_OPTIONS, useProductAction } from "@/hooks/useProductAction";
import { cn } from "@/lib/utils";
import { Category } from "@/types/global";

import FilterBox from "./filters/FilterBox";
import SortBox from "./filters/SortBox";
import { ProductResetFilter } from "./ProductResetFilter";
import LocalSearchComponent from "./search/LocalSearch";

const ProductAction = ({
  categoryOptions,
  otherClasses,
}: {
  otherClasses?: string;
  categoryOptions?: Category[];
}) => {
  const {
    categoriesFilter,
    setCategoriesFilter,
    isAnyFilterActive,
    resetFilters,
    searchQuery,
    setPage,
    setSearchQuery,
    sort,
    setSort,
  } = useProductAction();

  return (
    <div className={cn("my-4 flex flex-wrap items-center gap-4", otherClasses)}>
      <LocalSearchComponent
        placeholder="Tìm kiếm sản phẩm..."
        imgSrc="/icons/search.svg"
        otherclasses="md:max-w-[300px]"
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        setPage={setPage}
      />
      <FilterBox
        filterKey="categories"
        title="Danh mục"
        setFilterValue={setCategoriesFilter}
        filterValue={categoriesFilter}
        options={categoryOptions || []}
      />
      <SortBox
        sortKey="sort"
        title="Lọc"
        setSortValue={setSort}
        sortValue={sort}
        options={SORT_OPTIONS}
      />
      <ProductResetFilter
        isFilterActive={isAnyFilterActive}
        onReset={resetFilters}
      />
    </div>
  );
};

export default ProductAction;
