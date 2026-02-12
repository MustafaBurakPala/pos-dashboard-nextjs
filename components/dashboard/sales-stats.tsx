"use client";

import {
  Bar,
  BarChart,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
  Line,
  LineChart,
  Tooltip,
} from "recharts";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { salesData, productSalesData } from "@/lib/data";
import { formatPrice } from "@/lib/utils/formatPrice";

import { TrendingUp, ShoppingCart, Package, DollarSign } from "lucide-react";

const EMERALD = "#10b981";
const TEAL = "#14b8a6";
const CHART_BLUE = "#3b82f6";

const statCards = [
  {
    title: "Toplam Satis",
    value: formatPrice(73400),
    change: "+12.5%",
    icon: DollarSign,
  },
  {
    title: "Siparis Sayisi",
    value: "1,284",
    change: "+8.3%",
    icon: ShoppingCart,
  },
  {
    title: "Urun Cesidi",
    value: "34",
    change: "+2",
    icon: Package,
  },
  {
    title: "Ortalama Sepet",
    value: formatPrice(57.16),
    change: "+4.1%",
    icon: TrendingUp,
  },
];

export function SalesStats() {
  return (
    <div className="flex flex-col gap-6">
      {/* Stat Cards */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {statCards.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div
              key={stat.title}
              className="flex items-center gap-4 rounded-2xl border border-border bg-card p-5 transition-all duration-300 hover:border-primary/20 hover:shadow-lg hover:shadow-primary/5 opacity-0 animate-fade-in"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-primary/10">
                <Icon className="h-6 w-6 text-primary" />
              </div>
              <div>
                <p className="text-xs text-muted-foreground">{stat.title}</p>
                <p className="text-xl font-bold text-foreground">
                  {stat.value}
                </p>
                <p className="text-xs font-medium text-primary">
                  {stat.change}
                </p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        {/* Monthly Sales Chart */}
        <div
          className="rounded-2xl border border-border bg-card p-5 opacity-0 animate-fade-in"
          style={{ animationDelay: "200ms" }}
        >
          <h3 className="mb-4 text-base font-bold text-foreground">
            Aylik Satis Grafigi
          </h3>
          <ChartContainer
            config={{
              satis: {
                label: "Satis (TL)",
                color: EMERALD,
              },
            }}
            className="h-[300px] w-full"
          >
            <ResponsiveContainer width="100%" height="100%">
              <LineChart
                data={salesData}
                margin={{ top: 5, right: 10, left: 0, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(0 0% 18%)" />
                <XAxis
                  dataKey="month"
                  tick={{ fill: "hsl(0 0% 55%)", fontSize: 12 }}
                  axisLine={{ stroke: "hsl(0 0% 18%)" }}
                  tickLine={false}
                />
                <YAxis
                  tick={{ fill: "hsl(0 0% 55%)", fontSize: 12 }}
                  axisLine={{ stroke: "hsl(0 0% 18%)" }}
                  tickLine={false}
                />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Line
                  type="monotone"
                  dataKey="satis"
                  stroke={EMERALD}
                  strokeWidth={2.5}
                  dot={{ fill: EMERALD, r: 4, strokeWidth: 0 }}
                  activeDot={{
                    r: 6,
                    fill: EMERALD,
                    stroke: "hsl(0 0% 11%)",
                    strokeWidth: 2,
                  }}
                />
              </LineChart>
            </ResponsiveContainer>
          </ChartContainer>
        </div>

        {/* Product Sales Chart */}
        <div
          className="rounded-2xl border border-border bg-card p-5 opacity-0 animate-fade-in"
          style={{ animationDelay: "300ms" }}
        >
          <h3 className="mb-4 text-base font-bold text-foreground">
            Urun Bazli Satis (Bu Ay)
          </h3>
          <ChartContainer
            config={{
              miktar: {
                label: "Satis Adedi",
                color: TEAL,
              },
            }}
            className="h-[300px] w-full"
          >
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={productSalesData}
                margin={{ top: 5, right: 10, left: 0, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(0 0% 18%)" />
                <XAxis
                  dataKey="name"
                  tick={{ fill: "hsl(0 0% 55%)", fontSize: 11 }}
                  axisLine={{ stroke: "hsl(0 0% 18%)" }}
                  tickLine={false}
                  angle={-35}
                  textAnchor="end"
                  height={60}
                />
                <YAxis
                  tick={{ fill: "hsl(0 0% 55%)", fontSize: 12 }}
                  axisLine={{ stroke: "hsl(0 0% 18%)" }}
                  tickLine={false}
                />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Bar
                  dataKey="miktar"
                  fill={TEAL}
                  radius={[6, 6, 0, 0]}
                  maxBarSize={40}
                />
              </BarChart>
            </ResponsiveContainer>
          </ChartContainer>
        </div>
      </div>
    </div>
  );
}
