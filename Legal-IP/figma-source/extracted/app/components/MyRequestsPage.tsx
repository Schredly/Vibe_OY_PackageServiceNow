import React, { useState, useMemo } from 'react';
import { PortalHeader } from './PortalHeader';
import { StatusPill, RiskBadge } from './StatusBadges';
import { Pagination } from './Navigation';
import { PrimaryButton, SecondaryButton } from './Buttons';

type Status = 'Open' | 'In Review' | 'Approved' | 'Rejected' | 'On Hold';
type Priority = 'Low' | 'Medium' | 'High' | 'Critical';
type Risk = 'Low' | 'Med' | 'High' | 'Critical';
type RequestType = 'Patent' | 'Trademark' | 'Copyright' | 'License' | 'FTO' | 'Infringement';

interface Request {
  number: string;
  title: string;
  type: RequestType;
  status: Status;
  dueDate: string;
  priority: Priority;
  risk: Risk;
  lastUpdated: string;
}

const mockRequests: Request[] = [
  {
    number: 'REQ-2345',
    title: 'ML Model Patent Application',
    type: 'Patent',
    status: 'In Review',
    dueDate: '2026-05-10',
    priority: 'High',
    risk: 'High',
    lastUpdated: '2026-04-28'
  },
  {
    number: 'REQ-2340',
    title: 'API Framework Copyright',
    type: 'Copyright',
    status: 'Open',
    dueDate: '2026-05-15',
    priority: 'Medium',
    risk: 'Low',
    lastUpdated: '2026-04-27'
  },
  {
    number: 'REQ-2338',
    title: 'Product Name Trademark',
    type: 'Trademark',
    status: 'In Review',
    dueDate: '2026-05-05',
    priority: 'Critical',
    risk: 'Med',
    lastUpdated: '2026-04-29'
  },
  {
    number: 'REQ-2335',
    title: 'Open Source License Review',
    type: 'License',
    status: 'Approved',
    dueDate: '2026-04-30',
    priority: 'Low',
    risk: 'Low',
    lastUpdated: '2026-04-26'
  },
  {
    number: 'REQ-2330',
    title: 'Cloud Architecture Patent',
    type: 'Patent',
    status: 'On Hold',
    dueDate: '2026-05-20',
    priority: 'Medium',
    risk: 'Med',
    lastUpdated: '2026-04-25'
  },
  {
    number: 'REQ-2328',
    title: 'Logo Trademark Registration',
    type: 'Trademark',
    status: 'Rejected',
    dueDate: '2026-04-28',
    priority: 'High',
    risk: 'Critical',
    lastUpdated: '2026-04-24'
  },
  {
    number: 'REQ-2325',
    title: 'Software Copyright Protection',
    type: 'Copyright',
    status: 'Approved',
    dueDate: '2026-05-01',
    priority: 'Medium',
    risk: 'Low',
    lastUpdated: '2026-04-23'
  },
  {
    number: 'REQ-2320',
    title: 'Freedom to Operate Analysis',
    type: 'FTO',
    status: 'In Review',
    dueDate: '2026-05-12',
    priority: 'High',
    risk: 'High',
    lastUpdated: '2026-04-28'
  },
  {
    number: 'REQ-2315',
    title: 'Competitor Infringement Review',
    type: 'Infringement',
    status: 'Open',
    dueDate: '2026-05-08',
    priority: 'Critical',
    risk: 'Critical',
    lastUpdated: '2026-04-29'
  },
  {
    number: 'REQ-2310',
    title: 'UI Design Patent Application',
    type: 'Patent',
    status: 'In Review',
    dueDate: '2026-05-18',
    priority: 'Medium',
    risk: 'Med',
    lastUpdated: '2026-04-27'
  }
];

