"use client";

import { Dialog, Transition } from "@headlessui/react";
import { XCircleIcon } from "@heroicons/react/24/solid";
import { Fragment } from "react";

type ModalProps = {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  title?: string;
};

const Modal = ({ isOpen, onClose, children, title }: ModalProps) => {
  return (
    <Transition show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={onClose}>
        <div className="fixed inset-0 bg-[var(--text-color)]/40" aria-hidden="true" />

        <div className="fixed inset-0 flex items-center justify-center">
          <div
            className="flex h-full w-full transform flex-col overflow-y-auto bg-[var(--background)] px-6 py-8 shadow-lg transition-all duration-300 ease-out sm:h-auto sm:max-h-5/6 sm:max-w-md sm:rounded-lg sm:px-6"
            style={{
              opacity: isOpen ? 1 : 0,
              scale: isOpen ? 1 : 0.95
            }}
          >
            <div
              className={`flex items-center ${title ? "mb-6 justify-between" : "mb-4 justify-end"}`}
            >
              {title && <h2 className="font-center text-lg font-medium">{title}</h2>}

              <button type="button" onClick={onClose} className="cursor-pointer">
                <XCircleIcon className="h-5 w-5 rounded-full bg-[var(--primary-color)] text-[var(--background)]" />
              </button>
            </div>

            {children}
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};

export default Modal;
