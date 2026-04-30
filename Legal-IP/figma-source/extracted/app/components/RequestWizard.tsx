import React, { useState } from 'react';
import { Stepper } from './Navigation';
import { SelectRequestType } from './wizard/SelectRequestType';
import { IntakeForm } from './wizard/IntakeForm';
import { ReviewSubmit } from './wizard/ReviewSubmit';

export interface RequestType {
  id: string;
  name: string;
  description: string;
  defaultPriority: 'Low' | 'Medium' | 'High' | 'Critical';
  icon: string;
}

export interface FormField {
  id: string;
  label: string;
  type: 'short-text' | 'long-text' | 'select' | 'checkbox' | 'date';
  mandatory: boolean;
  helpText: string;
  options?: string[];
}

export interface FormData {
  [key: string]: string | boolean;
}

export interface ValidationErrors {
  [key: string]: string;
}

export function RequestWizard({ onClose }: { onClose: () => void }) {
  const [currentStep, setCurrentStep] = useState(0);
  const [selectedType, setSelectedType] = useState<RequestType | null>(null);
  const [formData, setFormData] = useState<FormData>({});
  const [errors, setErrors] = useState<ValidationErrors>({});
  const [attachments, setAttachments] = useState<File[]>([]);

  const steps = ['Select Type', 'Intake Form', 'Review & Submit'];

  const handleTypeSelect = (type: RequestType) => {
    setSelectedType(type);
    setCurrentStep(1);
  };

  const handleFormUpdate = (data: FormData) => {
    setFormData(data);
  };

  const handleNext = () => {
    if (currentStep === 1) {
      const validationErrors = validateForm();
      if (Object.keys(validationErrors).length > 0) {
        setErrors(validationErrors);
        return;
      }
      setErrors({});
    }
    setCurrentStep(currentStep + 1);
  };

  const handlePrevious = () => {
    setCurrentStep(currentStep - 1);
  };

  const handleSaveDraft = () => {
    console.log('Saving draft...', { selectedType, formData });
    alert('Draft saved successfully!');
  };

  const handleSubmit = () => {
    console.log('Submitting request...', { selectedType, formData, attachments });
    alert('Request submitted successfully!');
    onClose();
  };

  const handleEditSection = () => {
    setCurrentStep(1);
  };

  const validateForm = (): ValidationErrors => {
    const validationErrors: ValidationErrors = {};
    if (!selectedType) return validationErrors;

    const fields = getFieldsForType(selectedType.id);
    fields.forEach(field => {
      if (field.mandatory) {
        const value = formData[field.id];
        if (!value || (typeof value === 'string' && value.trim() === '')) {
          validationErrors[field.id] = `${field.label} is required`;
        }
      }
    });

    return validationErrors;
  };

  return (
    <div className="min-h-screen bg-[var(--iplegal-gray-50)]">
      <div className="bg-white border-b border-[var(--iplegal-border)] shadow-[var(--iplegal-shadow-sm)]">
        <div className="max-w-[var(--iplegal-container-lg)] mx-auto px-[var(--iplegal-spacing-16)] py-[var(--iplegal-spacing-24)]">
          <div className="flex items-center justify-between mb-[var(--iplegal-spacing-24)]">
            <div>
              <h2 className="text-[var(--iplegal-gray-900)] mb-[var(--iplegal-spacing-4)]">
                New IP Legal Request
              </h2>
              <p className="text-sm text-[var(--iplegal-gray-600)]">
                Submit a request for patent, trademark, or copyright protection
              </p>
            </div>
            <button
              onClick={onClose}
              className="text-[var(--iplegal-gray-600)] hover:text-[var(--iplegal-gray-900)] text-2xl"
            >
              ✕
            </button>
          </div>

          <Stepper steps={steps} currentStep={currentStep} />
        </div>
      </div>

      <div className="max-w-[var(--iplegal-container-lg)] mx-auto px-[var(--iplegal-spacing-16)] py-[var(--iplegal-spacing-32)]">
        {currentStep === 0 && (
          <SelectRequestType onSelect={handleTypeSelect} />
        )}

        {currentStep === 1 && selectedType && (
          <IntakeForm
            requestType={selectedType}
            formData={formData}
            errors={errors}
            onUpdate={handleFormUpdate}
            onNext={handleNext}
            onPrevious={handlePrevious}
            onSaveDraft={handleSaveDraft}
          />
        )}

        {currentStep === 2 && selectedType && (
          <ReviewSubmit
            requestType={selectedType}
            formData={formData}
            attachments={attachments}
            onAttachmentsChange={setAttachments}
            onEdit={handleEditSection}
            onPrevious={handlePrevious}
            onSubmit={handleSubmit}
          />
        )}
      </div>
    </div>
  );
}

