import React from "react";

interface NavButtonProps {
  isActive?: boolean;
  onClick?: () => void;
  activeIcon?: React.ReactNode;
  inactiveIcon?: React.ReactNode;
}

export default function IconButton({ isActive, onClick, activeIcon, inactiveIcon }: NavButtonProps) {
  return (
    <button
      className={`hover:bg-[#eae9e7] rounded-full p-2 cursor-pointer ${isActive ? "bg-[#eae9e7] flex" : ""}`}
      type="button"
      onClick={onClick}
    >
      {isActive ? activeIcon : inactiveIcon}
    </button>
  );
}
