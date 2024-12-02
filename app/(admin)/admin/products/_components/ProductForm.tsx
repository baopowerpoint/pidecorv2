/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { IconLoader, IconPlus, IconTrash } from "@tabler/icons-react";
import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";
import React, { useRef, useCallback, useMemo, useState } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

import ImageUploader from "@/components/admin/ImageUploader";
import { FormInput } from "@/components/forms/FormInput";
import { FormSelect } from "@/components/forms/FormSelect";
import { TagInput } from "@/components/forms/TagInput";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { createProduct, editProduct } from "@/lib/actions/product.action";
import logger from "@/lib/logger";
import { ProductFormSchema } from "@/lib/validation";
import { Product } from "@/types/global";

const Editor = dynamic(() => import("@/components/editors"), { ssr: false });

const ProductForm = ({
  pageTitle,
  categoryData,
  collectionData,
  materialData,
  brandData,
  initialData,
  type,
}: {
  initialData?: Product | null;
  categoryData: Selection[];
  collectionData: Selection[];
  brandData: Selection[];
  materialData: Selection[];
  pageTitle: string;
  type: "create" | "edit";
}) => {
  const editorRef = useRef<any>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const router = useRouter();
  const defaultValues = useMemo(
    () => ({
      title: initialData?.title || "",
      description: initialData?.description || "",
      content: initialData?.content || "",
      price: initialData?.price || 0,
      salePrice: initialData?.salePrice || 0,
      stock: initialData?.stock || 0,
      category: initialData?.categoryId.toString() || "",
      collection: initialData?.collectionId.toString() || "",
      brand: initialData?.brandId.toString() || "",
      tags: initialData?.tags.map((tag) => tag.toString()) || [],
      colors: initialData?.colors?.map((color) => color.toString()) || [],
      material: initialData?.materialId?.toString() || "",
      images: initialData?.images || [],
      specs: initialData?.specs?.map((spec) => ({
        name: spec.name,
        value: spec.value,
      })) || [{ name: "", value: "" }],
    }),
    []
  );

  const form = useForm<z.infer<typeof ProductFormSchema>>({
    resolver: zodResolver(ProductFormSchema),
    defaultValues,
  });

  const { fields, append, remove } = useFieldArray({
    name: "specs",
    control: form.control,
  });
  const handleSubmit = useCallback(
    async (data: z.infer<typeof ProductFormSchema>) => {
      console.log(initialData);
      try {
        setLoading(true);
        if (type === "create") {
          await createProduct(data);
          toast.success("Sản phẩm đã được thêm thành công");
        } else {
          if (initialData) {
            console.log("ok");
            await editProduct({
              productId: initialData._id,
              updateData: data,
              path: "/admin/products",
            });
            toast.success("Sản phẩm đã được sửa thành công");
          }
        }
      } catch (error) {
        logger.error(error);
        toast.error("Có lỗi xảy ra khi thêm sản phẩm");
      } finally {
        setLoading(false);
        router.push("/admin/products");
      }
    },
    [type, initialData, router]
  );

  return (
    <Card className="mx-auto w-full">
      <CardHeader>
        <CardTitle className="small-semibold">{pageTitle}</CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleSubmit)}
            className="space-y-8"
          >
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              <FormInput
                name="title"
                label="Tên sản phẩm"
                placeholder="Nhập tên sản phẩm"
                form={form}
              />
              <FormInput
                name="description"
                label="Mô tả"
                placeholder="Nhập mô tả"
                form={form}
              />
              <FormInput
                name="price"
                label="Giá bán"
                placeholder="Nhập giá bán"
                type="number"
                form={form}
              />
              <FormInput
                name="salePrice"
                label="Giá nhập"
                placeholder="Nhập giá nhập"
                type="number"
                form={form}
              />
              <FormInput
                name="stock"
                label="Số lượng"
                placeholder="Nhập số lượng"
                type="number"
                form={form}
              />
              <FormSelect
                name="collection"
                label="Bộ sưu tập"
                placeholder="Chọn bộ sưu tập"
                options={collectionData}
                form={form}
              />
              <FormSelect
                name="category"
                label="Danh mục"
                placeholder="Chọn danh mục"
                options={categoryData}
                form={form}
              />
              <FormSelect
                name="brand"
                label="Nhãn hiệu"
                placeholder="Chọn nhãn hiệu"
                options={brandData}
                form={form}
              />
              <FormSelect
                name="material"
                label="Chất liệu"
                placeholder="Chọn chất liệu"
                options={materialData}
                form={form}
              />
              {type !== "edit" && (
                <>
                  <TagInput
                    name="tags"
                    label="Thẻ"
                    maxLength={15}
                    maxItems={3}
                    placeholder="Thêm thẻ..."
                    form={form}
                  />
                  <TagInput
                    name="colors"
                    label="Màu"
                    maxLength={7}
                    maxItems={5}
                    placeholder="Thêm màu..."
                    form={form}
                  />
                </>
              )}

              <div className="row-span-2">
                <label className="small-semibold">Thông số kỹ thuật</label>
                <div className="flex flex-col gap-5">
                  {fields.map((item, index) => (
                    <div key={item.id} className="flex items-center gap-4">
                      <FormInput
                        otherClassName="flex-1 w-full"
                        name={`specs.${index}.name`}
                        label="Tên thông số"
                        placeholder="Nhập tên thông số"
                        form={form}
                      />
                      <FormInput
                        otherClassName="flex-1 w-full"
                        name={`specs.${index}.value`}
                        label="Giá trị"
                        placeholder="Nhập giá trị"
                        form={form}
                      />
                      <Button
                        type="button"
                        size="icon"
                        variant="ghost"
                        onClick={() => remove(index)}
                        className="flex flex-col justify-end text-red-500"
                      >
                        <IconTrash />
                      </Button>
                    </div>
                  ))}
                </div>
                <Button
                  type="button"
                  size="icon"
                  variant="ghost"
                  onClick={() => append({ name: "", value: "" })}
                  className="text-primary-500 "
                >
                  <IconPlus />
                </Button>
              </div>
              <FormField
                control={form.control}
                name="images"
                render={({ field }) => (
                  <ImageUploader
                    imgUrls={field.value}
                    type="multiple"
                    onRemoveImage={(url) =>
                      field.onChange(
                        field.value.filter((img: string) => img !== url)
                      )
                    }
                    onUploadComplete={(urls) =>
                      field.onChange([...field.value, ...urls])
                    }
                  />
                )}
              />
              <FormField
                control={form.control}
                name="content"
                render={({ field }) => (
                  <FormItem className="col-span-full">
                    <Editor
                      editorRef={editorRef}
                      value={field.value}
                      fieldChange={field.onChange}
                    />
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <Button type="submit" disabled={loading}>
              {loading && (
                <IconLoader className="w-6 animate-spin text-white" />
              )}
              {type === "create" ? "Thêm sản phẩm" : "Sửa sản phẩm"}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

export default React.memo(ProductForm);
