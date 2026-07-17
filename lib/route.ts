import { NextResponse } from "next/server";

export async function POST() {
  return NextResponse.json({
    key: process.env.RAZORPAY_KEY_ID,
    secret: process.env.RAZORPAY_KEY_SECRET ? "FOUND" : "NOT FOUND",
    publicKey: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
  });
}
