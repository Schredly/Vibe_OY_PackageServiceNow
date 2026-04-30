import React, { useState } from 'react';

export function Tooltip({ text, children }: { text: string; children: React.ReactNode }) {
  const [show, setShow] = useState(false);

  return (
    <div className="relative inline-block">
      <div
        onMouseEnter={() => setShow(true)}
        onMouseLeave={() => setShow(false)}
      >
        {children}
      </div>
      {show && (
        <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-[var(--iplegal-spacing-8)] px-[var(--iplegal-spacing-12)] py-[var(--iplegal-spacing-8)] bg-[var(--iplegal-gray-900)] text-white rounded-[var(--iplegal-radius)] text-xs whitespace-nowrap z-50 shadow-[var(--iplegal-shadow-lg)]">
          {text}
          <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-[var(--iplegal-gray-900)]" />
        </div>
      )}
    </div>
  );
}

export function Toast({ message, type = 'info', onClose }: { message: string; type?: 'success' | 'warning' | 'danger' | 'info'; onClose: () => void }) {
  const typeStyles = {
    success: 'bg-[var(--iplegal-success)] border-[var(--iplegal-success)]',
    warning: 'bg-[var(--iplegal-warning)] border-[var(--iplegal-warning)]',
    danger: 'bg-[var(--iplegal-danger)] border-[var(--iplegal-danger)]',
    info: 'bg-[var(--iplegal-info)] border-[var(--iplegal-info)]'
  };

  return (
    <div className={`flex items-center justify-between px-[var(--iplegal-spacing-16)] py-[var(--iplegal-spacing-12)] rounded-[var(--iplegal-radius)] border text-white shadow-[var(--iplegal-shadow-md)] ${typeStyles[type]}`}>
      <span>{message}</span>
      <button onClick={onClose} className="ml-[var(--iplegal-spacing-16)] hover:opacity-80">
        ✕
      </button>
    </div>
  );
}

export function Modal({ isOpen, onClose, title, children }: { isOpen: boolean; onClose: () => void; title: string; children: React.ReactNode }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50" onClick={onClose}>
      <div className="bg-white rounded-[var(--iplegal-radius-lg)] shadow-[var(--iplegal-shadow-lg)] max-w-lg w-full mx-[var(--iplegal-spacing-16)]" onClick={e => e.stopPropagation()}>
        <div className="flex items-center justify-between px-[var(--iplegal-spacing-24)] py-[var(--iplegal-spacing-16)] border-b border-[var(--iplegal-border)]">
          <h3 className="text-[var(--iplegal-gray-900)]">{title}</h3>
          <button onClick={onClose} className="text-[var(--iplegal-gray-600)] hover:text-[var(--iplegal-gray-900)]">
            ✕
          </button>
        </div>
        <div className="p-[var(--iplegal-spacing-24)]">
          {children}
        </div>
      </div>
    </div>
  );
}

export function Card({ title, children }: { title?: string; children: React.ReactNode }) {
  return (
    <div className="bg-white border border-[var(--iplegal-border)] rounded-[var(--iplegal-radius-lg)] shadow-[var(--iplegal-shadow-sm)] overflow-hidden">
      {title && (
        <div className="px-[var(--iplegal-spacing-24)] py-[var(--iplegal-spacing-16)] border-b border-[var(--iplegal-border)] bg-[var(--iplegal-gray-50)]">
          <h3 className="text-[var(--iplegal-gray-900)]">{title}</h3>
        </div>
      )}
      <div className="p-[var(--iplegal-spacing-24)]">
        {children}
      </div>
    </div>
  );
}
