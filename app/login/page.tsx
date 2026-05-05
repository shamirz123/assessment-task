import { redirect } from "next/navigation";
import { auth } from "@/auth";
import LoginForm from "@/components/auth/LoginForm";

export default async function LoginPage() {
  const session = await auth();
  if (session) redirect("/dashboard");

  return (
    <div className="min-h-screen flex">
      {/* Left panel */}
      <div className="w-full md:w-1/2 flex flex-col justify-center px-8 md:px-16 bg-white relative overflow-hidden">
        {/* Subtle background decoration */}
        <div className="absolute -top-24 -left-24 w-72 h-72 bg-blue-50 rounded-full opacity-60 blur-3xl pointer-events-none" />
        <div className="absolute -bottom-24 -right-10 w-64 h-64 bg-blue-50 rounded-full opacity-40 blur-3xl pointer-events-none" />

        <div className="max-w-sm w-full mx-auto relative z-10">
          {/* Logo mark — mobile only */}
          <div className="md:hidden mb-8 flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center">
              <i className="fa-solid fa-clock text-white text-xs" />
            </div>
            <span className="text-lg font-extrabold tracking-tight text-gray-900">
              ticktock
            </span>
          </div>

          <h1 className="text-2xl font-bold text-gray-900 mb-1">
            Welcome back
          </h1>
          <p className="text-sm text-gray-400 mb-7">
            Sign in to your account to continue
          </p>

          <LoginForm />
        </div>
      </div>

      {/* Right panel */}
      <div className="hidden md:flex w-1/2 relative overflow-hidden flex-col justify-center items-start px-16 bg-gradient-to-br from-blue-600 via-blue-600 to-blue-800">
        {/* Decorative circles */}
        <div className="absolute -top-20 -right-20 w-80 h-80 bg-white/5 rounded-full" />
        <div className="absolute top-1/2 -right-10 w-56 h-56 bg-white/5 rounded-full -translate-y-1/2" />
        <div className="absolute -bottom-16 left-10 w-64 h-64 bg-white/5 rounded-full" />

        <div className="relative z-10 ">
          {/* Logo */}
          <div className="flex items-center gap-3 mb-10">
            <div className="w-10 h-10 rounded-xl bg-white/15 backdrop-blur flex items-center justify-center">
              <i className="fa-solid fa-clock text-white text-sm" />
            </div>
            <h2 className="text-2xl font-extrabold text-white tracking-tight">
              ticktock
            </h2>
          </div>

          <h3 className="text-3xl font-bold text-white leading-snug mb-4">
            Manage your team&apos;s time effortlessly
          </h3>

          <p className="text-blue-200 text-sm leading-relaxed mb-10">
            Track and monitor employee attendance and productivity from
            anywhere, anytime, using any internet-connected device.
          </p>

          {/* Feature pills */}
          <div className="flex flex-col gap-3">
            {[
              { icon: "fa-chart-bar", text: "Real-time productivity tracking" },
              { icon: "fa-shield-halved", text: "Secure & role-based access" },
              { icon: "fa-clock-rotate-left", text: "Full timesheet history" },
            ].map((item) => (
              <div key={item.text} className="flex items-center gap-3">
                <div className="w-7 h-7 rounded-lg bg-white/15 flex items-center justify-center shrink-0">
                  <i
                    className={`fa-solid ${item.icon} text-white text-[11px]`}
                  />
                </div>
                <span className="text-blue-100 text-sm">{item.text}</span>
              </div>
            ))}
          </div>

          <div className="mt-10 pt-8 border-t border-white/10 text-blue-300 text-xs">
            Demo:dummy@example.com / password123
          </div>
        </div>
      </div>
    </div>
  );
}
