"use client";

import Image from "next/image";

export default function FlightTrail() {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      <svg
        className="absolute inset-0 w-full h-full"
        viewBox="0 0 1000 500"
        preserveAspectRatio="none"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* ---- Top golden trail (left → right) ---- */}
        <path
          d="M -50,125 C 200,50 400,200 600,125 C 750,75 900,150 1050,100"
          stroke="var(--color-brand-gold)"
          strokeWidth="1.5"
          strokeDasharray="6 6"
          strokeOpacity="0.35"
          fill="none"
        />
        {/* ---- Bottom golden trail (right → left) ---- */}
        <path
          d="M 1050,375 C 900,450 700,300 500,375 C 300,430 100,350 -50,400"
          stroke="var(--color-brand-gold)"
          strokeWidth="1.5"
          strokeDasharray="6 6"
          strokeOpacity="0.35"
          fill="none"
        />

        {/* ---- Top plane (starts immediately) ---- */}
        <image
          href="/plane-mini.png"
          width="48"
          height="48"
          x="-24"
          y="-24"
        >
          <animateMotion
            dur="25s"
            repeatCount="indefinite"
            begin="0s"
            path="M -50,125 C 200,50 400,200 600,125 C 750,75 900,150 1050,100"
            rotate="auto"
          />
        </image>

        {/* ---- Bottom plane (starts after quarter time = 6.25s) ---- */}
        <image
          href="/plane-mini.png"
          width="48"
          height="48"
          x="-24"
          y="-24"
        >
          <animateMotion
            dur="25s"
            repeatCount="indefinite"
            begin="6.25s"             // 👈 ¼ of 25s
            path="M 1050,375 C 900,450 700,300 500,375 C 300,430 100,350 -50,400"
            rotate="auto"
          />
        </image>
      </svg>
    </div>
  );
}