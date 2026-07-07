import {
  PackageCheck,
  Package,
  Truck,
  Bike,
  CheckCircle2,
} from "lucide-react";

interface Props {
  status:
    | "processing"
    | "packed"
    | "shipped"
    | "out-for-delivery"
    | "delivered"
    | "cancelled";
}

const steps = [
  {
    key: "processing",
    label: "Order Placed",
    icon: PackageCheck,
  },
  {
    key: "packed",
    label: "Packed",
    icon: Package,
  },
  {
    key: "shipped",
    label: "Shipped",
    icon: Truck,
  },
  {
    key: "out-for-delivery",
    label: "Out for Delivery",
    icon: Bike,
  },
  {
    key: "delivered",
    label: "Delivered",
    icon: CheckCircle2,
  },
];

const statusIndex = {
  processing: 0,
  packed: 1,
  shipped: 2,
  "out-for-delivery": 3,
  delivered: 4,
  cancelled: -1,
};

export default function OrderTimeline({ status }: Props) {
  const currentStep = statusIndex[status];

  if (status === "cancelled") {
    return (
      <div className="rounded-xl border border-red-200 bg-red-50 p-4 text-center">
        <p className="font-semibold text-red-600">
          ❌ This order has been cancelled.
        </p>
      </div>
    );
  }

  return (
    <div className="flex flex-wrap items-center justify-between gap-4">
      {steps.map((step, index) => {
        const Icon = step.icon;

        const completed = index <= currentStep;

        return (
          <div
            key={step.key}
            className="flex flex-1 min-w-[110px] items-center"
          >
            <div className="flex flex-col items-center flex-1">
              <div
                className={`flex h-12 w-12 items-center justify-center rounded-full transition
                  ${
                    completed
                      ? "bg-green-500 text-white"
                      : "bg-gray-200 text-gray-500"
                  }`}
              >
                <Icon size={22} />
              </div>

              <p
                className={`mt-2 text-center text-sm font-medium
                  ${
                    completed
                      ? "text-green-600"
                      : "text-gray-500"
                  }`}
              >
                {step.label}
              </p>
            </div>

            {index !== steps.length - 1 && (
              <div
                className={`h-1 flex-1 rounded
                  ${
                    index < currentStep
                      ? "bg-green-500"
                      : "bg-gray-300"
                  }`}
              />
            )}
          </div>
        );
      })}
    </div>
  );
}