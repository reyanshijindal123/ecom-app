"use client";

import { useState, useEffect, useRef } from "react";
import { X, Rocket, Bell, CheckCircle } from "lucide-react";
import { btn, input, modal, iconChip, text } from "@/lib/styles";
import { cn } from "@/lib/utils";

interface ComingSoonModalProps {
  children: React.ReactNode;
  featureName?: string;
}

export function ComingSoonModal({
  children,
  featureName = "This feature",
}: ComingSoonModalProps) {
  const [open, setOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const scrollYRef = useRef(0);

  const valid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  useEffect(() => {
    if (open) {
      scrollYRef.current = window.scrollY;

      document.body.style.position = "fixed";
      document.body.style.top = `-${scrollYRef.current}px`;
      document.body.style.left = "0";
      document.body.style.right = "0";
      document.body.style.width = "100%";
    } else {
      document.body.style.position = "";
      document.body.style.top = "";
      document.body.style.left = "";
      document.body.style.right = "";
      document.body.style.width = "";

      window.scrollTo(0, scrollYRef.current);
    }
  }, [open]);
  const handleNotify = () => {
    if (!valid) return;
    setSubmitted(true);
    setTimeout(() => {
      setOpen(false);
      setEmail("");
      setSubmitted(false);
    }, 2200);
  };

  return (
    <>
      <span
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          setOpen(true);
        }}
        className="cursor-pointer"
      >
        {children}
      </span>

      {open && (
        <div
          className="fixed inset-0 z-[9999] flex items-center justify-center overflow-hidden"
          onWheel={(e) => {
            e.preventDefault();
            e.stopPropagation();
          }}
        >
          <div
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={() => setOpen(false)}
          />
          <div className={cn(modal.panel, "relative z-[10000] max-w-[360px]")}>
            <div className="p-7">
              <button onClick={() => setOpen(false)} className={modal.closeBtn}>
                <X size={14} />
              </button>

              {!submitted ? (
                <>
                  <div
                    className={cn(
                      iconChip.base,
                      iconChip.md,
                      iconChip.brand,
                      "mx-auto mb-4",
                    )}
                  >
                    <Rocket size={22} strokeWidth={1.8} />
                  </div>
                  <h3 className={cn(text.cardTitle, "text-center mb-1.5")}>
                    Coming Soon
                  </h3>
                  <p
                    className={cn(
                      text.muted,
                      "text-center text-xs mb-5 leading-relaxed",
                    )}
                  >
                    <span className="font-semibold text-[#970747]">
                      {featureName}
                    </span>{" "}
                    is being crafted. Drop your email and we'll ping you at
                    launch.
                  </p>

                  <div className="flex gap-2">
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      onKeyDown={(e) => e.key === "Enter" && handleNotify()}
                      placeholder="you@email.com"
                      className={cn(input.compact, "flex-1")}
                    />
                    <button
                      onClick={handleNotify}
                      disabled={!valid}
                      className={cn(btn.primary, btn.sm, "shrink-0")}
                    >
                      <Bell size={13} /> Notify
                    </button>
                  </div>
                  <p className={cn(text.micro, "text-center mt-3")}>
                    No spam. Unsubscribe anytime.
                  </p>
                </>
              ) : (
                <div className="py-4 text-center space-y-3">
                  <div
                    className={cn(
                      iconChip.base,
                      iconChip.md,
                      iconChip.success,
                      "mx-auto",
                    )}
                  >
                    <CheckCircle size={26} />
                  </div>
                  <h3 className={cn(text.cardTitle)}>You're on the list!</h3>
                  <p className={cn(text.muted, "text-xs")}>
                    We'll email{" "}
                    <span className="font-semibold text-gray-700">{email}</span>{" "}
                    when{" "}
                    <span className="text-[#970747] font-semibold">
                      {featureName}
                    </span>{" "}
                    launches.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
