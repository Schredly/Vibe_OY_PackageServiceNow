import React, { useState } from 'react';
import { PortalHeader } from './PortalHeader';
import { StatusPill, RiskBadge } from './StatusBadges';
import { PrimaryButton, SecondaryButton } from './Buttons';
import { Breadcrumb } from './Navigation';
import { Card } from './Overlays';
import { AddDocumentModal, DocumentData } from './AddDocumentModal';

type Status = 'Open' | 'In Review' | 'Approved' | 'Rejected' | 'On Hold';
type Priority = 'Low' | 'Medium' | 'High' | 'Critical';
type Risk = 'Low' | 'Med' | 'High' | 'Critical';

interface RequestDetail {
  number: string;
  title: string;
  status: Status;
  priority: Priority;
  risk: Risk;
  type: string;
  submittedBy: string;
  department: string;
  businessUnit: string;
  description: string;
  submittedDate: string;
  dueDate: string;
  reviewDueDate: string;
}

interface IntakeResponse {
  question: string;
  answer: string;
}

interface WorkflowStage {
  name: string;
  status: 'completed' | 'current' | 'pending';
  completedDate?: string;
  isParallel?: boolean;
}

interface ReviewTask {
  id: string;
  task: string;
  assignee: string;
  dueDate: string;
  status: 'Pending' | 'In Progress' | 'Completed';
  decision?: string;
}

interface Approval {
  approver: string;
  role: string;
  outcome: 'Approved' | 'Rejected' | 'Pending';
  timestamp?: string;
  comments?: string;
}

interface Document {
  name: string;
  category: string;
  uploadedBy: string;
  uploadedDate: string;
  size: string;
}

interface Activity {
  user: string;
  action: string;
  timestamp: string;
  comment?: string;
}

const mockRequest: RequestDetail = {
  number: 'REQ-2345',
  title: 'ML Model Patent Application',
  status: 'In Review',
  priority: 'High',
  risk: 'High',
  type: 'Patent Application',
  submittedBy: 'Jane Doe',
  department: 'Engineering',
  businessUnit: 'AI Research',
  description: 'Patent application for a novel machine learning algorithm that improves natural language processing accuracy by 15% while reducing computational requirements by 30%. The innovation uses a hybrid attention mechanism combined with dynamic pruning.',
  submittedDate: '2026-04-15',
  dueDate: '2026-05-10',
  reviewDueDate: '2026-05-01'
};

const mockIntakeResponses: IntakeResponse[] = [
  { question: 'Type of Invention', answer: 'Software/Algorithm' },
  { question: 'Inventor Name(s)', answer: 'Jane Doe, Robert Smith, Emily Chen' },
  { question: 'Prior Art Search Conducted', answer: 'Yes' },
  { question: 'Has this been publicly disclosed?', answer: 'No' },
  { question: 'Detailed Description', answer: 'The ML model uses a novel hybrid attention mechanism that combines local and global context...' }
];

const mockWorkflow: WorkflowStage[] = [
  { name: 'Submitted', status: 'completed', completedDate: '2026-04-15' },
  { name: 'Initial Review', status: 'completed', completedDate: '2026-04-18' },
  { name: 'Legal Analysis', status: 'current' },
  { name: 'Approval', status: 'pending', isParallel: true },
  { name: 'Filing', status: 'pending' }
];

const mockReviewTasks: ReviewTask[] = [
  { id: '1', task: 'Prior Art Search Review', assignee: 'Sarah Johnson', dueDate: '2026-04-25', status: 'Completed', decision: 'Approved - No conflicts found' },
  { id: '2', task: 'Technical Evaluation', assignee: 'Michael Brown', dueDate: '2026-04-28', status: 'In Progress' },
  { id: '3', task: 'Patent Attorney Review', assignee: 'David Lee', dueDate: '2026-05-01', status: 'Pending' }
];

const mockApprovals: Approval[] = [
  { approver: 'Tom Wilson', role: 'Engineering Manager', outcome: 'Approved', timestamp: '2026-04-16 10:30 AM', comments: 'Strong technical innovation with clear commercial value.' },
  { approver: 'Lisa Anderson', role: 'IP Director', outcome: 'Approved', timestamp: '2026-04-17 02:15 PM', comments: 'Meets patentability criteria. Recommend proceeding with filing.' },
  { approver: 'James Martinez', role: 'Legal Counsel', outcome: 'Pending', timestamp: undefined }
];

