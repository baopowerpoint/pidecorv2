"use client";
import React from "react";

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { cn } from "@/lib/utils";

import { Button } from "../ui/button";

// Định nghĩa kiểu cho các cột
interface TableColumn<T> {
  header: string;
  accessor: keyof T; // Sử dụng keyof T để lấy key của T làm tên cột
}

// Định nghĩa kiểu cho các hành động
interface TableAction<T> {
  label: React.ReactNode;
  onClick: (row: T) => void;
}

// Cập nhật kiểu generic cho props của DataTable
interface TableProps<T> {
  caption: string;
  columns: TableColumn<T>[];
  data: T[]; // Dữ liệu sẽ là mảng các phần tử kiểu T
  actions?: TableAction<T>[]; // Các hành động có thể thực hiện trên mỗi dòng
}

const DataTable = <T,>({
  caption,
  columns,
  data,
  actions = [],
}: TableProps<T>) => {
  return (
    <Table>
      <TableCaption>{caption}</TableCaption>
      <TableHeader>
        <TableRow>
          {columns.map((column) => (
            <TableHead key={column.accessor as string}>
              {column.header}
            </TableHead>
          ))}
          {actions.length > 0 && (
            <TableHead className="text-right">Hành động</TableHead>
          )}
        </TableRow>
      </TableHeader>
      <TableBody>
        {data.map((row, index) => (
          <TableRow key={index}>
            {columns.map((column) => (
              <TableCell key={column.accessor as string}>
                {/* Ép kiểu row[column.accessor] sang ReactNode */}
                {row[column.accessor] as React.ReactNode}
              </TableCell>
            ))}
            {actions.length > 0 && (
              <TableCell className="ml-2 text-right">
                {actions.map((action, actionIndex) => (
                  <Button
                    variant="ghost"
                    size="icon"
                    key={actionIndex}
                    onClick={() => action.onClick(row)}
                    className={cn("ml-2")}
                  >
                    {action.label}
                  </Button>
                ))}
              </TableCell>
            )}
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default DataTable;
