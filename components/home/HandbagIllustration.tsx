export default function HandbagIllustration() {
  return (
    <svg
      viewBox="0 0 320 340"
      className="w-full h-full drop-shadow-[0_24px_40px_rgba(0,0,0,0.25)]"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* ── Handles ── */}
      {/* Left handle */}
      <path
        d="M100 112 C95 70 108 45 130 38 C148 32 165 38 172 55"
        stroke="white"
        strokeWidth="10"
        strokeLinecap="round"
        fill="none"
        opacity="0.95"
      />
      {/* Right handle */}
      <path
        d="M220 112 C225 70 212 45 190 38 C172 32 155 38 148 55"
        stroke="white"
        strokeWidth="10"
        strokeLinecap="round"
        fill="none"
        opacity="0.95"
      />
      {/* Handle shadows */}
      <path
        d="M100 112 C95 70 108 45 130 38 C148 32 165 38 172 55"
        stroke="rgba(0,0,0,0.12)"
        strokeWidth="10"
        strokeLinecap="round"
        fill="none"
        transform="translate(3, 4)"
      />
      <path
        d="M220 112 C225 70 212 45 190 38 C172 32 155 38 148 55"
        stroke="rgba(0,0,0,0.12)"
        strokeWidth="10"
        strokeLinecap="round"
        fill="none"
        transform="translate(3, 4)"
      />

      {/* ── Bag body shadow ── */}
      <rect
        x="43"
        y="116"
        width="238"
        height="200"
        rx="28"
        fill="rgba(0,0,0,0.18)"
      />

      {/* ── Main bag body ── */}
      <rect
        x="38"
        y="110"
        width="244"
        height="200"
        rx="28"
        fill="white"
        opacity="0.96"
      />

      {/* ── Top flap ── */}
      <path
        d="M38 138 L38 118 Q38 110 46 110 L274 110 Q282 110 282 118 L282 138
           Q238 118 160 114 Q82 110 38 138Z"
        fill="white"
        opacity="0.75"
      />

      {/* ── Bag texture lines ── */}
      <rect
        x="55"
        y="127"
        width="210"
        height="168"
        rx="18"
        stroke="#970747"
        strokeWidth="1.5"
        strokeDasharray="7 4"
        fill="none"
        opacity="0.18"
      />

      {/* ── Center crease ── */}
      <line
        x1="160"
        y1="115"
        x2="160"
        y2="306"
        stroke="#f0a0bb"
        strokeWidth="1.2"
        opacity="0.35"
      />

      {/* ── Clasp ring ── */}
      <circle cx="160" cy="115" r="14" fill="#970747" opacity="0.95" />
      <circle cx="160" cy="115" r="9" fill="white" opacity="0.9" />
      <circle cx="160" cy="115" r="5" fill="#970747" opacity="0.7" />
      {/* Clasp latch */}
      <rect
        x="153"
        y="113"
        width="14"
        height="4"
        rx="2"
        fill="white"
        opacity="0.5"
      />

      {/* ── Front pocket ── */}
      <rect
        x="95"
        y="185"
        width="130"
        height="82"
        rx="16"
        fill="rgba(151,7,71,0.06)"
        stroke="rgba(151,7,71,0.2)"
        strokeWidth="1.2"
      />

      {/* Pocket zipper line */}
      <line
        x1="110"
        y1="197"
        x2="210"
        y2="197"
        stroke="rgba(151,7,71,0.3)"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      {/* Zipper pull */}
      <circle
        cx="165"
        cy="197"
        r="4"
        fill="white"
        stroke="rgba(151,7,71,0.4)"
        strokeWidth="1"
      />
      <rect
        x="163"
        y="201"
        width="4"
        height="7"
        rx="1"
        fill="rgba(151,7,71,0.35)"
      />

      {/* ── Brand emboss ── */}
      <text
        x="160"
        y="235"
        textAnchor="middle"
        fontSize="13"
        fontWeight="700"
        fill="#970747"
        fontFamily="sans-serif"
        letterSpacing="3"
        opacity="0.5"
      >
        VELVET
      </text>
      <text
        x="160"
        y="252"
        textAnchor="middle"
        fontSize="8"
        fontWeight="400"
        fill="#970747"
        fontFamily="sans-serif"
        letterSpacing="5"
        opacity="0.35"
      >
        STORE
      </text>

      {/* ── Shine highlight ── */}
      <ellipse
        cx="96"
        cy="148"
        rx="22"
        ry="10"
        fill="rgba(255,255,255,0.45)"
        transform="rotate(-35 96 148)"
      />

      {/* ── Bottom edge shadow ── */}
      <rect
        x="58"
        y="296"
        width="204"
        height="10"
        rx="5"
        fill="rgba(151,7,71,0.12)"
      />

      {/* ── Side stitch detail ── */}
      {[130, 155, 180, 205, 230, 255, 280].map((y, i) => (
        <circle key={i} cx="50" cy={y} r="2" fill="rgba(151,7,71,0.2)" />
      ))}
      {[130, 155, 180, 205, 230, 255, 280].map((y, i) => (
        <circle key={i} cx="270" cy={y} r="2" fill="rgba(151,7,71,0.2)" />
      ))}
    </svg>
  );
}
