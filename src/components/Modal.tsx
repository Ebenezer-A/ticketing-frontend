import { X } from "lucide-react";
import React from "react";

type ModalProps = {
  isOpen: boolean;
  children: React.ReactNode;
  onClose: () => void;
};

function Modal({ isOpen, children, onClose }: ModalProps) {
  return (
    <div
      onClick={onClose}
      className={`fixed inset-0 flex items-center justify-center transition-colors ${
        isOpen ? "visible bg-black/50" : "invisible"
      } `}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className={`rounded-xl bg-white p-6 shadow transition-all ${
          isOpen ? "scale-100 opacity-100" : "scale-125 opacity-0"
        } `}
      >
        <button
          onClick={onClose}
          className="absolute top-2 right-2 rounded-lg bg-white p-1 text-gray-400 hover:bg-gray-50 hover:text-gray-600"
        >
          <X />
        </button>
        {children}
      </div>
    </div>
  );
}

export default Modal;
