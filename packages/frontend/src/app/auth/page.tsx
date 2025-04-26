"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { ProductivityHero } from "@/components/ProductivityHero";
import { GitHubButton } from "@/components/GitHubButton";
import { PasswordInput } from "@/components/PasswordInput";
import { useTheme } from "next-themes";

const features = [
  {
    icon: "✅",
    title: "Task Management",
    desc: "Organize and prioritize your tasks with ease"
  },
  {
    icon: "🗓️",
    title: "Smart Scheduling",
    desc: "Plan your day with intelligent time management"
  },
  {
    icon: "📊",
    title: "Progress Analytics",
    desc: "Track your productivity with visual insights"
  },
  {
    icon: "🤝",
    title: "Team Collaboration",
    desc: "Work together seamlessly on shared projects"
  }
];

export default function AuthPage() {
  const [isSignIn, setIsSignIn] = useState(true);
  const [form, setForm] = useState({ email: "", password: "", name: "" });
  const [error, setError] = useState("");
  const router = useRouter();
  const { theme, setTheme } = useTheme();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    const endpoint = isSignIn ? "/api/auth/signin" : "/api/auth/signup";
    const body = isSignIn
      ? { email: form.email, password: form.password }
      : { name: form.name, email: form.email, password: form.password };
    try {
      const res = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
        credentials: "include"
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Something went wrong");
      // Redirect to dashboard on success
      router.push("/dashboard");
    } catch (err: any) {
      setError(err.message);
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-zinc-900 flex items-center justify-center relative">
      {/* Hero Illustration */}
      <ProductivityHero />
      {/* Dark mode toggle */}
      <button
        className="absolute top-4 right-4 z-10 p-2 rounded-full bg-white/80 dark:bg-zinc-800/80 shadow hover:scale-105 transition"
        onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
        aria-label="Toggle dark mode"
      >
        <span className="text-xl">{theme === "dark" ? "🌙" : "☀️"}</span>
      </button>
      <div className="flex flex-col md:flex-row gap-8 max-w-4xl w-full p-6 z-10">
        {/* Left: Features */}
        <div className="flex-1 flex flex-col justify-center items-center gap-4 bg-white dark:bg-zinc-800 rounded-xl shadow-lg p-8 relative overflow-hidden">
          <h1 className="text-3xl font-bold mb-1 tracking-tight">Motion Magic</h1>
          <p className="mb-4 text-gray-600 dark:text-gray-300 text-center text-base font-medium">Your all-in-one productivity solution for individuals and teams</p>
          <span className="text-xs text-indigo-500 font-semibold mb-2 tracking-wide">Productivity. Collaboration. Results.</span>
          <div className="grid grid-cols-2 gap-3 w-full">
            {features.map((f) => (
              <div
                key={f.title}
                className="bg-gray-100 dark:bg-zinc-700 rounded-lg p-3 flex flex-col items-center transition hover:scale-[1.03] hover:shadow-md cursor-pointer"
              >
                <span className="text-2xl mb-1">{f.icon}</span>
                <span className="font-semibold text-sm">{f.title}</span>
                <span className="text-xs text-gray-500 dark:text-gray-400 text-center leading-tight">{f.desc}</span>
              </div>
            ))}
          </div>
        </div>
        {/* Right: Auth Form */}
        <div className="flex-1 flex flex-col justify-center items-center bg-white dark:bg-zinc-800 rounded-xl shadow-2xl p-8">
          <div className="flex flex-col items-center mb-6">
            <span className="text-3xl">✨</span>
            <h2 className="text-2xl font-semibold mt-2 mb-1">{isSignIn ? "Welcome back" : "Create your account"}</h2>
            <p className="text-gray-500 dark:text-gray-300 text-base">{isSignIn ? "Sign in to continue your productivity journey" : "Sign up to get started with Motion Magic"}</p>
          </div>
          <form className="w-full max-w-xs flex flex-col gap-2 mt-2" onSubmit={handleSubmit}>
            {!isSignIn && (
              <input
                type="text"
                placeholder="Enter your name"
                className="input input-bordered border border-gray-300 dark:border-zinc-600 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 dark:focus:ring-indigo-400 shadow-sm text-lg rounded-md px-3 py-2 bg-gray-100 dark:bg-zinc-800 transition"
                value={form.name}
                onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
                required
              />
            )}
            <input
              type="email"
              placeholder="Enter your email"
              className="input input-bordered border border-gray-300 dark:border-zinc-600 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 dark:focus:ring-indigo-400 shadow-sm text-lg rounded-md px-3 py-2 bg-gray-100 dark:bg-zinc-800 transition"
              value={form.email}
              onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
              required
            />
            <PasswordInput
              placeholder="Enter your password"
              value={form.password}
              onChange={e => setForm(f => ({ ...f, password: e.target.value }))}
              required
            />
            <button type="submit" className="btn btn-primary w-full text-base shadow-md hover:shadow-lg hover:bg-indigo-700 active:bg-indigo-800 transition min-h-[46px] py-2.5">
              {isSignIn ? "Sign In" : "Sign Up"}
            </button>
            <button
              type="button"
              className="text-[0.9rem] text-blue-600 dark:text-blue-400 hover:underline mt-1"
              onClick={() => setIsSignIn(s => !s)}
            >
              {isSignIn ? "Don't have an account? Sign Up" : "Already have an account? Sign In"}
            </button>
            {error && <div className="text-red-500 text-xs mt-2 text-center">{error}</div>}
          </form>
          <div className="flex items-center my-4 w-full">
            <div className="flex-1 h-px bg-gray-200 dark:bg-zinc-700"></div>
            <span className="mx-2 text-gray-400 dark:text-gray-500 text-xs">OR CONTINUE WITH</span>
            <div className="flex-1 h-px bg-gray-200 dark:bg-zinc-700"></div>
          </div>
          <GitHubButton />
        </div>
      </div>
    </div>
  );
}
