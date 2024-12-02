"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { IconLoader } from "@tabler/icons-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { FormProps, useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

import ImageUploader from "@/components/admin/ImageUploader";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { createCategory, editCategory } from "@/lib/actions/category.action";
import logger from "@/lib/logger";
import { CategoryFormSchema } from "@/lib/validation";
import { Category } from "@/types/global";

const FormInput = ({
  name,
  label,
  placeholder,
  type = "text",
  form,
}: {
  name: "name" | "description" | "image";
  label: string;
  placeholder: string;
  type?: string;
  form: FormProps<z.infer<typeof CategoryFormSchema>>;
}) => (
  <FormField
    control={form.control}
    name={name}
    render={({ field }) => (
      <FormItem>
        <FormLabel>{label}</FormLabel>
        <FormControl>
          <Input
            type={type}
            placeholder={placeholder}
            {...field}
            className="paragraph-regular light-border-2 no-focus min-h-[20px] border bg-light-800 text-dark-300"
          />
        </FormControl>
        <FormMessage />
      </FormItem>
    )}
  />
);
const CategoryForm = ({
  pageTitle,
  initialData,
  type,
}: {
  pageTitle: string;
  initialData?: Category | null;
  type: "create" | "edit";
}) => {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const defaultValues = {
    name: initialData?.name || "",
    description: initialData?.description || "",
    image: initialData?.image ? [initialData.image] : [],
  };
  const form = useForm<z.infer<typeof CategoryFormSchema>>({
    resolver: zodResolver(CategoryFormSchema),
    values: defaultValues,
  });
  const handleSubmit = async (data: z.infer<typeof CategoryFormSchema>) => {
    const { name, description, image } = data;
    try {
      setLoading(true);
      if (type === "create") {
        await createCategory({
          name,
          description,
          image: image[0],
          path: "/admin/categories",
        });
        toast.success("Thêm danh mục thành công");
      } else {
        if (initialData) {
          await editCategory({
            categoryId: initialData._id,
            updateData: { ...data, image: image[0] },
            path: "/admin/categories",
          });
          toast.success("Cập nhật danh mục thành công");
        }
      }
    } catch (error) {
      logger.error(error);
      toast.error("Có lỗi xảy ra, vui lòng thử lại sau");
    } finally {
      setLoading(false);
      router.push("/admin/categories");
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
                  label="Tên danh mục"
                  placeholder="Nhập tên danh mục"
                  form={form}
                />
                <FormInput
                  name="description"
                  label="Mô tả"
                  placeholder="Nhập mô tả"
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
                {type === "create" ? "Thêm danh mục" : "Cập nhật "}
              </Button>
            </form>
          </Form>
        </CardContent>
      </CardHeader>
    </Card>
  );
};

export default CategoryForm;
