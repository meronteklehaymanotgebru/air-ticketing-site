// src/components/ui/FlightTrail.tsx
"use client";

export default function FlightTrail() {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
      <svg
        className="absolute inset-0 w-full h-full"
        viewBox="0 0 1000 500"
        preserveAspectRatio="xMidYMid slice"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* ---- Top golden trail (dimmed) ---- */}
        <path
          d="M -50,125 C 200,50 400,200 600,125 C 750,75 900,150 1050,100"
          stroke="var(--color-brand-gold)"
          strokeWidth="1.25"
          strokeDasharray="5 5"
          strokeOpacity="0.15"
          fill="none"
        />

        {/* ---- Bottom golden trail (hidden on small screens via CSS/SVG opacity) ---- */}
        <path
          d="M 1050,375 C 900,450 700,300 500,375 C 300,430 100,350 -50,400"
          stroke="var(--color-brand-gold)"
          strokeWidth="1.25"
          strokeDasharray="5 5"
          strokeOpacity="0.12"
          fill="none"
          className="hidden sm:block"
        />

        {/* ---- Top plane (scaled down to 28px on mobile, 40px on desktop) ---- */}
        <image
          href="/plane-mini.png"
          className="w-7 h-7 sm:w-10 sm:h-10 opacity-70 sm:opacity-90"
          x="-14"
          y="-14"
        >
          <animateMotion
            dur="25s"
            repeatCount="indefinite"
            begin="0s"
            path="M -50,125 C 200,50 400,200 600,125 C 750,75 900,150 1050,100"
            rotate="auto"
          />
        </image>

        {/* ---- Bottom plane (only runs on sm+ viewports) ---- */}
        <g className="hidden sm:block">
          <image
            href="/plane-mini.png"
            className="w-10 h-10 opacity-80"
            x="-20"
            y="-20"
          >
            <animateMotion
              dur="25s"
              repeatCount="indefinite"
              begin="6.25s"
              path="M 1050,375 C 900,450 700,300 500,375 C 300,430 100,350 -50,400"
              rotate="auto"
            />
          </image>
        </g>
      </svg>
    </div>
  );
}