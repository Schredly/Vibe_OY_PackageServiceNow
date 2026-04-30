import React from 'react';
import { PrimaryButton, SecondaryButton } from './Buttons';

export function PortalHero({ onStartRequest, onMyRequests }: { onStartRequest?: () => void; onMyRequests?: () => void }) {
  return (
    <div className="bg-gradient-to-r from-[var(--iplegal-primary)] to-[var(--iplegal-accent)] text-white py-[var(--iplegal-spacing-48)] px-[var(--iplegal-spacing-16)]">
      <div className="max-w-[var(--iplegal-container-lg)] mx-auto">
        <h2 className="mb-[var(--iplegal-spacing-12)] text-2xl md:text-3xl">
          Submit and track software IP requests
        </h2>
        <p className="mb-[var(--iplegal-spacing-24)] text-base md:text-lg opacity-95 max-w-2xl">
          Streamline patent applications, trademark registrations, and copyright protections for your software innovations.
        </p>
        <div className="flex flex-col sm:flex-row gap-[var(--iplegal-spacing-12)]">
          <PrimaryButton
            onClick={onStartRequest}
            className="bg-white !text-[var(--iplegal-primary)] hover:!bg-[var(--iplegal-gray-100)] min-h-[44px]"
          >
            Start a new request
          </PrimaryButton>
          <SecondaryButton
            onClick={onMyRequests}
            className="!border-white !text-white hover:!bg-white/10 min-h-[44px]"
          >
            My requests
          </SecondaryButton>
        </div>
      </div>
    </div>
  );
}
