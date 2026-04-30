import React from 'react';

export function PrimaryButton({ children, className, ...props }: React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      className={`px-[var(--iplegal-spacing-16)] py-[var(--iplegal-spacing-8)] bg-[var(--iplegal-primary)] text-white rounded-[var(--iplegal-radius)] hover:bg-[var(--iplegal-primary-hover)] active:bg-[var(--iplegal-primary-active)] disabled:opacity-50 disabled:cursor-not-allowed transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--iplegal-primary)] ${className || ''}`}
      {...props}
    >
      {children}
    </button>
  );
}

export function SecondaryButton({ children, className, ...props }: React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      className={`px-[var(--iplegal-spacing-16)] py-[var(--iplegal-spacing-8)] bg-white text-[var(--iplegal-gray-700)] border border-[var(--iplegal-border)] rounded-[var(--iplegal-radius)] hover:bg-[var(--iplegal-gray-50)] active:bg-[var(--iplegal-gray-100)] disabled:opacity-50 disabled:cursor-not-allowed transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--iplegal-primary)] ${className || ''}`}
      {...props}
    >
      {children}
    </button>
  );
}
