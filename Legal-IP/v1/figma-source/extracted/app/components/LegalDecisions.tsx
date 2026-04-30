import React from 'react';
import { Card } from './Overlays';

interface LegalDecisionsProps {
  onViewAll?: () => void;
}

interface Decision {
  topic: string;
  summary: string;
  tags: string[];
  date: string;
}

const featuredDecisions: Decision[] = [
  {
    topic: 'Software Patent Eligibility under Alice Corp.',
    summary: 'Recent guidance on abstract idea determination for AI/ML algorithms and technical improvements to computer functionality.',
    tags: ['Patent', 'Software', 'AI/ML'],
    date: 'Apr 15, 2026'
  },
  {
    topic: 'Open Source License Compliance',
    summary: 'Best practices for GPL, MIT, and Apache 2.0 compliance in commercial software products and derivative works.',
    tags: ['Copyright', 'Open Source', 'Licensing'],
    date: 'Apr 10, 2026'
  },
  {
    topic: 'API Copyright Protection',
    summary: 'Guidance on copyrightability of APIs following Oracle v. Google and implications for software interoperability.',
    tags: ['Copyright', 'API', 'Fair Use'],
    date: 'Apr 5, 2026'
  }
];

export function LegalDecisions({ onViewAll }: LegalDecisionsProps) {
  return (
    <Card title="Legal Decisions">
      <div className="mb-[var(--iplegal-spacing-16)]">
        <input
          type="text"
          placeholder="Search legal decisions and guidance..."
          className="w-full px-[var(--iplegal-spacing-12)] py-[var(--iplegal-spacing-8)] border border-[var(--iplegal-border)] rounded-[var(--iplegal-radius)] focus:outline-none focus:ring-2 focus:ring-[var(--iplegal-focus-ring)] focus:border-transparent"
        />
      </div>

      <div className="space-y-[var(--iplegal-spacing-16)]">
        {featuredDecisions.map((decision, idx) => (
          <div
            key={idx}
            className="p-[var(--iplegal-spacing-16)] border border-[var(--iplegal-border)] rounded-[var(--iplegal-radius)] hover:border-[var(--iplegal-primary)] hover:shadow-[var(--iplegal-shadow-sm)] transition-all cursor-pointer"
          >
            <div className="flex items-start justify-between gap-[var(--iplegal-spacing-12)] mb-[var(--iplegal-spacing-8)]">
              <h4 className="text-[var(--iplegal-gray-900)] flex-1">
                {decision.topic}
              </h4>
              <span className="text-xs text-[var(--iplegal-gray-500)] whitespace-nowrap">
                {decision.date}
              </span>
            </div>
            <p className="text-sm text-[var(--iplegal-gray-700)] mb-[var(--iplegal-spacing-12)]">
              {decision.summary}
            </p>
            <div className="flex flex-wrap gap-[var(--iplegal-spacing-8)]">
              {decision.tags.map(tag => (
                <span
                  key={tag}
                  className="px-[var(--iplegal-spacing-8)] py-[var(--iplegal-spacing-4)] bg-[var(--iplegal-gray-100)] text-[var(--iplegal-gray-700)] rounded text-xs"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="mt-[var(--iplegal-spacing-16)] pt-[var(--iplegal-spacing-16)] border-t border-[var(--iplegal-border)]">
        <button onClick={onViewAll} className="text-[var(--iplegal-primary)] hover:underline text-sm">
          Browse all decisions →
        </button>
      </div>
    </Card>
  );
}
