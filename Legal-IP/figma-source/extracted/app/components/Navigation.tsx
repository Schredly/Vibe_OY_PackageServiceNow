import React from 'react';

export function Tabs({ tabs, activeTab, onChange }: { tabs: string[]; activeTab: string; onChange: (tab: string) => void }) {
  return (
    <div className="border-b border-[var(--iplegal-border)]">
      <div className="flex gap-[var(--iplegal-spacing-8)]">
        {tabs.map(tab => (
          <button
            key={tab}
            type="button"
            onClick={() => onChange(tab)}
            className={`px-[var(--iplegal-spacing-16)] py-[var(--iplegal-spacing-12)] border-b-2 transition-colors ${
              activeTab === tab
                ? 'border-[var(--iplegal-primary)] text-[var(--iplegal-primary)]'
                : 'border-transparent text-[var(--iplegal-gray-600)] hover:text-[var(--iplegal-gray-900)] hover:border-[var(--iplegal-gray-300)]'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>
    </div>
  );
}

export function Stepper({ steps, currentStep }: { steps: string[]; currentStep: number }) {
  return (
    <div className="flex items-center">
      {steps.map((step, idx) => (
        <React.Fragment key={step}>
          <div className="flex flex-col items-center">
            <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
              idx < currentStep ? 'bg-[var(--iplegal-success)] text-white' :
              idx === currentStep ? 'bg-[var(--iplegal-primary)] text-white' :
              'bg-[var(--iplegal-gray-200)] text-[var(--iplegal-gray-600)]'
            }`}>
              {idx < currentStep ? '✓' : idx + 1}
            </div>
            <div className={`mt-[var(--iplegal-spacing-4)] text-xs ${
              idx <= currentStep ? 'text-[var(--iplegal-gray-900)]' : 'text-[var(--iplegal-gray-500)]'
            }`}>
              {step}
            </div>
          </div>
          {idx < steps.length - 1 && (
            <div className={`flex-1 h-[2px] mx-[var(--iplegal-spacing-8)] ${
              idx < currentStep ? 'bg-[var(--iplegal-success)]' : 'bg-[var(--iplegal-gray-200)]'
            }`} />
          )}
        </React.Fragment>
      ))}
    </div>
  );
}

export function Breadcrumb({ items }: { items: string[] }) {
  return (
    <nav className="flex items-center gap-[var(--iplegal-spacing-8)] text-[var(--iplegal-gray-600)]">
      {items.map((item, idx) => (
        <React.Fragment key={item}>
          {idx > 0 && <span>/</span>}
          <span className={idx === items.length - 1 ? 'text-[var(--iplegal-gray-900)]' : 'hover:text-[var(--iplegal-primary)] cursor-pointer'}>
            {item}
          </span>
        </React.Fragment>
      ))}
    </nav>
  );
}

export function Pagination({ currentPage, totalPages, onPageChange }: { currentPage: number; totalPages: number; onPageChange: (page: number) => void }) {
  return (
    <div className="flex items-center gap-[var(--iplegal-spacing-8)]">
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="px-[var(--iplegal-spacing-12)] py-[var(--iplegal-spacing-8)] border border-[var(--iplegal-border)] rounded-[var(--iplegal-radius)] disabled:opacity-50 disabled:cursor-not-allowed hover:bg-[var(--iplegal-gray-50)]"
      >
        Previous
      </button>
      <div className="flex gap-[var(--iplegal-spacing-4)]">
        {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
          <button
            key={page}
            onClick={() => onPageChange(page)}
            className={`w-8 h-8 rounded-[var(--iplegal-radius)] ${
              page === currentPage
                ? 'bg-[var(--iplegal-primary)] text-white'
                : 'border border-[var(--iplegal-border)] hover:bg-[var(--iplegal-gray-50)]'
            }`}
          >
            {page}
          </button>
        ))}
      </div>
      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="px-[var(--iplegal-spacing-12)] py-[var(--iplegal-spacing-8)] border border-[var(--iplegal-border)] rounded-[var(--iplegal-radius)] disabled:opacity-50 disabled:cursor-not-allowed hover:bg-[var(--iplegal-gray-50)]"
      >
        Next
      </button>
    </div>
  );
}
