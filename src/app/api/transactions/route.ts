import { NextResponse } from "next/server";

import generateTransactions from "@/lib/utils/generateTransactions";

export async function GET() {
  const transactions = generateTransactions();

  await new Promise((r) => setTimeout(r, 500));

  return NextResponse.json({ transactions });
}
