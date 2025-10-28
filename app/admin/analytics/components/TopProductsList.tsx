import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { currency } from "../utilities";

const TopProductsList = ({ products }) => {
  const totalMax = Math.max(
    1,
    ...(products || []).map((p) => p.totalRevenue || 0)
  );

  return (
    <Card className="bg-slate-900/60 border border-slate-800 shadow">
      <CardHeader className="flex items-center justify-between">
        <CardTitle className="text-slate-100 text-base">Top Products</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {(products || []).map((p, idx) => (
            <div
              key={p._id}
              className="flex items-center justify-between gap-4"
            >
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-slate-800 rounded overflow-hidden flex-shrink-0">
                  <img
                    src={p.image?.url}
                    alt={p.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <div className="text-slate-100 font-medium">{p.name}</div>
                  <div className="text-slate-400 text-sm">
                    {p.totalSold} sold • {currency(p.totalRevenue)}
                  </div>
                </div>
              </div>
              <div className="w-32">
                <div className="h-2 bg-slate-800 rounded overflow-hidden">
                  <div
                    style={{
                      width: `${Math.round(
                        (p.totalRevenue / totalMax) * 100
                      )}%`,
                    }}
                    className="h-2 bg-emerald-500"
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
export default TopProductsList