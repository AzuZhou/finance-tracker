import Transactions from "@/components/transactions/Transactions";
import Balance from "@/components/Balance";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center gap-10 p-4 font-sans">
      <Balance />

      <Transactions />
    </main>
  );
}
