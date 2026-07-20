"use client";

export default function RazorpayButton() {
  const handlePayment = async () => {
    try {
      console.log("Payment started");

      const res = await fetch("/api/payment/create-order", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          amount: 500,
        }),
      });

      const order = await res.json();

      console.log("Order Data:", order);

      const options = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,

        amount: order.amount,

        currency: order.currency,

        name: "VelvetStore",

        description: "Order Payment",

        order_id: order.id,

        handler: async function (response: any) {
          console.log("Payment Response:", response);

          try {
            const verifyRes = await fetch("/api/payment/verify-payment", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                razorpay_order_id: response.razorpay_order_id,
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_signature: response.razorpay_signature,
              }),
            });

            const verifyData = await verifyRes.json();

            console.log("Verification Response:", verifyData);

            if (verifyData.success) {
              alert("✅ Payment Verified Successfully");
            } else {
              alert("❌ Payment Verification Failed");
            }
          } catch (error) {
            console.error("Verification Error:", error);
            alert("Something went wrong while verifying payment.");
          }
        },

        theme: {
          color: "#970747",
        },
      };

      const razorpay = new (window as any).Razorpay(options);
      razorpay.on("payment.failed", function (response: any) {
        console.log("Payment Failed:", response.error);

        alert("Payment Failed!");
      });

      razorpay.open();
    } catch (error) {
      console.log("Payment Error:", error);
    }
  };

  return (
    <button
      onClick={handlePayment}
      className="
      bg-[#970747]
      text-white
      px-6
      py-3
      rounded-xl
      "
    >
      Pay Now
    </button>
  );
}
