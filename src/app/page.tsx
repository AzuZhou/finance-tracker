import Transactions from "@/components/transactions/Transactions";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-items-center gap-16 p-4 font-sans">
      <Transactions />
    </main>
  );
}
