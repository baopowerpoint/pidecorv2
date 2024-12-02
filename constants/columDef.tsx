import Image from "next/image";

import { Badge } from "@/components/ui/badge";
import { cn, formatCurrency, getTimeStamp } from "@/lib/utils";
import {
  Blog,
  Brand,
  Category,
  CategoryBlog,
  Collection,
  CollectionBlog,
  Color,
  Material,
  Product,
  Tag,
  User,
} from "@/types/global";

export const brandColumns = [
  {
    header: "Tên",
    accessorKey: "name" as keyof Brand,
    cell: ({ row }: { row: Brand }) => (
      <div className="flex flex-col items-start gap-1">
        <Image
          src={row.image}
          className="rounded-full"
          width={30}
          height={30}
          alt="category"
        />
        <p className="small-semibold">{row.name}</p>
      </div>
    ),
  },
  {
    header: "Mô tả",
    accessorKey: "description" as keyof Brand,
    cell: ({ row }: { row: Brand }) => (
      <p className="small-regular line-clamp-2 w-[200px]">{row.description}</p>
    ),
  },

  {
    header: "Số lượng sản phẩm",
    accessorKey: "products" as keyof Brand,
  },
];
export const categoryColumn = [
  {
    header: "Tên",
    accessorKey: "name" as keyof Category,
    cell: ({ row }: { row: Category }) => (
      <div className="flex flex-col items-start gap-1">
        <Image
          src={row.image}
          className="rounded-full"
          width={30}
          height={30}
          alt="category"
        />
        <p className="small-semibold">{row.name}</p>
      </div>
    ),
  },
  {
    header: "Mô tả",
    accessorKey: "description" as keyof Category,
    cell: ({ row }: { row: Category }) => (
      <p className="small-regular line-clamp-2 w-[200px]">{row.description}</p>
    ),
  },

  {
    header: "Bộ sưu tập",
    accessorKey: "categories" as keyof Category,
    cell: ({ row }: { row: Category }) => (
      <div className="flex flex-col items-start gap-1">
        {row?.collections?.map((collection) => (
          <p key={collection._id} className="small-regular">
            {collection.name}
          </p>
        ))}
      </div>
    ),
  },
  {
    header: "Số lượng sản phẩm",
    accessorKey: "products" as keyof Category,
  },
];
export const collectionColumn = [
  {
    header: "Tên",
    accessorKey: "name" as keyof Collection,
    cell: ({ row }: { row: Collection }) => (
      <div className="flex shrink-0 flex-col items-start gap-1">
        <Image
          src={row.image}
          className="size-10 rounded-full"
          width={30}
          height={30}
          alt="category"
        />
        <p className="small-semibold">{row.name}</p>
      </div>
    ),
  },
  {
    header: "Mô tả",
    accessorKey: "description" as keyof Collection,
    cell: ({ row }: { row: Collection }) => (
      <p className="small-regular line-clamp-2 w-[200px]">{row.description}</p>
    ),
  },
  {
    header: "Thuộc danh mục",
    accessorKey: "category" as keyof Collection,
    cell: ({ row }: { row: any }) => (
      <p className="small-regular line-clamp-2 w-[200px]">
        {row.category.name as string}
      </p>
    ),
  },
  {
    header: "Số lượng sản phẩm",
    accessorKey: "products" as keyof Collection,
  },
];
export const materialColumns = [
  {
    header: "Tên",
    accessorKey: "name" as keyof Material,
    cell: ({ row }: { row: Material }) => (
      <div className="flex flex-col items-start gap-1">
        <Image
          src={row.image}
          className="rounded-full"
          width={30}
          height={30}
          alt="category"
        />
        <p className="small-semibold">{row.name}</p>
      </div>
    ),
  },
  {
    header: "Mô tả",
    accessorKey: "description" as keyof Material,
    cell: ({ row }: { row: Material }) => (
      <p className="small-regular line-clamp-2 w-[200px]">{row.description}</p>
    ),
  },

  {
    header: "Số lượng sản phẩm",
    accessorKey: "products" as keyof Material,
  },
];

export const userColumn = [
  {
    header: "Tên",
    accessorKey: "name" as keyof User,
    cell: ({ row }: { row: User }) => (
      <div className="flex items-center gap-1">
        <Image
          src={row.picture}
          className="rounded-full"
          width={30}
          height={30}
          alt="user"
        />
        <p className="small-semibold">{row.name}</p>
      </div>
    ),
  },
  {
    header: "Tên đăng nhập",
    accessorKey: "username" as keyof User,
  },
  {
    header: "Email",
    accessorKey: "email" as keyof User,
  },
  {
    header: "Vai trò",
    accessorKey: "role" as keyof User,
  },
  {
    header: "Số lượt thích",
    accessorKey: "likes" as keyof User,
  },
  {
    header: "Địa chỉ giao hàng",
    accessorKey: "shippingAddress" as keyof User,
  },
];

