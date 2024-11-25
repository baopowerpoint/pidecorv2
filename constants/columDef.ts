import { Brand } from "@/types/global";

export const brandColumns = [
  {
    header: "Tên",
    accessor: "name" as keyof Brand,
  },
  {
    header: "Mô tả",
    accessor: "description" as keyof Brand,
  },
  {
    header: "Hình ảnh",
    accessor: "image" as keyof Brand,
  },
  {
    header: "Số lượng sản phẩm",
    accessor: "products" as keyof Brand,
  },
];
