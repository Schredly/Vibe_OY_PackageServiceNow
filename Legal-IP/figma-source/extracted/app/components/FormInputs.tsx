import React from 'react';

export function TextInput({ label, ...props }: { label?: string } & React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <div className="flex flex-col gap-[var(--iplegal-spacing-4)]">
      {label && <label className="text-[var(--iplegal-gray-700)]">{label}</label>}
      <input
        type="text"
        className="px-[var(--iplegal-spacing-12)] py-[var(--iplegal-spacing-8)] border border-[var(--iplegal-border)] rounded-[var(--iplegal-radius)] focus:outline-none focus:ring-2 focus:ring-[var(--iplegal-focus-ring)] focus:border-transparent"
        {...props}
      />
    </div>
  );
}

export function TextArea({ label, ...props }: { label?: string } & React.TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return (
    <div className="flex flex-col gap-[var(--iplegal-spacing-4)]">
      {label && <label className="text-[var(--iplegal-gray-700)]">{label}</label>}
      <textarea
        className="px-[var(--iplegal-spacing-12)] py-[var(--iplegal-spacing-8)] border border-[var(--iplegal-border)] rounded-[var(--iplegal-radius)] focus:outline-none focus:ring-2 focus:ring-[var(--iplegal-focus-ring)] focus:border-transparent min-h-[100px]"
        {...props}
      />
    </div>
  );
}

export function Select({ label, options, ...props }: { label?: string; options: { value: string; label: string }[] } & React.SelectHTMLAttributes<HTMLSelectElement>) {
  return (
    <div className="flex flex-col gap-[var(--iplegal-spacing-4)]">
      {label && <label className="text-[var(--iplegal-gray-700)]">{label}</label>}
      <select
        className="px-[var(--iplegal-spacing-12)] py-[var(--iplegal-spacing-8)] border border-[var(--iplegal-border)] rounded-[var(--iplegal-radius)] focus:outline-none focus:ring-2 focus:ring-[var(--iplegal-focus-ring)] focus:border-transparent bg-white"
        {...props}
      >
        {options.map(opt => (
          <option key={opt.value} value={opt.value}>{opt.label}</option>
        ))}
      </select>
    </div>
  );
}

export function DateInput({ label, ...props }: { label?: string } & React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <div className="flex flex-col gap-[var(--iplegal-spacing-4)]">
      {label && <label className="text-[var(--iplegal-gray-700)]">{label}</label>}
      <input
        type="date"
        className="px-[var(--iplegal-spacing-12)] py-[var(--iplegal-spacing-8)] border border-[var(--iplegal-border)] rounded-[var(--iplegal-radius)] focus:outline-none focus:ring-2 focus:ring-[var(--iplegal-focus-ring)] focus:border-transparent"
        {...props}
      />
    </div>
  );
}

export function ChoicePills({ label, options, selected, onChange }: { label?: string; options: string[]; selected: string; onChange: (value: string) => void }) {
  return (
    <div className="flex flex-col gap-[var(--iplegal-spacing-8)]">
      {label && <label className="text-[var(--iplegal-gray-700)]">{label}</label>}
      <div className="flex flex-wrap gap-[var(--iplegal-spacing-8)]">
        {options.map(option => (
          <button
            key={option}
            type="button"
            onClick={() => onChange(option)}
            className={`px-[var(--iplegal-spacing-16)] py-[var(--iplegal-spacing-8)] rounded-full transition-colors ${
              selected === option
                ? 'bg-[var(--iplegal-primary)] text-white'
                : 'bg-[var(--iplegal-gray-100)] text-[var(--iplegal-gray-700)] hover:bg-[var(--iplegal-gray-200)]'
            }`}
          >
            {option}
          </button>
        ))}
      </div>
    </div>
  );
}

export function Checkbox({ label, ...props }: { label: string } & React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <label className="flex items-center gap-[var(--iplegal-spacing-8)] cursor-pointer">
      <input
        type="checkbox"
        className="w-4 h-4 border border-[var(--iplegal-border)] rounded focus:ring-2 focus:ring-[var(--iplegal-focus-ring)] accent-[var(--iplegal-primary)]"
        {...props}
      />
      <span className="text-[var(--iplegal-gray-700)]">{label}</span>
    </label>
  );
}

export function Radio({ label, name, value, ...props }: { label: string; name: string; value: string } & React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <label className="flex items-center gap-[var(--iplegal-spacing-8)] cursor-pointer">
      <input
        type="radio"
        name={name}
        value={value}
        className="w-4 h-4 border border-[var(--iplegal-border)] focus:ring-2 focus:ring-[var(--iplegal-focus-ring)] accent-[var(--iplegal-primary)]"
        {...props}
      />
      <span className="text-[var(--iplegal-gray-700)]">{label}</span>
    </label>
  );
}
