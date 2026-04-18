import { AlertTriangle, BookOpen, Clock, Flame } from "lucide-react";
import type { AssignmentSummary } from "@workspace/api-client-react";

type DashboardStatsProps = {
  summary?: AssignmentSummary;
  isLoading: boolean;
};

const statCards = [
  { key: "total", label: "Assignments", icon: BookOpen },
  { key: "highPriority", label: "High priority", icon: Flame },
  { key: "dueSoon", label: "Due soon", icon: Clock },
  { key: "missed", label: "Missed", icon: AlertTriangle },
] as const;

export function DashboardStats({ summary, isLoading }: DashboardStatsProps) {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {statCards.map(({ key, label, icon: Icon }) => (
        <div
          key={key}
          className="rounded-2xl border border-card-border bg-card p-5 shadow-sm transition duration-200 hover:-translate-y-0.5 hover:shadow-md"
        >
          <div className="flex items-center justify-between">
            <p className="text-sm font-medium text-muted-foreground">{label}</p>
            <Icon className="h-4 w-4 text-primary" />
          </div>
          <p className="mt-3 text-3xl font-semibold text-card-foreground">
            {isLoading ? "..." : (summary?.[key] ?? 0)}
          </p>
        </div>
      ))}
      <div className="rounded-2xl border border-card-border bg-primary p-5 text-primary-foreground shadow-sm sm:col-span-2 lg:col-span-4">
        <p className="text-sm opacity-80">Total work remaining</p>
        <p className="mt-2 text-2xl font-semibold">
          {isLoading ? "Calculating..." : `${summary?.totalEstimatedHours ?? 0} estimated hours`}
        </p>
      </div>
    </div>
  );
}