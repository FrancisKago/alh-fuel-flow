import React from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';

interface HeaderProps {
  userRole: 'chauffeur' | 'pompiste' | 'superviseur' | 'direction' | 'comptabilite' | 'admin';
}

const roleLabels = {
  chauffeur: 'Chauffeur',
  pompiste: 'Pompiste',
  superviseur: 'Superviseur',
  direction: 'Direction',
  comptabilite: 'Comptabilité',
  admin: 'Administrateur'
};

const roleColors = {
  chauffeur: 'default',
  pompiste: 'secondary',
  superviseur: 'outline',
  direction: 'destructive',
  comptabilite: 'outline',
  admin: 'secondary'
} as const;

export const Header: React.FC<HeaderProps> = ({ userRole }) => {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 h-16 bg-card border-b shadow-sm">
      <div className="flex items-center justify-between h-full px-4">
        {/* Logo et titre */}
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-gradient-to-br from-primary to-primary-light rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-sm">ALH</span>
          </div>
          <div>
            <h1 className="font-bold text-foreground">Fuel Flow</h1>
            <p className="text-xs text-muted-foreground">Gestion Carburant</p>
          </div>
        </div>

        {/* Informations utilisateur */}
        <div className="flex items-center gap-3">
          <Badge variant={roleColors[userRole]} className="hidden sm:inline-flex">
            {roleLabels[userRole]}
          </Badge>
          
          <Avatar className="h-8 w-8">
            <AvatarFallback className="bg-primary text-primary-foreground text-sm">
              {roleLabels[userRole].charAt(0)}
            </AvatarFallback>
          </Avatar>
          
          {/* Bouton menu mobile */}
          <Button variant="ghost" size="icon" className="md:hidden">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </Button>
        </div>
      </div>
    </header>
  );
};