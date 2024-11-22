import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { formatCurrency } from "@/lib/utils";

export function RecentSales() {
  return (
    <div className="space-y-8">
      <div className="flex items-center" key={1}>
        {/* Avatar */}
        <Avatar className="size-9">
          <AvatarImage src="/avatars/01.png" alt="Avatar" />
          <AvatarFallback>df</AvatarFallback>
        </Avatar>

        {/* Thông tin khách hàng */}
        <div className="ml-4 space-y-1">
          <p className="text-sm font-medium leading-none">bao</p>
          <p className="text-sm text-muted-foreground">0374666132</p>
        </div>

        {/* Tổng số tiền */}
        <div className="ml-auto font-medium">{formatCurrency(4949499)}</div>
      </div>
    </div>
  );
}