export function getFieldsForType(typeId: string): FormField[] {
  const commonFields: FormField[] = [
    {
      id: 'title',
      label: 'Request Title',
      type: 'short-text',
      mandatory: true,
      helpText: 'Provide a brief, descriptive title for this request'
    },
    {
      id: 'description',
      label: 'Detailed Description',
      type: 'long-text',
      mandatory: true,
      helpText: 'Describe the innovation, trademark, or work to be protected in detail'
    }
  ];

  const fieldsByType: { [key: string]: FormField[] } = {
    patent: [
      ...commonFields,
      {
        id: 'inventionType',
        label: 'Type of Invention',
        type: 'select',
        mandatory: true,
        helpText: 'Select the category that best describes your invention',
        options: ['Software/Algorithm', 'Hardware', 'Business Method', 'Design', 'Other']
      },
      {
        id: 'priorArt',
        label: 'Prior Art Search Conducted',
        type: 'checkbox',
        mandatory: false,
        helpText: 'Check if you have already conducted a prior art search'
      },
      {
        id: 'publicDisclosure',
        label: 'Has this been publicly disclosed?',
        type: 'checkbox',
        mandatory: false,
        helpText: 'Indicate if the invention has been publicly disclosed (e.g., publication, conference)'
      },
      {
        id: 'disclosureDate',
        label: 'Date of First Disclosure (if applicable)',
        type: 'date',
        mandatory: false,
        helpText: 'Date when the invention was first publicly disclosed'
      },
      {
        id: 'inventors',
        label: 'Inventor Name(s)',
        type: 'short-text',
        mandatory: true,
        helpText: 'List all inventors (comma-separated)'
      }
    ],
    trademark: [
      ...commonFields,
      {
        id: 'markType',
        label: 'Type of Mark',
        type: 'select',
        mandatory: true,
        helpText: 'Select the type of trademark you wish to register',
        options: ['Word Mark', 'Logo/Design Mark', 'Combined Word and Design', 'Sound Mark', 'Other']
      },
      {
        id: 'goodsServices',
        label: 'Goods and Services',
        type: 'long-text',
        mandatory: true,
        helpText: 'Describe the goods or services associated with this mark'
      },
      {
        id: 'firstUseDate',
        label: 'Date of First Use in Commerce',
        type: 'date',
        mandatory: true,
        helpText: 'When was this mark first used in commerce?'
      },
      {
        id: 'internationalUse',
        label: 'International Registration Needed',
        type: 'checkbox',
        mandatory: false,
        helpText: 'Check if you need to register this mark internationally'
      }
    ],
    copyright: [
      ...commonFields,
      {
        id: 'workType',
        label: 'Type of Work',
        type: 'select',
        mandatory: true,
        helpText: 'Select the category of the work to be protected',
        options: ['Software Code', 'Documentation', 'Design/Graphics', 'Audio/Video', 'Other']
      },
      {
        id: 'creationDate',
        label: 'Date of Creation',
        type: 'date',
        mandatory: true,
        helpText: 'When was this work originally created?'
      },
      {
        id: 'published',
        label: 'Has this work been published?',
        type: 'checkbox',
        mandatory: false,
        helpText: 'Indicate if the work has been made publicly available'
      },
      {
        id: 'authors',
        label: 'Author Name(s)',
        type: 'short-text',
        mandatory: true,
        helpText: 'List all authors or creators (comma-separated)'
      }
    ]
  };

  return fieldsByType[typeId] || commonFields;
}
