import Link from "next/link";

interface Props {
  mobile?: boolean;
  onClose?: () => void;
}

export default function AuthButtons({ mobile, onClose }: Props) {
  if (mobile) {
    return (
      <div className="flex flex-col gap-3">
        <Link
          href="/login"
          onClick={onClose}
          className="flex items-center justify-center rounded-xl bg-[#970747] py-3 font-semibold text-white"
        >
          Login
        </Link>

        <Link
          href="/login?tab=signup"
          onClick={onClose}
          className="rounded-xl border border-[#970747] py-3 text-center font-semibold text-[#970747]"
        >
          Sign Up
        </Link>
      </div>
    );
  }

  return (
    <div className="flex items-center gap-3">
      <Link
        href="/login"
        className="rounded-xl border border-[#970747] px-4 py-2 text-sm font-semibold text-[#970747]"
      >
        Login
      </Link>

      <Link
        href="/login?tab=signup"
        className="rounded-xl bg-[#970747] px-4 py-2 text-sm font-semibold text-white"
      >
        Sign Up
      </Link>
    </div>
  );
}
