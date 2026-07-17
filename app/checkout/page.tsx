"use client";

import { useEffect, useState } from "react";

import ProtectedRoute from "@/components/ProtectedRoute";
import Stepper from "@/components/checkout/Stepper";
import AddressStep from "@/components/checkout/AddressStep";
import PaymentRow from "@/components/checkout/PaymentRow";
import PriceSummary from "@/components/checkout/PriceSummary";
import OrderPreview from "@/components/checkout/OrderPreview";
import SuccessScreen from "@/components/checkout/SuccessScreen";

import { useCartStore, useAuthStore, useOrderStore } from "@/store";

import { Step, AddressForm } from "@/types/checkout";

import { cn } from "@/lib/utils";
import { getAddressFromPincode } from "@/lib/pincode";
import { card, text, layout, btn } from "@/lib/styles";
import { Package,CreditCard,Smartphone} from "lucide-react";

const PAYMENT_METHODS = [
  {
    id: "cod",
    label: "Cash on Delivery",
    desc: "Pay with cash upon delivery",
    icon: Package
  },
  {
    id: "card",
    label: "Credit / Debit Card",
    desc: "Pay using card details",
    icon: CreditCard
  },
  {
    id: "upi",
    label: "UPI",
    desc: "Pay using UPI",
    icon: Smartphone
  }
];

function CheckoutContent() {
  const { items, totalPrice, totalItems, clearCart } = useCartStore();

  const { user } = useAuthStore();

  const { placeOrder } = useOrderStore();

  const [step, setStep] = useState<Step>("address");

  const [payMethod, setPayMethod] = useState("cod");

  const [placedOrderId, setPlacedOrderId] = useState("");

  const [address, setAddress] = useState<AddressForm>({
    fullName:
      `${user?.name?.firstname ?? ""} ${user?.name?.lastname ?? ""}`.trim(),
    phone: "",
    line1: "",
    line2: "",
    city: "",
    state: "",
    pincode: "",
  });

  useEffect(() => {
    if (address.pincode.length !== 6) return;

    getAddressFromPincode(address.pincode).then((data) => {
      if (data) {
        setAddress((prev) => ({
          ...prev,
          city: data.city,
          state: data.state,
        }));
      }
    });
  }, [address.pincode]);

  const subtotal = totalPrice() * 83;

  const savings = subtotal * 0.23;

  const discounted = subtotal - savings;

  const shippingCost = discounted > 3999 ? 0 : 99;

  const tax = discounted * 0.18;

  const grand = discounted + shippingCost + tax;

  const place = () => {
    const id = Date.now().toString();

   placeOrder({
  id: crypto.randomUUID(),

  orderDate: new Date().toLocaleDateString("en-IN"),

  estimatedDelivery: new Date(
    Date.now() + 5 * 24 * 60 * 60 * 1000
  ).toLocaleDateString("en-IN"),

  status: "Processing",

  paymentMethod: payMethod,

  paymentStatus: "Paid",

  subtotal: discounted,

  shipping: shippingCost,

  tax,

  total: grand,

  address: {
    name: address.fullName,
    phone: address.phone,
    street: `${address.line1} ${address.line2}`,
    city: address.city,
    state: address.state,
    pincode: address.pincode,
  },

  items: items.map((item) => ({
    id: item.id,
    title: item.title,
    image: item.image,
    price: item.price,
    quantity: item.quantity,
    category: item.category,
    size: item.size|| undefined,
  })),
});
    clearCart();

    setPlacedOrderId(id);

    setStep("success");
  };

  if (step === "success")
    return <SuccessScreen orderId={placedOrderId} total={grand} />;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
      <div className="lg:col-span-3 space-y-5">
        <Stepper current={step} />

        {step === "address" && (
          <AddressStep
            value={address}
            onChange={setAddress}
            onNext={() => setStep("payment")}
          />
        )}

        {step === "payment" && (
          <div className={cn(card.base, card.p.md, "space-y-4")}>
            <h3 className={text.cardTitle}>Choose Payment Method</h3>

            {PAYMENT_METHODS.map((method) => (
              <PaymentRow
                key={method.id}
                method={method}
                selected={payMethod === method.id}
                onSelect={() => setPayMethod(method.id)}
              />
            ))}

            <OrderPreview items={items} />

            <div className="flex gap-3">
              <button
                onClick={() => setStep("address")}
                className={cn(btn.outline, btn.md)}
              >
                Back
              </button>

              <button onClick={place} className={cn(btn.primary, "flex-1")}>
                Place Order
              </button>
            </div>
          </div>
        )}
      </div>

      <div className="lg:col-span-2">
        <PriceSummary
          subtotal={subtotal}
          shippingCost={shippingCost}
          tax={tax}
          grand={grand}
          totalItems={totalItems()}
          savings={savings}
        />
      </div>
    </div>
  );
}

export default function CheckoutPage() {
  return (
    <ProtectedRoute>
      <div className={layout.narrow}>
        <h1 className={cn(text.pageTitle, "mb-6")}>Checkout</h1>

        <CheckoutContent />
      </div>
    </ProtectedRoute>
  );
}
