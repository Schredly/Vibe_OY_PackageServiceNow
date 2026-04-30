import React, { useState } from 'react';
import { PrimaryButton, SecondaryButton } from './Buttons';

interface AddDocumentModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (document: DocumentData) => void;
}

export interface DocumentData {
  name: string;
  category: string;
  url: string;
  notes: string;
}

const documentCategories = [
  'Technical Documentation',
  'Legal Analysis',
  'Prior Art',
  'Diagrams',
  'Supporting Materials',
  'Correspondence',
  'Contracts',
  'Other'
];

export function AddDocumentModal({ isOpen, onClose, onSave }: AddDocumentModalProps) {
  const [formData, setFormData] = useState<DocumentData>({
    name: '',
    category: '',
    url: '',
    notes: ''
  });
  const [errors, setErrors] = useState<{ name?: string; category?: string }>({});
  const [touched, setTouched] = useState<{ name?: boolean; category?: boolean }>({});

  const handleChange = (field: keyof DocumentData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    // Clear error when user starts typing
    if (errors[field as keyof typeof errors]) {
      setErrors(prev => ({ ...prev, [field]: undefined }));
    }
  };

  const handleBlur = (field: keyof DocumentData) => {
    setTouched(prev => ({ ...prev, [field]: true }));
    validateField(field);
  };

  const validateField = (field: keyof DocumentData) => {
    const newErrors: typeof errors = { ...errors };

    if (field === 'name') {
      if (!formData.name.trim()) {
        newErrors.name = 'Document name is required';
      } else {
        delete newErrors.name;
      }
    }

    if (field === 'category') {
      if (!formData.category) {
        newErrors.category = 'Category is required';
      } else {
        delete newErrors.category;
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateForm = () => {
    const newErrors: typeof errors = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Document name is required';
    }

    if (!formData.category) {
      newErrors.category = 'Category is required';
    }

    setErrors(newErrors);
    setTouched({ name: true, category: true });
    return Object.keys(newErrors).length === 0;
  };

  const handleSave = () => {
    if (validateForm()) {
      onSave(formData);
      handleClose();
    }
  };

  const handleClose = () => {
    setFormData({ name: '', category: '', url: '', notes: '' });
    setErrors({});
    setTouched({});
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-[var(--iplegal-spacing-16)]" onClick={handleClose}>
      <div className="bg-white rounded-[var(--iplegal-radius-lg)] shadow-[var(--iplegal-shadow-lg)] max-w-2xl w-full" onClick={e => e.stopPropagation()}>
        <div className="flex items-center justify-between px-[var(--iplegal-spacing-24)] py-[var(--iplegal-spacing-16)] border-b border-[var(--iplegal-border)]">
          <h3 className="text-[var(--iplegal-gray-900)]">Add Document</h3>
          <button onClick={handleClose} className="text-[var(--iplegal-gray-600)] hover:text-[var(--iplegal-gray-900)] text-2xl">
            ✕
          </button>
        </div>

        <div className="p-[var(--iplegal-spacing-24)]">
          <div className="space-y-[var(--iplegal-spacing-24)]">
            <div>
              <label className="block text-[var(--iplegal-gray-900)] mb-[var(--iplegal-spacing-8)]">
                Document Name
                <span className="text-[var(--iplegal-danger)] ml-1">*</span>
              </label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => handleChange('name', e.target.value)}
                onBlur={() => handleBlur('name')}
                placeholder="e.g., Technical Specification v2.1"
                className={`w-full px-[var(--iplegal-spacing-12)] py-[var(--iplegal-spacing-8)] border rounded-[var(--iplegal-radius)] focus:outline-none focus:ring-2 focus:border-transparent ${
                  errors.name && touched.name
                    ? 'border-[var(--iplegal-danger)] focus:ring-[var(--iplegal-danger)]'
                    : 'border-[var(--iplegal-border)] focus:ring-[var(--iplegal-focus-ring)]'
                }`}
              />
              {errors.name && touched.name && (
                <p className="mt-[var(--iplegal-spacing-4)] text-sm text-[var(--iplegal-danger)]">
                  {errors.name}
                </p>
              )}
            </div>

            <div>
              <label className="block text-[var(--iplegal-gray-900)] mb-[var(--iplegal-spacing-8)]">
                Category
                <span className="text-[var(--iplegal-danger)] ml-1">*</span>
              </label>
              <select
                value={formData.category}
                onChange={(e) => handleChange('category', e.target.value)}
                onBlur={() => handleBlur('category')}
                className={`w-full px-[var(--iplegal-spacing-12)] py-[var(--iplegal-spacing-8)] border rounded-[var(--iplegal-radius)] focus:outline-none focus:ring-2 focus:border-transparent bg-white ${
                  errors.category && touched.category
                    ? 'border-[var(--iplegal-danger)] focus:ring-[var(--iplegal-danger)]'
                    : 'border-[var(--iplegal-border)] focus:ring-[var(--iplegal-focus-ring)]'
                }`}
              >
                <option value="">Select a category...</option>
                {documentCategories.map(category => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
              {errors.category && touched.category && (
                <p className="mt-[var(--iplegal-spacing-4)] text-sm text-[var(--iplegal-danger)]">
                  {errors.category}
                </p>
              )}
            </div>

            <div>
              <label className="block text-[var(--iplegal-gray-900)] mb-[var(--iplegal-spacing-8)]">
                Document URL
                <span className="text-[var(--iplegal-gray-600)] text-sm ml-2">(Optional)</span>
              </label>
              <input
                type="url"
                value={formData.url}
                onChange={(e) => handleChange('url', e.target.value)}
                placeholder="https://example.com/document.pdf"
                className="w-full px-[var(--iplegal-spacing-12)] py-[var(--iplegal-spacing-8)] border border-[var(--iplegal-border)] rounded-[var(--iplegal-radius)] focus:outline-none focus:ring-2 focus:ring-[var(--iplegal-focus-ring)] focus:border-transparent"
              />
              <p className="mt-[var(--iplegal-spacing-4)] text-xs text-[var(--iplegal-gray-600)]">
                Provide a link to an external document (e.g., SharePoint, Google Drive)
              </p>
            </div>

            <div>
              <label className="block text-[var(--iplegal-gray-900)] mb-[var(--iplegal-spacing-8)]">
                Notes
                <span className="text-[var(--iplegal-gray-600)] text-sm ml-2">(Optional)</span>
              </label>
              <textarea
                value={formData.notes}
                onChange={(e) => handleChange('notes', e.target.value)}
                placeholder="Add any additional notes or context about this document..."
                rows={4}
                className="w-full px-[var(--iplegal-spacing-12)] py-[var(--iplegal-spacing-8)] border border-[var(--iplegal-border)] rounded-[var(--iplegal-radius)] focus:outline-none focus:ring-2 focus:ring-[var(--iplegal-focus-ring)] focus:border-transparent"
              />
            </div>
          </div>
        </div>

        <div className="flex gap-[var(--iplegal-spacing-12)] justify-end px-[var(--iplegal-spacing-24)] py-[var(--iplegal-spacing-16)] border-t border-[var(--iplegal-border)]">
          <SecondaryButton onClick={handleClose}>
            Cancel
          </SecondaryButton>
          <PrimaryButton onClick={handleSave}>
            Save Document
          </PrimaryButton>
        </div>
      </div>
    </div>
  );
}
