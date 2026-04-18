import { useEffect, useRef } from "react";
import { ClerkProvider, SignIn, SignUp, Show, useClerk } from "@clerk/react";
import { Switch, Route, Router as WouterRouter, Redirect, Link, useLocation } from "wouter";
import { QueryClient, QueryClientProvider, useQueryClient } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Header } from "@/components/layout/header";
import Dashboard from "@/pages/dashboard";
import NotFound from "@/pages/not-found";

const queryClient = new QueryClient();
const clerkPubKey = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;
const clerkProxyUrl = import.meta.env.VITE_CLERK_PROXY_URL;
const basePath = import.meta.env.BASE_URL.replace(/\/$/, "");

if (!clerkPubKey) {
  throw new Error("Missing VITE_CLERK_PUBLISHABLE_KEY");
}

function stripBase(path: string) {
  return basePath && path.startsWith(basePath) ? path.slice(basePath.length) || "/" : path;
}

const textColor = "hsl(155, 42%, 16%)";
const mutedTextColor = "hsl(155, 10%, 45%)";

const clerkAppearance = {
  options: {
    logoPlacement: "inside" as const,
    logoLinkUrl: basePath || "/",
    logoImageUrl: `${window.location.origin}${basePath}/logo.svg`,
  },
  variables: {
    colorPrimary: "hsl(155, 42%, 24%)",
    colorBackground: "hsl(46, 31%, 94%)",
    colorInputBackground: "hsl(0, 0%, 100%)",
    colorText: textColor,
    colorTextSecondary: mutedTextColor,
    colorInputText: textColor,
    colorNeutral: "hsl(155, 10%, 85%)",
    borderRadius: "0.75rem",
    fontFamily: "Inter, sans-serif",
    fontFamilyButtons: "Inter, sans-serif",
    fontSize: "15px",
  },
  elements: {
    rootBox: "w-full",
    cardBox: "rounded-3xl w-full overflow-hidden border border-card-border shadow-xl bg-card",
    card: "!shadow-none !border-0 !bg-transparent !rounded-none",
    footer: "!shadow-none !border-0 !bg-transparent !rounded-none",
    headerTitle: { color: textColor, fontWeight: "700" },
    headerSubtitle: { color: mutedTextColor },
    socialButtonsBlockButtonText: { color: textColor, fontWeight: "600" },
    formFieldLabel: { color: textColor, fontWeight: "600" },
    footerActionLink: { color: "hsl(155, 42%, 24%)", fontWeight: "700" },
    footerActionText: { color: mutedTextColor },
    dividerText: { color: mutedTextColor },
    identityPreviewEditButton: { color: "hsl(155, 42%, 24%)" },
    formFieldSuccessText: { color: "hsl(155, 42%, 24%)" },
    alertText: { color: textColor },
    logoBox: "mx-auto mb-3",
    logoImage: "h-14 w-14 rounded-2xl",
    socialButtonsBlockButton: "rounded-xl border border-border bg-background hover:bg-muted transition",
    formButtonPrimary: "rounded-xl bg-primary text-primary-foreground font-semibold hover:shadow-md transition",
    formFieldInput: "rounded-xl border border-input bg-background text-foreground focus:ring-2 focus:ring-primary",
    footerAction: "bg-muted/40",
    dividerLine: "bg-border",
    alert: "rounded-xl border border-border bg-muted",
    otpCodeFieldInput: "rounded-xl border border-input",
    formFieldRow: "gap-3",
    main: "gap-5",
  },
};

