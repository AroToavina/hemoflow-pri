import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { useTrends } from "../hooks/use-dashboard-data";

const TOOLTIP_STYLE = {
  background: "var(--surface)",
  border: "1px solid var(--rule)",
  borderRadius: "10px",
  fontSize: "12px",
  padding: "8px 12px",
  boxShadow: "0 8px 24px -12px rgba(0,0,0,.18)",
};

const AXIS_TICK = { fill: "var(--ink-muted)", fontSize: 11, fontFamily: "Inter" };

export function DashboardTrends() {
  const { data, isLoading } = useTrends();

  return (
    <section className="mt-8 grid grid-cols-1 xl:grid-cols-3 gap-4">
      <ChartCard
        eyebrow="Tendance"
        title="Dons par semaine"
        hint="8 dernières semaines"
      >
        {isLoading || !data ? (
          <Skeleton />
        ) : (
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={data.weekly} margin={{ top: 10, right: 8, left: -16, bottom: 0 }}>
              <CartesianGrid stroke="var(--rule)" strokeDasharray="2 4" vertical={false} />
              <XAxis dataKey="semaine" tick={AXIS_TICK} tickLine={false} axisLine={false} />
              <YAxis tick={AXIS_TICK} tickLine={false} axisLine={false} width={32} />
              <Tooltip
                contentStyle={TOOLTIP_STYLE}
                cursor={{ fill: "var(--surface-elevated)" }}
                formatter={(v: any) => [`${v} dons`, "Volume"]}
              />
              <Bar dataKey="dons" fill="var(--blood-600)" radius={[6, 6, 0, 0]} maxBarSize={26} />
            </BarChart>
          </ResponsiveContainer>
        )}
      </ChartCard>

      <ChartCard
        eyebrow="Évolution"
        title="Stock cumulé (L)"
        hint="Volume en stock cumulé"
      >
        {isLoading || !data ? (
          <Skeleton />
        ) : (
          <ResponsiveContainer width="100%" height={220}>
            <AreaChart
              data={data.stockCumul}
              margin={{ top: 10, right: 8, left: -16, bottom: 0 }}
            >
              <defs>
                <linearGradient id="stockGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="var(--blood-500)" stopOpacity={0.35} />
                  <stop offset="100%" stopColor="var(--blood-500)" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid stroke="var(--rule)" strokeDasharray="2 4" vertical={false} />
              <XAxis dataKey="semaine" tick={AXIS_TICK} tickLine={false} axisLine={false} />
              <YAxis tick={AXIS_TICK} tickLine={false} axisLine={false} width={32} />
              <Tooltip
                contentStyle={TOOLTIP_STYLE}
                formatter={(v: any) => [`${v} L`, "Stock"]}
              />
              <Area
                type="monotone"
                dataKey="volume"
                stroke="var(--blood-600)"
                strokeWidth={2.5}
                fill="url(#stockGrad)"
              />
            </AreaChart>
          </ResponsiveContainer>
        )}
      </ChartCard>

      <ChartCard
        eyebrow="Performance"
        title="Disponibilité par centre"
        hint="Taux de dons en stock"
      >
        {isLoading || !data ? (
          <Skeleton />
        ) : (
          <ResponsiveContainer width="100%" height={220}>
            <BarChart
              data={data.centresDispo}
              layout="vertical"
              margin={{ top: 4, right: 12, left: 0, bottom: 0 }}
            >
              <CartesianGrid stroke="var(--rule)" strokeDasharray="2 4" horizontal={false} />
              <XAxis
                type="number"
                domain={[0, 100]}
                tick={AXIS_TICK}
                tickLine={false}
                axisLine={false}
                unit="%"
              />
              <YAxis
                type="category"
                dataKey="centre"
                tick={AXIS_TICK}
                tickLine={false}
                axisLine={false}
                width={78}
              />
              <Tooltip
                contentStyle={TOOLTIP_STYLE}
                cursor={{ fill: "var(--surface-elevated)" }}
                formatter={(v: any, _n, p: any) => [
                  `${v}% (${p.payload.dispo}/${p.payload.total})`,
                  "Disponibilité",
                ]}
              />
              <Bar dataKey="taux" radius={[0, 6, 6, 0]} maxBarSize={18}>
                {data.centresDispo.map((c: any, i: number) => (
                  <Cell
                    key={i}
                    fill={
                      c.taux >= 70
                        ? "var(--blood-600)"
                        : c.taux >= 40
                          ? "var(--blood-500)"
                          : "var(--blood-200)"
                    }
                  />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        )}
      </ChartCard>
    </section>
  );
}

function ChartCard({
  eyebrow,
  title,
  hint,
  children,
}: {
  eyebrow: string;
  title: string;
  hint: string;
  children: React.ReactNode;
}) {
  return (
    <div className="bg-surface rounded-2xl border border-rule p-6 animate-fade-in-up">
      <div className="flex items-start justify-between mb-5">
        <div>
          <p className="text-[11px] font-semibold tracking-[0.22em] uppercase text-ink-muted mb-1.5">
            {eyebrow}
          </p>
          <h3 className="font-display font-bold text-lg leading-tight">{title}</h3>
        </div>
        <span className="text-[10px] font-mono text-ink-muted">{hint}</span>
      </div>
      {children}
    </div>
  );
}

function Skeleton() {
  return <div className="h-[220px] rounded-xl bg-surface-elevated animate-pulse" />;
}
