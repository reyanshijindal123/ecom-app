

export type RazorpayMethod = 'upi' | 'card' | 'netbanking' | 'wallet' | 'cod';

export interface RazorpayOptions {
  key: string;
  amount: number;          // paise
  currency: string;
  name: string;
  description?: string;
  order_id?: string;
  prefill?: {
    name?: string;
    email?: string;
    contact?: string;
    method?: RazorpayMethod;
    vpa?: string;          // UPI ID
  };
  theme?: { color?: string };
  modal?: { ondismiss?: () => void };
  handler?: (response: RazorpayResponse) => void;
}

export interface RazorpayResponse {
  razorpay_payment_id: string;
  razorpay_order_id: string;
  razorpay_signature: string;
  /** Not on real SDK — extra context for our fake flow */
  _method: RazorpayMethod;
}

/** Error thrown when the user dismisses the fake modal */
export class RazorpayDismissedError extends Error {
  constructor() { super('Payment dismissed by user'); this.name = 'RazorpayDismissedError'; }
}

/** Error thrown when the simulated payment fails */
export class RazorpayFailedError extends Error {
  constructor(public code: string) {
    super(`Payment failed: ${code}`); this.name = 'RazorpayFailedError';
  }
}

// ─── Fake order-ID generator ──────────────────────────────────────────────────
export function createFakeOrderId(): string {
  return 'order_' + Math.random().toString(36).slice(2, 13).toUpperCase();
}

// ─── Fake payment response ────────────────────────────────────────────────────
function buildResponse(method: RazorpayMethod, orderId: string): RazorpayResponse {
  return {
    razorpay_payment_id: 'pay_' + Math.random().toString(36).slice(2, 14).toUpperCase(),
    razorpay_order_id: orderId,
    razorpay_signature: Array.from({ length: 32 }, () =>
      Math.floor(Math.random() * 16).toString(16)).join(''),
    _method: method,
  };
}

// ─── Simulation config ────────────────────────────────────────────────────────
/** How long (ms) the fake "processing" state lasts */
const PROCESSING_DELAY = 2200;

/** Probability that the payment "fails" (0 = never, 0.15 = 15%) */
const FAILURE_RATE = 0;

// ─── Core function ────────────────────────────────────────────────────────────
/**
 * Simulates opening the Razorpay checkout sheet and processing payment.
 * Returns a resolved RazorpayResponse on success.
 * Throws RazorpayDismissedError | RazorpayFailedError on failure.
 */
export async function processRazorpayPayment(
  options: RazorpayOptions,
  method: RazorpayMethod
): Promise<RazorpayResponse> {
  const orderId = options.order_id ?? createFakeOrderId();

  // Simulate network + processing time
  await new Promise<void>((resolve) => setTimeout(resolve, PROCESSING_DELAY));

  // Simulate random failures (disabled by default — set FAILURE_RATE > 0 to test)
  if (Math.random() < FAILURE_RATE) {
    throw new RazorpayFailedError('PAYMENT_GATEWAY_ERROR');
  }

  const response = buildResponse(method, orderId);

  // Call the real SDK's handler if provided (allows gradual migration)
  options.handler?.(response);

  return response;
}

// ─── Convenience constants (mirror real Razorpay test credentials) ────────────
export const RAZORPAY_KEY_ID = 'rzp_test_VelvetStore2025';

export const RAZORPAY_THEME = { color: '#970747' };

/** Build a standard options object pre-filled for VelvetStore */
export function buildRazorpayOptions(
  amount: number,        // INR rupees (will be converted to paise internally)
  prefill?: RazorpayOptions['prefill']
): RazorpayOptions {
  return {
    key: RAZORPAY_KEY_ID,
    amount: Math.round(amount * 100), // paise
    currency: 'INR',
    name: 'VelvetStore',
    description: 'Secure Checkout',
    order_id: createFakeOrderId(),
    prefill,
    theme: RAZORPAY_THEME,
  };
}
