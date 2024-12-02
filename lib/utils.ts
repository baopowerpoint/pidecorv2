import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const getTimeStamp = (date: Date) => {
  const now = new Date();
  const secondsAgo = Math.floor((now.getTime() - date.getTime()) / 1000);

  const units = [
    { label: "năm", seconds: 31536000 },
    { label: "tháng", seconds: 2592000 },
    { label: "tuần", seconds: 604800 },
    { label: "ngày", seconds: 86400 },
    { label: "giờ", seconds: 3600 },
    { label: "phút", seconds: 60 },
    { label: "giây", seconds: 1 },
  ];

  for (const unit of units) {
    const interval = Math.floor(secondsAgo / unit.seconds);
    if (interval >= 1) {
      return `${interval} ${unit.label} trước`;
    }
  }
  return "gần đây";
};
export const formatCurrency = (number: number) => {
  const numberStr = number.toString().split("").reverse().join("");
  const chunks = [];
  for (let i = 0; i < numberStr.length; i += 3) {
    chunks.push(numberStr.slice(i, i + 3));
  }

  let formattedNumber = chunks.join(".").split("").reverse().join("");
  formattedNumber += " VND";

  return formattedNumber;
};
