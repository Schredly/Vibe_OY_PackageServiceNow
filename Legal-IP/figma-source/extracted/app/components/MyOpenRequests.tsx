import React from 'react';
import { Card } from './Overlays';
import { StatusPill } from './StatusBadges';

interface Request {
  number: string;
  title: string;
  type: string;
  status: 'Open' | 'In Review' | 'Approved' | 'Rejected' | 'On Hold';
  due: string;
  priority: 'Low' | 'Medium' | 'High' | 'Critical';
}

const priorityColors = {
  Low: 'text-[var(--iplegal-gray-600)]',
  Medium: 'text-[var(--iplegal-info)]',
  High: 'text-[var(--iplegal-warning)]',
  Critical: 'text-[var(--iplegal-danger)]'
};

export function MyOpenRequests({ requests, onStartRequest, onViewRequest }: { requests: Request[]; onStartRequest?: () => void; onViewRequest?: () => void }) {
  return (
    <Card title="My Open Requests">
      {requests.length === 0 ? (
        <div className="text-center py-[var(--iplegal-spacing-48)]">
          <div className="text-5xl mb-[var(--iplegal-spacing-16)]">📋</div>
          <h3 className="text-[var(--iplegal-gray-900)] mb-[var(--iplegal-spacing-8)]">
            No open requests
          </h3>
          <p className="text-[var(--iplegal-gray-600)] mb-[var(--iplegal-spacing-24)] max-w-sm mx-auto">
            You don't have any active IP requests at the moment. Start a new request to protect your software innovations.
          </p>
          <button
            onClick={onStartRequest}
            className="px-[var(--iplegal-spacing-24)] py-[var(--iplegal-spacing-12)] bg-[var(--iplegal-primary)] text-white rounded-[var(--iplegal-radius)] hover:bg-[var(--iplegal-primary-hover)] min-h-[44px]"
          >
            Start a new request
          </button>
        </div>
      ) : (
        <>
          <div className="overflow-x-auto -mx-[var(--iplegal-spacing-24)]">
            <table className="w-full">
              <thead>
                <tr className="border-b border-[var(--iplegal-border)]">
                  <th className="px-[var(--iplegal-spacing-16)] py-[var(--iplegal-spacing-12)] text-left text-[var(--iplegal-gray-700)] text-sm">Number</th>
                  <th className="px-[var(--iplegal-spacing-16)] py-[var(--iplegal-spacing-12)] text-left text-[var(--iplegal-gray-700)] text-sm">Title</th>
                  <th className="px-[var(--iplegal-spacing-16)] py-[var(--iplegal-spacing-12)] text-left text-[var(--iplegal-gray-700)] text-sm hidden md:table-cell">Type</th>
                  <th className="px-[var(--iplegal-spacing-16)] py-[var(--iplegal-spacing-12)] text-left text-[var(--iplegal-gray-700)] text-sm">Status</th>
                  <th className="px-[var(--iplegal-spacing-16)] py-[var(--iplegal-spacing-12)] text-left text-[var(--iplegal-gray-700)] text-sm hidden lg:table-cell">Due</th>
                  <th className="px-[var(--iplegal-spacing-16)] py-[var(--iplegal-spacing-12)] text-left text-[var(--iplegal-gray-700)] text-sm">Priority</th>
                </tr>
              </thead>
              <tbody>
                {requests.map((req, idx) => (
                  <tr key={idx} onClick={onViewRequest} className="border-b border-[var(--iplegal-border)] last:border-0 hover:bg-[var(--iplegal-gray-50)] cursor-pointer">
                    <td className="px-[var(--iplegal-spacing-16)] py-[var(--iplegal-spacing-12)] text-[var(--iplegal-primary)] text-sm">
                      {req.number}
                    </td>
                    <td className="px-[var(--iplegal-spacing-16)] py-[var(--iplegal-spacing-12)] text-[var(--iplegal-gray-900)] text-sm">
                      {req.title}
                    </td>
                    <td className="px-[var(--iplegal-spacing-16)] py-[var(--iplegal-spacing-12)] text-[var(--iplegal-gray-700)] text-sm hidden md:table-cell">
                      {req.type}
                    </td>
                    <td className="px-[var(--iplegal-spacing-16)] py-[var(--iplegal-spacing-12)] text-sm">
                      <StatusPill status={req.status} />
                    </td>
                    <td className="px-[var(--iplegal-spacing-16)] py-[var(--iplegal-spacing-12)] text-[var(--iplegal-gray-700)] text-sm hidden lg:table-cell">
                      {req.due}
                    </td>
                    <td className={`px-[var(--iplegal-spacing-16)] py-[var(--iplegal-spacing-12)] text-sm ${priorityColors[req.priority]}`}>
                      {req.priority}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="mt-[var(--iplegal-spacing-16)] pt-[var(--iplegal-spacing-16)] border-t border-[var(--iplegal-border)]">
            <a href="#" className="text-[var(--iplegal-primary)] hover:underline text-sm">
              View all requests →
            </a>
          </div>
        </>
      )}
    </Card>
  );
}
