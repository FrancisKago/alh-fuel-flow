import React from 'react';
import { AppLayout } from '@/components/layout/AppLayout';
import { FuelRequestForm } from '@/components/forms/FuelRequestForm';
import { useToast } from '@/hooks/use-toast';

// Mock data - sera remplacé par Supabase
const mockVehicles = [
  {
    id: '1',
    registration: 'CAM-123-AB',
    type: 'Camion Benne 8T',
    capacity: 80,
    fuelLevel: 25
  },
  {
    id: '2', 
    registration: 'CAM-456-CD',
    type: 'Pelle Hydraulique',
    capacity: 120,
    fuelLevel: 40
  }
];

const mockWorksites = [
  {
    id: '1',
    name: 'Chantier Mvog-Ada',
    location: 'Yaoundé, Cameroun'
  },
  {
    id: '2',
    name: 'Route Douala-Edéa',
    location: 'Littoral, Cameroun'
  },
  {
    id: '3',
    name: 'Pont Wouri',
    location: 'Douala, Cameroun'
  }
];

const FuelRequest: React.FC = () => {
  const { toast } = useToast();

  const handleSubmit = (data: any) => {
    // TODO: Intégrer avec Supabase pour envoyer la demande
    console.log('Demande de carburant:', data);
    
    toast({
      title: "Demande envoyée ✅",
      description: `Votre demande de ${data.quantity}L a été envoyée pour approbation.`,
    });

    // Rediriger vers le dashboard après soumission
    setTimeout(() => {
      window.location.href = '/';
    }, 2000);
  };

  return (
    <AppLayout userRole="chauffeur">
      <div className="max-w-2xl mx-auto">
        <FuelRequestForm
          onSubmit={handleSubmit}
          vehicles={mockVehicles}
          worksites={mockWorksites}
        />
      </div>
    </AppLayout>
  );
};

export default FuelRequest;