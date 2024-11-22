/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { IconLoader } from "@tabler/icons-react";
import React, { useEffect, useState } from "react";
import { FieldValues, useForm } from "react-hook-form";
import { z } from "zod";

import { AddressFormSchema } from "@/lib/validation";

import { Button } from "../ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

interface AdministrativeUnit {
  id: string;
  name: string;
}

const UserForm = () => {
  // State quản lý danh sách tỉnh, quận, phường
  const [provinces, setProvinces] = useState<AdministrativeUnit[]>([]);
  const [districts, setDistricts] = useState<AdministrativeUnit[]>([]);
  const [wards, setWards] = useState<AdministrativeUnit[]>([]);
  const [loadingState, setLoadingState] = useState({
    province: false,
    district: false,
    ward: false,
  });

  // React Hook Form
  const form = useForm<z.infer<typeof AddressFormSchema>>({
    resolver: zodResolver(AddressFormSchema),
    defaultValues: {
      name: "",
      phone: "",
      addressDetail: {
        province: { id: "", name: "" },
        district: { id: "", name: "" },
        ward: { id: "", name: "" },
        detail: "",
      },
      note: "",
    },
  });

  // Watch các giá trị thay đổi
  const selectedProvince = form.watch("addressDetail.province.id");
  const selectedDistrict = form.watch("addressDetail.district.id");

  // Helper để fetch dữ liệu từ API
  const fetchAdministrativeData = async (
    url: string,
    setState: React.Dispatch<React.SetStateAction<AdministrativeUnit[]>>,
    loadingKey: keyof typeof loadingState
  ) => {
    try {
      setLoadingState((prev) => ({ ...prev, [loadingKey]: true }));
      const response = await fetch(url);
      const data = await response.json();
      setState(data.data || []);
    } catch (error) {
      console.error(error);
    } finally {
      setLoadingState((prev) => ({ ...prev, [loadingKey]: false }));
    }
  };

  // Fetch danh sách tỉnh/thành phố
  useEffect(() => {
    fetchAdministrativeData(
      "https://esgoo.net/api-tinhthanh/1/0.htm",
      setProvinces,
      "province"
    );
  }, []);

  // Fetch danh sách quận/huyện khi chọn tỉnh
  useEffect(() => {
    if (selectedProvince) {
      fetchAdministrativeData(
        `https://esgoo.net/api-tinhthanh/2/${selectedProvince}.htm`,
        setDistricts,
        "district"
      );
      form.setValue("addressDetail.district", { id: "", name: "" });
      form.setValue("addressDetail.ward", { id: "", name: "" });
    }
  }, [selectedProvince, form]);

  // Fetch danh sách phường/xã khi chọn quận
  useEffect(() => {
    if (selectedDistrict) {
      fetchAdministrativeData(
        `https://esgoo.net/api-tinhthanh/3/${selectedDistrict}.htm`,
        setWards,
        "ward"
      );
      form.setValue("addressDetail.ward", { id: "", name: "" });
    }
  }, [selectedDistrict, form]);

  // Hàm xử lý khi chọn giá trị Select
  const handleSelectChange = (value: string, field: FieldValues) => {
    const parsedValue = JSON.parse(value);
    field.onChange(parsedValue);
  };

  // Component tái sử dụng cho Select (Dropdown)
  const AdministrativeSelect = ({
    label,
    loading,
    options,
    placeholder,
    field,
  }: {
    label: string;
    loading: boolean;
    options: AdministrativeUnit[];
    placeholder: string;
    field: FieldValues;
  }) => (
    <FormItem className="flex w-full flex-col">
      <FormLabel className="small-semibold flex-start text-dark-400">
        {label}
        {loading && (
          <IconLoader className="ml-2 size-3 animate-spin text-primary-500" />
        )}
      </FormLabel>
      <Select
        onValueChange={(value) => handleSelectChange(value, field)}
        defaultValue={JSON.stringify(field.value)}
      >
        <FormControl>
          <SelectTrigger className="small-regular light-border-2 no-focus min-h-[42px] border bg-transparent  text-dark-300">
            <SelectValue placeholder={placeholder} />
          </SelectTrigger>
        </FormControl>
        <SelectContent className="small-regular light-border-2 no-focus min-h-[42px] border bg-light-800  text-dark-300">
          {options.map((option) => (
            <SelectItem key={option.id} value={JSON.stringify(option)}>
              {option.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      <FormMessage />
    </FormItem>
  );

  // Hàm xử lý submit form
  const handleCompleteCheckout = async (
    data: z.infer<typeof AddressFormSchema>
  ) => {
    console.log(data);
  };

  return (
    <Form {...form}>
      <form
        className="flex w-full flex-col gap-4"
        onSubmit={form.handleSubmit(handleCompleteCheckout)}
      >
        {/* Tên */}
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem className="flex w-full flex-col ">
              <FormLabel className="small-semibold text-dark-400">
                Tên
              </FormLabel>
              <FormControl>
                <Input {...field} required />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Số điện thoại */}
        <FormField
          control={form.control}
          name="phone"
          render={({ field }) => (
            <FormItem className="flex w-full flex-col ">
              <FormLabel className="small-semibold text-dark-400">
                Số điện thoại
              </FormLabel>
              <FormControl>
                <Input {...field} required />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Tỉnh/Thành phố */}
        <FormField
          control={form.control}
          name="addressDetail.province"
          render={({ field }) => (
            <AdministrativeSelect
              label="Tỉnh/Thành phố"
              loading={loadingState.province}
              options={provinces}
              placeholder="Chọn tỉnh/thành phố"
              field={field}
            />
          )}
        />

        {/* Quận/Huyện */}
        <FormField
          control={form.control}
          name="addressDetail.district"
          render={({ field }) => (
            <AdministrativeSelect
              label="Quận/Huyện"
              loading={loadingState.district}
              options={districts}
              placeholder="Chọn quận/huyện"
              field={field}
            />
          )}
        />

        {/* Phường/Xã */}
        <FormField
          control={form.control}
          name="addressDetail.ward"
          render={({ field }) => (
            <AdministrativeSelect
              label="Phường/Xã"
              loading={loadingState.ward}
              options={wards}
              placeholder="Chọn phường/xã"
              field={field}
            />
          )}
        />

        {/* Địa chỉ chi tiết */}
        <FormField
          control={form.control}
          name="addressDetail.detail"
          render={({ field }) => (
            <FormItem className="flex w-full flex-col ">
              <FormLabel className="small-semibold text-dark-400">
                Địa chỉ chi tiết
              </FormLabel>
              <FormControl>
                <Input {...field} required />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Ghi chú */}
        <FormField
          control={form.control}
          name="note"
          render={({ field }) => (
            <FormItem className="flex w-full flex-col ">
              <FormLabel className="small-semibold text-dark-400">
                Ghi chú
              </FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="mt-16 flex w-full justify-end">
          <Button
            type="submit"
            className="primary-gradient w-fit !text-light-900"
          >
            Tạo đơn
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default UserForm;
