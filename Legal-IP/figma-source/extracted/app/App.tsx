import { useState } from 'react';
import { PortalHeader } from './components/PortalHeader';
import { PortalHero } from './components/PortalHero';
import { MyOpenRequests } from './components/MyOpenRequests';
import { QuickLinks } from './components/QuickLinks';
import { LegalDecisions } from './components/LegalDecisions';
import { HelpGuidance } from './components/HelpGuidance';
import { RequestWizard } from './components/RequestWizard';
import { MyRequestsPage } from './components/MyRequestsPage';
import { RequestDetailPage } from './components/RequestDetailPage';
import { LegalDecisionsPage } from './components/LegalDecisionsPage';

export default function App() {
  const [showEmptyState] = useState(false);
  const [showWizard, setShowWizard] = useState(false);
  const [showMyRequests, setShowMyRequests] = useState(false);
  const [showRequestDetail, setShowRequestDetail] = useState(false);
  const [showLegalDecisions, setShowLegalDecisions] = useState(false);
  const [prefillRelatedType, setPrefillRelatedType] = useState<string | undefined>(undefined);

  const sampleRequests = showEmptyState ? [] : [
    {
      number: 'REQ-2345',
      title: 'ML Model Patent Application',
      type: 'Patent',
      status: 'In Review' as const,
      due: 'May 10, 2026',
      priority: 'High' as const
    },
    {
      number: 'REQ-2340',
      title: 'API Framework Copyright',
      type: 'Copyright',
      status: 'Open' as const,
      due: 'May 15, 2026',
      priority: 'Medium' as const
    },
    {
      number: 'REQ-2338',
      title: 'Product Name Trademark',
      type: 'Trademark',
      status: 'In Review' as const,
      due: 'May 5, 2026',
      priority: 'Critical' as const
    }
  ];

  if (showLegalDecisions) {
    return (
      <LegalDecisionsPage
        onStartRequest={(relatedType) => {
          setPrefillRelatedType(relatedType);
          setShowLegalDecisions(false);
          setShowWizard(true);
        }}
        onClose={() => setShowLegalDecisions(false)}
      />
    );
  }

  if (showRequestDetail) {
    return (
      <RequestDetailPage
        onClose={() => setShowRequestDetail(false)}
        onBack={() => {
          setShowRequestDetail(false);
          setShowMyRequests(true);
        }}
      />
    );
  }

  if (showWizard) {
    return <RequestWizard onClose={() => {
      setShowWizard(false);
      setPrefillRelatedType(undefined);
    }} />;
  }

  if (showMyRequests) {
    return (
      <MyRequestsPage
        onStartRequest={() => {
          setShowMyRequests(false);
          setShowWizard(true);
        }}
        onClose={() => setShowMyRequests(false)}
      />
    );
  }

  return (
    <div className="min-h-screen bg-[var(--iplegal-gray-50)]">
      <PortalHeader />
      <PortalHero
        onStartRequest={() => setShowWizard(true)}
        onMyRequests={() => setShowMyRequests(true)}
      />

      <main className="max-w-[var(--iplegal-container-lg)] mx-auto px-[var(--iplegal-spacing-16)] py-[var(--iplegal-spacing-32)]">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-[var(--iplegal-spacing-24)]">
          <div className="lg:col-span-2 space-y-[var(--iplegal-spacing-24)]">
            <MyOpenRequests
              requests={sampleRequests}
              onStartRequest={() => setShowWizard(true)}
              onViewRequest={() => setShowRequestDetail(true)}
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-[var(--iplegal-spacing-24)]">
              <QuickLinks />
              <div className="md:hidden">
                <HelpGuidance />
              </div>
            </div>

            <LegalDecisions onViewAll={() => setShowLegalDecisions(true)} />
          </div>

          <div className="hidden md:block">
            <HelpGuidance />
          </div>
        </div>
      </main>
    </div>
  );
}