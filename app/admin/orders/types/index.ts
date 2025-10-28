export interface AnalyticsData {
  summary: {
    totalOrders: number;
    pending: number;
    paid: number;
    cancelled: number;
    totalRevenue: number;
    avgOrderValue: number;
  };
  trend: { _id: string; totalRevenue: number }[];
  ordersTrend: {
    date: string;
    statuses: { status: string; count: number }[];
  }[];
  growthRate: number;
  topProducts: {
    _id: string;
    totalSold: number;
    totalRevenue: number;
    name: string;
    image: { url: string };
  }[];
  newUsers: number;
}
