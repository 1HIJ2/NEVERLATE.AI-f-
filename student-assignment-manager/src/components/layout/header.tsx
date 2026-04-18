import { Brain } from "lucide-react";
import { useClerk, useUser } from "@clerk/react";
import { Link } from "wouter";

export function Header() {
  const { signOut } = useClerk();
  const { isSignedIn, user } = useUser();
  const displayName = user?.firstName ?? user?.primaryEmailAddress?.emailAddress ?? "Account";

  return (
    <header className="border-b bg-card/50 backdrop-blur-sm sticky top-0 z-10">
      <div className="container max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 font-medium text-lg hover:opacity-80 transition-opacity">
          <div className="bg-primary text-primary-foreground p-1.5 rounded-md">
            <Brain className="w-5 h-5" />
          </div>
          <span>NEVERLATEAI</span>
        </Link>
        {isSignedIn ? (
          <div className="flex items-center gap-3">
            <div className="hidden text-right sm:block">
              <p className="text-sm font-semibold">{displayName}</p>
              <p className="text-xs text-muted-foreground">Signed in</p>
            </div>
            <button
              className="rounded-xl border border-border px-4 py-2 text-sm font-semibold transition hover:bg-muted"
              onClick={() => signOut({ redirectUrl: "/" })}
            >
              Sign out
            </button>
          </div>
        ) : (
          <div className="flex items-center gap-2">
            <Link href="/sign-in" className="rounded-xl border border-border px-4 py-2 text-sm font-semibold transition hover:bg-muted">
              Sign in
            </Link>
            <Link href="/sign-up" className="rounded-xl bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground transition hover:shadow-md">
              Sign up
            </Link>
          </div>
        )}
      </div>
    </header>
  );
}
