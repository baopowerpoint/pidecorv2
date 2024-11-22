import ProductView from "@/components/view/ProductView";
import products from "@/data/mock";
import React from "react";

export const metadata = {
  title: "Pidecor | Sản phẩm",
};
type pageProps = { params: { slug: string } };
const ProductDetailPage = ({ params }: pageProps) => {
  const product = products.find((product) => product._id === params.slug);
  if (!product) return <div>Product not found</div>;
  return (
    <div>
      <ProductView initialData={product} pageTitle={product.title} />
    </div>
  );
};

export default ProductDetailPage;
