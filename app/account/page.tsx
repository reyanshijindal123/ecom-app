import { Package, Heart, MapPin, ShoppingCart } from "lucide-react";

export default function AccountPage() {
  return (
    <div className="space-y-8">

      {/* Welcome Card */}
      <div className="bg-gradient-to-r from-[#970747] to-pink-500 rounded-2xl text-white p-8 shadow-lg">
        <h2 className="text-3xl font-bold">
          Welcome Back 
        </h2>

        <p className="mt-2 opacity-90">
          Manage your account, orders and settings.
        </p>
      </div>

      {/* Stats */}

      <div className="grid grid-cols-2 md:grid-cols-4 gap-5">

        <div className="bg-white rounded-2xl border shadow-sm p-6 hover:shadow-lg transition">
          <Package className="text-[#970747]" />
          <p className="mt-3 text-gray-500">Orders</p>
          <h2 className="text-3xl font-bold">12</h2>
        </div>

        <div className="bg-white rounded-2xl border shadow-sm p-6 hover:shadow-lg transition">
          <Heart className="text-[#970747]" />
          <p className="mt-3 text-gray-500">Wishlist</p>
          <h2 className="text-3xl font-bold">8</h2>
        </div>

        <div className="bg-white rounded-2xl border shadow-sm p-6 hover:shadow-lg transition">
          <MapPin className="text-[#970747]" />
          <p className="mt-3 text-gray-500">Addresses</p>
          <h2 className="text-3xl font-bold">2</h2>
        </div>

        <div className="bg-white rounded-2xl border shadow-sm p-6 hover:shadow-lg transition">
          <ShoppingCart className="text-[#970747]" />
          <p className="mt-3 text-gray-500">Cart</p>
          <h2 className="text-3xl font-bold">3</h2>
        </div>

      </div>

      {/* Recent Orders */}

      {/* <div className="bg-white rounded-2xl border shadow-sm p-6">

        <h2 className="text-2xl font-bold mb-6">
          Recent Orders
        </h2>

        <div className="space-y-4">

          <div className="flex justify-between items-center border rounded-xl p-4">

            <div>
              <h3 className="font-semibold">
                Order #12345
              </h3>

              <p className="text-sm text-green-600">
                Delivered
              </p>

            </div>

            <p className="font-bold">
              ₹999
            </p>

          </div>

          <div className="flex justify-between items-center border rounded-xl p-4">

            <div>
              <h3 className="font-semibold">
                Order #12346
              </h3>

              <p className="text-sm text-orange-500">
                Processing
              </p>

            </div>

            <p className="font-bold">
              ₹599
            </p>

          </div>

        </div>

      </div> */}

    </div>
  );
}