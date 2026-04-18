import { useMemo, useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { CalendarDays, Pencil, Plus, Trash2 } from "lucide-react";
import {
  getGetAssignmentSummaryQueryKey,
  getGetDailyRecommendationsQueryKey,
  getListAssignmentsQueryKey,
  useCreateAssignment,
  useDeleteAssignment,
  useUpdateAssignment,
  type Assignment,
  type AssignmentInput,
} from "@workspace/api-client-react";

type AssignmentListProps = {
  assignments?: Assignment[];
  isLoading: boolean;
};

const emptyForm: AssignmentInput = {
  title: "",
  subject: "",
  deadline: new Date().toISOString().slice(0, 10),
  difficulty: "medium",
  estimatedTime: 2,
};

function priorityClasses(priority: Assignment["priority"]) {
  if (priority === "High") {
    return "bg-destructive text-destructive-foreground";
  }

  if (priority === "Medium") {
    return "bg-accent text-accent-foreground";
  }

  return "bg-secondary text-secondary-foreground";
}

function formatDeadline(deadline: string) {
  return new Intl.DateTimeFormat(undefined, { month: "short", day: "numeric" }).format(new Date(deadline));
}

export function AssignmentList({ assignments = [], isLoading }: AssignmentListProps) {
  const queryClient = useQueryClient();
  const [form, setForm] = useState<AssignmentInput>(emptyForm);
  const [editingId, setEditingId] = useState<number | null>(null);

  const refresh = () => {
    queryClient.invalidateQueries({ queryKey: getListAssignmentsQueryKey() });
    queryClient.invalidateQueries({ queryKey: getGetAssignmentSummaryQueryKey() });
    queryClient.invalidateQueries({ queryKey: getGetDailyRecommendationsQueryKey() });
  };

  const createAssignment = useCreateAssignment({
    mutation: {
      onSuccess: () => {
        refresh();
        setForm(emptyForm);
        window.alert("Assignment added. Your study plan has been recalculated.");
      },
    },
  });

  const updateAssignment = useUpdateAssignment({
    mutation: {
      onSuccess: () => {
        refresh();
        setForm(emptyForm);
        setEditingId(null);
        window.alert("Assignment updated. Priorities and recommendations have been refreshed.");
      },
    },
  });

  const deleteAssignment = useDeleteAssignment({
    mutation: {
      onSuccess: () => {
        refresh();
        window.alert("Assignment deleted.");
      },
    },
  });

  const groupedByDate = useMemo(() => {
    return [...assignments]
      .sort((a, b) => new Date(a.deadline).getTime() - new Date(b.deadline).getTime())
      .reduce<Record<string, Assignment[]>>((groups, assignment) => {
        const date = assignment.deadline.slice(0, 10);
        groups[date] = [...(groups[date] ?? []), assignment];
        return groups;
      }, {});
  }, [assignments]);

  const submitAssignment = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (editingId) {
      updateAssignment.mutate({ id: editingId, data: form });
      return;
    }

    createAssignment.mutate({ data: form });
  };

  const startEditing = (assignment: Assignment) => {
    setEditingId(assignment.id);
    setForm({
      title: assignment.title,
      subject: assignment.subject,
      deadline: assignment.deadline.slice(0, 10),
      difficulty: assignment.difficulty,
      estimatedTime: assignment.estimatedTime,
    });
  };

  const removeAssignment = (assignment: Assignment) => {
    if (window.confirm(`Delete "${assignment.title}"?`)) {
      deleteAssignment.mutate({ id: assignment.id });
    }
  };

  return (
    <div className="space-y-6">
      <section className="rounded-3xl border border-card-border bg-card p-5 shadow-sm">
        <div className="flex items-center gap-3">
          <div className="rounded-2xl bg-primary p-2 text-primary-foreground">
            <Plus className="h-5 w-5" />
          </div>
          <div>
            <h2 className="text-xl font-semibold">{editingId ? "Edit assignment" : "Add assignment"}</h2>
            <p className="text-sm text-muted-foreground">
              Difficulty, estimated time, and deadline drive the rule-based AI suggestions.
            </p>
          </div>
        </div>

        <form className="mt-5 grid gap-4 md:grid-cols-2" onSubmit={submitAssignment}>
          <label className="space-y-2">
            <span className="text-sm font-medium">Title</span>
            <input
              required
              className="w-full rounded-xl border border-input bg-background px-3 py-2 outline-none ring-primary transition focus:ring-2"
              value={form.title}
              onChange={(event) => setForm((current) => ({ ...current, title: event.target.value }))}
            />
          </label>

          <label className="space-y-2">
            <span className="text-sm font-medium">Subject</span>
            <input
              required
              className="w-full rounded-xl border border-input bg-background px-3 py-2 outline-none ring-primary transition focus:ring-2"
              value={form.subject}
              onChange={(event) => setForm((current) => ({ ...current, subject: event.target.value }))}
            />
          </label>

          <label className="space-y-2">
            <span className="text-sm font-medium">Deadline</span>
            <input
              required
              type="date"
              className="w-full rounded-xl border border-input bg-background px-3 py-2 outline-none ring-primary transition focus:ring-2"
              value={form.deadline}
              onChange={(event) => setForm((current) => ({ ...current, deadline: event.target.value }))}
            />
          </label>

          <label className="space-y-2">
            <span className="text-sm font-medium">Difficulty</span>
            <select
              className="w-full rounded-xl border border-input bg-background px-3 py-2 outline-none ring-primary transition focus:ring-2"
              value={form.difficulty}
              onChange={(event) =>
                setForm((current) => ({ ...current, difficulty: event.target.value as AssignmentInput["difficulty"] }))
              }
            >
              <option value="easy">Easy</option>
              <option value="medium">Medium</option>
              <option value="hard">Hard</option>
            </select>
          </label>

          <label className="space-y-2">
            <span className="text-sm font-medium">Estimated time in hours</span>
            <input
              required
              min="0.5"
              step="0.5"
              type="number"
              className="w-full rounded-xl border border-input bg-background px-3 py-2 outline-none ring-primary transition focus:ring-2"
              value={form.estimatedTime}
              onChange={(event) =>
                setForm((current) => ({ ...current, estimatedTime: Number(event.target.value) }))
              }
            />
          </label>

          <div className="flex items-end gap-3">
            <button
              type="submit"
              className="rounded-xl bg-primary px-5 py-2.5 font-semibold text-primary-foreground transition duration-200 hover:-translate-y-0.5 hover:shadow-md disabled:opacity-60"
              disabled={createAssignment.isPending || updateAssignment.isPending}
            >
              {editingId ? "Save changes" : "Add assignment"}
            </button>
            {editingId && (
              <button
                type="button"
                className="rounded-xl border border-border px-5 py-2.5 font-semibold transition hover:bg-muted"
                onClick={() => {
                  setEditingId(null);
                  setForm(emptyForm);
                }}
              >
                Cancel
              </button>
            )}
          </div>
        </form>
      </section>

      <section className="rounded-3xl border border-card-border bg-card p-5 shadow-sm">
        <div className="flex items-center justify-between gap-4">
          <div>
            <h2 className="text-xl font-semibold">Assignment priorities</h2>
            <p className="text-sm text-muted-foreground">Ranked by urgency, difficulty, remaining time, and procrastination risk.</p>
          </div>
        </div>

        <div className="mt-5 space-y-3">
          {isLoading && <p className="text-sm text-muted-foreground">Loading assignments...</p>}
          {!isLoading && assignments.length === 0 && (
            <div className="rounded-2xl border border-dashed border-border p-6 text-center text-muted-foreground">
              No assignments yet. Add one above to begin planning.
            </div>
          )}
          {assignments.map((assignment) => (
            <article
              key={assignment.id}
              className="rounded-2xl border border-border bg-background/70 p-4 transition duration-200 hover:-translate-y-0.5 hover:bg-background hover:shadow-sm"
            >
              <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                <div>
                  <div className="flex flex-wrap items-center gap-2">
                    <h3 className="text-lg font-semibold">{assignment.title}</h3>
                    <span className={`rounded-full px-2.5 py-1 text-xs font-bold ${priorityClasses(assignment.priority)}`}>
                      {assignment.priority}
                    </span>
                    {assignment.isMissed && (
                      <span className="rounded-full bg-destructive/10 px-2.5 py-1 text-xs font-bold text-destructive">
                        Missed deadline
                      </span>
                    )}
                    {assignment.isUpcoming && !assignment.isMissed && (
                      <span className="rounded-full bg-accent px-2.5 py-1 text-xs font-bold text-accent-foreground">
                        Upcoming
                      </span>
                    )}
                  </div>
                  <p className="mt-1 text-sm text-muted-foreground">
                    {assignment.subject} · {formatDeadline(assignment.deadline)} · {assignment.estimatedTime}h · {assignment.difficulty}
                  </p>
                  <p className="mt-3 text-sm font-medium text-primary">
                    {assignment.startSuggestion} ({assignment.suggestedStartDate.slice(0, 10)})
                  </p>
                  {assignment.warning && <p className="mt-2 text-sm text-destructive">{assignment.warning}</p>}
                </div>
                <div className="flex gap-2">
                  <button
                    className="rounded-xl border border-border p-2 transition hover:bg-muted"
                    onClick={() => startEditing(assignment)}
                    aria-label={`Edit ${assignment.title}`}
                  >
                    <Pencil className="h-4 w-4" />
                  </button>
                  <button
                    className="rounded-xl border border-border p-2 text-destructive transition hover:bg-destructive/10"
                    onClick={() => removeAssignment(assignment)}
                    aria-label={`Delete ${assignment.title}`}
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="rounded-3xl border border-card-border bg-card p-5 shadow-sm">
        <div className="flex items-center gap-3">
          <CalendarDays className="h-5 w-5 text-primary" />
          <div>
            <h2 className="text-xl font-semibold">Basic calendar view</h2>
            <p className="text-sm text-muted-foreground">Deadlines grouped by date.</p>
          </div>
        </div>
        <div className="mt-5 grid gap-3 sm:grid-cols-2">
          {Object.entries(groupedByDate).map(([date, dayAssignments]) => (
            <div key={date} className="rounded-2xl border border-border bg-background/60 p-4">
              <p className="font-semibold">{formatDeadline(date)}</p>
              <div className="mt-3 space-y-2">
                {dayAssignments.map((assignment) => (
                  <div key={assignment.id} className="rounded-xl bg-muted px-3 py-2 text-sm">
                    {assignment.title}
                  </div>
                ))}
              </div>
            </div>
          ))}
          {!isLoading && Object.keys(groupedByDate).length === 0 && (
            <p className="text-sm text-muted-foreground">Calendar appears once assignments are added.</p>
          )}
        </div>
      </section>
    </div>
  );
}