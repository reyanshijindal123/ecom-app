import { useState } from "react";
import AddressForm, { Address } from "./AddressForm";

const emptyAddress: Address = {
  fullName: "",
  phone: "",
  address: "",
  city: "",
  state: "",
  pincode: "",
  country: "",
};

export default function CheckoutAddresses() {
  const [shipping, setShipping] = useState<Address>(emptyAddress);

  const [billing, setBilling] = useState<Address>(emptyAddress);

  const [sameAddress, setSameAddress] = useState(true);

  const updateShipping = (field: keyof Address, value: string) => {
    setShipping((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const updateBilling = (field: keyof Address, value: string) => {
    setBilling((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSubmit = () => {
    const payload = {
      shippingAddress: shipping,
      billingAddress: sameAddress ? shipping : billing,
    };

    console.log(payload);
  };

  return (
    <div className="mx-auto max-w-5xl space-y-6 p-4 lg:p-8">
      <AddressForm
        title="Shipping Address"
        data={shipping}
        onChange={updateShipping}
      />

      <div className="rounded-xl border bg-white p-5 shadow-sm">
        <label className="flex cursor-pointer items-center gap-3">
          <input
            type="checkbox"
            checked={sameAddress}
            onChange={(e) => setSameAddress(e.target.checked)}
            className="h-5 w-5 accent-blue-600"
          />

          <span className="text-sm font-medium">
            Billing address is same as shipping address
          </span>
        </label>
      </div>

      {!sameAddress && (
        <AddressForm
          title="Billing Address"
          data={billing}
          onChange={updateBilling}
        />
      )}

      <button
        onClick={handleSubmit}
        className="w-full rounded-xl bg-blue-600 py-4 font-semibold text-white transition hover:bg-blue-700"
      >
        Continue
      </button>
    </div>
  );
}
