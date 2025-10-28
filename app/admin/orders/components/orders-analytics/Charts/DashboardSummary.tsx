import { DollarSign, ShoppingCart, Clock, UserPlus } from "lucide-react";
import { SummaryCard } from "../SummaryCard";

export default function DashboardSummary({summary}) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4">
      <SummaryCard
        title="Total Orders"
        value={summary.totalOrders}
        icon={<ShoppingCart className="w-6 h-6" />}
        color="from-cyan-500 to-blue-500"
      />
      <SummaryCard
        title="Pending Orders"
        value={summary.pending}
        icon={<Clock className="w-6 h-6" />}
        color="from-amber-500 to-orange-500"
      />
      <SummaryCard
        title="Total Revenue"
        value={summary.totalRevenue.toLocaleString()}
        icon={<DollarSign className="w-6 h-6" />}
        color="from-emerald-500 to-teal-500"
      />
      <SummaryCard
        title="New Users"
        value={8}
        icon={<UserPlus className="w-6 h-6" />}
        color="from-pink-500 to-rose-500"
      />
    </div>
  );
}
