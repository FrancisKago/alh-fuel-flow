import React from 'react';
import { AppLayout } from '@/components/layout/AppLayout';
import { DashboardCard } from '@/components/dashboard/DashboardCard';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

// Mock data - À remplacer par Supabase
const mockData = {
  chauffeur: {
    name: 'Jean Mbarga',
    vehicle: 'CAM-123-AB',
    fuelLevel: 45,
    lastRequest: '2 heures',
    pendingRequests: 1,
    weeklyConsumption: 180
  },
  notifications: [
    { id: 1, type: 'success', message: 'Demande approuvée - 30L gasoil', time: '1h' },
    { id: 2, type: 'info', message: 'Nouveau niveau stock soute: 2500L', time: '3h' }
  ]
};

interface DashboardProps {
  userRole?: 'chauffeur' | 'pompiste' | 'superviseur' | 'direction' | 'comptabilite' | 'admin';
}

const Dashboard: React.FC<DashboardProps> = ({ userRole = 'chauffeur' }) => {
  
  const renderChauffeurDashboard = () => (
    <div className="space-y-6">
      {/* Cards de statut */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <DashboardCard
          title="Mon Véhicule"
          value={mockData.chauffeur.vehicle}
          description="Camion benne 8T"
          icon={<span>🚚</span>}
        />
        <DashboardCard
          title="Niveau Carburant"
          value={`${mockData.chauffeur.fuelLevel}L`}
          description="Capacité: 80L"
          variant={mockData.chauffeur.fuelLevel < 20 ? 'warning' : 'default'}
          icon={<span>⛽</span>}
        />
        <DashboardCard
          title="Demandes en cours"
          value={mockData.chauffeur.pendingRequests}
          description="Attente approbation"
          variant={mockData.chauffeur.pendingRequests > 0 ? 'warning' : 'success'}
          icon={<span>📋</span>}
        />
      </div>

      {/* Actions rapides */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <span>⚡</span>
            Actions Rapides
          </CardTitle>
        </CardHeader>
        <CardContent className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Button variant="terrain" size="xl" className="h-16">
            <div className="flex flex-col items-center gap-1">
              <span className="text-xl">⛽</span>
              <span>Demander Carburant</span>
            </div>
          </Button>
          <Button variant="outline" size="xl" className="h-16">
            <div className="flex flex-col items-center gap-1">
              <span className="text-xl">📊</span>
              <span>Consulter Historique</span>
            </div>
          </Button>
        </CardContent>
      </Card>

      {/* Notifications récentes */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <span>🔔</span>
            Notifications
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {mockData.notifications.map((notif) => (
            <div key={notif.id} className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
              <div className="flex items-center gap-3">
                <Badge variant={notif.type === 'success' ? 'default' : 'secondary'}>
                  {notif.type === 'success' ? '✅' : 'ℹ️'}
                </Badge>
                <span className="text-sm">{notif.message}</span>
              </div>
              <span className="text-xs text-muted-foreground">{notif.time}</span>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );

  const renderPompisteDashboard = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <DashboardCard
          title="Stock Soute"
          value="2,500L"
          description="Capacité: 5,000L"
          variant="success"
          icon={<span>🛢️</span>}
        />
        <DashboardCard
          title="Distributions Aujourd'hui"
          value="12"
          description="450L distribués"
          icon={<span>⛽</span>}
        />
        <DashboardCard
          title="Niveau d'alerte"
          value="OK"
          description="Seuil: 1,000L"
          variant="success"
          icon={<span>🚨</span>}
        />
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Actions Pompiste</CardTitle>
        </CardHeader>
        <CardContent className="grid grid-cols-2 gap-4">
          <Button variant="terrain" size="xl" className="h-16">
            <div className="flex flex-col items-center gap-1">
              <span className="text-xl">⛽</span>
              <span>Distribuer Carburant</span>
            </div>
          </Button>
          <Button variant="secondary" size="xl" className="h-16">
            <div className="flex flex-col items-center gap-1">
              <span className="text-xl">📊</span>
              <span>Signaler Stock</span>
            </div>
          </Button>
        </CardContent>
      </Card>
    </div>
  );

  const renderSuperviseurDashboard = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <DashboardCard
          title="Demandes en attente"
          value="3"
          description="Nécessitent approbation"
          variant="warning"
          icon={<span>⏳</span>}
        />
        <DashboardCard
          title="Véhicules actifs"
          value="18"
          description="Sur 25 véhicules"
          icon={<span>🚚</span>}
        />
        <DashboardCard
          title="Consommation semaine"
          value="1,250L"
          description="+12% vs semaine précédente"
          trend={{ value: 12, label: 'cette semaine' }}
          icon={<span>📈</span>}
        />
        <DashboardCard
          title="Coût total"
          value="875,000 FCFA"
          description="Budget mensuel: 2M FCFA"
          icon={<span>💰</span>}
        />
      </div>
    </div>
  );

  const renderContent = () => {
    switch (userRole) {
      case 'chauffeur':
        return renderChauffeurDashboard();
      case 'pompiste':
        return renderPompisteDashboard();
      case 'superviseur':
        return renderSuperviseurDashboard();
      case 'direction':
        return renderSuperviseurDashboard(); // Sera personnalisé
      default:
        return renderChauffeurDashboard();
    }
  };

  return (
    <AppLayout userRole={userRole}>
      <div className="space-y-6">
        {/* En-tête de bienvenue */}
        <div className="bg-gradient-to-r from-primary to-primary-light text-primary-foreground p-6 rounded-lg shadow-terrain">
          <h1 className="text-2xl font-bold">
            Bonjour {mockData.chauffeur.name} 👋
          </h1>
          <p className="text-primary-foreground/80 mt-1">
            {userRole === 'chauffeur' && 'Gérez vos demandes de carburant'}
            {userRole === 'pompiste' && 'Gérez les distributions et stocks'}
            {userRole === 'superviseur' && 'Supervisez votre équipe et parc'}
          </p>
        </div>

        {renderContent()}
      </div>
    </AppLayout>
  );
};

export default Dashboard;