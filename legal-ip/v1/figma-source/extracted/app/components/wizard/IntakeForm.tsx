import React from 'react';
import { RequestType, FormData, ValidationErrors, getFieldsForType } from '../RequestWizard';
import { PrimaryButton, SecondaryButton } from '../Buttons';
import { Tooltip } from '../Overlays';

interface IntakeFormProps {
  requestType: RequestType;
  formData: FormData;
  errors: ValidationErrors;
  onUpdate: (data: FormData) => void;
  onNext: () => void;
  onPrevious: () => void;
  onSaveDraft: () => void;
}

export function IntakeForm({ requestType, formData, errors, onUpdate, onNext, onPrevious, onSaveDraft }: IntakeFormProps) {
  const fields = getFieldsForType(requestType.id);

  const handleChange = (fieldId: string, value: string | boolean) => {
    onUpdate({
      ...formData,
      [fieldId]: value
    });
  };

  const renderField = (field: typeof fields[0]) => {
    const hasError = !!errors[field.id];
    const errorClass = hasError ? 'border-[var(--iplegal-danger)] focus:ring-[var(--iplegal-danger)]' : 'border-[var(--iplegal-border)] focus:ring-[var(--iplegal-focus-ring)]';

    return (
      <div key={field.id} className="mb-[var(--iplegal-spacing-24)]">
        <div className="flex items-center gap-[var(--iplegal-spacing-8)] mb-[var(--iplegal-spacing-8)]">
          <label className="text-[var(--iplegal-gray-900)]">
            {field.label}
            {field.mandatory && <span className="text-[var(--iplegal-danger)] ml-1">*</span>}
          </label>
          <Tooltip text={field.helpText}>
            <span className="text-[var(--iplegal-gray-500)] cursor-help text-sm">ℹ️</span>
          </Tooltip>
        </div>

        {field.type === 'short-text' && (
          <input
            type="text"
            value={(formData[field.id] as string) || ''}
            onChange={(e) => handleChange(field.id, e.target.value)}
            className={`w-full px-[var(--iplegal-spacing-12)] py-[var(--iplegal-spacing-8)] border rounded-[var(--iplegal-radius)] focus:outline-none focus:ring-2 focus:border-transparent ${errorClass}`}
          />
        )}

        {field.type === 'long-text' && (
          <textarea
            value={(formData[field.id] as string) || ''}
            onChange={(e) => handleChange(field.id, e.target.value)}
            rows={5}
            className={`w-full px-[var(--iplegal-spacing-12)] py-[var(--iplegal-spacing-8)] border rounded-[var(--iplegal-radius)] focus:outline-none focus:ring-2 focus:border-transparent ${errorClass}`}
          />
        )}

        {field.type === 'select' && (
          <select
            value={(formData[field.id] as string) || ''}
            onChange={(e) => handleChange(field.id, e.target.value)}
            className={`w-full px-[var(--iplegal-spacing-12)] py-[var(--iplegal-spacing-8)] border rounded-[var(--iplegal-radius)] focus:outline-none focus:ring-2 focus:border-transparent bg-white ${errorClass}`}
          >
            <option value="">Select an option...</option>
            {field.options?.map(option => (
              <option key={option} value={option}>{option}</option>
            ))}
          </select>
        )}

        {field.type === 'checkbox' && (
          <label className="flex items-center gap-[var(--iplegal-spacing-8)] cursor-pointer">
            <input
              type="checkbox"
              checked={(formData[field.id] as boolean) || false}
              onChange={(e) => handleChange(field.id, e.target.checked)}
              className="w-4 h-4 border border-[var(--iplegal-border)] rounded focus:ring-2 focus:ring-[var(--iplegal-focus-ring)] accent-[var(--iplegal-primary)]"
            />
            <span className="text-sm text-[var(--iplegal-gray-700)]">Yes</span>
          </label>
        )}

        {field.type === 'date' && (
          <input
            type="date"
            value={(formData[field.id] as string) || ''}
            onChange={(e) => handleChange(field.id, e.target.value)}
            className={`w-full px-[var(--iplegal-spacing-12)] py-[var(--iplegal-spacing-8)] border rounded-[var(--iplegal-radius)] focus:outline-none focus:ring-2 focus:border-transparent ${errorClass}`}
          />
        )}

        {hasError && (
          <p className="mt-[var(--iplegal-spacing-4)] text-sm text-[var(--iplegal-danger)]">
            {errors[field.id]}
          </p>
        )}
      </div>
    );
  };

  return (
    <>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-[var(--iplegal-spacing-24)] pb-[80px] md:pb-0">
        <div className="lg:col-span-2">
        <div className="bg-white border border-[var(--iplegal-border)] rounded-[var(--iplegal-radius-lg)] p-[var(--iplegal-spacing-24)]">
          <div className="mb-[var(--iplegal-spacing-24)]">
            <div className="flex items-center gap-[var(--iplegal-spacing-12)] mb-[var(--iplegal-spacing-8)]">
              <span className="text-3xl">{requestType.icon}</span>
              <h3 className="text-[var(--iplegal-gray-900)]">{requestType.name}</h3>
            </div>
            <p className="text-sm text-[var(--iplegal-gray-600)]">{requestType.description}</p>
          </div>

          <div className="border-t border-[var(--iplegal-border)] pt-[var(--iplegal-spacing-24)]">
            <h4 className="text-[var(--iplegal-gray-900)] mb-[var(--iplegal-spacing-16)]">
              Request Details
            </h4>
            {fields.map(renderField)}
          </div>

          {/* Desktop actions */}
          <div className="hidden md:flex border-t border-[var(--iplegal-border)] pt-[var(--iplegal-spacing-24)] gap-[var(--iplegal-spacing-12)] justify-between">
            <div className="flex gap-[var(--iplegal-spacing-12)]">
              <SecondaryButton onClick={onPrevious}>
                ← Previous
              </SecondaryButton>
              <SecondaryButton onClick={onSaveDraft}>
                💾 Save Draft
              </SecondaryButton>
            </div>
            <PrimaryButton onClick={onNext}>
              Next →
            </PrimaryButton>
          </div>
        </div>
      </div>

        <div className="hidden lg:block">
          <WhatYouNeed requestType={requestType} />
        </div>
      </div>

      {/* Mobile sticky footer actions */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-[var(--iplegal-border)] shadow-[var(--iplegal-shadow-lg)] z-40">
        <div className="p-[var(--iplegal-spacing-16)] flex gap-[var(--iplegal-spacing-12)]">
          <SecondaryButton onClick={onPrevious} className="flex-1 min-h-[44px]">
            ← Previous
          </SecondaryButton>
          <PrimaryButton onClick={onNext} className="flex-1 min-h-[44px]">
            Next →
          </PrimaryButton>
        </div>
        <button
          onClick={onSaveDraft}
          className="w-full py-[var(--iplegal-spacing-12)] text-[var(--iplegal-primary)] hover:bg-[var(--iplegal-gray-50)] border-t border-[var(--iplegal-border)] min-h-[44px]"
        >
          💾 Save Draft
        </button>
      </div>
    </>
  );
}

function WhatYouNeed({ requestType }: { requestType: RequestType }) {
  const guidanceByType: { [key: string]: { items: string[]; tips: string[] } } = {
    patent: {
      items: [
        'Detailed description of the invention',
        'Diagrams or flowcharts (if applicable)',
        'List of all inventors',
        'Prior art search results (if available)',
        'Information about any public disclosures'
      ],
      tips: [
        'File before any public disclosure to preserve rights',
        'Include technical details about how it works',
        'Describe the problem it solves and advantages'
      ]
    },
    trademark: {
      items: [
        'Clear representation of the mark (logo/wordmark)',
        'Description of goods/services',
        'Evidence of first use in commerce',
        'Examples of mark usage in marketing'
      ],
      tips: [
        'Ensure the mark is distinctive and not generic',
        'Search existing trademarks to avoid conflicts',
        'Provide samples showing the mark in actual use'
      ]
    },
    copyright: {
      items: [
        'Complete copy of the work',
        'Date of creation and publication',
        'List of all authors/creators',
        'Information about derivative works'
      ],
      tips: [
        'Copyright exists from creation, but registration provides benefits',
        'Include all versions if the work has been updated',
        'Document chain of authorship for clarity'
      ]
    }
  };

  const guidance = guidanceByType[requestType.id] || {
    items: ['Detailed information about your request', 'Supporting documentation', 'Contact information'],
    tips: ['Provide as much detail as possible', 'Consult with your team before submitting']
  };

  return (
    <div className="bg-white border border-[var(--iplegal-border)] rounded-[var(--iplegal-radius-lg)] p-[var(--iplegal-spacing-24)] sticky top-[var(--iplegal-spacing-24)]">
      <h4 className="text-[var(--iplegal-gray-900)] mb-[var(--iplegal-spacing-16)]">
        What You'll Need
      </h4>

      <div className="mb-[var(--iplegal-spacing-24)]">
        <h5 className="text-sm text-[var(--iplegal-gray-700)] mb-[var(--iplegal-spacing-12)]">
          Required Information
        </h5>
        <ul className="space-y-[var(--iplegal-spacing-8)] text-sm text-[var(--iplegal-gray-700)]">
          {guidance.items.map((item, idx) => (
            <li key={idx} className="flex gap-[var(--iplegal-spacing-8)]">
              <span className="text-[var(--iplegal-success)]">✓</span>
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </div>

      <div className="border-t border-[var(--iplegal-border)] pt-[var(--iplegal-spacing-16)]">
        <h5 className="text-sm text-[var(--iplegal-gray-700)] mb-[var(--iplegal-spacing-12)]">
          Helpful Tips
        </h5>
        <ul className="space-y-[var(--iplegal-spacing-8)] text-sm text-[var(--iplegal-gray-600)]">
          {guidance.tips.map((tip, idx) => (
            <li key={idx} className="flex gap-[var(--iplegal-spacing-8)]">
              <span>💡</span>
              <span>{tip}</span>
            </li>
          ))}
        </ul>
      </div>

      <div className="mt-[var(--iplegal-spacing-24)] p-[var(--iplegal-spacing-12)] bg-[var(--iplegal-info-bg)] border border-[var(--iplegal-info-border)] rounded-[var(--iplegal-radius)]">
        <p className="text-xs text-[var(--iplegal-info)]">
          <strong>Need help?</strong> Contact the legal team at iplegal@company.com or ext. 5500
        </p>
      </div>
    </div>
  );
}
