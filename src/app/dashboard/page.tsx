import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

import Balance from "@/components/Balance";
import Transactions from "@/components/transactions/Transactions";

const Dashboard = async () => {
  const { userId } = await auth();

  if (!userId) {
    redirect("/sign-in");
  }

  return (
    <>
      <Balance />
      <Transactions />
    </>
  );
};

export default Dashboard;
