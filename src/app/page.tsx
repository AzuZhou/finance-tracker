import TransactionCards from "@/components/TransactionCards";

import { generateTransactions } from "../lib/generateTransactions";

export default function Home() {
  return (
    <main className="font-sans flex flex-col items-center justify-items-center min-h-screen p-8  gap-16 sm:p-20">
      <TransactionCards transactions={generateTransactions()} />
    </main>
  );
}