export function MyRequestsPage({ onStartRequest, onClose }: { onStartRequest: () => void; onClose: () => void }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedStatuses, setSelectedStatuses] = useState<Status[]>([]);
  const [selectedType, setSelectedType] = useState<RequestType | 'All'>('All');
  const [selectedPriority, setSelectedPriority] = useState<Priority | 'All'>('All');
  const [selectedRisk, setSelectedRisk] = useState<Risk | 'All'>('All');
  const [dateFrom, setDateFrom] = useState('');
  const [dateTo, setDateTo] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [showFilters, setShowFilters] = useState(false);

  const itemsPerPage = 10;

  const filteredRequests = useMemo(() => {
    return mockRequests.filter(req => {
      const matchesSearch = searchQuery === '' ||
        req.number.toLowerCase().includes(searchQuery.toLowerCase()) ||
        req.title.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesStatus = selectedStatuses.length === 0 || selectedStatuses.includes(req.status);
      const matchesType = selectedType === 'All' || req.type === selectedType;
      const matchesPriority = selectedPriority === 'All' || req.priority === selectedPriority;
      const matchesRisk = selectedRisk === 'All' || req.risk === selectedRisk;

      const matchesDateFrom = !dateFrom || new Date(req.dueDate) >= new Date(dateFrom);
      const matchesDateTo = !dateTo || new Date(req.dueDate) <= new Date(dateTo);

      return matchesSearch && matchesStatus && matchesType && matchesPriority && matchesRisk && matchesDateFrom && matchesDateTo;
    });
  }, [searchQuery, selectedStatuses, selectedType, selectedPriority, selectedRisk, dateFrom, dateTo]);

  const totalPages = Math.ceil(filteredRequests.length / itemsPerPage);
  const paginatedRequests = filteredRequests.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const toggleStatus = (status: Status) => {
    setSelectedStatuses(prev =>
      prev.includes(status) ? prev.filter(s => s !== status) : [...prev, status]
    );
  };

  const clearFilters = () => {
    setSelectedStatuses([]);
    setSelectedType('All');
    setSelectedPriority('All');
    setSelectedRisk('All');
    setDateFrom('');
    setDateTo('');
    setSearchQuery('');
  };

  const hasActiveFilters = selectedStatuses.length > 0 || selectedType !== 'All' ||
    selectedPriority !== 'All' || selectedRisk !== 'All' || dateFrom !== '' || dateTo !== '' || searchQuery !== '';

  return (
    <div className="min-h-screen bg-[var(--iplegal-gray-50)]">
      <PortalHeader />

      <div className="bg-white border-b border-[var(--iplegal-border)] shadow-[var(--iplegal-shadow-sm)]">
        <div className="max-w-[var(--iplegal-container-lg)] mx-auto px-[var(--iplegal-spacing-16)] py-[var(--iplegal-spacing-24)]">
          <div className="flex items-center justify-between mb-[var(--iplegal-spacing-16)]">
            <div>
              <h2 className="text-[var(--iplegal-gray-900)] mb-[var(--iplegal-spacing-4)]">
                My Requests
              </h2>
              <p className="text-sm text-[var(--iplegal-gray-600)]">
                {filteredRequests.length} request{filteredRequests.length !== 1 ? 's' : ''} found
              </p>
            </div>
            <div className="flex gap-[var(--iplegal-spacing-12)]">
              <button
                onClick={onClose}
                className="hidden md:block text-[var(--iplegal-gray-600)] hover:text-[var(--iplegal-gray-900)]"
              >
                ← Back to Home
              </button>
              <PrimaryButton onClick={onStartRequest} className="min-h-[44px]">
                + New Request
              </PrimaryButton>
            </div>
          </div>

          <div className="flex flex-col md:flex-row gap-[var(--iplegal-spacing-12)]">
            <input
              type="text"
              placeholder="Search by number or title..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="flex-1 px-[var(--iplegal-spacing-12)] py-[var(--iplegal-spacing-8)] border border-[var(--iplegal-border)] rounded-[var(--iplegal-radius)] focus:outline-none focus:ring-2 focus:ring-[var(--iplegal-focus-ring)] focus:border-transparent"
            />
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="md:hidden px-[var(--iplegal-spacing-16)] py-[var(--iplegal-spacing-8)] border border-[var(--iplegal-border)] rounded-[var(--iplegal-radius)] hover:bg-[var(--iplegal-gray-50)] min-h-[44px] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--iplegal-primary)]"
            >
              🔍 Filters {hasActiveFilters && `(${[selectedStatuses.length, selectedType !== 'All' ? 1 : 0, selectedPriority !== 'All' ? 1 : 0, selectedRisk !== 'All' ? 1 : 0, dateFrom || dateTo ? 1 : 0].reduce((a, b) => a + b, 0)})`}
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-[var(--iplegal-container-lg)] mx-auto px-[var(--iplegal-spacing-16)] py-[var(--iplegal-spacing-24)]">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-[var(--iplegal-spacing-24)]">
          <div className={`${showFilters ? 'block' : 'hidden'} md:block`}>
            <div className="bg-white border border-[var(--iplegal-border)] rounded-[var(--iplegal-radius-lg)] p-[var(--iplegal-spacing-24)] sticky top-[var(--iplegal-spacing-24)]">
              <div className="flex items-center justify-between mb-[var(--iplegal-spacing-16)]">
                <h3 className="text-[var(--iplegal-gray-900)]">Filters</h3>
                {hasActiveFilters && (
                  <button
                    onClick={clearFilters}
                    className="text-xs text-[var(--iplegal-primary)] hover:underline"
                  >
                    Clear all
                  </button>
                )}
              </div>

              <div className="space-y-[var(--iplegal-spacing-24)]">
                <div>
                  <h4 className="text-sm text-[var(--iplegal-gray-700)] mb-[var(--iplegal-spacing-8)]">
                    Status
                  </h4>
                  <div className="space-y-[var(--iplegal-spacing-8)]">
                    {(['Open', 'In Review', 'Approved', 'Rejected', 'On Hold'] as Status[]).map(status => (
                      <label key={status} className="flex items-center gap-[var(--iplegal-spacing-8)] cursor-pointer">
                        <input
                          type="checkbox"
                          checked={selectedStatuses.includes(status)}
                          onChange={() => toggleStatus(status)}
                          className="w-4 h-4 border border-[var(--iplegal-border)] rounded focus:ring-2 focus:ring-[var(--iplegal-focus-ring)] accent-[var(--iplegal-primary)]"
                        />
                        <span className="text-sm text-[var(--iplegal-gray-700)]">{status}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <div className="border-t border-[var(--iplegal-border)] pt-[var(--iplegal-spacing-16)]">
                  <h4 className="text-sm text-[var(--iplegal-gray-700)] mb-[var(--iplegal-spacing-8)]">
                    Type
                  </h4>
                  <select
                    value={selectedType}
                    onChange={(e) => setSelectedType(e.target.value as RequestType | 'All')}
                    className="w-full px-[var(--iplegal-spacing-12)] py-[var(--iplegal-spacing-8)] border border-[var(--iplegal-border)] rounded-[var(--iplegal-radius)] focus:outline-none focus:ring-2 focus:ring-[var(--iplegal-focus-ring)] bg-white text-sm"
                  >
                    <option value="All">All Types</option>
                    <option value="Patent">Patent</option>
                    <option value="Trademark">Trademark</option>
                    <option value="Copyright">Copyright</option>
                    <option value="License">License</option>
                    <option value="FTO">FTO</option>
                    <option value="Infringement">Infringement</option>
                  </select>
                </div>

                <div className="border-t border-[var(--iplegal-border)] pt-[var(--iplegal-spacing-16)]">
                  <h4 className="text-sm text-[var(--iplegal-gray-700)] mb-[var(--iplegal-spacing-8)]">
                    Priority
                  </h4>
                  <select
                    value={selectedPriority}
                    onChange={(e) => setSelectedPriority(e.target.value as Priority | 'All')}
                    className="w-full px-[var(--iplegal-spacing-12)] py-[var(--iplegal-spacing-8)] border border-[var(--iplegal-border)] rounded-[var(--iplegal-radius)] focus:outline-none focus:ring-2 focus:ring-[var(--iplegal-focus-ring)] bg-white text-sm"
                  >
                    <option value="All">All Priorities</option>
                    <option value="Low">Low</option>
                    <option value="Medium">Medium</option>
                    <option value="High">High</option>
                    <option value="Critical">Critical</option>
                  </select>
                </div>

                <div className="border-t border-[var(--iplegal-border)] pt-[var(--iplegal-spacing-16)]">
                  <h4 className="text-sm text-[var(--iplegal-gray-700)] mb-[var(--iplegal-spacing-8)]">
                    Risk Level
                  </h4>
                  <select
                    value={selectedRisk}
                    onChange={(e) => setSelectedRisk(e.target.value as Risk | 'All')}
                    className="w-full px-[var(--iplegal-spacing-12)] py-[var(--iplegal-spacing-8)] border border-[var(--iplegal-border)] rounded-[var(--iplegal-radius)] focus:outline-none focus:ring-2 focus:ring-[var(--iplegal-focus-ring)] bg-white text-sm"
                  >
                    <option value="All">All Levels</option>
                    <option value="Low">Low</option>
                    <option value="Med">Medium</option>
                    <option value="High">High</option>
                    <option value="Critical">Critical</option>
                  </select>
                </div>

                <div className="border-t border-[var(--iplegal-border)] pt-[var(--iplegal-spacing-16)]">
                  <h4 className="text-sm text-[var(--iplegal-gray-700)] mb-[var(--iplegal-spacing-8)]">
                    Due Date Range
                  </h4>
                  <div className="space-y-[var(--iplegal-spacing-8)]">
                    <input
                      type="date"
                      value={dateFrom}
                      onChange={(e) => setDateFrom(e.target.value)}
                      placeholder="From"
                      className="w-full px-[var(--iplegal-spacing-12)] py-[var(--iplegal-spacing-8)] border border-[var(--iplegal-border)] rounded-[var(--iplegal-radius)] focus:outline-none focus:ring-2 focus:ring-[var(--iplegal-focus-ring)] text-sm"
                    />
                    <input
                      type="date"
                      value={dateTo}
                      onChange={(e) => setDateTo(e.target.value)}
                      placeholder="To"
                      className="w-full px-[var(--iplegal-spacing-12)] py-[var(--iplegal-spacing-8)] border border-[var(--iplegal-border)] rounded-[var(--iplegal-radius)] focus:outline-none focus:ring-2 focus:ring-[var(--iplegal-focus-ring)] text-sm"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-3">
            {filteredRequests.length === 0 ? (
              <div className="bg-white border border-[var(--iplegal-border)] rounded-[var(--iplegal-radius-lg)] p-[var(--iplegal-spacing-48)] text-center">
                <div className="text-5xl mb-[var(--iplegal-spacing-16)]">📋</div>
                <h3 className="text-[var(--iplegal-gray-900)] mb-[var(--iplegal-spacing-8)]">
                  No requests found
                </h3>
                <p className="text-[var(--iplegal-gray-600)] mb-[var(--iplegal-spacing-24)] max-w-sm mx-auto">
                  {hasActiveFilters
                    ? "No requests match your current filters. Try adjusting your search criteria."
                    : "You don't have any IP requests yet. Start a new request to protect your software innovations."}
                </p>
                {hasActiveFilters ? (
                  <SecondaryButton onClick={clearFilters}>
                    Clear Filters
                  </SecondaryButton>
                ) : (
                  <PrimaryButton onClick={onStartRequest}>
                    Start a new request
                  </PrimaryButton>
                )}
              </div>
            ) : (
              <>
                <div className="hidden md:block bg-white border border-[var(--iplegal-border)] rounded-[var(--iplegal-radius-lg)] overflow-hidden">
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead className="bg-[var(--iplegal-gray-50)] sticky top-0 z-10">
                        <tr className="border-b border-[var(--iplegal-border)]">
                          <th className="px-[var(--iplegal-spacing-16)] py-[var(--iplegal-spacing-12)] text-left text-[var(--iplegal-gray-700)] text-sm">Number</th>
                          <th className="px-[var(--iplegal-spacing-16)] py-[var(--iplegal-spacing-12)] text-left text-[var(--iplegal-gray-700)] text-sm">Title</th>
                          <th className="px-[var(--iplegal-spacing-16)] py-[var(--iplegal-spacing-12)] text-left text-[var(--iplegal-gray-700)] text-sm">Type</th>
                          <th className="px-[var(--iplegal-spacing-16)] py-[var(--iplegal-spacing-12)] text-left text-[var(--iplegal-gray-700)] text-sm">Status</th>
                          <th className="px-[var(--iplegal-spacing-16)] py-[var(--iplegal-spacing-12)] text-left text-[var(--iplegal-gray-700)] text-sm">Due Date</th>
                          <th className="px-[var(--iplegal-spacing-16)] py-[var(--iplegal-spacing-12)] text-left text-[var(--iplegal-gray-700)] text-sm">Priority</th>
                          <th className="px-[var(--iplegal-spacing-16)] py-[var(--iplegal-spacing-12)] text-left text-[var(--iplegal-gray-700)] text-sm">Risk</th>
                          <th className="px-[var(--iplegal-spacing-16)] py-[var(--iplegal-spacing-12)] text-left text-[var(--iplegal-gray-700)] text-sm">Last Updated</th>
                          <th className="px-[var(--iplegal-spacing-16)] py-[var(--iplegal-spacing-12)] text-left text-[var(--iplegal-gray-700)] text-sm">Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {paginatedRequests.map((req, idx) => (
                          <tr key={idx} className="border-b border-[var(--iplegal-border)] last:border-0 hover:bg-[var(--iplegal-gray-50)]">
                            <td className="px-[var(--iplegal-spacing-16)] py-[var(--iplegal-spacing-12)] text-[var(--iplegal-primary)] text-sm">
                              {req.number}
                            </td>
                            <td className="px-[var(--iplegal-spacing-16)] py-[var(--iplegal-spacing-12)] text-[var(--iplegal-gray-900)] text-sm">
                              {req.title}
                            </td>
                            <td className="px-[var(--iplegal-spacing-16)] py-[var(--iplegal-spacing-12)] text-[var(--iplegal-gray-700)] text-sm">
                              {req.type}
                            </td>
                            <td className="px-[var(--iplegal-spacing-16)] py-[var(--iplegal-spacing-12)] text-sm">
                              <StatusPill status={req.status} />
                            </td>
                            <td className="px-[var(--iplegal-spacing-16)] py-[var(--iplegal-spacing-12)] text-[var(--iplegal-gray-700)] text-sm">
                              {new Date(req.dueDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                            </td>
                            <td className={`px-[var(--iplegal-spacing-16)] py-[var(--iplegal-spacing-12)] text-sm ${
                              req.priority === 'Critical' ? 'text-[var(--iplegal-danger)]' :
                              req.priority === 'High' ? 'text-[var(--iplegal-warning)]' :
                              req.priority === 'Medium' ? 'text-[var(--iplegal-info)]' :
                              'text-[var(--iplegal-gray-600)]'
                            }`}>
                              {req.priority}
                            </td>
                            <td className="px-[var(--iplegal-spacing-16)] py-[var(--iplegal-spacing-12)] text-sm">
                              <RiskBadge risk={req.risk} />
                            </td>
                            <td className="px-[var(--iplegal-spacing-16)] py-[var(--iplegal-spacing-12)] text-[var(--iplegal-gray-600)] text-sm">
                              {new Date(req.lastUpdated).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                            </td>
                            <td className="px-[var(--iplegal-spacing-16)] py-[var(--iplegal-spacing-12)] text-sm">
                              <button className="text-[var(--iplegal-primary)] hover:underline">
                                View
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>

                <div className="md:hidden space-y-[var(--iplegal-spacing-12)]">
                  {paginatedRequests.map((req, idx) => (
                    <div key={idx} className="bg-white border border-[var(--iplegal-border)] rounded-[var(--iplegal-radius-lg)] p-[var(--iplegal-spacing-16)]">
                      <div className="flex items-start justify-between mb-[var(--iplegal-spacing-12)]">
                        <div className="flex-1">
                          <div className="text-[var(--iplegal-primary)] text-sm mb-1">{req.number}</div>
                          <h4 className="text-[var(--iplegal-gray-900)]">{req.title}</h4>
                        </div>
                        <StatusPill status={req.status} />
                      </div>

                      <div className="grid grid-cols-2 gap-[var(--iplegal-spacing-12)] text-sm mb-[var(--iplegal-spacing-12)]">
                        <div>
                          <div className="text-[var(--iplegal-gray-600)] text-xs mb-1">Type</div>
                          <div className="text-[var(--iplegal-gray-900)]">{req.type}</div>
                        </div>
                        <div>
                          <div className="text-[var(--iplegal-gray-600)] text-xs mb-1">Due Date</div>
                          <div className="text-[var(--iplegal-gray-900)]">
                            {new Date(req.dueDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                          </div>
                        </div>
                        <div>
                          <div className="text-[var(--iplegal-gray-600)] text-xs mb-1">Priority</div>
                          <div className={
                            req.priority === 'Critical' ? 'text-[var(--iplegal-danger)]' :
                            req.priority === 'High' ? 'text-[var(--iplegal-warning)]' :
                            req.priority === 'Medium' ? 'text-[var(--iplegal-info)]' :
                            'text-[var(--iplegal-gray-600)]'
                          }>
                            {req.priority}
                          </div>
                        </div>
                        <div>
                          <div className="text-[var(--iplegal-gray-600)] text-xs mb-1">Risk</div>
                          <RiskBadge risk={req.risk} />
                        </div>
                      </div>

                      <div className="flex items-center justify-between pt-[var(--iplegal-spacing-12)] border-t border-[var(--iplegal-border)]">
                        <div className="text-xs text-[var(--iplegal-gray-600)]">
                          Updated {new Date(req.lastUpdated).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                        </div>
                        <button className="text-[var(--iplegal-primary)] hover:underline text-sm">
                          View Details →
                        </button>
                      </div>
                    </div>
                  ))}
                </div>

                {totalPages > 1 && (
                  <div className="mt-[var(--iplegal-spacing-24)] flex justify-center">
                    <Pagination
                      currentPage={currentPage}
                      totalPages={totalPages}
                      onPageChange={setCurrentPage}
                    />
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
