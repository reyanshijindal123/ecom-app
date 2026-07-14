import Link from "next/link";
import {
  ShoppingBag,
  Phone,
  Mail,
  MapPin,
  Clock,

} from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-black text-white w-full mt-20">
      <div className="max-w-7xl mx-auto px-8 py-16">

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-14">

          {/* Logo */}
          <div>

            <div className="flex items-center gap-4 mb-8">

              <div className="w-14 h-14 rounded-full bg-pink-600 flex items-center justify-center">
                <ShoppingBag size={28}/>
              </div>

              <h2 className="text-4xl font-bold">
                <span className="text-pink-500">Velvet</span>
                <span className="text-pink-500">Store</span>
              </h2>

            </div>

            <p className="text-gray-400 leading-9 text-lg max-w-xs">
              Curated fashion for the bold.
              <br />
              Discover premium fashion,
              <br />
              electronics and jewellery
              <br />
              with a seamless shopping
              <br />
              experience.
            </p>

           

          </div>

          {/* Navigation */}

          <div>

            <h3 className="text-2xl font-semibold mb-8 uppercase">
              Navigation
            </h3>

            <ul className="space-y-5">

              <li><Link href="/">Home</Link></li>

              <li><Link href="/products">All Products</Link></li>

              <li><Link href="/products?category=men's+clothing">Men's Clothing</Link></li>

              <li><Link href="/products?category=women's+clothing">Women's Clothing</Link></li>

              <li><Link href="/products?category=electronics">Electronics</Link></li>

              <li><Link href="/products?category=jewelery">Jewellery</Link></li>

            </ul>

          </div>

          {/* Contact */}

          <div>

            <h3 className="text-2xl font-semibold mb-8 uppercase">
              Contact
            </h3>

            <div className="space-y-6">

              <div className="flex gap-4">
                <Phone className="text-pink-500"/>
                <span className="text-gray-400">
                  +91 98765 43210
                </span>
              </div>

              <div className="flex gap-4">
                <Mail className="text-pink-500"/>
                <span className="text-gray-400">
                  support@velvetstore.com
                </span>
              </div>

              <div className="flex gap-4">
                <MapPin className="text-pink-500"/>
                <span className="text-gray-400">
                  New Delhi,
                  <br/>
                  India
                </span>
              </div>

            </div>

          </div>

          {/* Hours */}

          <div>

            <h3 className="text-2xl font-semibold mb-8 uppercase">
              Opening Hours
            </h3>

            <div className="space-y-6">

              <div className="flex gap-4">
                <Clock className="text-pink-500"/>
                <span className="text-gray-400">
                  Mon - Thu : 9:00 AM - 9:00 PM
                </span>
              </div>

              <div className="flex gap-4">
                <Clock className="text-pink-500"/>
                <span className="text-gray-400">
                  Fri : 8:00 AM - 9:00 PM
                </span>
              </div>

              <div className="flex gap-4">
                <Clock className="text-pink-500"/>
                <span className="text-gray-400">
                  Sat : 9:30 AM - 3:00 PM
                </span>
              </div>

              <div className="flex gap-4">
                <Clock className="text-pink-500"/>
                <span className="text-gray-400">
                  Sunday : Closed
                </span>
              </div>

            </div>

          </div>

        </div>

        <div className="border-t border-gray-800 mt-16 pt-4">

          <div className="flex justify-between flex-col md:flex-row gap-4">

            <p className="text-gray-500">
              © 2026 VelvetStore. All rights reserved.
            </p>

            <p className="text-gray-500">
              Powered by FakeStore API
              <span className="text-pink-500 mx-3">•</span>
              Built with Next.js
            </p>

          </div>

        </div>

      </div>
    </footer>
  );
}