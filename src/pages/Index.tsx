import Dashboard from './Dashboard';

const Index = () => {
  // Pour le moment, on affiche le dashboard chauffeur par défaut
  // L'authentification et les rôles seront gérés après connexion Supabase
  return <Dashboard userRole="chauffeur" />;
};

export default Index;
