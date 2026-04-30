import React, { useState } from 'react';

export function PortalHeader() {
  const [showUserMenu, setShowUserMenu] = useState(false);

  return (
    <header className="bg-white border-b border-[var(--iplegal-border)] shadow-[var(--iplegal-shadow-sm)]">
      <div className="max-w-[var(--iplegal-container-lg)] mx-auto px-[var(--iplegal-spacing-16)] py-[var(--iplegal-spacing-12)]">
        <div className="flex items-center justify-between">
          <h1 className="text-[var(--iplegal-primary)] text-xl">IP Legal</h1>

          <div className="flex items-center gap-[var(--iplegal-spacing-12)]">
            <button className="p-[var(--iplegal-spacing-8)] rounded-[var(--iplegal-radius)] hover:bg-[var(--iplegal-gray-100)] relative">
              <span className="text-lg">🔔</span>
              <span className="absolute top-1 right-1 w-2 h-2 bg-[var(--iplegal-danger)] rounded-full"></span>
            </button>

            <div className="relative">
              <button
                onClick={() => setShowUserMenu(!showUserMenu)}
                className="flex items-center gap-[var(--iplegal-spacing-8)] p-[var(--iplegal-spacing-8)] rounded-[var(--iplegal-radius)] hover:bg-[var(--iplegal-gray-100)]"
              >
                <div className="w-8 h-8 rounded-full bg-[var(--iplegal-primary)] text-white flex items-center justify-center text-sm">
                  JD
                </div>
                <span className="hidden sm:inline text-[var(--iplegal-gray-700)]">Jane Doe</span>
                <span className="text-[var(--iplegal-gray-500)]">▼</span>
              </button>

              {showUserMenu && (
                <div className="absolute right-0 mt-[var(--iplegal-spacing-8)] w-48 bg-white border border-[var(--iplegal-border)] rounded-[var(--iplegal-radius)] shadow-[var(--iplegal-shadow-md)] z-50">
                  <a href="#" className="block px-[var(--iplegal-spacing-16)] py-[var(--iplegal-spacing-12)] hover:bg-[var(--iplegal-gray-50)] text-[var(--iplegal-gray-700)]">
                    My Profile
                  </a>
                  <a href="#" className="block px-[var(--iplegal-spacing-16)] py-[var(--iplegal-spacing-12)] hover:bg-[var(--iplegal-gray-50)] text-[var(--iplegal-gray-700)]">
                    Settings
                  </a>
                  <div className="border-t border-[var(--iplegal-border)]"></div>
                  <a href="#" className="block px-[var(--iplegal-spacing-16)] py-[var(--iplegal-spacing-12)] hover:bg-[var(--iplegal-gray-50)] text-[var(--iplegal-gray-700)]">
                    Sign Out
                  </a>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
