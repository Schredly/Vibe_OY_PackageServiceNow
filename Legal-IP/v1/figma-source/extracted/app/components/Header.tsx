import React from 'react';

export function Header() {
  return (
    <header className="bg-white border-b border-[var(--iplegal-border)] shadow-[var(--iplegal-shadow-sm)]">
      <div className="max-w-[var(--iplegal-container-lg)] mx-auto px-[var(--iplegal-spacing-16)] py-[var(--iplegal-spacing-16)]">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-[var(--iplegal-spacing-16)]">
            <h1 className="text-[var(--iplegal-primary)]">IP Legal</h1>
            <nav className="hidden md:flex gap-[var(--iplegal-spacing-24)]">
              <a href="#" className="text-[var(--iplegal-gray-700)] hover:text-[var(--iplegal-primary)]">Dashboard</a>
              <a href="#" className="text-[var(--iplegal-gray-700)] hover:text-[var(--iplegal-primary)]">Requests</a>
              <a href="#" className="text-[var(--iplegal-gray-700)] hover:text-[var(--iplegal-primary)]">Reports</a>
            </nav>
          </div>
          <div className="flex items-center gap-[var(--iplegal-spacing-12)]">
            <button className="p-[var(--iplegal-spacing-8)] rounded-[var(--iplegal-radius)] hover:bg-[var(--iplegal-gray-100)]">
              🔔
            </button>
            <div className="w-8 h-8 rounded-full bg-[var(--iplegal-primary)] text-white flex items-center justify-center">
              JD
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}

export function Hero() {
  return (
    <div className="bg-gradient-to-r from-[var(--iplegal-primary)] to-[var(--iplegal-accent)] text-white py-[var(--iplegal-spacing-64)] px-[var(--iplegal-spacing-16)]">
      <div className="max-w-[var(--iplegal-container-lg)] mx-auto">
        <h1 className="mb-[var(--iplegal-spacing-16)]">Intellectual Property Management</h1>
        <p className="mb-[var(--iplegal-spacing-24)] text-lg max-w-2xl">
          Streamline your IP legal requests, track patent applications, and manage trademarks all in one place.
        </p>
        <div className="flex gap-[var(--iplegal-spacing-12)]">
          <button className="px-[var(--iplegal-spacing-24)] py-[var(--iplegal-spacing-12)] bg-white text-[var(--iplegal-primary)] rounded-[var(--iplegal-radius)] hover:bg-[var(--iplegal-gray-100)]">
            New Request
          </button>
          <button className="px-[var(--iplegal-spacing-24)] py-[var(--iplegal-spacing-12)] bg-transparent border border-white text-white rounded-[var(--iplegal-radius)] hover:bg-white/10">
            View Documentation
          </button>
        </div>
      </div>
    </div>
  );
}
