import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

interface NavigationProps {
  userRole: 'chauffeur' | 'pompiste' | 'superviseur' | 'direction' | 'comptabilite' | 'admin';
}

const navigationItems = {
  chauffeur: [
    { id: 'dashboard', label: 'Accueil', icon: '🏠', path: '/' },
    { id: 'request', label: 'Demander', icon: '⛽', path: '/demande' },
    { id: 'history', label: 'Historique', icon: '📋', path: '/historique' },
    { id: 'vehicle', label: 'Mon Véhicule', icon: '🚚', path: '/vehicule' }
  ],
  pompiste: [
    { id: 'dashboard', label: 'Accueil', icon: '🏠', path: '/' },
    { id: 'distribute', label: 'Distribuer', icon: '⛽', path: '/distribution' },
    { id: 'stock', label: 'Stock', icon: '📊', path: '/stock' },
    { id: 'history', label: 'Historique', icon: '📋', path: '/historique' }
  ],
  superviseur: [
    { id: 'dashboard', label: 'Tableau de Bord', icon: '📊', path: '/' },
    { id: 'approvals', label: 'Approbations', icon: '✅', path: '/approbations' },
    { id: 'fleet', label: 'Parc Auto', icon: '🚚', path: '/parc' },
    { id: 'reports', label: 'Rapports', icon: '📈', path: '/rapports' }
  ],
  direction: [
    { id: 'dashboard', label: 'Vue d\'ensemble', icon: '📊', path: '/' },
    { id: 'approvals', label: 'Approbations', icon: '✅', path: '/approbations' },
    { id: 'analytics', label: 'Analytics', icon: '📈', path: '/analytics' },
    { id: 'costs', label: 'Coûts', icon: '💰', path: '/couts' },
    { id: 'fleet', label: 'Parc Auto', icon: '🚚', path: '/parc' }
  ],
  comptabilite: [
    { id: 'dashboard', label: 'Accueil', icon: '🏠', path: '/' },
    { id: 'reports', label: 'Rapports', icon: '📈', path: '/rapports' },
    { id: 'exports', label: 'Exports', icon: '📤', path: '/exports' },
    { id: 'costs', label: 'Coûts', icon: '💰', path: '/couts' }
  ],
  admin: [
    { id: 'dashboard', label: 'Administration', icon: '⚙️', path: '/' },
    { id: 'users', label: 'Utilisateurs', icon: '👥', path: '/utilisateurs' },
    { id: 'vehicles', label: 'Véhicules', icon: '🚚', path: '/vehicules' },
    { id: 'depots', label: 'Soutes', icon: '🏭', path: '/soutes' },
    { id: 'settings', label: 'Paramètres', icon: '⚙️', path: '/parametres' }
  ]
};

export const Navigation: React.FC<NavigationProps> = ({ userRole }) => {
  const items = navigationItems[userRole];
  const isMobileRole = userRole === 'chauffeur' || userRole === 'pompiste';

  if (isMobileRole) {
    // Navigation mobile bottom bar
    return (
      <nav className="fixed bottom-0 left-0 right-0 z-40 bg-card border-t shadow-elevated">
        <div className="flex justify-around py-2">
          {items.map((item) => (
            <Link key={item.id} to={item.path} className="flex-1">
              <Button
                variant="ghost"
                size="sm"
                className="w-full flex-col h-16 gap-1 text-xs"
              >
                <span className="text-xl">{item.icon}</span>
                <span className="leading-none">{item.label}</span>
              </Button>
            </Link>
          ))}
        </div>
      </nav>
    );
  }

  // Navigation desktop sidebar
  return (
    <nav className="p-4">
      <div className="space-y-2">
        {items.map((item) => (
          <Link key={item.id} to={item.path}>
            <Button
              variant="ghost"
              className="w-full justify-start gap-3 h-12"
            >
              <span className="text-lg">{item.icon}</span>
              <span>{item.label}</span>
            </Button>
          </Link>
        ))}
      </div>
    </nav>
  );
};