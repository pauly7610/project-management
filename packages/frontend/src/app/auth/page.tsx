"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";

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
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="flex flex-col md:flex-row gap-8 max-w-4xl w-full p-6">
        {/* Left: Features */}
        <div className="flex-1 flex flex-col justify-center items-center gap-6 bg-white rounded-xl shadow p-8">
          <h1 className="text-3xl font-bold mb-2">Motion Magic</h1>
          <p className="mb-6 text-gray-600 text-center">Your all-in-one productivity solution for individuals and teams</p>
          <div className="grid grid-cols-2 gap-4 w-full">
            {features.map((f) => (
              <div key={f.title} className="bg-gray-100 rounded-lg p-4 flex flex-col items-center">
                <span className="text-3xl mb-2">{f.icon}</span>
                <span className="font-semibold">{f.title}</span>
                <span className="text-xs text-gray-500 text-center">{f.desc}</span>
              </div>
            ))}
          </div>
        </div>
        {/* Right: Auth Form */}
        <div className="flex-1 flex flex-col justify-center items-center bg-white rounded-xl shadow p-8">
          <div className="flex flex-col items-center mb-6">
            <span className="text-3xl">✨</span>
            <h2 className="text-xl font-semibold mt-2 mb-1">{isSignIn ? "Welcome back" : "Create your account"}</h2>
            <p className="text-gray-500 text-sm">{isSignIn ? "Sign in to continue your productivity journey" : "Sign up to get started with Motion Magic"}</p>
          </div>
          <form className="w-full max-w-xs flex flex-col gap-4" onSubmit={handleSubmit}>
            {!isSignIn && (
              <input
                type="text"
                placeholder="Enter your name"
                className="input input-bordered"
                value={form.name}
                onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
                required
              />
            )}
            <input
              type="email"
              placeholder="Enter your email"
              className="input input-bordered"
              value={form.email}
              onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
              required
            />
            <input
              type="password"
              placeholder="Enter your password"
              className="input input-bordered"
              value={form.password}
              onChange={e => setForm(f => ({ ...f, password: e.target.value }))}
              required
            />
            <button type="submit" className="btn btn-primary w-full">
              {isSignIn ? "Sign In" : "Sign Up"}
            </button>
            <button
              type="button"
              className="text-xs text-blue-600 hover:underline mt-1"
              onClick={() => setIsSignIn(s => !s)}
            >
              {isSignIn ? "Don't have an account? Sign Up" : "Already have an account? Sign In"}
            </button>
            {error && <div className="text-red-500 text-xs mt-2 text-center">{error}</div>}
          </form>
          <div className="flex items-center my-4 w-full">
            <div className="flex-1 h-px bg-gray-200"></div>
            <span className="mx-2 text-gray-400 text-xs">OR CONTINUE WITH</span>
            <div className="flex-1 h-px bg-gray-200"></div>
          </div>
          <button className="btn w-full bg-gray-100 text-gray-700 border border-gray-300" disabled>
            <span className="mr-2">🐙</span> Continue with GitHub
          </button>
        </div>
      </div>
    </div>
  );
}
