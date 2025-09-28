import Balance from "@/components/Balance";
import Transactions from "@/components/transactions/Transactions";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center gap-10 p-4 font-sans">
      <Balance />

      <Transactions />
    </main>
  );
}
