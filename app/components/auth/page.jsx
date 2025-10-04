'use client'
import { useState } from "react";
import { auth, provider } from "@/lib/firebase";
import { signInWithPopup, signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut } from "firebase/auth";
import { FcGoogle } from "react-icons/fc";

export default function AuthPage() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [isLogin, setIsLogin] = useState(true);
  const [error, setError] = useState("");

  const handleInput = e => setForm(f => ({ ...f, [e.target.name]: e.target.value }));

  async function handleEmailAuth(e) {
    e.preventDefault();
    setError("");
    try {
      if (isLogin) {
        await signInWithEmailAndPassword(auth, form.email, form.password);
      } else {
        await createUserWithEmailAndPassword(auth, form.email, form.password);
      }
      // optional: redirect to dashboard
      window.location.href = "/components/dashboard";
    } catch (err) {
      setError(err.message);
    }
  }

  async function handleGoogleSignIn() {
    setError("");
    try {
      await signInWithPopup(auth, provider);
      window.location.href = "/components/dashboard";
    } catch (err) {
      setError(err.message);
    }
  }

  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-900 to-emerald-700">
      <div className="bg-white/90 rounded-3xl p-8 max-w-sm w-full shadow-xl">
        <h2 className="text-2xl font-bold mb-6">{isLogin ? "Sign In" : "Sign Up"}</h2>
        {error && <div className="text-red-600 mb-2 text-sm">{error}</div>}
        <form onSubmit={handleEmailAuth} className="space-y-4">
          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleInput}
            placeholder="Email"
            required
            className="w-full p-3 rounded-xl border bg-white"
          />
          <input
            type="password"
            name="password"
            value={form.password}
            onChange={handleInput}
            placeholder="Password"
            required
            className="w-full p-3 rounded-xl border bg-white"
          />
          <button
            type="submit"
            className="w-full bg-emerald-600 text-white font-semibold py-3 rounded-xl hover:bg-emerald-700 transition"
          >
            {isLogin ? "Sign In" : "Sign Up"}
          </button>
        </form>

        <div className="my-4 text-center text-gray-400">or</div>
        <button
          onClick={handleGoogleSignIn}
          className="w-full flex items-center justify-center gap-2 border py-3 rounded-xl bg-white hover:bg-gray-100 transition font-semibold"
        >
          <FcGoogle className="text-2xl" />
          Continue with Google
        </button>
        
        <div className="mt-4 text-center text-sm">
          {isLogin ? (
            <>Don't have an account? <button onClick={() => setIsLogin(false)} className="text-emerald-600 font-semibold">Sign Up</button></>
          ) : (
            <>Already have an account? <button onClick={() => setIsLogin(true)} className="text-emerald-600 font-semibold">Log In</button></>
          )}
        </div>
      </div>
    </main>
  );
}
