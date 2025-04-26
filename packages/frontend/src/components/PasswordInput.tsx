import React, { useState } from "react";

export function PasswordInput({ value, onChange, ...props }: React.InputHTMLAttributes<HTMLInputElement>) {
  const [show, setShow] = useState(false);
  return (
    <div className="relative w-full">
      <input
        type={show ? "text" : "password"}
        value={value}
        onChange={onChange}
        className="input input-bordered border border-gray-300 dark:border-zinc-600 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 dark:focus:ring-indigo-400 shadow-sm text-lg rounded-md px-3 py-2 bg-gray-100 dark:bg-zinc-800 transition w-full pr-11 box-border"
        style={{ lineHeight: 1.5 }}
        {...props}
      />
      <button
        type="button"
        tabIndex={-1}
        className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 focus:outline-none"
        onClick={() => setShow((v) => !v)}
        aria-label={show ? "Hide password" : "Show password"}
        style={{ height: '28px' }}
      >
        {show ? (
          // Eye open
          <svg width="22" height="22" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-.23.747-.548 1.47-.942 2.142" /></svg>
        ) : (
          // Eye closed
          <svg width="22" height="22" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.542-7a9.973 9.973 0 012.042-3.292m3.087-2.594A9.956 9.956 0 0112 5c4.478 0 8.268 2.943 9.542 7a9.973 9.973 0 01-1.357 2.572M15 12a3 3 0 11-6 0 3 3 0 016 0zm6 6l-6-6m0 0l-6-6" /></svg>
        )}
      </button>
    </div>
  );
}
