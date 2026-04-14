"use client";

import { useState } from "react";

export default function NewsletterSection() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!email.trim()) return;
    setSubmitted(true);
    setEmail("");
  };

  return (
    <div className="w-full bg-gray-50 border-b border-gray-200 py-12 px-6">
      <div className="max-w-7xl mx-auto flex flex-col items-center text-center gap-4">
        <h2 className="text-2xl sm:text-4xl font-semibold text-text-heading">
          Stay Updated
        </h2>
        <p className="text-sm sm:text-base font-normal text-text-muted max-w-sm leading-relaxed">
          Subscribe to receive notifications about new inventory and special
          offers.
        </p>

        {submitted ? (
          <p className="text-sm font-medium text-green-600">
            Thank you for subscribing!
          </p>
        ) : (
          <form
            onSubmit={handleSubmit}
            className="flex items-center gap-2 w-full max-w-sm"
          >
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email address"
              className="flex-1 h-9 rounded-md border border-gray-200 bg-white px-3 text-sm text-gray-700 placeholder:text-gray-400 outline-none focus:border-brand focus:ring-1 focus:ring-brand transition"
            />
            <button
              type="submit"
              className="h-9 px-5 rounded-md bg-brand text-white text-sm font-semibold hover:bg-brand-hover transition-colors duration-150 shrink-0"
            >
              Subscribe
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
