import React from 'react';

interface Column {
  key: string;
  header: string;
}

interface TableProps {
  columns: Column[];
  data: Record<string, React.ReactNode>[];
}

export function Table({ columns, data }: TableProps) {
  return (
    <div className="overflow-x-auto border border-[var(--iplegal-border)] rounded-[var(--iplegal-radius)]">
      <table className="w-full">
        <thead>
          <tr className="bg-[var(--iplegal-gray-50)] border-b border-[var(--iplegal-border)]">
            {columns.map(col => (
              <th key={col.key} className="px-[var(--iplegal-spacing-16)] py-[var(--iplegal-spacing-12)] text-left text-[var(--iplegal-gray-700)]">
                {col.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((row, idx) => (
            <tr key={idx} className="border-b border-[var(--iplegal-border)] last:border-0 hover:bg-[var(--iplegal-gray-50)]">
              {columns.map(col => (
                <td key={col.key} className="px-[var(--iplegal-spacing-16)] py-[var(--iplegal-spacing-12)] text-[var(--iplegal-gray-700)]">
                  {row[col.key]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export function ListItem({ children, active }: { children: React.ReactNode; active?: boolean }) {
  return (
    <div className={`px-[var(--iplegal-spacing-16)] py-[var(--iplegal-spacing-12)] border-b border-[var(--iplegal-border)] last:border-0 hover:bg-[var(--iplegal-gray-50)] cursor-pointer ${active ? 'bg-[var(--iplegal-gray-100)]' : ''}`}>
      {children}
    </div>
  );
}
