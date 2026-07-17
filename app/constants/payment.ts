import {
  Smartphone,
  CreditCard,
  Building,
  Wallet,
  Package,
} from "lucide-react";

export const PAYMENT_METHODS = [
  {
    id: "upi",
    icon: Smartphone,
    label: "UPI",
    desc: "PhonePe, GPay, Paytm & more",
  },

  {
    id: "card",
    icon: CreditCard,
    label: "Credit / Debit",
    desc: "Visa, Mastercard, RuPay",
  },

  {
    id: "netbanking",
    icon: Building,
    label: "Net Banking",
    desc: "All major banks supported",
  },

  {
    id: "wallet",
    icon: Wallet,
    label: "Wallets",
    desc: "Paytm, Amazon Pay, Mobikwik",
  },

  {
    id: "cod",
    icon: Package,
    label: "Cash on Delivery",
    desc: "Pay when you receive",
  },
];
