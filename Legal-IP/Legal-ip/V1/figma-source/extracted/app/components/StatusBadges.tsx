import React from 'react';

type Status = 'Open' | 'In Review' | 'Approved' | 'Rejected' | 'On Hold';
type Risk = 'Low' | 'Med' | 'High' | 'Critical';

const statusStyles: Record<Status, string> = {
  'Open': 'bg-[var(--iplegal-info-bg)] text-[var(--iplegal-info)] border-[var(--iplegal-info-border)]',
  'In Review': 'bg-[var(--iplegal-warning-bg)] text-[var(--iplegal-warning)] border-[var(--iplegal-warning-border)]',
  'Approved': 'bg-[var(--iplegal-success-bg)] text-[var(--iplegal-success)] border-[var(--iplegal-success-border)]',
  'Rejected': 'bg-[var(--iplegal-danger-bg)] text-[var(--iplegal-danger)] border-[var(--iplegal-danger-border)]',
  'On Hold': 'bg-[var(--iplegal-gray-100)] text-[var(--iplegal-gray-700)] border-[var(--iplegal-gray-300)]'
};

const riskStyles: Record<Risk, string> = {
  'Low': 'bg-[var(--iplegal-success-bg)] text-[var(--iplegal-success)] border-[var(--iplegal-success-border)]',
  'Med': 'bg-[var(--iplegal-warning-bg)] text-[var(--iplegal-warning)] border-[var(--iplegal-warning-border)]',
  'High': 'bg-[#FED7AA] text-[#C2410C] border-[#FDBA74]',
  'Critical': 'bg-[var(--iplegal-danger-bg)] text-[var(--iplegal-danger)] border-[var(--iplegal-danger-border)]'
};

export function StatusPill({ status }: { status: Status }) {
  return (
    <span className={`inline-flex items-center px-[var(--iplegal-spacing-12)] py-[var(--iplegal-spacing-4)] rounded-full border ${statusStyles[status]}`}>
      {status}
    </span>
  );
}

export function RiskBadge({ risk }: { risk: Risk }) {
  return (
    <span className={`inline-flex items-center px-[var(--iplegal-spacing-12)] py-[var(--iplegal-spacing-4)] rounded-[var(--iplegal-radius)] border ${riskStyles[risk]}`}>
      {risk}
    </span>
  );
}
