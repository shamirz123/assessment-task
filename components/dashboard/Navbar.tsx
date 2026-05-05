"use client";

import { signOut } from "next-auth/react";
import Link from "next/link";
import { useState } from "react";

interface NavbarProps {
  userName: string;
}

export default function Navbar({ userName }: NavbarProps) {
  const [signingOut, setSigningOut] = useState(false);

  async function handleSignOut() {
    setSigningOut(true);
    await signOut({ callbackUrl: "/login" });
  }

  const initials = userName
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);

  return (
<nav className="sticky top-0 z-50 bg-white border-b border-gray-100 shadow-sm px-6 h-14 flex items-center justify-between animate-[slideDown_0.4s_ease_both]">
      <div className="flex items-center gap-4">
        <Link
          href="/dashboard"
          className="text-[1.05rem] font-extrabold tracking-tight text-gray-900 hover:text-blue-600 transition-colors duration-200"
        >
          ticktock
        </Link>

        <div className="w-px h-4 bg-gray-200" />

        <span className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-widest text-blue-600 bg-blue-50 border border-blue-100 px-3 py-1 rounded-full">
          <i className="fa-solid fa-clock text-[10px]" />
          Timesheets
        </span>
      </div>

      <div className="flex items-center gap-3">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-blue-700 flex items-center justify-center text-white text-xs font-bold tracking-wide shadow-md shadow-blue-200 shrink-0">
            {initials}
          </div>
          <span className="text-sm font-semibold text-gray-700">
            {userName}
          </span>
        </div>

        <div className="w-px h-5 bg-gray-200" />

        <button
          onClick={handleSignOut}
          disabled={signingOut}
          className="flex items-center gap-2 text-xs font-medium text-gray-400 hover:text-red-500 hover:bg-red-50 px-3 py-1.5 rounded-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {signingOut ? (
            <>
              <i className="fa-solid fa-spinner animate-spin text-[11px]" />
              Signing out...
            </>
          ) : (
            <>
              <i className="fa-solid fa-arrow-right-from-bracket text-[11px]" />
              Sign out
            </>
          )}
        </button>
      </div>
    </nav>
  );
}
