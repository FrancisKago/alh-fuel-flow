import React from 'react';
import { Toaster } from '@/components/ui/toaster';
import { Header } from './Header';
import { Navigation } from './Navigation';

interface AppLayoutProps {
  children: React.ReactNode;
  userRole?: 'chauffeur' | 'pompiste' | 'superviseur' | 'direction' | 'comptabilite' | 'admin';
}

export const AppLayout: React.FC<AppLayoutProps> = ({ children, userRole = 'chauffeur' }) => {
  const isMobileRole = userRole === 'chauffeur' || userRole === 'pompiste';
  
  return (
    <div className="min-h-screen bg-background">
      <Header userRole={userRole} />
      
      {/* Mobile-first layout pour terrain */}
      {isMobileRole ? (
        <div className="pt-16 pb-20">
          <main className="p-4">
            {children}
          </main>
          <Navigation userRole={userRole} />
        </div>
      ) : (
        // Layout desktop pour bureau
        <div className="flex pt-16">
          <aside className="w-64 h-screen sticky top-16 border-r bg-card">
            <Navigation userRole={userRole} />
          </aside>
          <main className="flex-1 p-6">
            {children}
          </main>
        </div>
      )}
      
      <Toaster />
    </div>
  );
};