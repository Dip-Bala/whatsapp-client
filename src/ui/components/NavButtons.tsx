import React from "react";

interface NavButtonProps {
  isActive: boolean;
  onClick: () => void;
  activeIcon: React.ReactNode;
  inactiveIcon: React.ReactNode;
}

export default function NavButton({ isActive, onClick, activeIcon, inactiveIcon }: NavButtonProps) {
  return (
    <button
      className={`hover:bg-neutral-300 rounded-full p-2 ${isActive ? "bg-neutral-300" : ""}`}
      type="button"
      onClick={onClick}
    >
      {isActive ? activeIcon : inactiveIcon}
    </button>
  );
}
