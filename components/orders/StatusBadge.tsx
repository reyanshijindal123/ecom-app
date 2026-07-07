interface StatusBadgeProps {
  status:
    | "processing"
    | "packed"
    | "shipped"
    | "out-for-delivery"
    | "delivered"
    | "cancelled";
}

export default function StatusBadge({ status }: StatusBadgeProps) {
  const styles = {
    processing: "bg-yellow-100 text-yellow-700",
    packed: "bg-orange-100 text-orange-700",
    shipped: "bg-blue-100 text-blue-700",
    "out-for-delivery": "bg-purple-100 text-purple-700",
    delivered: "bg-green-100 text-green-700",
    cancelled: "bg-red-100 text-red-700",
  };

  const labels = {
    processing: "Processing",
    packed: "Packed",
    shipped: "Shipped",
    "out-for-delivery": "Out for Delivery",
    delivered: "Delivered",
    cancelled: "Cancelled",
  };

  return (
    <span
      className={`inline-flex items-center rounded-full px-3 py-1 text-sm font-semibold ${styles[status]}`}
    >
      {labels[status]}
    </span>
  );
}