import { notFound } from "next/navigation";
import React from "react";

import ProductView from "@/components/view/ProductView";
import { getProductBySlug } from "@/lib/actions/product.action";

export const metadata = {
  title: "Pidecor | Sản phẩm",
};
type pageProps = { params: { slug: string } };
const ProductDetailPage = async ({ params }: pageProps) => {
  const product = await getProductBySlug({ slug: params.slug });
  if (!product) return notFound();
  return (
    <div>
      <ProductView
        initialData={JSON.parse(product || "")}
        pageTitle={"sanr haf"}
      />
    </div>
  );
};

export default ProductDetailPage;
