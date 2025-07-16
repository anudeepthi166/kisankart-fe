// Modal.tsx

import { X } from 'lucide-react';
import React from 'react';

interface ModalProps {
  isOpen: Boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, title, children }) => {
  if(!isOpen) return
 return (
  <div className="fixed inset-0 flex justify-center items-center z-50">
    {/* Overlay */}
    <div
      className="absolute inset-0  backdrop-blur z-40" onClick={onClose}
    />

    {/* Modal content */}
    <div className="relative z-50 bg-white p-6 rounded-lg shadow-lg w-full max-w-2xl">
      <div className="flex justify-between items-center mb-2">
        <h2 className="text-2xl font-bold text-green-700 mb-2 text-center w-full">
          {title}
        </h2>
        <button
          className="absolute top-4 right-4 text-gray-600"
          onClick={onClose}
        >
          <X
            size={30}
            className="bg-gray-100 rounded hover:bg-yellow-500"
          />
        </button>
      </div>
      {children}
    </div>
  </div>
);
}

export default Modal;
