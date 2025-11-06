import React from "react";
import {
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Tooltip,
} from "recharts";
import { formatCurrency } from "../helpers";

const renderTooltip = ({ payload }) => {
  if (!payload || !payload.length) return null;
  const p = payload[0];
  return (
    <div style={{ background: "#fff", padding: 8, borderRadius: 4, boxShadow: "0 2px 6px rgba(0,0,0,0.12)" }}>
      <div style={{ fontWeight: 600 }}>{p.name}</div>
      <div>{formatCurrency(p.value)}</div>
    </div>
  );
};

const RADIAN = Math.PI / 180;

const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent }) => {
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);
  const textAnchor = x > cx ? 'start' : 'end';
  return (
    <text x={x} y={y} fill="#fff" textAnchor={textAnchor} dominantBaseline="central" style={{ fontSize: 11, fontWeight: 700 }}>
      {`${Math.round(percent * 100)}%`}
    </text>
  );
};

const BudgetPieRechart = ({ budgets = [] }) => {
  if (!budgets || budgets.length === 0) return null;

  const data = budgets.map((b) => ({ name: b.name, value: b.amount || 0, color: b.color }));
  const total = data.reduce((s, d) => s + d.value, 0);

  return (
    <div className="budget-rechart" style={{ width: "100%", height: 320, display: "flex", gap: 16, alignItems: "center" }}>
      <div style={{ flex: 1, minWidth: 240, height: 320, overflow: 'visible' }}>
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            {/* use percentage radii so the chart scales nicely */}
            <Pie
              data={data}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              innerRadius="50%"
              outerRadius="80%"
              paddingAngle={2}
              labelLine={false}
              label={renderCustomizedLabel}
            >
              {data.map((entry) => (
                <Cell key={entry.name} fill={entry.color ? `hsl(${entry.color})` : "#8884d8"} />
              ))}
            </Pie>
            <Tooltip content={renderTooltip} />
          </PieChart>
        </ResponsiveContainer>
      </div>
      <div style={{ minWidth: 160 }}>
        <div style={{ fontSize: 14, color: "#333", marginBottom: 8 }}>Total</div>
        <div style={{ fontSize: 18, fontWeight: 700 }}>{formatCurrency(total)}</div>
        <ul style={{ listStyle: "none", padding: 0, marginTop: 12 }}>
          {data.map((d) => (
            <li key={d.name} style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 6 }}>
              <span style={{ width: 12, height: 12, background: d.color ? `hsl(${d.color})` : "#8884d8", display: "inline-block", borderRadius: 2 }} />
              <span style={{ flex: 1 }}>{d.name}</span>
              <span style={{ color: "#555" }}>{formatCurrency(d.value)}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default BudgetPieRechart;
