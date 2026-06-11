"use client";
import { useState } from "react";
import { Loader2, Lock } from "lucide-react";

export function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/auth", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      if (!res.ok) throw new Error("Invalid credentials");
      window.location.reload(); // Reload to show dashboard
    } catch (err) {
      setError("Invalid email or password");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-[85vh] bg-[#F8F8F7] flex items-center justify-center px-5 py-12">
      <div className="max-w-md w-full">
        <div className="mb-8 text-center">
          <div className="w-12 h-12 rounded-2xl mx-auto flex items-center justify-center mb-4" style={{ background: "rgba(61,84,118,0.1)", color: "#3D5476" }}>
            <Lock size={20} />
          </div>
          <h1 className="text-2xl sm:text-3xl font-black mb-2" style={{ color: "#232327" }}>
            Admin Login
          </h1>
          <p className="text-[13px]" style={{ color: "#9DA3AC" }}>
            Enter your admin credentials to access the Certificate Engine.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="card p-6 sm:p-8 space-y-4">
          {error && (
            <div className="p-3 rounded-lg text-sm bg-red-50 text-red-600 font-medium">
              {error}
            </div>
          )}
          <div>
            <label className="label">Email Address</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="input"
              placeholder="admin@beatband.in"
            />
          </div>
          <div>
            <label className="label">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="input"
              placeholder="••••••••"
            />
          </div>
          <button type="submit" disabled={loading} className="btn w-full justify-center py-2.5 mt-2">
            {loading ? <Loader2 size={16} className="animate-spin" /> : "Sign In"}
          </button>
        </form>
      </div>
    </main>
  );
}
