import React from 'react';
import { Card } from './Overlays';

export function HelpGuidance() {
  return (
    <Card title="Help & Guidance">
      <div className="space-y-[var(--iplegal-spacing-16)]">
        <div>
          <h4 className="text-[var(--iplegal-gray-900)] mb-[var(--iplegal-spacing-8)] text-sm">
            Contact Legal Team
          </h4>
          <div className="space-y-[var(--iplegal-spacing-8)] text-sm text-[var(--iplegal-gray-700)]">
            <div className="flex items-center gap-[var(--iplegal-spacing-8)]">
              <span>📧</span>
              <a href="mailto:iplegal@company.com" className="text-[var(--iplegal-primary)] hover:underline">
                iplegal@company.com
              </a>
            </div>
            <div className="flex items-center gap-[var(--iplegal-spacing-8)]">
              <span>📞</span>
              <span>ext. 5500</span>
            </div>
          </div>
        </div>

        <div className="border-t border-[var(--iplegal-border)] pt-[var(--iplegal-spacing-16)]">
          <h4 className="text-[var(--iplegal-gray-900)] mb-[var(--iplegal-spacing-8)] text-sm">
            Service Level Agreements
          </h4>
          <div className="space-y-[var(--iplegal-spacing-8)] text-sm">
            <div className="flex justify-between">
              <span className="text-[var(--iplegal-gray-700)]">Initial review</span>
              <span className="text-[var(--iplegal-gray-900)]">2 business days</span>
            </div>
            <div className="flex justify-between">
              <span className="text-[var(--iplegal-gray-700)]">Patent filing</span>
              <span className="text-[var(--iplegal-gray-900)]">10 business days</span>
            </div>
            <div className="flex justify-between">
              <span className="text-[var(--iplegal-gray-700)]">Trademark review</span>
              <span className="text-[var(--iplegal-gray-900)]">5 business days</span>
            </div>
          </div>
        </div>

        <div className="border-t border-[var(--iplegal-border)] pt-[var(--iplegal-spacing-16)]">
          <h4 className="text-[var(--iplegal-gray-900)] mb-[var(--iplegal-spacing-12)] text-sm">
            Resources
          </h4>
          <div className="space-y-[var(--iplegal-spacing-8)]">
            <a href="#" className="flex items-center justify-between text-sm text-[var(--iplegal-primary)] hover:underline">
              <span>📚 Knowledge Base</span>
              <span>→</span>
            </a>
            <a href="#" className="flex items-center justify-between text-sm text-[var(--iplegal-primary)] hover:underline">
              <span>📖 IP Guidelines</span>
              <span>→</span>
            </a>
            <a href="#" className="flex items-center justify-between text-sm text-[var(--iplegal-primary)] hover:underline">
              <span>🎓 Training Videos</span>
              <span>→</span>
            </a>
          </div>
        </div>

        <div className="border-t border-[var(--iplegal-border)] pt-[var(--iplegal-spacing-16)]">
          <div className="p-[var(--iplegal-spacing-12)] bg-[var(--iplegal-info-bg)] border border-[var(--iplegal-info-border)] rounded-[var(--iplegal-radius)]">
            <div className="flex gap-[var(--iplegal-spacing-8)]">
              <span className="text-[var(--iplegal-info)]">💡</span>
              <div className="flex-1">
                <p className="text-xs text-[var(--iplegal-info)]">
                  <strong>Tip:</strong> Submit patent disclosures early to protect your innovations before public disclosure.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
}
