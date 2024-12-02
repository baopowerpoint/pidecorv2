/* eslint-disable @typescript-eslint/no-empty-object-type */
import ProductGrid from "@/components/shared/ProductGrid";
import { getAllProducts } from "@/lib/actions/product.action";
import { searchParamsCache } from "@/lib/searchparams";
import { Product } from "@/types/global";

export default async function ProductListing() {
  // Showcasing the use of search params cache in nested RSCs
  const page = searchParamsCache.get("page");
  const search = searchParamsCache.get("q");
  const pageLimit = searchParamsCache.get("limit");
  const categories = searchParamsCache.get("categories");
  const sort = searchParamsCache.get("sort");

  const filters = {
    page,
    limit: pageLimit,
    ...(search && { search }),
    ...(categories && { categories }),
    ...(sort && { sort }),
  };

  const data = await getAllProducts({ ...filters });
  const products: Product[] = JSON.parse(data?.products || "[]");

  return <ProductGrid productData={products} isNext={data?.isNext} />;
}
