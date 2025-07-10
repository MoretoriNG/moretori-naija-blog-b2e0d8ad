
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { ArrowUpRight, ArrowDownRight } from "lucide-react";

interface StatsCardProps {
  title: string;
  value: string | number;
  icon: React.ComponentType<{ className?: string }>;
  change?: string;
  trend?: "up" | "down";
  description?: string;
  progress?: number;
  borderColor: string;
  iconColor: string;
  valueColor: string;
}

export function StatsCard({ 
  title, 
  value, 
  icon: Icon, 
  change, 
  trend = "up", 
  description, 
  progress,
  borderColor,
  iconColor,
  valueColor
}: StatsCardProps) {
  return (
    <Card className={`${borderColor} shadow-sm hover:shadow-md transition-all duration-200`}>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-semibold text-muted-foreground">
          {title}
        </CardTitle>
        <Icon className={`h-4 w-4 ${iconColor}`} />
      </CardHeader>
      <CardContent className="pt-0">
        <div className={`text-2xl font-bold ${valueColor}`}>{value}</div>
        {change && (
          <div className="flex items-center text-xs text-muted-foreground mt-1">
            {trend === "up" ? (
              <ArrowUpRight className="h-3 w-3 text-green-500 mr-1" />
            ) : (
              <ArrowDownRight className="h-3 w-3 text-red-500 mr-1" />
            )}
            <span className={trend === "up" ? "text-green-600 font-medium" : "text-red-600 font-medium"}>
              {change}
            </span>
            {description && <span className="ml-1">{description}</span>}
          </div>
        )}
        {progress !== undefined && (
          <Progress value={progress} className="mt-2 h-1" />
        )}
      </CardContent>
    </Card>
  );
}
