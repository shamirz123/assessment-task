import { redirect } from "next/navigation";
import { auth } from "@/auth";
import LoginForm from "@/components/auth/LoginForm";

export default async function LoginPage() {
  const session = await auth();
  if (session) redirect("/dashboard");

  return (
    <div className="min-h-screen flex">
      <div className="w-full md:w-1/2 flex flex-col justify-center px-8 md:px-16 bg-white">
        <div className="max-w-sm w-full mx-auto">
          <h1 className="text-2xl font-semibold text-gray-900 mb-6">
            Welcome back
          </h1>
          <LoginForm />
        </div>
      </div>

      <div className="hidden md:flex w-1/2 bg-blue-600 flex-col justify-center items-start px-16">
        <h2 className="text-4xl font-bold text-white mb-4">ticktock</h2>
        <p className="text-blue-100 text-base leading-relaxed ">
          Introducing ticktock, our cutting-edge timesheet web application
          designed to revolutionize how you manage employee work hours. With
          ticktock, you can effortlessly track and monitor employee attendance
          and productivity from anywhere, anytime, using any internet-connected
          device.
        </p>
        <div className="mt-12 text-blue-200 text-sm">
          Demo credentials: john@example.com / password123
        </div>
      </div>
    </div>
  );
}
