"use client";

import { Truck } from "lucide-react";

import { cn } from "@/lib/utils";

import { btn, card, input, text } from "@/lib/styles";

import { AddressForm } from "@/types/checkout";

function Field({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label className={input.label}>{label}</label>

      {children}
    </div>
  );
}

export default function AddressStep({
  value,
  onChange,
  onNext,
}: {
  value: AddressForm;

  onChange: (v: AddressForm) => void;

  onNext: () => void;
}) {
  const set =
    (key: keyof AddressForm) => (e: React.ChangeEvent<HTMLInputElement>) => {
      onChange({
        ...value,

        [key]: e.target.value,
      });
    };

  return (
    <div className={cn(card.base, card.p.md, "space-y-4")}>
      <h3 className={cn(text.cardTitle, "flex items-center gap-2")}>
        <Truck size={15} className="text-[#970747]" />
        Shipping Address
      </h3>

      <div
        className="
grid grid-cols-1 
sm:grid-cols-2 gap-3
"
      >
        <Field label="Full Name">
          <input
            className={input.base}
            value={value.fullName}
            onChange={set("fullName")}
            placeholder="Rahul Sharma"
          />
        </Field>

        <Field label="Phone Number">
          <input
            className={input.base}
            value={value.phone}
            onChange={set("phone")}
            placeholder="+91 98765 43210"
          />
        </Field>

        <div className="sm:col-span-2">
          <Field label="Address Line 1">
            <input
              className={input.base}
              value={value.line1}
              onChange={set("line1")}
              placeholder="House / Flat No., Street Name"
            />
          </Field>
        </div>

        <div className="sm:col-span-2">
          <Field label="Address Line 2 (Optional)">
            <input
              className={input.base}
              value={value.line2}
              onChange={set("line2")}
              placeholder="Area, Landmark"
            />
          </Field>
        </div>

        <Field label="City">
          <input
            className={input.base}
            value={value.city}
            readOnly
            placeholder="City"
          />
        </Field>

        <Field label="State">
          <input
            className={input.base}
            value={value.state}
            readOnly
            placeholder="State"
          />
        </Field>

        <Field label="PIN Code">
          <input
            className={input.base}
            value={value.pincode}
            onChange={set("pincode")}
            placeholder="400001"
            maxLength={6}
            inputMode="numeric"
          />
        </Field>
      </div>

      <button onClick={onNext} className={cn(btn.primary, btn.full)}>
        Continue to Payment
      </button>
    </div>
  );
}