export const productColumns = [
  {
    header: "Tên",
    accessorKey: "name" as keyof Product,
    cell: ({ row }: { row: Product }) => (
      <div className="flex flex-col items-start gap-1 ">
        <Image
          src={row.featuredImage}
          className="rounded-full"
          width={30}
          height={30}
          alt="category"
        />
        <p className="small-semibold line-clamp-1 w-[200px]">{row.title}</p>
      </div>
    ),
  },
  {
    header: "Mô tả",
    accessorKey: "description" as keyof Product,
    cell: ({ row }: { row: Product }) => (
      <p className="small-regular line-clamp-2 w-[200px]">{row.description}</p>
    ),
  },
  {
    header: "Thuộc danh mục",
    accessorKey: "category" as keyof Product,
    cell: ({ row }: { row: Product }) => (
      <p className="small-regular line-clamp-2 w-[200px]">
        {row?.categoryId?.name}
      </p>
    ),
  },
  {
    header: "Màu sắc",
    accessorKey: "colors" as keyof Product,
    cell: ({ row }: { row: Product }) => (
      <div className="flex shrink-0 flex-wrap gap-2 whitespace-nowrap">
        {row?.colors?.map((color) => (
          <div
            key={color._id}
            className={cn(
              "w-5 h-5 border border-light-700 shadow-md rounded-full bg-slate-900"
            )}
            style={{ backgroundColor: color.hex }}
          ></div>
        ))}
      </div>
    ),
  },
  {
    header: "Thẻ",
    accessorKey: "tags" as keyof Product,
    cell: ({ row }: { row: Product }) => (
      <div className="flex shrink-0 flex-wrap gap-2 whitespace-nowrap">
        {row?.tags?.map((tag) => (
          <Badge key={tag._id} className={cn("bg-light-400")}>
            <p className="subtle-regular text-dark-400">{tag.name}</p>
          </Badge>
        ))}
      </div>
    ),
  },
  {
    header: "Thuộc bộ sưu tập",
    accessorKey: "collection" as keyof Product,
    cell: ({ row }: { row: Product }) => (
      <p className="small-regular line-clamp-2 w-[200px]">
        {row?.collectionId?.name}
      </p>
    ),
  },
  {
    header: "Giá bán",
    accessorKey: "price" as keyof Product,
    cell: ({ row }: { row: Product }) => (
      <p className="small-regular line-clamp-2 w-[200px]">
        {formatCurrency(row?.salePrice)}
      </p>
    ),
  },
];
export const colorColumns = [
  {
    header: "Tên",
    accessorKey: "hex" as keyof Color,
    cell: ({ row }: { row: Color }) => (
      <div className="flex flex-col items-start gap-1">
        <p className={cn("small-semibold")}>{row.hex}</p>
      </div>
    ),
  },

  {
    header: "Màu",
    accessorKey: "hex" as keyof Color,
    cell: ({ row }: { row: Color }) => (
      <div className="flex flex-col items-start gap-1">
        <div
          className="small-regular rounded-lg px-4 py-0.5"
          style={{ backgroundColor: row.hex }}
        >
          {row.hex}
        </div>
      </div>
    ),
  },
  {
    header: "Số lượng sản phẩm",
    accessorKey: "products" as keyof Color,
  },
];
export const tagColumns = [
  {
    header: "Tên",
    accessorKey: "name" as keyof Tag,
    cell: ({ row }: { row: Tag }) => (
      <Badge className="bg-light-400">
        <p className="small-semibold text-dark-400">#{row.name}</p>
      </Badge>
    ),
  },

  {
    header: "Số lượng sản phẩm",
    accessorKey: "products" as keyof Tag,
  },
  {
    header: "Số lượng bài viết",
    accessorKey: "blogs" as keyof Tag,
  },
];
export const blogColumns = [
  {
    header: "Tên",
    accessorKey: "title" as keyof Blog,
  },
  {
    header: "Tác giả",
    accessorKey: "author" as keyof Blog,
    cell: ({ row }: { row: Blog }) => (
      <div className="flex flex-col items-start gap-1">
        <p className="small-semibold">{row.author.name}</p>
      </div>
    ),
  },
  {
    header: "Ngày tạo",
    accessorKey: "createdAt" as keyof Blog,
    cell: ({ row }: { row: Blog }) => (
      <div className="flex flex-col items-start gap-1">
        <p className="small-semibold">
          {getTimeStamp(new Date(row.createdAt))}
        </p>
      </div>
    ),
  },
  {
    header: "Số lượt thích",
    accessorKey: "likes" as keyof Blog,
  },
  {
    header: "Thẻ",
    accessorKey: "tags" as keyof Blog,
  },
  {
    header: "Lượt xem",
    accessorKey: "views" as keyof Blog,
  },
];
export const categoryBlogColumns = [
  {
    header: "Tên danh mục",
    accessorKey: "categoryId" as keyof CategoryBlog,
    cell: ({ row }: { row: CategoryBlog }) => (
      <div className="flex flex-col items-start gap-1">
        <p className="small-semibold">{row.categoryId.name}</p>
      </div>
    ),
  },
  {
    header: "Tên bài viết",
    accessorKey: "blogId" as keyof CategoryBlog,
    cell: ({ row }: { row: CategoryBlog }) => (
      <div className="flex flex-col items-start gap-1">
        <p className="small-semibold">{row.blogId.title}</p>
      </div>
    ),
  },
];
export const collectionBlogColumns = [
  {
    header: "Tên bộ sưu tập",
    accessorKey: "collectionId" as keyof CollectionBlog,
    cell: ({ row }: { row: CollectionBlog }) => (
      <div className="flex flex-col items-start gap-1">
        <p className="small-semibold">{row.collectionId.name}</p>
      </div>
    ),
  },
  {
    header: "Tên bài viết",
    accessorKey: "blogId" as keyof CollectionBlog,
    cell: ({ row }: { row: CollectionBlog }) => (
      <div className="flex flex-col items-start gap-1">
        <p className="small-semibold">{row.blogId.title}</p>
      </div>
    ),
  },
];
