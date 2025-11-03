"use client";

import { Switch } from "@headlessui/react";
import Link from "next/link";
import { useState } from "react";

import Button from "@/components/ui/Button";

const MainToggle = () => {
  const [enabled, setEnabled] = useState(false);

  const choise = enabled
    ? { link: "/sign-up", buttonLabel: "Get the full-experience with Stripe integration" }
    : { link: "/demo", buttonLabel: "Nah, let me check it out first" };

  return (
    <div className="flex w-full max-w-sm flex-col gap-6">
      <div className="flex flex-col">
        <Switch
          checked={enabled}
          onChange={setEnabled}
          className="group relative inline-flex h-10 w-full items-center rounded-lg"
        >
          <span
            aria-hidden="true"
            className="h-full w-1/2 transform rounded-lg rounded-r-none bg-[var(--text-muted)] transition-all duration-300 ease-in-out group-data-checked:translate-x-full group-data-checked:rounded-l-none group-data-checked:rounded-r-lg"
          />

          <div className="pointer-events-none absolute inset-0 z-10 flex w-full justify-between rounded-lg border border-[var(--text-muted)]">
            <span
              className={`flex w-1/2 items-center justify-center bg-transparent text-sm font-medium transition-all duration-300 ${
                enabled ? "text-[var(--text-muted)]" : "text-[var(--background)]"
              }`}
            >
              Demo
            </span>

            <span
              className={`flex w-1/2 items-center justify-center bg-transparent text-sm font-medium transition-all duration-300 ${
                enabled ? "text-[var(--background)]" : "text-[var(--text-muted)]"
              }`}
            >
              Live
            </span>
          </div>
        </Switch>
      </div>

      <Link href={choise.link}>
        <Button>{choise.buttonLabel}</Button>
      </Link>
    </div>
  );
};
export default MainToggle;
