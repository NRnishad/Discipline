import { LockKeyhole, LogIn, Mail } from "lucide-react";
import { useState } from "react";

function getAuthErrorMessage(error) {
  if (!error?.code) return "Login failed. Check your email and password.";

  if (error.code === "auth/invalid-credential") {
    return "Invalid email or password.";
  }

  if (error.code === "auth/user-disabled") {
    return "This Firebase user is disabled.";
  }

  if (error.code === "auth/too-many-requests") {
    return "Too many login attempts. Wait and try again.";
  }

  return error.message || "Login failed. Check your email and password.";
}

export function Login({ onLogin }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  async function submit(event) {
    event.preventDefault();
    setError("");
    setSubmitting(true);

    try {
      await onLogin(email.trim(), password);
    } catch (loginError) {
      setError(getAuthErrorMessage(loginError));
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-surface-950 px-4 py-10 text-slate-100">
      <section className="w-full max-w-md rounded-lg border border-white/10 bg-surface-850 p-6 shadow-soft">
        <div>
          <p className="eyebrow">Private access</p>
          <h1 className="text-3xl font-semibold text-white">Discipline OS</h1>
          <p className="mt-3 text-sm leading-6 text-slate-400">
            Sign in with the Firebase email and password you created.
          </p>
        </div>

        <form onSubmit={submit} className="mt-6 space-y-4">
          <label className="label">
            Email
            <div className="relative mt-2">
              <Mail className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" size={17} />
              <input
                type="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                className="field pl-10"
                autoComplete="email"
                required
              />
            </div>
          </label>

          <label className="label">
            Password
            <div className="relative mt-2">
              <LockKeyhole className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" size={17} />
              <input
                type="password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                className="field pl-10"
                autoComplete="current-password"
                required
              />
            </div>
          </label>

          {error ? (
            <div className="rounded-md border border-danger-500/30 bg-danger-500/10 px-3 py-2 text-sm text-danger-400">
              {error}
            </div>
          ) : null}

          <button type="submit" className="primary-button w-full" disabled={submitting}>
            <LogIn size={17} />
            {submitting ? "Signing in..." : "Sign in"}
          </button>
        </form>
      </section>
    </main>
  );
}
