import React, { useState, useRef } from 'react';
import { RequestType, FormData, getFieldsForType } from '../RequestWizard';
import { PrimaryButton, SecondaryButton } from '../Buttons';

interface ReviewSubmitProps {
  requestType: RequestType;
  formData: FormData;
  attachments: File[];
  onAttachmentsChange: (files: File[]) => void;
  onEdit: () => void;
  onPrevious: () => void;
  onSubmit: () => void;
}

export function ReviewSubmit({ requestType, formData, attachments, onAttachmentsChange, onEdit, onPrevious, onSubmit }: ReviewSubmitProps) {
  const [confirmed, setConfirmed] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const fields = getFieldsForType(requestType.id);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const files = Array.from(e.dataTransfer.files);
    onAttachmentsChange([...attachments, ...files]);
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const files = Array.from(e.target.files);
      onAttachmentsChange([...attachments, ...files]);
    }
  };

  const removeAttachment = (index: number) => {
    onAttachmentsChange(attachments.filter((_, i) => i !== index));
  };

  const formatValue = (value: string | boolean, type: string): string => {
    if (typeof value === 'boolean') {
      return value ? 'Yes' : 'No';
    }
    if (type === 'date' && value) {
      return new Date(value).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
    }
    return value || 'Not provided';
  };

  const handleSubmitClick = () => {
    if (!confirmed) {
      alert('Please confirm that the information is accurate before submitting.');
      return;
    }
    onSubmit();
  };

  return (
    <div className="max-w-4xl mx-auto pb-[80px] md:pb-0">
      <div className="bg-white border border-[var(--iplegal-border)] rounded-[var(--iplegal-radius-lg)] p-[var(--iplegal-spacing-24)] mb-[var(--iplegal-spacing-24)]">
        <div className="flex items-start justify-between mb-[var(--iplegal-spacing-24)]">
          <div>
            <h3 className="text-[var(--iplegal-gray-900)] mb-[var(--iplegal-spacing-8)]">
              Review & Submit
            </h3>
            <p className="text-sm text-[var(--iplegal-gray-600)]">
              Please review your request details before submitting
            </p>
          </div>
        </div>

        <div className="border-t border-[var(--iplegal-border)] pt-[var(--iplegal-spacing-24)]">
          <div className="flex items-center justify-between mb-[var(--iplegal-spacing-16)]">
            <div className="flex items-center gap-[var(--iplegal-spacing-12)]">
              <span className="text-3xl">{requestType.icon}</span>
              <div>
                <h4 className="text-[var(--iplegal-gray-900)]">{requestType.name}</h4>
                <p className="text-sm text-[var(--iplegal-gray-600)]">
                  Priority: <span className={
                    requestType.defaultPriority === 'Critical' ? 'text-[var(--iplegal-danger)]' :
                    requestType.defaultPriority === 'High' ? 'text-[var(--iplegal-warning)]' :
                    'text-[var(--iplegal-info)]'
                  }>{requestType.defaultPriority}</span>
                </p>
              </div>
            </div>
            <button
              onClick={onEdit}
              className="text-[var(--iplegal-primary)] hover:underline text-sm"
            >
              Edit
            </button>
          </div>

          <div className="space-y-[var(--iplegal-spacing-16)]">
            {fields.map(field => {
              const value = formData[field.id];
              if (!value && !field.mandatory) return null;

              return (
                <div key={field.id} className="border-b border-[var(--iplegal-border)] pb-[var(--iplegal-spacing-16)] last:border-0">
                  <div className="text-sm text-[var(--iplegal-gray-600)] mb-[var(--iplegal-spacing-4)]">
                    {field.label}
                    {field.mandatory && <span className="text-[var(--iplegal-danger)] ml-1">*</span>}
                  </div>
                  <div className="text-[var(--iplegal-gray-900)]">
                    {formatValue(value, field.type)}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <div className="bg-white border border-[var(--iplegal-border)] rounded-[var(--iplegal-radius-lg)] p-[var(--iplegal-spacing-24)] mb-[var(--iplegal-spacing-24)]">
        <h4 className="text-[var(--iplegal-gray-900)] mb-[var(--iplegal-spacing-16)]">
          Attachments
        </h4>

        <div
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          className={`border-2 border-dashed rounded-[var(--iplegal-radius)] p-[var(--iplegal-spacing-32)] text-center transition-colors ${
            isDragging
              ? 'border-[var(--iplegal-primary)] bg-[var(--iplegal-info-bg)]'
              : 'border-[var(--iplegal-border)] hover:border-[var(--iplegal-primary)]'
          }`}
        >
          <div className="text-4xl mb-[var(--iplegal-spacing-8)]">📎</div>
          <p className="text-[var(--iplegal-gray-700)] mb-[var(--iplegal-spacing-8)]">
            Drag and drop files here, or
          </p>
          <button
            onClick={() => fileInputRef.current?.click()}
            className="text-[var(--iplegal-primary)] hover:underline"
          >
            browse to upload
          </button>
          <input
            ref={fileInputRef}
            type="file"
            multiple
            onChange={handleFileSelect}
            className="hidden"
          />
          <p className="text-xs text-[var(--iplegal-gray-500)] mt-[var(--iplegal-spacing-8)]">
            Supported formats: PDF, DOC, DOCX, PNG, JPG (max 10MB per file)
          </p>
        </div>

        {attachments.length > 0 && (
          <div className="mt-[var(--iplegal-spacing-16)]">
            <h5 className="text-sm text-[var(--iplegal-gray-700)] mb-[var(--iplegal-spacing-8)]">
              Attached Files ({attachments.length})
            </h5>
            <div className="space-y-[var(--iplegal-spacing-8)]">
              {attachments.map((file, idx) => (
                <div
                  key={idx}
                  className="flex items-center justify-between p-[var(--iplegal-spacing-12)] bg-[var(--iplegal-gray-50)] border border-[var(--iplegal-border)] rounded-[var(--iplegal-radius)]"
                >
                  <div className="flex items-center gap-[var(--iplegal-spacing-12)]">
                    <span className="text-xl">📄</span>
                    <div>
                      <div className="text-sm text-[var(--iplegal-gray-900)]">{file.name}</div>
                      <div className="text-xs text-[var(--iplegal-gray-600)]">
                        {(file.size / 1024).toFixed(1)} KB
                      </div>
                    </div>
                  </div>
                  <button
                    onClick={() => removeAttachment(idx)}
                    className="text-[var(--iplegal-danger)] hover:bg-[var(--iplegal-danger-bg)] p-[var(--iplegal-spacing-8)] rounded-[var(--iplegal-radius)]"
                  >
                    ✕
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      <div className="bg-white border border-[var(--iplegal-border)] rounded-[var(--iplegal-radius-lg)] p-[var(--iplegal-spacing-24)] mb-[var(--iplegal-spacing-24)]">
        <label className="flex items-start gap-[var(--iplegal-spacing-12)] cursor-pointer">
          <input
            type="checkbox"
            checked={confirmed}
            onChange={(e) => setConfirmed(e.target.checked)}
            className="mt-1 w-4 h-4 border border-[var(--iplegal-border)] rounded focus:ring-2 focus:ring-[var(--iplegal-focus-ring)] accent-[var(--iplegal-primary)]"
          />
          <div className="flex-1">
            <span className="text-[var(--iplegal-gray-900)]">
              I confirm the information is accurate
              <span className="text-[var(--iplegal-danger)] ml-1">*</span>
            </span>
            <p className="text-sm text-[var(--iplegal-gray-600)] mt-[var(--iplegal-spacing-4)]">
              By submitting this request, I confirm that all information provided is accurate and complete to the best of my knowledge. I understand that the legal team will review this request and may contact me for additional information.
            </p>
          </div>
        </label>
      </div>

      {/* Desktop actions */}
      <div className="hidden md:flex gap-[var(--iplegal-spacing-12)] justify-between">
        <SecondaryButton onClick={onPrevious}>
          ← Previous
        </SecondaryButton>
        <PrimaryButton
          onClick={handleSubmitClick}
          disabled={!confirmed}
          className={!confirmed ? '!opacity-50 !cursor-not-allowed' : ''}
        >
          Submit Request
        </PrimaryButton>
      </div>

      {/* Mobile sticky footer actions */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-[var(--iplegal-border)] shadow-[var(--iplegal-shadow-lg)] z-40">
        <div className="p-[var(--iplegal-spacing-16)] flex gap-[var(--iplegal-spacing-12)]">
          <SecondaryButton onClick={onPrevious} className="flex-1 min-h-[44px]">
            ← Previous
          </SecondaryButton>
          <PrimaryButton
            onClick={handleSubmitClick}
            disabled={!confirmed}
            className={`flex-1 min-h-[44px] ${!confirmed ? '!opacity-50 !cursor-not-allowed' : ''}`}
          >
            Submit
          </PrimaryButton>
        </div>
      </div>
    </div>
  );
}
