"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { IconLoader } from "@tabler/icons-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

import ImageUploader from "@/components/admin/ImageUploader";
import { FormInput } from "@/components/forms/FormInput";
import { FormSelect } from "@/components/forms/FormSelect";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormField } from "@/components/ui/form";
import {
  createCollection,
  editCollection,
} from "@/lib/actions/collection.action";
import logger from "@/lib/logger";
import { CollectionFormSchema } from "@/lib/validation";
import { Collection } from "@/types/global";

const CollectionForm = ({
  pageTitle,
  initialData,
  categoryData,
  type,
}: {
  pageTitle: string;
  initialData?: Collection | null;
  categoryData?: Selection[];
  type: "create" | "edit";
}) => {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const defaultValues = {
    name: initialData?.name || "",
    description: initialData?.description || "",
    image: initialData?.image ? [initialData.image] : [],
    category: initialData?.category || "",
  };
  const form = useForm<z.infer<typeof CollectionFormSchema>>({
    resolver: zodResolver(CollectionFormSchema),
    values: defaultValues,
  });
  const handleSubmit = async (data: z.infer<typeof CollectionFormSchema>) => {
    const { name, description, image, category } = data;
    try {
      setLoading(true);
      if (type === "create") {
        await createCollection({
          name,
          description,
          category,
          image: image[0],
          path: "/admin/collections",
        });
        toast.success("Thêm bộ sưu tập thành công");
      } else {
        if (initialData) {
          await editCollection({
            collectionId: initialData._id,
            updateData: { ...data, image: image[0] },
            path: "/admin/collections",
          });
          toast.success("Cập nhật bộ sưu tập thành công");
        }
      }
    } catch (error) {
      logger.error(error);
      toast.error("Có lỗi xảy ra, vui lòng thử lại sau");
    } finally {
      setLoading(false);
      router.push("/admin/collections");
    }
  };
  return (
    <Card className="mx-auto w-full">
      <CardHeader>
        <CardTitle className="small-semibold">{pageTitle}</CardTitle>
        <CardContent>
          <Form {...form}>
            <form
              className="space-y-8"
              onSubmit={form.handleSubmit(handleSubmit)}
            >
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                <FormInput
                  name="name"
                  label="Tên bộ sưu tập"
                  placeholder="Nhập tên bộ sưu tập"
                  form={form}
                />
                <FormInput
                  name="description"
                  label="Mô tả"
                  placeholder="Nhập mô tả"
                  form={form}
                />
                <FormSelect
                  name="category"
                  label="Danh mục"
                  placeholder="Chọn danh mục"
                  options={categoryData}
                  form={form}
                />
                <FormField
                  control={form.control}
                  name="image"
                  render={({ field }) => (
                    <div className="col-span-full">
                      <ImageUploader
                        imgUrls={field.value}
                        type="single"
                        onRemoveImage={(url) =>
                          field.onChange(
                            field.value.filter((img) => img !== url)
                          )
                        }
                        onUploadComplete={(urls) => field.onChange(urls)}
                      />
                    </div>
                  )}
                />
              </div>
              <Button type="submit" disabled={loading}>
                {loading && (
                  <IconLoader className="w-6 animate-spin text-white" />
                )}
                {type === "create" ? "Thêm bộ sưu tập" : "Cập nhật "}
              </Button>
            </form>
          </Form>
        </CardContent>
      </CardHeader>
    </Card>
  );
};

export default CollectionForm;
