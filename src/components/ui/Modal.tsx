"use client";

import { Dialog, Transition } from "@headlessui/react";
import { Fragment } from "react";

type ModalProps = {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
};

const Modal = ({ isOpen, onClose, children }: ModalProps) => {
  return (
    <Transition show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={onClose}>
        <div
          className="fixed inset-0 bg-[var(--text-color)]/40"
          aria-hidden="true"
        />

        <div className="fixed inset-0 flex items-center justify-center">
          <div
            className="h-full w-full transform bg-[var(--background)] p-6 shadow-lg transition-all duration-300 ease-out sm:h-auto sm:max-w-md sm:rounded-lg sm:p-8"
            style={{
              opacity: isOpen ? 1 : 0,
              scale: isOpen ? 1 : 0.95,
            }}
          >
            {children}
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};

export default Modal;
