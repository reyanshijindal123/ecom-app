import React from "react";

export interface Address {
  fullName: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  pincode: string;
  country: string;
}

interface Props {
  title: string;
  data: Address;
  onChange: (field: keyof Address, value: string) => void;
}

const fields: {
  key: keyof Address;
  label: string;
  type?: string;
}[] = [
  { key: "fullName", label: "Full Name" },
  { key: "phone", label: "Phone", type: "tel" },
  { key: "address", label: "Address" },
  { key: "city", label: "City" },
  { key: "state", label: "State" },
  { key: "pincode", label: "Pincode" },
  { key: "country", label: "Country" },
];

const AddressForm = ({ title, data, onChange }: Props) => {
  return (
    <div className="rounded-xl border bg-white p-6 shadow-sm">
      <h2 className="mb-5 text-xl font-semibold">{title}</h2>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        {fields.map((field) => (
          <div
            key={field.key}
            className={field.key === "address" ? "md:col-span-2" : ""}
          >
            <label className="mb-2 block text-sm font-medium">
              {field.label}
            </label>

            <input
              type={field.type || "text"}
              value={data[field.key]}
              onChange={(e) => onChange(field.key, e.target.value)}
              className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default AddressForm;
