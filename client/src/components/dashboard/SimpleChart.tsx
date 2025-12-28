"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface ChartData {
  label: string;
  value: number;
  color?: string;
}

interface SimpleChartProps {
  title: string;
  data: ChartData[];
  type?: "bar" | "pie";
}

export function SimpleChart({ title, data, type = "bar" }: SimpleChartProps) {
  const maxValue = Math.max(...data.map((d) => d.value));

  if (type === "pie") {
    const total = data.reduce((sum, d) => sum + d.value, 0);
    let currentAngle = 0;

    return (
      <Card>
        <CardHeader>
          <CardTitle>{title}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-center">
            <svg viewBox="0 0 200 200" className="w-48 h-48">
              {data.map((item, index) => {
                const percentage = (item.value / total) * 100;
                const angle = (item.value / total) * 360;
                const startAngle = currentAngle;
                const endAngle = currentAngle + angle;
                currentAngle += angle;

                const x1 = 100 + 80 * Math.cos((startAngle * Math.PI) / 180);
                const y1 = 100 + 80 * Math.sin((startAngle * Math.PI) / 180);
                const x2 = 100 + 80 * Math.cos((endAngle * Math.PI) / 180);
                const y2 = 100 + 80 * Math.sin((endAngle * Math.PI) / 180);
                const largeArc = angle > 180 ? 1 : 0;

                const colors = [
                  "hsl(var(--primary))",
                  "hsl(var(--primary) / 0.8)",
                  "hsl(var(--primary) / 0.6)",
                  "hsl(var(--primary) / 0.4)",
                ];

                return (
                  <path
                    key={index}
                    d={`M 100 100 L ${x1} ${y1} A 80 80 0 ${largeArc} 1 ${x2} ${y2} Z`}
                    fill={item.color || colors[index % colors.length]}
                    className="hover:opacity-80 transition-opacity"
                  />
                );
              })}
            </svg>
          </div>
          <div className="mt-6 space-y-2">
            {data.map((item, index) => {
              const percentage = ((item.value / total) * 100).toFixed(1);
              const colors = [
                "bg-primary",
                "bg-primary/80",
                "bg-primary/60",
                "bg-primary/40",
              ];
              return (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <div
                      className={`h-3 w-3 rounded-full ${
                        item.color || colors[index % colors.length]
                      }`}
                    />
                    <span className="text-sm">{item.label}</span>
                  </div>
                  <span className="text-sm font-medium">{percentage}%</span>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {data.map((item, index) => (
            <div key={index} className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span className="font-medium">{item.label}</span>
                <span className="text-muted-foreground">{item.value}</span>
              </div>
              <div className="h-2 bg-muted rounded-full overflow-hidden">
                <div
                  className="h-full bg-primary rounded-full transition-all"
                  style={{
                    width: `${(item.value / maxValue) * 100}%`,
                  }}
                />
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

