export function slugify(str: string): string {
  // Chuyển đổi sang chữ thường và loại bỏ dấu
  str = str
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");

  // Loại bỏ các ký tự đặc biệt, chỉ giữ lại chữ cái, số, dấu gạch ngang và dấu gạch dưới
  str = str.replace(/[^\w-]+/g, "-");

  // Loại bỏ các dấu gạch ngang thừa ở đầu và cuối
  str = str.replace(/^-+|-+$/g, "");

  // Thay thế nhiều dấu gạch ngang liên tiếp bằng một dấu gạch ngang
  str = str.replace(/-+/g, "-");

  return str;
}