const mockDocuments: Document[] = [
  { name: 'Technical Specification.pdf', category: 'Technical Documentation', uploadedBy: 'Jane Doe', uploadedDate: '2026-04-15', size: '2.4 MB' },
  { name: 'Algorithm Flowchart.png', category: 'Diagrams', uploadedBy: 'Jane Doe', uploadedDate: '2026-04-15', size: '856 KB' },
  { name: 'Prior Art Analysis.pdf', category: 'Legal Analysis', uploadedBy: 'Sarah Johnson', uploadedDate: '2026-04-20', size: '1.8 MB' }
];

const mockActivity: Activity[] = [
  { user: 'System', action: 'Request status changed to "In Review"', timestamp: '2026-04-18 09:00 AM' },
  { user: 'Sarah Johnson', action: 'Completed prior art search review', timestamp: '2026-04-25 03:45 PM', comment: 'No conflicting patents found in initial search.' },
  { user: 'Michael Brown', action: 'Started technical evaluation', timestamp: '2026-04-26 10:15 AM' },
  { user: 'Jane Doe', action: 'Uploaded additional documentation', timestamp: '2026-04-27 11:30 AM' }
];

export function RequestDetailPage({ onClose, onBack }: { onClose: () => void; onBack: () => void }) {
  const [showTaskModal, setShowTaskModal] = useState(false);
  const [selectedTask, setSelectedTask] = useState<ReviewTask | null>(null);
  const [newComment, setNewComment] = useState('');
  const [showAddDocumentModal, setShowAddDocumentModal] = useState(false);
  const [documents, setDocuments] = useState<Document[]>(mockDocuments);

  const handleTaskClick = (task: ReviewTask) => {
    setSelectedTask(task);
    setShowTaskModal(true);
  };

  const handleAddComment = () => {
    if (newComment.trim()) {
      console.log('Adding comment:', newComment);
      setNewComment('');
    }
  };

  const handleAddDocument = (documentData: DocumentData) => {
    const newDocument: Document = {
      name: documentData.name,
      category: documentData.category,
      uploadedBy: 'Current User',
      uploadedDate: new Date().toISOString().split('T')[0],
      size: documentData.url ? 'External Link' : '0 KB'
    };
    setDocuments([...documents, newDocument]);
    console.log('Document added:', documentData);
  };

  return (
    <div className="min-h-screen bg-[var(--iplegal-gray-50)]">
      <PortalHeader />

      <div className="bg-white border-b border-[var(--iplegal-border)] shadow-[var(--iplegal-shadow-sm)]">
        <div className="max-w-[var(--iplegal-container-lg)] mx-auto px-[var(--iplegal-spacing-16)] py-[var(--iplegal-spacing-16)]">
          <div className="mb-[var(--iplegal-spacing-12)]">
            <Breadcrumb items={['Home', 'My Requests', mockRequest.number]} />
          </div>

          <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-[var(--iplegal-spacing-16)]">
            <div className="flex-1">
              <div className="flex items-center gap-[var(--iplegal-spacing-12)] mb-[var(--iplegal-spacing-8)]">
                <h2 className="text-[var(--iplegal-gray-900)]">{mockRequest.number}</h2>
                <StatusPill status={mockRequest.status} />
              </div>
              <h3 className="text-[var(--iplegal-gray-900)] mb-[var(--iplegal-spacing-12)]">
                {mockRequest.title}
              </h3>
              <div className="flex flex-wrap gap-[var(--iplegal-spacing-8)]">
                <span className={`px-[var(--iplegal-spacing-12)] py-[var(--iplegal-spacing-4)] rounded-full text-sm ${
                  mockRequest.priority === 'Critical' ? 'bg-[var(--iplegal-danger-bg)] text-[var(--iplegal-danger)]' :
                  mockRequest.priority === 'High' ? 'bg-[var(--iplegal-warning-bg)] text-[var(--iplegal-warning)]' :
                  mockRequest.priority === 'Medium' ? 'bg-[var(--iplegal-info-bg)] text-[var(--iplegal-info)]' :
                  'bg-[var(--iplegal-gray-100)] text-[var(--iplegal-gray-700)]'
                }`}>
                  Priority: {mockRequest.priority}
                </span>
                <div className="flex items-center gap-[var(--iplegal-spacing-4)]">
                  <span className="text-sm text-[var(--iplegal-gray-700)]">Risk:</span>
                  <RiskBadge risk={mockRequest.risk} />
                </div>
              </div>
            </div>

            <div className="flex flex-wrap gap-[var(--iplegal-spacing-8)]">
              <SecondaryButton onClick={() => setShowAddDocumentModal(true)} className="min-h-[44px]">
                📎 Add Document
              </SecondaryButton>
              <SecondaryButton className="min-h-[44px]">💬 Add Comment</SecondaryButton>
              {mockRequest.status === 'Open' || mockRequest.status === 'In Review' ? (
                <SecondaryButton className="!text-[var(--iplegal-danger)] !border-[var(--iplegal-danger)] hover:!bg-[var(--iplegal-danger-bg)] min-h-[44px]">
                  ⚠️ Withdraw
                </SecondaryButton>
              ) : (
                <SecondaryButton className="min-h-[44px]">↻ Reopen</SecondaryButton>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-[var(--iplegal-container-lg)] mx-auto px-[var(--iplegal-spacing-16)] py-[var(--iplegal-spacing-24)]">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-[var(--iplegal-spacing-24)]">
          <div className="lg:col-span-8 space-y-[var(--iplegal-spacing-24)]">
            <Card title="Details">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-[var(--iplegal-spacing-16)]">
                <div>
                  <div className="text-sm text-[var(--iplegal-gray-600)] mb-1">Type</div>
                  <div className="text-[var(--iplegal-gray-900)]">{mockRequest.type}</div>
                </div>
                <div>
                  <div className="text-sm text-[var(--iplegal-gray-600)] mb-1">Submitted By</div>
                  <div className="text-[var(--iplegal-gray-900)]">{mockRequest.submittedBy}</div>
                </div>
                <div>
                  <div className="text-sm text-[var(--iplegal-gray-600)] mb-1">Department</div>
                  <div className="text-[var(--iplegal-gray-900)]">{mockRequest.department}</div>
                </div>
                <div>
                  <div className="text-sm text-[var(--iplegal-gray-600)] mb-1">Business Unit</div>
                  <div className="text-[var(--iplegal-gray-900)]">{mockRequest.businessUnit}</div>
                </div>
                <div>
                  <div className="text-sm text-[var(--iplegal-gray-600)] mb-1">Submitted Date</div>
                  <div className="text-[var(--iplegal-gray-900)]">
                    {new Date(mockRequest.submittedDate).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
                  </div>
                </div>
                <div>
                  <div className="text-sm text-[var(--iplegal-gray-600)] mb-1">Due Date</div>
                  <div className="text-[var(--iplegal-gray-900)]">
                    {new Date(mockRequest.dueDate).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
                  </div>
                </div>
                <div className="md:col-span-2">
                  <div className="text-sm text-[var(--iplegal-gray-600)] mb-1">Review Due Date</div>
                  <div className="text-[var(--iplegal-gray-900)]">
                    {new Date(mockRequest.reviewDueDate).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
                  </div>
                </div>
                <div className="md:col-span-2">
                  <div className="text-sm text-[var(--iplegal-gray-600)] mb-1">Description</div>
                  <div className="text-[var(--iplegal-gray-900)]">{mockRequest.description}</div>
                </div>
              </div>
            </Card>

            <Card title="Intake Responses">
              <div className="space-y-[var(--iplegal-spacing-16)]">
                {mockIntakeResponses.map((response, idx) => (
                  <div key={idx} className="border-b border-[var(--iplegal-border)] pb-[var(--iplegal-spacing-16)] last:border-0 last:pb-0">
                    <div className="text-sm text-[var(--iplegal-gray-600)] mb-[var(--iplegal-spacing-4)]">
                      {response.question}
                    </div>
                    <div className="text-[var(--iplegal-gray-900)]">
                      {response.answer}
                    </div>
                  </div>
                ))}
              </div>
            </Card>

            <Card title="Workflow">
              <div className="relative">
                <div className="flex items-center justify-between">
                  {mockWorkflow.map((stage, idx) => (
                    <React.Fragment key={idx}>
                      <div className="flex flex-col items-center relative z-10">
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center mb-[var(--iplegal-spacing-8)] ${
                          stage.status === 'completed' ? 'bg-[var(--iplegal-success)] text-white' :
                          stage.status === 'current' ? 'bg-[var(--iplegal-primary)] text-white' :
                          'bg-[var(--iplegal-gray-200)] text-[var(--iplegal-gray-600)]'
                        }`}>
                          {stage.status === 'completed' ? '✓' : idx + 1}
                        </div>
                        <div className={`text-xs text-center max-w-[80px] ${
                          stage.status === 'completed' || stage.status === 'current'
                            ? 'text-[var(--iplegal-gray-900)]'
                            : 'text-[var(--iplegal-gray-500)]'
                        }`}>
                          {stage.name}
                          {stage.isParallel && <div className="text-[var(--iplegal-gray-500)] mt-1">(Parallel)</div>}
                        </div>
                        {stage.completedDate && (
                          <div className="text-xs text-[var(--iplegal-gray-500)] mt-1">
                            {new Date(stage.completedDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                          </div>
                        )}
                      </div>
                      {idx < mockWorkflow.length - 1 && (
                        <div className={`flex-1 h-[2px] mx-[var(--iplegal-spacing-8)] ${
                          stage.status === 'completed' ? 'bg-[var(--iplegal-success)]' : 'bg-[var(--iplegal-gray-200)]'
                        }`} />
                      )}
                    </React.Fragment>
                  ))}
                </div>
              </div>
            </Card>

            <Card title="Review Tasks">
              <div className="space-y-[var(--iplegal-spacing-12)]">
                {mockReviewTasks.map(task => (
                  <button
                    key={task.id}
                    onClick={() => handleTaskClick(task)}
                    className="w-full text-left p-[var(--iplegal-spacing-16)] border border-[var(--iplegal-border)] rounded-[var(--iplegal-radius)] hover:border-[var(--iplegal-primary)] hover:shadow-[var(--iplegal-shadow-sm)] transition-all"
                  >
                    <div className="flex items-start justify-between gap-[var(--iplegal-spacing-12)] mb-[var(--iplegal-spacing-8)]">
                      <div className="flex-1">
                        <div className="text-[var(--iplegal-gray-900)] mb-1">{task.task}</div>
                        <div className="text-sm text-[var(--iplegal-gray-600)]">
                          Assigned to: {task.assignee}
                        </div>
                      </div>
                      <span className={`px-[var(--iplegal-spacing-8)] py-[var(--iplegal-spacing-4)] rounded text-xs whitespace-nowrap ${
                        task.status === 'Completed' ? 'bg-[var(--iplegal-success-bg)] text-[var(--iplegal-success)]' :
                        task.status === 'In Progress' ? 'bg-[var(--iplegal-info-bg)] text-[var(--iplegal-info)]' :
                        'bg-[var(--iplegal-gray-100)] text-[var(--iplegal-gray-700)]'
                      }`}>
                        {task.status}
                      </span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <div className="text-[var(--iplegal-gray-600)]">
                        Due: {new Date(task.dueDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                      </div>
                      {task.decision && (
                        <div className="text-[var(--iplegal-success)]">
                          ✓ {task.decision}
                        </div>
                      )}
                    </div>
                  </button>
                ))}
              </div>
            </Card>

            <Card title="Approvals">
              <div className="space-y-[var(--iplegal-spacing-16)]">
                {mockApprovals.map((approval, idx) => (
                  <div key={idx} className="flex gap-[var(--iplegal-spacing-16)]">
                    <div className="flex flex-col items-center">
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                        approval.outcome === 'Approved' ? 'bg-[var(--iplegal-success)] text-white' :
                        approval.outcome === 'Rejected' ? 'bg-[var(--iplegal-danger)] text-white' :
                        'bg-[var(--iplegal-gray-200)] text-[var(--iplegal-gray-600)]'
                      }`}>
                        {approval.outcome === 'Approved' ? '✓' :
                         approval.outcome === 'Rejected' ? '✕' : '⋯'}
                      </div>
                      {idx < mockApprovals.length - 1 && (
                        <div className="w-[2px] flex-1 bg-[var(--iplegal-gray-200)] my-[var(--iplegal-spacing-8)]" style={{ minHeight: '40px' }} />
                      )}
                    </div>
                    <div className="flex-1 pb-[var(--iplegal-spacing-16)]">
                      <div className="flex items-start justify-between mb-[var(--iplegal-spacing-4)]">
                        <div>
                          <div className="text-[var(--iplegal-gray-900)]">{approval.approver}</div>
                          <div className="text-sm text-[var(--iplegal-gray-600)]">{approval.role}</div>
                        </div>
                        <span className={`px-[var(--iplegal-spacing-8)] py-[var(--iplegal-spacing-4)] rounded text-xs ${
                          approval.outcome === 'Approved' ? 'bg-[var(--iplegal-success-bg)] text-[var(--iplegal-success)]' :
                          approval.outcome === 'Rejected' ? 'bg-[var(--iplegal-danger-bg)] text-[var(--iplegal-danger)]' :
                          'bg-[var(--iplegal-gray-100)] text-[var(--iplegal-gray-700)]'
                        }`}>
                          {approval.outcome}
                        </span>
                      </div>
                      {approval.timestamp && (
                        <div className="text-xs text-[var(--iplegal-gray-500)] mb-[var(--iplegal-spacing-8)]">
                          {approval.timestamp}
                        </div>
                      )}
                      {approval.comments && (
                        <div className="text-sm text-[var(--iplegal-gray-700)] bg-[var(--iplegal-gray-50)] p-[var(--iplegal-spacing-12)] rounded-[var(--iplegal-radius)]">
                          "{approval.comments}"
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </Card>

            <div className="text-sm">
              <a href="#" className="text-[var(--iplegal-primary)] hover:underline">
                📋 View Full Audit Trail →
              </a>
            </div>
          </div>

          <div className="lg:col-span-4 space-y-[var(--iplegal-spacing-24)]">
            <Card title="Documents">
              <div className="space-y-[var(--iplegal-spacing-12)]">
                {documents.map((doc, idx) => (
                  <div key={idx} className="p-[var(--iplegal-spacing-12)] border border-[var(--iplegal-border)] rounded-[var(--iplegal-radius)] hover:border-[var(--iplegal-primary)] hover:shadow-[var(--iplegal-shadow-sm)] transition-all">
                    <div className="flex items-start gap-[var(--iplegal-spacing-12)]">
                      <div className="text-2xl">📄</div>
                      <div className="flex-1 min-w-0">
                        <a href="#" className="text-sm text-[var(--iplegal-primary)] hover:underline block truncate">
                          {doc.name}
                        </a>
                        <div className="text-xs text-[var(--iplegal-gray-600)] mt-1">
                          {doc.category}
                        </div>
                        <div className="text-xs text-[var(--iplegal-gray-500)] mt-1">
                          {doc.uploadedBy} • {new Date(doc.uploadedDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })} • {doc.size}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <button
                onClick={() => setShowAddDocumentModal(true)}
                className="w-full mt-[var(--iplegal-spacing-12)] px-[var(--iplegal-spacing-16)] py-[var(--iplegal-spacing-8)] border border-[var(--iplegal-border)] rounded-[var(--iplegal-radius)] hover:bg-[var(--iplegal-gray-50)] text-sm text-[var(--iplegal-gray-700)]"
              >
                + Add Document
              </button>
            </Card>

            <Card title="Activity & Comments">
              <div className="space-y-[var(--iplegal-spacing-16)] mb-[var(--iplegal-spacing-16)]">
                {mockActivity.map((activity, idx) => (
                  <div key={idx} className="border-b border-[var(--iplegal-border)] pb-[var(--iplegal-spacing-16)] last:border-0 last:pb-0">
                    <div className="flex items-start gap-[var(--iplegal-spacing-8)] mb-[var(--iplegal-spacing-4)]">
                      <div className="w-6 h-6 rounded-full bg-[var(--iplegal-primary)] text-white flex items-center justify-center text-xs">
                        {activity.user.charAt(0)}
                      </div>
                      <div className="flex-1">
                        <div className="text-sm text-[var(--iplegal-gray-900)]">
                          <span className="font-medium">{activity.user}</span> {activity.action}
                        </div>
                        <div className="text-xs text-[var(--iplegal-gray-500)] mt-1">
                          {activity.timestamp}
                        </div>
                        {activity.comment && (
                          <div className="text-sm text-[var(--iplegal-gray-700)] mt-[var(--iplegal-spacing-8)] bg-[var(--iplegal-gray-50)] p-[var(--iplegal-spacing-8)] rounded-[var(--iplegal-radius)]">
                            {activity.comment}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="border-t border-[var(--iplegal-border)] pt-[var(--iplegal-spacing-16)]">
                <textarea
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                  placeholder="Add a comment..."
                  rows={3}
                  className="w-full px-[var(--iplegal-spacing-12)] py-[var(--iplegal-spacing-8)] border border-[var(--iplegal-border)] rounded-[var(--iplegal-radius)] focus:outline-none focus:ring-2 focus:ring-[var(--iplegal-focus-ring)] focus:border-transparent text-sm mb-[var(--iplegal-spacing-8)]"
                />
                <PrimaryButton onClick={handleAddComment} className="w-full">
                  Post Comment
                </PrimaryButton>
              </div>
            </Card>

            <Card title="Attachments">
              <div className="text-center py-[var(--iplegal-spacing-24)] border-2 border-dashed border-[var(--iplegal-border)] rounded-[var(--iplegal-radius)] hover:border-[var(--iplegal-primary)] transition-colors cursor-pointer">
                <div className="text-3xl mb-[var(--iplegal-spacing-8)]">📎</div>
                <p className="text-sm text-[var(--iplegal-gray-700)] mb-[var(--iplegal-spacing-4)]">
                  Drop files here or click to browse
                </p>
                <p className="text-xs text-[var(--iplegal-gray-500)]">
                  PDF, DOC, DOCX, PNG, JPG (max 10MB)
                </p>
              </div>
            </Card>
          </div>
        </div>
      </div>

      {showTaskModal && selectedTask && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-[var(--iplegal-spacing-16)]" onClick={() => setShowTaskModal(false)}>
          <div className="bg-white rounded-[var(--iplegal-radius-lg)] shadow-[var(--iplegal-shadow-lg)] max-w-2xl w-full" onClick={e => e.stopPropagation()}>
            <div className="flex items-center justify-between px-[var(--iplegal-spacing-24)] py-[var(--iplegal-spacing-16)] border-b border-[var(--iplegal-border)]">
              <h3 className="text-[var(--iplegal-gray-900)]">Review Task Details</h3>
              <button onClick={() => setShowTaskModal(false)} className="text-[var(--iplegal-gray-600)] hover:text-[var(--iplegal-gray-900)] text-xl">
                ✕
              </button>
            </div>
            <div className="p-[var(--iplegal-spacing-24)]">
              <div className="space-y-[var(--iplegal-spacing-16)]">
                <div>
                  <div className="text-sm text-[var(--iplegal-gray-600)] mb-1">Task</div>
                  <div className="text-[var(--iplegal-gray-900)]">{selectedTask.task}</div>
                </div>
                <div>
                  <div className="text-sm text-[var(--iplegal-gray-600)] mb-1">Assignee</div>
                  <div className="text-[var(--iplegal-gray-900)]">{selectedTask.assignee}</div>
                </div>
                <div>
                  <div className="text-sm text-[var(--iplegal-gray-600)] mb-1">Due Date</div>
                  <div className="text-[var(--iplegal-gray-900)]">
                    {new Date(selectedTask.dueDate).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
                  </div>
                </div>
                <div>
                  <div className="text-sm text-[var(--iplegal-gray-600)] mb-1">Status</div>
                  <span className={`inline-block px-[var(--iplegal-spacing-8)] py-[var(--iplegal-spacing-4)] rounded text-xs ${
                    selectedTask.status === 'Completed' ? 'bg-[var(--iplegal-success-bg)] text-[var(--iplegal-success)]' :
                    selectedTask.status === 'In Progress' ? 'bg-[var(--iplegal-info-bg)] text-[var(--iplegal-info)]' :
                    'bg-[var(--iplegal-gray-100)] text-[var(--iplegal-gray-700)]'
                  }`}>
                    {selectedTask.status}
                  </span>
                </div>
                {selectedTask.decision && (
                  <div>
                    <div className="text-sm text-[var(--iplegal-gray-600)] mb-1">Decision</div>
                    <div className="text-[var(--iplegal-success)]">{selectedTask.decision}</div>
                  </div>
                )}
              </div>
            </div>
            <div className="flex gap-[var(--iplegal-spacing-12)] justify-end px-[var(--iplegal-spacing-24)] py-[var(--iplegal-spacing-16)] border-t border-[var(--iplegal-border)]">
              <SecondaryButton onClick={() => setShowTaskModal(false)}>Close</SecondaryButton>
            </div>
          </div>
        </div>
      )}

      <AddDocumentModal
        isOpen={showAddDocumentModal}
        onClose={() => setShowAddDocumentModal(false)}
        onSave={handleAddDocument}
      />
    </div>
  );
}
