'use client';

import ProtectedRoute from '@/components/ProtectedRoute';
import { useCartStore, useAuthStore, useOrderStore } from '@/store';
import {
  CheckCircle, ChevronRight, Lock, Package,
  Truck, Shield, Building, Smartphone, CreditCard,
  Wallet, AlertCircle, Loader2,
} from 'lucide-react';
import { useState,useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { INR, getDeliveryDate } from '@/lib/utils';
import { btn, card, input, modal, text, layout, badge, iconChip } from '@/lib/styles';
import {
  buildRazorpayOptions, processRazorpayPayment,
  RazorpayDismissedError, RazorpayFailedError,
  type RazorpayMethod, type RazorpayResponse,
} from '@/lib/razorpay';
import { cn } from '@/lib/utils';
import { getAddressFromPincode } from '@/lib/pincode';
// ─── Types ────────────────────────────────────────────────────────────────────
type Step = 'address' | 'payment' | 'success';

type PaymentMethod = {
  id: RazorpayMethod;
  icon: React.ElementType;
  label: string;
  desc: string;
};

interface AddressForm {
  fullName: string;
  phone: string;
  line1: string;
  line2: string;
  city: string;
  state: string;
  pincode: string;
}

// ─── Constants ────────────────────────────────────────────────────────────────
const PAYMENT_METHODS: PaymentMethod[] = [
  { id: 'upi',        icon: Smartphone,   label: 'UPI',              desc: 'PhonePe, GPay, Paytm & more' },
  { id: 'card',       icon: CreditCard,   label: 'Credit / Debit',   desc: 'Visa, Mastercard, RuPay' },
  { id: 'netbanking', icon: Building,     label: 'Net Banking',      desc: 'All major banks supported' },
  { id: 'wallet',     icon: Wallet,       label: 'Wallets',          desc: 'Paytm, Amazon Pay, Mobikwik' },
  { id: 'cod',        icon: Package,      label: 'Cash on Delivery', desc: 'Pay when you receive' },
];

const UPI_APPS = ['PhonePe', 'Google Pay', 'Paytm', 'BHIM'] as const;

const STEPS: Step[] = ['address', 'payment', 'success'];

// ─── Sub-components ───────────────────────────────────────────────────────────

/** Progress stepper */
function Stepper({ current }: { current: Step }) {
  const labels = ['Address', 'Payment'];
  return (
    <ol className="flex items-center gap-2 text-xs font-semibold mb-6">
      {labels.map((label, i) => {
        const step = STEPS[i];
        const isDone = STEPS.indexOf(current) > i;
        const isActive = current === step;
        return (
          <li key={step} className="flex items-center gap-2">
            {i > 0 && <ChevronRight size={12} className="text-gray-300" />}
            <span className={cn(
              'px-3 py-1 rounded-full capitalize transition-colors',
              isActive  && 'bg-[#970747] text-white',
              isDone    && 'bg-green-100 text-green-700',
              !isActive && !isDone && 'bg-gray-100 text-gray-400',
            )}>
              {i + 1}. {label}
            </span>
          </li>
        );
      })}
    </ol>
  );
}

/** Labelled input field */
function Field({ label: lbl, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <label className={input.label}>{lbl}</label>
      {children}
    </div>
  );
}

/** Address step */
function AddressStep({
  value,
  billing = value,
  onBillingChange = () => {},
  sameBilling = true,
  setSameBilling = () => {},
  onChange,
  onNext,
}: {
  value: AddressForm;
  billing?: AddressForm;
  onBillingChange?: (v: AddressForm) => void;
  sameBilling?: boolean;
  setSameBilling?: (v: boolean) => void;
  onChange: (v: AddressForm) => void;
  onNext: () => void;
}) {
  const set = (k: keyof AddressForm) => (e: React.ChangeEvent<HTMLInputElement>) =>
    onChange({ ...value, [k]: e.target.value });

  return (
    <div className={cn(card.base, card.p.md, 'space-y-4')}>
      <h3 className={cn(text.cardTitle, 'flex items-center gap-2')}>
        <Truck size={15} className="text-[#970747]" /> Shipping Address
      </h3>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <Field label="Full Name">
          <input className={input.base} value={value.fullName} onChange={set('fullName')} placeholder="Rahul Sharma" />
        </Field>
        <Field label="Phone Number">
          <input className={input.base} value={value.phone} onChange={set('phone')} placeholder="+91 98765 43210" />
        </Field>
        <div className="sm:col-span-2">
          <Field label="Address Line 1">
            <input className={input.base} value={value.line1} onChange={set('line1')} placeholder="House / Flat No., Street Name" />
          </Field>
        </div>
        <div className="sm:col-span-2">
          <Field label="Address Line 2 (Optional)">
            <input className={input.base} value={value.line2} onChange={set('line2')} placeholder="Area, Landmark" />
          </Field>
        </div>
        <Field label="City">
          <input className={input.base} value={value.city} readOnly placeholder="city" />
        </Field>
        <Field label="State">
          <input className={input.base} value={value.state} readOnly placeholder="State" />
        </Field>
        <Field label="PIN Code">
          <input className={input.base} value={value.pincode} onChange={set('pincode')} placeholder="400001" maxLength={6} inputMode="numeric"/>
        </Field>
      </div>

      <button onClick={onNext} className={cn(btn.primary, btn.full)}>
        Continue to Payment
      </button>
    </div>
  );
}

/** Single payment method radio row */
function PaymentRow({
  method,
  selected,
  onSelect,
}: {
  method: PaymentMethod;
  selected: boolean;
  onSelect: () => void;
}) {
  const { icon: Icon, label, desc } = method;
  return (
    <button
      onClick={onSelect}
      className={cn(
        'w-full flex items-center gap-3 p-3 rounded-xl border-2 text-left transition-all duration-150',
        selected ? 'border-[#970747] bg-pink-50' : 'border-gray-100 hover:border-gray-200',
      )}
    >
      <div className={cn(
        iconChip.base, iconChip.sm,
        selected ? 'bg-[#970747] text-white' : 'bg-gray-100 text-gray-500',
      )}>
        <Icon size={15} />
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-sm font-bold text-gray-800">{label}</p>
        <p className="text-[11px] text-gray-500">{desc}</p>
      </div>
      <div className={cn(
        'w-4 h-4 rounded-full border-2 shrink-0 flex items-center justify-center',
        selected ? 'border-[#970747]' : 'border-gray-300',
      )}>
        {selected && <div className="w-2 h-2 rounded-full bg-[#970747]" />}
      </div>
    </button>
  );
}

/** ── Fake Razorpay Modal ── */
function RazorpayModal({
  amount,
  method,
  upiApp,
  upiId,
  onUpiAppChange,
  onUpiIdChange,
  processing,
  error,
  onPay,
  onBack,
}: {
  amount: number;
  method: RazorpayMethod;
  upiApp: string;
  upiId: string;
  onUpiAppChange: (v: string) => void;
  onUpiIdChange: (v: string) => void;
  processing: boolean;
  error: string;
  onPay: () => void;
  onBack: () => void;
}) {
  return (
    <div className={modal.backdrop}>
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onBack} />

      <div className={cn(modal.panel, 'max-w-sm z-10')}>
        {/* Blue Razorpay-branded strip */}
        <div className={modal.strip.blue} />

        <div className="p-6">
          {/* Header */}
          <div className="flex items-center justify-between mb-5">
            <div>
              <div className="flex items-center gap-2 mb-0.5">
                {/* Razorpay wordmark (SVG inline) */}
                <svg viewBox="0 0 120 24" className="h-5 w-auto" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M0 0h10.5L6 24H0V0z" fill="#3395FF"/>
                  <path d="M6 0h10l-4.5 24H6L10.5 0z" fill="#2268B2"/>
                  <path d="M10.5 12 16 0h10L14.5 24 10.5 12z" fill="#3395FF"/>
                  <text x="28" y="18" fontSize="14" fontWeight="700" fill="#2268B2" fontFamily="sans-serif">razorpay</text>
                </svg>
                <span className="text-[10px] font-semibold text-blue-600 bg-blue-50 px-1.5 py-0.5 rounded">SECURE</span>
              </div>
              <p className="text-xs text-gray-400">VelvetStore · ₹{Math.round(amount).toLocaleString('en-IN')}</p>
            </div>
            <button onClick={onBack} disabled={processing} className="text-gray-400 hover:text-gray-600 text-lg leading-none">×</button>
          </div>

          {/* UPI specific */}
          {method === 'upi' && (
            <div className="space-y-3 mb-4">
              <p className={input.label}>Select UPI App</p>
              <div className="grid grid-cols-4 gap-2">
                {UPI_APPS.map((app) => (
                  <button
                    key={app}
                    onClick={() => onUpiAppChange(app)}
                    className={cn(
                      'py-2 rounded-lg text-[10px] font-bold border-2 transition-all',
                      upiApp === app ? 'border-[#970747] bg-pink-50 text-[#970747]' : 'border-gray-200 text-gray-500 hover:border-gray-300',
                    )}
                  >
                    {app}
                  </button>
                ))}
              </div>
              <div>
                <p className={input.label}>UPI ID</p>
                <input
                  value={upiId}
                  onChange={(e) => onUpiIdChange(e.target.value)}
                  placeholder="name@paytm"
                  className={input.compact}
                  disabled={processing}
                />
              </div>
            </div>
          )}

          {/* Card specific */}
          {method === 'card' && (
            <div className="space-y-3 mb-4">
              <div>
                <p className={input.label}>Card Number</p>
                <input className={input.compact} placeholder="4242 4242 4242 4242" disabled={processing} />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <p className={input.label}>Expiry</p>
                  <input className={input.compact} placeholder="MM / YY" disabled={processing} />
                </div>
                <div>
                  <p className={input.label}>CVV</p>
                  <input className={input.compact} placeholder="•••" disabled={processing} />
                </div>
              </div>
              <div>
                <p className={input.label}>Name on Card</p>
                <input className={input.compact} placeholder="Rahul Sharma" disabled={processing} />
              </div>
            </div>
          )}

          {/* Net banking */}
          {method === 'netbanking' && (
            <div className="mb-4">
              <p className={input.label}>Select Bank</p>
              <select className={input.compact} disabled={processing}>
                {['HDFC Bank', 'ICICI Bank', 'SBI', 'Axis Bank', 'Kotak Bank'].map((b) => (
                  <option key={b}>{b}</option>
                ))}
              </select>
            </div>
          )}

          {/* Wallets */}
          {method === 'wallet' && (
            <div className="mb-4">
              <p className={input.label}>Select Wallet</p>
              <div className="grid grid-cols-3 gap-2">
                {['Paytm', 'Amazon Pay', 'Mobikwik'].map((w) => (
                  <button key={w} className="py-2 rounded-lg border-2 border-gray-200 text-[10px] font-bold text-gray-500 hover:border-[#970747] hover:text-[#970747] transition-all">
                    {w}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* COD */}
          {method === 'cod' && (
            <div className={cn(badge.warning, 'mb-4 text-xs rounded-xl px-4 py-3 flex-col items-start gap-1')}>
              <p className="font-bold">Cash on Delivery</p>
              <p className="font-normal text-amber-600">₹{Math.round(amount).toLocaleString('en-IN')} to be paid at doorstep</p>
            </div>
          )}

          {/* Error */}
          {error && (
            <div className={cn(badge.danger, 'mb-3 w-full rounded-xl px-3 py-2.5 text-xs')}>
              <AlertCircle size={13} /> {error}
            </div>
          )}

          {/* Pay button */}
          <button
            onClick={onPay}
            disabled={processing}
            className={cn(btn.primary, btn.full, 'text-base font-black')}
          >
            {processing ? (
              <><Loader2 size={16} className="animate-spin" /> Processing…</>
            ) : (
              <><Lock size={15} /> Pay ₹{Math.round(amount).toLocaleString('en-IN')}</>
            )}
          </button>

          <p className={cn(text.micro, 'text-center mt-3')}>
            🔒 256-bit SSL encryption · RCI compliant
          </p>
        </div>
      </div>
    </div>
  );
}

/** Success screen */
function SuccessScreen({ orderId, total }: { orderId: string; total: number }) {
  const router = useRouter();
  return (
    <div className="text-center py-16 px-4">
      <div className={cn(iconChip.base, iconChip.success, 'w-20 h-20 mx-auto mb-5')}>
        <CheckCircle size={40} className="text-green-500" />
      </div>
      <h2 className={cn(text.pageTitle, 'mb-2')}>Order Placed! 🎉</h2>
      <p className={cn(text.muted, 'mb-1')}>Your payment was successful.</p>
      <p className={cn(text.micro, 'mb-1')}>
        Order ID: <span className="font-mono font-semibold text-gray-600">{orderId}</span>
      </p>
      <p className={cn(text.micro, 'mb-6')}>
        Estimated delivery: <strong className="text-gray-700">{getDeliveryDate(5)}</strong>
      </p>
      <div className="flex gap-3 justify-center">
        <button onClick={() => router.push('/account')} className={cn(btn.primary, btn.md)}>
          <Package size={15} /> Track Order
        </button>
        <button onClick={() => router.push('/')} className={cn(btn.outline, btn.md)}>
          Continue Shopping
        </button>
      </div>
    </div>
  );
}

/** Sticky price summary sidebar */
function PriceSummary({
  subtotal,
  shippingCost,
  tax,
  grand,
  totalItems,
  savings,
}: {
  subtotal: number;
  shippingCost: number;
  tax: number;
  grand: number;
  totalItems: number;
  savings: number;
}) {
  const row = 'flex justify-between text-sm text-gray-600';
  return (
    <div className={cn(card.base, card.p.md, layout.sticky)}>
      <h3 className={cn(text.cardTitle, 'mb-4')}>Price Details</h3>
      <div className="space-y-2.5 border-b border-gray-100 pb-4 mb-4">
        <div className={row}>
          <span>Price ({totalItems} items)</span>
          <span className="font-semibold">{INR(subtotal / 83)}</span>
        </div>
        <div className={row}>
          <span>Discount</span>
          <span className="text-green-600 font-semibold">-{INR(savings / 83)}</span>
        </div>
        <div className={row}>
          <span>Delivery</span>
          <span className={shippingCost === 0 ? 'text-green-600 font-semibold' : 'font-semibold'}>
            {shippingCost === 0 ? 'FREE' : `₹${shippingCost}`}
          </span>
        </div>
        <div className={row}>
          <span>GST (18%)</span>
          <span className="font-semibold">₹{Math.round(tax)}</span>
        </div>
      </div>
      <div className="flex justify-between font-black text-gray-900 text-base mb-3">
        <span>Total Amount</span>
        <span>₹{Math.round(grand).toLocaleString('en-IN')}</span>
      </div>
      <p className="text-xs text-green-600 font-semibold">
        You save ₹{Math.round(savings).toLocaleString('en-IN')} on this order!
      </p>
    </div>
  );
}

// ─── Main checkout content ────────────────────────────────────────────────────
function CheckoutContent() {
  const { items, totalPrice, totalItems, clearCart } = useCartStore();
  const { user } = useAuthStore();
  const { placeOrder } = useOrderStore();
  const router = useRouter();

  // Step state
  const [step, setStep] = useState<Step>('address');

  // Address form
  const [address, setAddress] = useState<AddressForm>({
    fullName: `${user?.name?.firstname ?? ''} ${user?.name?.lastname ?? ''}`.trim(),
    phone: '',
    line1: '', line2: '', city: '', state: '', pincode: '',
  });

  const [billing, setBilling] = useState<AddressForm>({
    fullName: '', phone: '', line1: '', line2: '', city: '', state: '', pincode: '',
  });

  const [sameBilling, setSameBilling] = useState(true);

useEffect(() => {
  async function fetchAddress() {
    if (address.pincode.length !== 6) return;

    const result = await getAddressFromPincode(address.pincode);

    if (result) {
      setAddress((prev) => ({
        ...prev,
        city: result.city,
        state: result.state,
      }));
    }
  }

  fetchAddress();
}, [address.pincode]);
  // Payment state
  const [payMethod, setPayMethod] = useState<RazorpayMethod>('upi');
  const [upiApp, setUpiApp] = useState('PhonePe');
  const [upiId, setUpiId] = useState('');
  const [showRazorpay, setShowRazorpay] = useState(false);
  const [processing, setProcessing] = useState(false);
  const [payError, setPayError] = useState('');
  const [placedOrderId, setPlacedOrderId] = useState('');

  // Pricing
  const subtotal  = totalPrice() * 83;
  const savings   = subtotal * 0.23;  // 23% off shown as savings
  const discounted = subtotal - savings;
  const shippingCost = discounted > 3999 ? 0 : 99;
  const tax       = discounted * 0.18;
  const grand     = discounted + shippingCost + tax;

  // ── handlers ──────────────────────────────────────────────────────────────
  const handleAddressNext = () => {
    if (!address.fullName || !address.line1 || !address.city || !address.pincode) return;
    setStep('payment');
  };

  const handleOpenRazorpay = () => {
    setPayError('');
    setShowRazorpay(true);
  };

  const handlePay = async () => {
    setProcessing(true);
    setPayError('');
    try {
      const options = buildRazorpayOptions(grand, {
        name: address.fullName,
        email: user?.email,
        contact: address.phone,
        method: payMethod,
        vpa: upiId || undefined,
      });

      const response: RazorpayResponse = await processRazorpayPayment(options, payMethod);

      const orderId = response.razorpay_order_id;
      placeOrder({
        id: Number(orderId),
        items: [...items],
        total: grand,
        date: new Date().toLocaleDateString('en-IN'),
        status: 'Processing',
        address: { ...address } as Parameters<typeof placeOrder>[0]['address'],
      });

      clearCart();
      setPlacedOrderId(orderId);
      setShowRazorpay(false);
      setStep('success');
    } catch (err) {
      if (err instanceof RazorpayDismissedError) {
        setShowRazorpay(false);
      } else if (err instanceof RazorpayFailedError) {
        setPayError('Payment failed. Please try a different method.');
      } else {
        setPayError('Something went wrong. Please try again.');
      }
    } finally {
      setProcessing(false);
    }
  };

  // ── success screen ────────────────────────────────────────────────────────
  if (step === 'success') {
    return <SuccessScreen orderId={placedOrderId} total={grand} />;
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
      {/* Fake Razorpay modal */}
      {showRazorpay && (
        <RazorpayModal
          amount={grand}
          method={payMethod}
          upiApp={upiApp}
          upiId={upiId}
          onUpiAppChange={setUpiApp}
          onUpiIdChange={setUpiId}
          processing={processing}
          error={payError}
          onPay={handlePay}
          onBack={() => !processing && setShowRazorpay(false)}
        />
      )}

      {/* ── Steps ── */}
      <div className="lg:col-span-3 space-y-5">
        <Stepper current={step} />

        {step === 'address' && (
          <AddressStep value={address} onChange={setAddress} onNext={handleAddressNext} />
        )}

        {step === 'payment' && (
          <div className={cn(card.base, card.p.md, 'space-y-4')}>
            {/* Razorpay badge */}
            <div className="flex items-center justify-between">
              <h3 className={text.cardTitle}>Choose Payment Method</h3>
              <div className="flex items-center gap-1.5 bg-blue-50 border border-blue-100 rounded-lg px-2.5 py-1">
                <Shield size={11} className="text-blue-500" />
                <span className="text-[10px] font-bold text-blue-600">Secured by Razorpay</span>
              </div>
            </div>

            {/* Method list */}
            <div className="space-y-2">
              {PAYMENT_METHODS.map((m) => (
                <PaymentRow
                  key={m.id}
                  method={m}
                  selected={payMethod === m.id}
                  onSelect={() => setPayMethod(m.id)}
                />
              ))}
            </div>

            {/* Order preview */}
            <div className="bg-gray-50 rounded-xl p-3 max-h-40 overflow-y-auto space-y-2">
              {items.map((item) => (
                <div key={item.id} className="flex items-center gap-2">
                  <div className="relative w-9 h-9 bg-white rounded-lg overflow-hidden shrink-0">
                    <Image src={item.image} alt={item.title} fill className="object-contain p-1" sizes="36px" />
                  </div>
                  <p className="flex-1 text-xs text-gray-700 line-clamp-1">{item.title}</p>
                  <span className="text-xs font-bold text-gray-900 shrink-0">{INR(item.price * item.quantity)}</span>
                </div>
              ))}
            </div>

            <div className="flex gap-3">
              <button onClick={() => setStep('address')} className={cn(btn.outline, btn.md)}>
                ← Back
              </button>
              <button onClick={handleOpenRazorpay} className={cn(btn.primary, 'flex-1 py-3 text-sm')}>
                <Lock size={14} />
                Pay ₹{Math.round(grand).toLocaleString('en-IN')} via Razorpay
              </button>
            </div>
          </div>
        )}
      </div>

      {/* ── Price sidebar ── */}
      <div className="lg:col-span-2">
        <PriceSummary
          subtotal={subtotal}
          shippingCost={shippingCost}
          tax={tax}
          grand={grand}
          totalItems={totalItems()}
          savings={savings}
        />
      </div>
    </div>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────
export default function CheckoutPage() {
  return (
    <ProtectedRoute>
      <div className={layout.narrow}>
        <h1 className={cn(text.pageTitle, 'mb-6')}>Checkout</h1>
        <CheckoutContent />
      </div>
    </ProtectedRoute>
  );
}
