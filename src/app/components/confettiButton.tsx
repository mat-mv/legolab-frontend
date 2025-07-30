"use client";

import confetti from "canvas-confetti";

export default function ConfettiButton() {
  const handleClick = () => {
    confetti({
      particleCount: 200,
      spread: 120,
      origin: { y: 0.6 },
    });
  };

  return (
    <button className="button" onClick={handleClick}>
      🎉 Juhuu – feiere mit uns heute am 31.7.2025 den Relaunch der Website!
    </button>
  );
}
