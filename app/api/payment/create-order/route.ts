import { NextResponse } from "next/server";

export async function POST() {
  return NextResponse.json({
    keyId: process.env.RAZORPAY_KEY_ID ?? "NOT_FOUND",
    keySecret: process.env.RAZORPAY_KEY_SECRET ? "FOUND" : "NOT_FOUND",
    publicKey: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID ?? "NOT_FOUND",
  });
}
