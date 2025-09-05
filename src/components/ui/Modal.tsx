"use client";

import { Dialog, Transition } from "@headlessui/react";
import { Fragment } from "react";

type ModalProps = {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
};

const Modal = ({ isOpen, onClose, title, children }: ModalProps) => {
  return (
    <Transition show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={onClose}>
        <div className="fixed inset-0 bg-black/30" aria-hidden="true" />

        <div className="fixed inset-0 flex items-center justify-center p-4">
          <div
            className="w-full max-w-md rounded-2xl bg-white p-6 shadow-xl transform transition-all duration-300 ease-out"
            style={{
              opacity: isOpen ? 1 : 0,
              scale: isOpen ? 1 : 0.95,
            }}
          >
            {title && (
              <h2 className="text-lg font-medium text-gray-900 mb-4">
                {title}
              </h2>
            )}
            {children}
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};

export default Modal;
