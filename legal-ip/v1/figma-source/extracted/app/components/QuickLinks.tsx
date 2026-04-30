import React from 'react';
import { Card } from './Overlays';

const links = [
  { icon: '➕', label: 'New request', description: 'Start a new IP submission' },
  { icon: '📝', label: 'Drafts', description: 'Resume saved drafts' },
  { icon: '❓', label: 'Help', description: 'Get assistance and support' },
  { icon: '📄', label: 'Policies', description: 'IP policies and guidelines' }
];

export function QuickLinks() {
  return (
    <Card title="Quick Links">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-[var(--iplegal-spacing-12)]">
        {links.map(link => (
          <a
            key={link.label}
            href="#"
            className="flex items-start gap-[var(--iplegal-spacing-12)] p-[var(--iplegal-spacing-16)] border border-[var(--iplegal-border)] rounded-[var(--iplegal-radius)] hover:bg-[var(--iplegal-gray-50)] hover:border-[var(--iplegal-primary)] transition-colors group"
          >
            <div className="text-2xl">{link.icon}</div>
            <div className="flex-1">
              <div className="text-[var(--iplegal-gray-900)] group-hover:text-[var(--iplegal-primary)] mb-1">
                {link.label}
              </div>
              <div className="text-xs text-[var(--iplegal-gray-600)]">
                {link.description}
              </div>
            </div>
          </a>
        ))}
      </div>
    </Card>
  );
}
