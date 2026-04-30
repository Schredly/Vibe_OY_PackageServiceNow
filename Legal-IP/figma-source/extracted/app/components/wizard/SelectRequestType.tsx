import React, { useState } from 'react';
import { RequestType } from '../RequestWizard';

const requestTypes: RequestType[] = [
  {
    id: 'patent',
    name: 'Patent Application',
    description: 'Protect inventions, algorithms, and technical innovations. Grants exclusive rights to make, use, and sell the invention.',
    defaultPriority: 'High',
    icon: '💡'
  },
  {
    id: 'trademark',
    name: 'Trademark Registration',
    description: 'Protect brand names, logos, and slogans. Prevents others from using confusingly similar marks in commerce.',
    defaultPriority: 'Medium',
    icon: '®'
  },
  {
    id: 'copyright',
    name: 'Copyright Protection',
    description: 'Protect original works of authorship including software code, documentation, and creative content.',
    defaultPriority: 'Medium',
    icon: '©'
  },
  {
    id: 'license',
    name: 'License Agreement Review',
    description: 'Review and negotiate license agreements for software, open source, or intellectual property.',
    defaultPriority: 'Low',
    icon: '📄'
  },
  {
    id: 'opinion',
    name: 'Freedom to Operate Opinion',
    description: 'Assess whether a product or service may infringe on existing patents or IP rights.',
    defaultPriority: 'High',
    icon: '🔍'
  },
  {
    id: 'infringement',
    name: 'Infringement Review',
    description: 'Report potential infringement of company IP rights or respond to infringement claims.',
    defaultPriority: 'Critical',
    icon: '⚠️'
  }
];

export function SelectRequestType({ onSelect }: { onSelect: (type: RequestType) => void }) {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredTypes = requestTypes.filter(type =>
    type.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    type.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-[var(--iplegal-spacing-24)]">
        <h3 className="text-[var(--iplegal-gray-900)] mb-[var(--iplegal-spacing-8)]">
          Select Request Type
        </h3>
        <p className="text-[var(--iplegal-gray-600)] mb-[var(--iplegal-spacing-16)]">
          Choose the type of legal request you'd like to submit
        </p>
        <input
          type="text"
          placeholder="Search request types..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full px-[var(--iplegal-spacing-12)] py-[var(--iplegal-spacing-8)] border border-[var(--iplegal-border)] rounded-[var(--iplegal-radius)] focus:outline-none focus:ring-2 focus:ring-[var(--iplegal-focus-ring)] focus:border-transparent"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-[var(--iplegal-spacing-16)]">
        {filteredTypes.map(type => (
          <button
            key={type.id}
            onClick={() => onSelect(type)}
            className="text-left p-[var(--iplegal-spacing-24)] bg-white border border-[var(--iplegal-border)] rounded-[var(--iplegal-radius-lg)] hover:border-[var(--iplegal-primary)] hover:shadow-[var(--iplegal-shadow-md)] transition-all group min-h-[44px] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--iplegal-primary)]"
          >
            <div className="flex items-start gap-[var(--iplegal-spacing-16)]">
              <div className="text-4xl">{type.icon}</div>
              <div className="flex-1">
                <div className="flex items-start justify-between mb-[var(--iplegal-spacing-8)]">
                  <h4 className="text-[var(--iplegal-gray-900)] group-hover:text-[var(--iplegal-primary)]">
                    {type.name}
                  </h4>
                  <span className={`ml-[var(--iplegal-spacing-8)] px-[var(--iplegal-spacing-8)] py-[var(--iplegal-spacing-4)] rounded text-xs whitespace-nowrap ${
                    type.defaultPriority === 'Critical' ? 'bg-[var(--iplegal-danger-bg)] text-[var(--iplegal-danger)]' :
                    type.defaultPriority === 'High' ? 'bg-[var(--iplegal-warning-bg)] text-[var(--iplegal-warning)]' :
                    type.defaultPriority === 'Medium' ? 'bg-[var(--iplegal-info-bg)] text-[var(--iplegal-info)]' :
                    'bg-[var(--iplegal-gray-100)] text-[var(--iplegal-gray-700)]'
                  }`}>
                    {type.defaultPriority} Priority
                  </span>
                </div>
                <p className="text-sm text-[var(--iplegal-gray-600)]">
                  {type.description}
                </p>
              </div>
            </div>
          </button>
        ))}
      </div>

      {filteredTypes.length === 0 && (
        <div className="text-center py-[var(--iplegal-spacing-48)] text-[var(--iplegal-gray-600)]">
          No request types found matching "{searchQuery}"
        </div>
      )}
    </div>
  );
}
