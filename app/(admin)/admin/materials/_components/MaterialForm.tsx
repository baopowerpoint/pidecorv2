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
import { createMaterial, editMaterial } from "@/lib/actions/material.action";
import logger from "@/lib/logger";
import { MaterialFormSchema } from "@/lib/validation";
import { Material } from "@/types/global";

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
  form: FormProps<z.infer<typeof MaterialFormSchema>>;
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
const MaterialForm = ({
  pageTitle,
  initialData,
  type,
}: {
  pageTitle: string;
  initialData?: Material | null;
  type: "create" | "edit";
}) => {
  const router = useRouter();

  const [loading, setLoading] = useState(false);
  const defaultValues = {
    name: initialData?.name || "",
    description: initialData?.description || "",
    image: initialData?.image ? [initialData.image] : [],
  };
  const form = useForm<z.infer<typeof MaterialFormSchema>>({
    resolver: zodResolver(MaterialFormSchema),
    values: defaultValues,
  });
  const handleSubmit = async (data: z.infer<typeof MaterialFormSchema>) => {
    const { name, description, image } = data;
    try {
      setLoading(true);
      if (type === "create") {
        await createMaterial({
          name,
          description,
          image: image[0],
          path: "/admin/materials",
        });
        toast.success(`Thêm chất liệu thành công`);
      } else {
        if (initialData) {
          await editMaterial({
            materialId: initialData._id,
            updateData: { ...data, image: image[0] },
            path: "/admin/materials",
          });
          toast.success(`Sửa chất liệu thành công`);
        } else {
          toast.error(`Không tìm thấy chất liệu`);
        }
      }
    } catch (error) {
      logger.error(error);
      toast.error(`Có lỗi xảy ra khi thêm chất liệu`);
    } finally {
      setLoading(false);
      router.push("/admin/materials");
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
                  label="Tên chất liệu"
                  placeholder="Nhập tên chất liệu"
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
                      <FormMessage />
                    </div>
                  )}
                />
              </div>
              <Button type="submit" disabled={loading}>
                {loading && (
                  <IconLoader className="w-6 animate-spin text-white" />
                )}
                {type === "create" ? "Thêm chất liệu" : "Sửa chất liệu"}
              </Button>
            </form>
          </Form>
        </CardContent>
      </CardHeader>
    </Card>
  );
};

export default MaterialForm;
