"use client";

export default function TestPayment() {
  const createOrder = async () => {
    const res = await fetch("/api/payment/create-order", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        amount: 500,
      }),
    });

    const data = await res.json();

    console.log(data);
  };

  return (
    <div className="p-10">
      <button
        onClick={createOrder}
        className="bg-black text-white px-5 py-3 rounded"
      >
        Create Razorpay Order
      </button>
    </div>
  );
}