function Home() {
  return (
    <div className="min-h-[100dvh] bg-background">
      <Header />
      <main className="container mx-auto grid max-w-6xl gap-10 px-4 py-16 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
        <section>
          <p className="text-sm font-bold uppercase tracking-[0.28em] text-primary">Never miss the start line</p>
          <h1 className="mt-5 text-4xl font-black tracking-tight text-foreground sm:text-6xl">
            Plan assignments before they become emergencies.
          </h1>
          <p className="mt-5 max-w-2xl text-lg leading-8 text-muted-foreground">
            NEVERLATEAI helps students track deadlines, predict when to start, rank urgent work, and build a daily study plan that accounts for procrastination.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link href="/sign-up" className="rounded-2xl bg-primary px-6 py-3 font-bold text-primary-foreground shadow-lg transition hover:-translate-y-0.5">
              Create account
            </Link>
            <Link href="/sign-in" className="rounded-2xl border border-border bg-card px-6 py-3 font-bold transition hover:-translate-y-0.5 hover:bg-muted">
              Sign in
            </Link>
          </div>
        </section>
        <section className="rounded-[2rem] border border-card-border bg-card p-6 shadow-xl">
          <div className="rounded-3xl bg-primary p-6 text-primary-foreground">
            <p className="text-sm uppercase tracking-[0.22em] opacity-80">Smart recommendation</p>
            <p className="mt-4 text-3xl font-black">Start 4 days before deadline</p>
            <p className="mt-3 opacity-85">Hard assignment, 5 estimated hours, deadline approaching.</p>
          </div>
          <div className="mt-5 grid gap-3">
            {["Private dashboard", "Personal deadlines", "Daily focus plan"].map((item) => (
              <div key={item} className="rounded-2xl border border-border bg-background px-4 py-3 font-semibold">
                {item}
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}

function HomeRedirect() {
  return (
    <>
      <Show when="signed-in">
        <Redirect to="/dashboard" />
      </Show>
      <Show when="signed-out">
        <Home />
      </Show>
    </>
  );
}

function ProtectedDashboard() {
  return (
    <>
      <Show when="signed-in">
        <Dashboard />
      </Show>
      <Show when="signed-out">
        <Redirect to="/" />
      </Show>
    </>
  );
}

function SignInPage() {
  // To update login providers, app branding, or OAuth settings use the Auth
  // pane in the workspace toolbar. More information can be found in the Replit docs.
  return (
    <div className="flex min-h-[100dvh] items-center justify-center bg-background px-4 py-10">
      <SignIn routing="path" path={`${basePath}/sign-in`} signUpUrl={`${basePath}/sign-up`} fallbackRedirectUrl={`${basePath}/dashboard`} />
    </div>
  );
}

function SignUpPage() {
  // To update login providers, app branding, or OAuth settings use the Auth
  // pane in the workspace toolbar. More information can be found in the Replit docs.
  return (
    <div className="flex min-h-[100dvh] items-center justify-center bg-background px-4 py-10">
      <SignUp routing="path" path={`${basePath}/sign-up`} signInUrl={`${basePath}/sign-in`} fallbackRedirectUrl={`${basePath}/dashboard`} />
    </div>
  );
}

function ClerkQueryClientCacheInvalidator() {
  const { addListener } = useClerk();
  const activeQueryClient = useQueryClient();
  const prevUserIdRef = useRef<string | null | undefined>(undefined);

  useEffect(() => {
    const unsubscribe = addListener(({ user }) => {
      const userId = user?.id ?? null;

      if (prevUserIdRef.current !== undefined && prevUserIdRef.current !== userId) {
        activeQueryClient.clear();
      }

      prevUserIdRef.current = userId;
    });

    return unsubscribe;
  }, [addListener, activeQueryClient]);

  return null;
}

function Router() {
  return (
    <Switch>
      <Route path="/" component={HomeRedirect} />
      <Route path="/dashboard" component={ProtectedDashboard} />
      <Route path="/sign-in/*?" component={SignInPage} />
      <Route path="/sign-up/*?" component={SignUpPage} />
      <Route component={NotFound} />
    </Switch>
  );
}

function ClerkProviderWithRoutes() {
  const [, setLocation] = useLocation();

  return (
    <ClerkProvider
      publishableKey={clerkPubKey}
      proxyUrl={clerkProxyUrl}
      appearance={clerkAppearance}
      localization={{
        signIn: {
          start: {
            title: "Welcome back to NEVERLATEAI",
            subtitle: "Sign in to view your assignment plan.",
          },
        },
        signUp: {
          start: {
            title: "Create your NEVERLATEAI account",
            subtitle: "Start planning deadlines before they become stressful.",
          },
        },
      }}
      routerPush={(to) => setLocation(stripBase(to))}
      routerReplace={(to) => setLocation(stripBase(to), { replace: true })}
    >
      <QueryClientProvider client={queryClient}>
        <ClerkQueryClientCacheInvalidator />
        <TooltipProvider>
          <Router />
          <Toaster />
        </TooltipProvider>
      </QueryClientProvider>
    </ClerkProvider>
  );
}

function App() {
  return (
    <WouterRouter base={basePath}>
      <ClerkProviderWithRoutes />
    </WouterRouter>
  );
}

export default App;
