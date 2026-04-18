import { CheckCircle2, TimerReset } from "lucide-react";
import type { DailyPlan } from "@workspace/api-client-react";

type DailyRecommendationsProps = {
  plan?: DailyPlan;
  isLoading: boolean;
};

export function DailyRecommendations({ plan, isLoading }: DailyRecommendationsProps) {
  return (
    <section className="rounded-3xl border border-card-border bg-card p-5 shadow-sm">
      <div className="flex items-start gap-3">
        <div className="rounded-2xl bg-accent p-2 text-accent-foreground">
          <TimerReset className="h-5 w-5" />
        </div>
        <div>
          <h2 className="text-lg font-semibold">Today&apos;s study plan</h2>
          <p className="mt-1 text-sm text-muted-foreground">
            {isLoading ? "Generating your plan..." : plan?.message}
          </p>
        </div>
      </div>

      <div className="mt-5 space-y-3">
        {plan?.items.map((item) => (
          <article
            key={item.assignment.id}
            className="rounded-2xl border border-border bg-background/60 p-4 transition duration-200 hover:bg-background"
          >
            <div className="flex items-start gap-3">
              <CheckCircle2 className="mt-0.5 h-4 w-4 text-primary" />
              <div>
                <p className="font-medium">{item.assignment.title}</p>
                <p className="mt-1 text-sm text-muted-foreground">{item.recommendation}</p>
                <p className="mt-2 text-xs font-semibold uppercase tracking-wide text-primary">
                  Work {item.suggestedMinutesToday} minutes today
                </p>
              </div>
            </div>
          </article>
        ))}

        {!isLoading && plan?.items.length === 0 && (
          <div className="rounded-2xl border border-dashed border-border p-4 text-sm text-muted-foreground">
            Add your first assignment to unlock a focused study plan.
          </div>
        )}
      </div>
    </section>
  );
}