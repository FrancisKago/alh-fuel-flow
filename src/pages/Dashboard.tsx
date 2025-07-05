import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { AppLayout } from '@/components/layout/AppLayout';
import { DashboardCard } from '@/components/dashboard/DashboardCard';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';

interface DashboardData {
  pendingRequests: number;
  totalDistributions: number;
  stockLevel: number;
  vehicles: any[];
  recentRequests: any[];
}

interface DashboardProps {
  userRole?: 'chauffeur' | 'pompiste' | 'superviseur' | 'direction' | 'comptabilite' | 'admin';
}

const Dashboard: React.FC<DashboardProps> = ({ userRole = 'chauffeur' }) => {
  const { user, profile } = useAuth();
  const [data, setData] = useState<DashboardData>({
    pendingRequests: 0,
    totalDistributions: 0,
    stockLevel: 0,
    vehicles: [],
    recentRequests: []
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) {
      fetchDashboardData();
    }
  }, [user, userRole]);

  const fetchDashboardData = async () => {
    try {
      // Récupérer les demandes en attente
      const { data: pendingData } = await supabase
        .from('demandes_carburant')
        .select('*')
        .eq('statut', 'en_attente');

      // Récupérer les véhicules actifs
      const { data: vehiclesData } = await supabase
        .from('vehicules')
        .select('*')
        .eq('actif', true);

      // Récupérer les demandes récentes de l'utilisateur si chauffeur
      let recentRequests = [];
      if (userRole === 'chauffeur' && user) {
        const { data: requestsData } = await supabase
          .from('demandes_carburant')
          .select('*, vehicules(immatriculation)')
          .eq('id_utilisateur', user.id)
          .order('date_demande', { ascending: false })
          .limit(5);
        recentRequests = requestsData || [];
      }

      setData({
        pendingRequests: pendingData?.length || 0,
        totalDistributions: 0,
        stockLevel: 2500, // À connecter avec les données réelles de stock
        vehicles: vehiclesData || [],
        recentRequests
      });
    } catch (error) {
      console.error('Erreur lors du chargement des données:', error);
    } finally {
      setLoading(false);
    }
  };
  
  const renderChauffeurDashboard = () => (
    <div className="space-y-6">
      {/* Cards de statut */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <DashboardCard
          title="Mes Véhicules"
          value={data.vehicles.length}
          description="Véhicules assignés"
          icon={<span>🚚</span>}
        />
        <DashboardCard
          title="Demandes récentes"
          value={data.recentRequests.length}
          description="Dernières demandes"
          icon={<span>⛽</span>}
        />
        <DashboardCard
          title="Demandes en cours"
          value={data.pendingRequests}
          description="Attente approbation"
          variant={data.pendingRequests > 0 ? 'warning' : 'success'}
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
          <Link to="/demande">
            <Button variant="terrain" size="xl" className="h-16 w-full">
              <div className="flex flex-col items-center gap-1">
                <span className="text-xl">⛽</span>
                <span>Demander Carburant</span>
              </div>
            </Button>
          </Link>
          <Link to="/historique">
            <Button variant="outline" size="xl" className="h-16 w-full">
              <div className="flex flex-col items-center gap-1">
                <span className="text-xl">📊</span>
                <span>Consulter Historique</span>
              </div>
            </Button>
          </Link>
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
          {data.recentRequests.length > 0 ? (
            data.recentRequests.map((request: any) => (
              <div key={request.id} className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                <div className="flex items-center gap-3">
                  <Badge variant={request.statut === 'valide_superviseur' ? 'default' : 'secondary'}>
                    {request.statut === 'valide_superviseur' ? '✅' : request.statut === 'rejete' ? '❌' : '⏳'}
                  </Badge>
                  <span className="text-sm">
                    {request.quantite_demandee}L - {request.vehicules?.immatriculation} - {request.mission}
                  </span>
                </div>
                <span className="text-xs text-muted-foreground">
                  {new Date(request.date_demande).toLocaleDateString('fr-FR')}
                </span>
              </div>
            ))
          ) : (
            <p className="text-sm text-muted-foreground text-center py-4">
              Aucune demande récente
            </p>
          )}
        </CardContent>
      </Card>
    </div>
  );

  const renderPompisteDashboard = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <DashboardCard
          title="Stock Soute"
          value={`${data.stockLevel.toLocaleString()}L`}
          description="Capacité: 5,000L"
          variant={data.stockLevel > 1000 ? "success" : "warning"}
          icon={<span>🛢️</span>}
        />
        <DashboardCard
          title="Distributions Aujourd'hui"
          value={data.totalDistributions}
          description="Distributions effectuées"
          icon={<span>⛽</span>}
        />
        <DashboardCard
          title="Demandes en attente"
          value={data.pendingRequests}
          description="À traiter"
          variant={data.pendingRequests > 0 ? "warning" : "success"}
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
          value={data.pendingRequests}
          description="Nécessitent approbation"
          variant={data.pendingRequests > 0 ? "warning" : "success"}
          icon={<span>⏳</span>}
        />
        <DashboardCard
          title="Véhicules actifs"
          value={data.vehicles.length}
          description="Parc automobile"
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
            Bonjour {profile?.full_name || 'Utilisateur'} 👋
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