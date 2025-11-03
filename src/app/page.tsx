import { auth } from "@clerk/nextjs/server";
import Link from "next/link";
import { redirect } from "next/navigation";

import MainToggle from "@/components/MainToggle";

export default async function Home() {
  const { userId } = await auth();

  if (userId) {
    redirect("/dashboard");
  }

  return (
    <div className="mt-18 flex w-full max-w-sm flex-col items-center gap-8">
      <div className="flex w-full flex-col justify-start gap-4">
        <h1 className="text-5xl font-bold text-[var(--primary-color)]">FN</h1>
        <h2 className="text-2xl text-[var(--text-color)]">Your Personal Finance Manager</h2>
      </div>

      <MainToggle />

      <p className="text-center text-xs text-[var(--text-muted)]">
        Demo mode uses mock data for testing. Live mode requires an account and enables real money
        transactions.
      </p>

      <p className="text-sm text-[var(--text-color)]">
        Already have an account?{" "}
        <Link
          href="/sign-in"
          className="font-medium text-[var(--text-color)] underline transition-colors duration-100 hover:text-[var(--primary-color)] focus:text-[var(--primary-color)]"
        >
          Sign in
        </Link>
      </p>
    </div>
  );
}
