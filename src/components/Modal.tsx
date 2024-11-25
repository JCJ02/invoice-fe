import React from "react";

type ModalProps = {
  isOpen?: boolean;
  onClose?: () => void;
  className?: string;
  children: React.ReactNode;
};

const Modal = ({ className, children, isOpen, onClose }: ModalProps) => {
  if (!isOpen) return null;
  return (
    <div
      className={`${className} fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50`}
      onClick={onClose}
    >
      <div onClick={(event) => event.stopPropagation()}>{children}</div>
    </div>
  );
};

export default Modal;
