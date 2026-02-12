"use client";

import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { X, Eye, EyeOff, Lock, Mail } from "lucide-react";
import { Toaster } from "sonner";
import { toast } from "sonner";

export default function LoginPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPw, setShowPw] = useState(false);
  const [loading, setLoading] = useState(false);

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);

    const res = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });

    setLoading(false);

    if (!res?.ok) {
      toast.error("Email veya şifre hatalı");

      setTimeout(() => {
        router.push("/");
      }, 1200);
      setEmail("");
      setPassword("");
      return;
    }

    // Session refresh
    const sessionRes = await fetch("/api/auth/session");
    const session = await sessionRes.json();

    if (session?.user?.role === "admin") {
      router.push("/dashboard");
    } else {
      setTimeout(() => {
        router.push("/");
        toast.error("Dashboard erişim yetkiniz yok");
      }, 1200);
    }
  }

  return (
    <div className="relative flex min-h-screen items-center justify-center bg-background px-4">
      {/* arka plan efekti */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -top-24 left-1/2 h-72 w-72 -translate-x-1/2 rounded-full bg-primary/15 blur-3xl" />
        <div className="absolute -bottom-24 right-10 h-72 w-72 rounded-full bg-primary/10 blur-3xl" />
      </div>
      <Toaster position="top-right" expand richColors closeButton />
      <div className="relative w-full max-w-md">
        <div className="relative overflow-hidden rounded-2xl border border-border bg-card shadow-xl">
          {/* Kapatma */}
          <button
            type="button"
            onClick={() => router.push("/")}
            className="absolute right-4 top-4 flex h-9 w-9 items-center justify-center rounded-xl border border-border bg-secondary text-muted-foreground transition-all hover:bg-muted hover:text-foreground active:scale-95"
            aria-label="Kapat"
          >
            <X className="h-4 w-4" />
          </button>

          {/* Header */}
          <div className="border-b border-border bg-secondary/40 px-6 py-5">
            <h1 className="text-lg font-bold text-foreground">
              Yönetici Girişi
            </h1>
            <p className="mt-1 text-sm text-muted-foreground">
              Dashboard’a erişmek için giriş yapın.
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleLogin} className="px-6 py-6">
            {/* Email */}
            <label className="mb-1.5 block text-sm font-medium text-foreground">
              Email
            </label>
            <div className="relative mb-4">
              <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <input
                type="email"
                placeholder="admin@test.com"
                className="w-full rounded-xl border border-border bg-background py-2.5 pl-10 pr-3 text-sm text-foreground placeholder:text-muted-foreground/70 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                autoComplete="email"
                required
              />
            </div>

            {/* Password */}
            <label className="mb-1.5 block text-sm font-medium text-foreground">
              Şifre
            </label>
            <div className="relative mb-5">
              <Lock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <input
                type={showPw ? "text" : "password"}
                placeholder="••••••••"
                className="w-full rounded-xl border border-border bg-background py-2.5 pl-10 pr-10 text-sm text-foreground placeholder:text-muted-foreground/70 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                autoComplete="current-password"
                required
              />
              <button
                type="button"
                onClick={() => setShowPw((v) => !v)}
                className="absolute right-2 top-1/2 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
                aria-label={showPw ? "Şifreyi gizle" : "Şifreyi göster"}
              >
                {showPw ? (
                  <EyeOff className="h-4 w-4" />
                ) : (
                  <Eye className="h-4 w-4" />
                )}
              </button>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-xl bg-primary py-3 text-sm font-bold text-primary-foreground transition-all hover:bg-primary/90 hover:shadow-lg hover:shadow-primary/25 active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-70"
            >
              {loading ? "Giriş yapılıyor..." : "Giriş Yap"}
            </button>

            <div className="mt-4 text-center text-xs text-muted-foreground">
              POS ekranına dönmek için sağ üstten kapatabilirsiniz.
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
