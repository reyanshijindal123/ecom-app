import { User, Package, MapPin, Heart, ShoppingBag, Home } from "lucide-react";

export const DESKTOP_MENU = [
  {
    href: "/account",
    icon: User,
    label: "My Account",
    desc: "Manage your profile",
  },
  {
    href: "/orders",
    icon: Package,
    label: "Orders",
    desc: "Track your orders",
  },
  {
    href: "/account/addresses",
    icon: MapPin,
    label: "Addresses",
    desc: "Manage delivery addresses",
  },
];

export const MOBILE_AUTH_LINKS = [
  {
    href: "/account",
    icon: User,
    label: "My Account",
  },
  {
    href: "/orders",
    icon: Package,
    label: "Orders",
  },
  {
    href: "/wishlist",
    icon: Heart,
    label: "Wishlist",
  },
  {
    href: "/account/addresses",
    icon: MapPin,
    label: "Addresses",
  },
];

export const MOBILE_GUEST_LINKS = [
  {
    href: "/",
    icon: Home,
    label: "Home",
  },
  {
    href: "/products",
    icon: ShoppingBag,
    label: "Shop Products",
  },
];
