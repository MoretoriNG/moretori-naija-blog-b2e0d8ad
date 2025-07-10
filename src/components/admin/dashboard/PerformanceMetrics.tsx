
import { Card, CardContent } from "@/components/ui/card";
import { ArrowUpRight, ArrowDownRight } from "lucide-react";

interface MetricProps {
  label: string;
  value: string;
  change: string;
  trend: "up" | "down";
  description: string;
}

interface PerformanceMetricsProps {
  metrics: MetricProps[];
}

export function PerformanceMetrics({ metrics }: PerformanceMetricsProps) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
      {metrics.map((metric, index) => (
        <Card key={index} className="hover:shadow-md transition-shadow">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">{metric.label}</p>
                <p className="text-lg font-bold">{metric.value}</p>
                <p className="text-xs text-muted-foreground mt-1">{metric.description}</p>
              </div>
              <div className={`flex items-center text-xs font-medium ${
                metric.trend === "up" ? "text-green-600" : "text-red-600"
              }`}>
                {metric.trend === "up" ? 
                  <ArrowUpRight className="h-3 w-3 mr-1" /> : 
                  <ArrowDownRight className="h-3 w-3 mr-1" />
                }
                {metric.change}
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
