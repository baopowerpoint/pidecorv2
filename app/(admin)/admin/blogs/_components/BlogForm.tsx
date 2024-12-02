"use client";

import { useUser } from "@clerk/nextjs";
import { zodResolver } from "@hookform/resolvers/zod";
import { IconLoader } from "@tabler/icons-react";
import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";
import { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

import ImageUploader from "@/components/admin/ImageUploader";
import { FormInput } from "@/components/forms/FormInput";
import { TagInput } from "@/components/forms/TagInput";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { createBlog } from "@/lib/actions/blog.action";
import logger from "@/lib/logger";
import { BlogFormSchema } from "@/lib/validation";
import { Blog } from "@/types/global";
const Editor = dynamic(() => import("@/components/editors"), { ssr: false });

const BlogForm = ({
  pageTitle,
  initialData,
  type,
}: {
  pageTitle: string;
  initialData?: Blog | null;

  type: "create" | "edit";
}) => {
  const router = useRouter();
  const { user } = useUser();
  const editorRef = useRef<any>(null);
  const [loading, setLoading] = useState(false);
  const defaultValues = {
    title: initialData?.title || "",
    description: initialData?.description || "",
    content: initialData?.content || "",
    thumbnail: initialData?.thumbnail ? [initialData.thumbnail] : [],
    tags: initialData?.tags.map((tag) => tag.toString()) || [],
  };
  const form = useForm<z.infer<typeof BlogFormSchema>>({
    resolver: zodResolver(BlogFormSchema),
    values: defaultValues,
  });
  const handleSubmit = async (data: z.infer<typeof BlogFormSchema>) => {
    console.log(data);
    try {
      setLoading(true);
      if (type === "create") {
        await createBlog({
          ...data,
          authorId: user!.id,
          path: "/admin/blogs",
          thumbnail: data.thumbnail[0],
        });
        toast.success(`Thêm bài viết thành công`);
      } else {
        if (initialData) {
          toast.success(`Sửa bài viết thành công`);
        } else {
          toast.error(`Không tìm thấy bài viết`);
        }
      }
    } catch (error) {
      logger.error(error);
      toast.error(`Có lỗi xảy ra khi thêm bài viết`);
    } finally {
      setLoading(false);
      router.push("/admin/blogs");
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
                  name="title"
                  label="Tiêu đề"
                  placeholder="Nhập tiêu đề"
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
                  name="thumbnail"
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
                  </>
                )}
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
                {type === "create" ? "Thêm bài viết" : "Sửa bài viết"}
              </Button>
            </form>
          </Form>
        </CardContent>
      </CardHeader>
    </Card>
  );
};

export default BlogForm;
