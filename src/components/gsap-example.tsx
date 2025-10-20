"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

export default function GsapExample() {
  const boxRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (boxRef.current) {
      gsap.fromTo(
        boxRef.current,
        { opacity: 0, x: -200, rotation: -45 },
        { opacity: 1, x: 0, rotation: 0, duration: 1.2, ease: "bounce.out" }
      );
    }
  }, []);

  return (
    <section className="h-screen flex items-center justify-center bg-white">
      <div
        ref={boxRef}
        className="w-40 h-40 bg-green-500 text-white flex items-center justify-center rounded-lg shadow-xl"
      >
        GSAP Box
      </div>
    </section>
  );
}
