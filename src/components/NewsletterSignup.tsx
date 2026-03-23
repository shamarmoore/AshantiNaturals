"use client";

import { useState, FormEvent } from "react";

export default function NewsletterSignup() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const validateEmail = (email: string): boolean => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setErrorMessage("");

    if (!email.trim()) {
      setErrorMessage("Please enter your email address.");
      setStatus("error");
      return;
    }

    if (!validateEmail(email)) {
      setErrorMessage("Please enter a valid email address.");
      setStatus("error");
      return;
    }

    setStatus("loading");

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1200));
    setStatus("success");
    setEmail("");
  };

  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-stone-800 via-stone-800 to-amber-900">
      <div className="max-w-3xl mx-auto text-center">
        {/* Decorative element */}
        <div className="flex justify-center mb-6">
          <svg className="w-10 h-10 text-amber-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1.5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
          </svg>
        </div>

        <h2 className="font-serif text-3xl sm:text-4xl font-bold text-white mb-3">
          Join the Ashanti Family
        </h2>
        <p className="text-stone-300 mb-8 max-w-xl mx-auto leading-relaxed">
          Subscribe for exclusive deals, new arrival alerts, styling tips, and early access to sales. 
          Be the first to know — straight to your inbox.
        </p>

        {status === "success" ? (
          <div className="bg-green-900/30 border border-green-700/50 rounded-xl p-6 max-w-md mx-auto animate-fade-in">
            <svg className="w-12 h-12 text-green-400 mx-auto mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <h3 className="text-green-300 font-semibold text-lg mb-1">You&apos;re In!</h3>
            <p className="text-green-400/80 text-sm">
              Welcome to the family. Check your inbox for a special welcome offer.
            </p>
            <button
              onClick={() => setStatus("idle")}
              className="mt-4 text-sm text-stone-400 hover:text-white underline transition-colors cursor-pointer"
            >
              Subscribe another email
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="max-w-md mx-auto" noValidate>
            <div className="flex flex-col sm:flex-row gap-3">
              <div className="flex-1 relative">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    if (status === "error") {
                      setStatus("idle");
                      setErrorMessage("");
                    }
                  }}
                  placeholder="Enter your email"
                  aria-label="Email address"
                  className={`w-full px-4 py-3 rounded-xl bg-white/10 border text-white placeholder-stone-400
                             focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent
                             transition-all duration-200
                             ${status === "error" ? "border-red-500" : "border-stone-600"}`}
                  disabled={status === "loading"}
                />
              </div>
              <button
                type="submit"
                disabled={status === "loading"}
                className="px-6 py-3 bg-amber-600 text-white font-semibold rounded-xl
                           hover:bg-amber-500 transition-all duration-200 shadow-lg hover:shadow-amber-600/25
                           disabled:opacity-70 disabled:cursor-not-allowed cursor-pointer
                           flex items-center justify-center gap-2 min-w-[140px]"
              >
                {status === "loading" ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    Signing up...
                  </>
                ) : (
                  "Subscribe"
                )}
              </button>
            </div>

            {status === "error" && errorMessage && (
              <p className="text-red-400 text-sm mt-2 text-left">{errorMessage}</p>
            )}

            <p className="text-stone-500 text-xs mt-4">
              No spam, ever. Unsubscribe anytime. We respect your privacy.
            </p>
          </form>
        )}
      </div>
    </section>
  );
}
