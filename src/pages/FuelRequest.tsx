import React from 'react';
import { AppLayout } from '@/components/layout/AppLayout';
import { FuelRequestForm } from '@/components/forms/FuelRequestForm';
import { useNavigate } from 'react-router-dom';

const FuelRequest: React.FC = () => {
  const navigate = useNavigate();

  const handleSubmit = (data: any) => {
    // Rediriger vers le dashboard après soumission
    setTimeout(() => {
      navigate('/');
    }, 2000);
  };

  return (
    <AppLayout userRole="chauffeur">
      <div className="max-w-2xl mx-auto">
        <FuelRequestForm onSubmit={handleSubmit} />
      </div>
    </AppLayout>
  );
};

export default FuelRequest;