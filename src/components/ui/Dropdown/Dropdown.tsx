"use client";

import { Dispatch, SetStateAction, useRef } from "react";
import { IoIosArrowDown } from "react-icons/io";

interface DropdownProps {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  title: string;
  children: React.ReactNode;
}

const Dropdown = ({ isOpen, setIsOpen, title, children }: DropdownProps) => {
  const menuRef = useRef<HTMLDivElement>(null);

  return (
    <div className="min-w-0 max-w-full w-full sm:w-48 relative">
      {/* Dropdown Button */}
      <button
        className="w-full h-10 px-4 border rounded bg-light-light flex items-center justify-between gap-2"
        onClick={() => setIsOpen((prev) => !prev)}
      >
        <span className="truncate">{title}</span>
        <IoIosArrowDown className="shrink-0" />
      </button>

      {/* Dropdown menu */}
      <div
        ref={menuRef}
        className="w-full mt-1 absolute z-10 transition-height ease-out duration-200 overflow-hidden"
        style={{ height: isOpen ? menuRef.current?.scrollHeight ?? 0 : 0 }}
      >
        <ul className="border rounded shadow divide-y overflow-hidden">
          {children}
        </ul>
      </div>
    </div>
  );
};

export default Dropdown;
