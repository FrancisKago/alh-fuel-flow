import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';

interface FuelRequestFormProps {
  onSubmit: (data: FuelRequestData) => void;
  vehicles: Array<{
    id: string;
    registration: string;
    type: string;
    capacity: number;
    fuelLevel: number;
  }>;
  worksites: Array<{
    id: string;
    name: string;
    location: string;
  }>;
}

interface FuelRequestData {
  vehicleId: string;
  quantity: number;
  reason: string;
  worksiteId: string;
  urgency: 'normal' | 'urgent';
}

export const FuelRequestForm: React.FC<FuelRequestFormProps> = ({
  onSubmit,
  vehicles,
  worksites
}) => {
  const [formData, setFormData] = useState<Partial<FuelRequestData>>({
    urgency: 'normal'
  });
  const [selectedVehicle, setSelectedVehicle] = useState<typeof vehicles[0] | null>(null);

  const handleVehicleChange = (vehicleId: string) => {
    const vehicle = vehicles.find(v => v.id === vehicleId);
    setSelectedVehicle(vehicle || null);
    setFormData(prev => ({ ...prev, vehicleId }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.vehicleId && formData.quantity && formData.reason && formData.worksiteId) {
      onSubmit(formData as FuelRequestData);
    }
  };

  const suggestedQuantity = selectedVehicle 
    ? Math.round((selectedVehicle.capacity - selectedVehicle.fuelLevel) * 0.8)
    : 0;

  return (
    <Card className="shadow-terrain">
      <CardHeader className="bg-gradient-to-r from-primary to-primary-light text-primary-foreground">
        <CardTitle className="flex items-center gap-2">
          <span className="text-xl">⛽</span>
          Demande de Carburation
        </CardTitle>
      </CardHeader>
      <CardContent className="p-6 space-y-6">
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Sélection véhicule */}
          <div className="space-y-2">
            <Label htmlFor="vehicle" className="text-sm font-medium">
              Véhicule / Engin *
            </Label>
            <Select onValueChange={handleVehicleChange}>
              <SelectTrigger className="h-12">
                <SelectValue placeholder="Sélectionner votre véhicule" />
              </SelectTrigger>
              <SelectContent>
                {vehicles.map((vehicle) => (
                  <SelectItem key={vehicle.id} value={vehicle.id}>
                    <div className="flex items-center justify-between w-full">
                      <span className="font-medium">{vehicle.registration}</span>
                      <Badge variant="outline" className="ml-2">
                        {vehicle.type}
                      </Badge>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Informations véhicule sélectionné */}
          {selectedVehicle && (
            <Card className="bg-terrain-bg border-primary/20">
              <CardContent className="p-4">
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-muted-foreground">Capacité:</span>
                    <span className="font-medium ml-2">{selectedVehicle.capacity}L</span>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Niveau actuel:</span>
                    <span className="font-medium ml-2">{selectedVehicle.fuelLevel}L</span>
                  </div>
                </div>
                {suggestedQuantity > 0 && (
                  <div className="mt-2 p-2 bg-accent/10 rounded-md">
                    <span className="text-xs text-accent font-medium">
                      💡 Quantité suggérée: {suggestedQuantity}L
                    </span>
                  </div>
                )}
              </CardContent>
            </Card>
          )}

          {/* Quantité demandée */}
          <div className="space-y-2">
            <Label htmlFor="quantity" className="text-sm font-medium">
              Quantité demandée (Litres) *
            </Label>
            <div className="flex gap-2">
              {[10, 20, 30, 50].map((qty) => (
                <Button
                  key={qty}
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => setFormData(prev => ({ ...prev, quantity: qty }))}
                  className={formData.quantity === qty ? 'bg-primary text-primary-foreground' : ''}
                >
                  {qty}L
                </Button>
              ))}
              {suggestedQuantity > 0 && !([10, 20, 30, 50].includes(suggestedQuantity)) && (
                <Button
                  type="button"
                  variant="secondary"
                  size="sm"
                  onClick={() => setFormData(prev => ({ ...prev, quantity: suggestedQuantity }))}
                  className={formData.quantity === suggestedQuantity ? 'bg-secondary-dark' : ''}
                >
                  {suggestedQuantity}L
                </Button>
              )}
            </div>
            <div className="text-xs text-muted-foreground">
              {formData.quantity && formData.quantity > 30 && (
                <span className="text-fuel-warning">⚠️ Quantité &gt;30L nécessite approbation Direction</span>
              )}
            </div>
          </div>

          {/* Chantier de destination */}
          <div className="space-y-2">
            <Label htmlFor="worksite" className="text-sm font-medium">
              Chantier de destination *
            </Label>
            <Select onValueChange={(value) => setFormData(prev => ({ ...prev, worksiteId: value }))}>
              <SelectTrigger className="h-12">
                <SelectValue placeholder="Sélectionner le chantier" />
              </SelectTrigger>
              <SelectContent>
                {worksites.map((worksite) => (
                  <SelectItem key={worksite.id} value={worksite.id}>
                    <div className="flex flex-col items-start">
                      <span className="font-medium">{worksite.name}</span>
                      <span className="text-xs text-muted-foreground">{worksite.location}</span>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Raison de la demande */}
          <div className="space-y-2">
            <Label htmlFor="reason" className="text-sm font-medium">
              Raison de la carburation *
            </Label>
            <Textarea
              id="reason"
              placeholder="Ex: Déplacement chantier, travaux urgents, mission direction..."
              value={formData.reason || ''}
              onChange={(e) => setFormData(prev => ({ ...prev, reason: e.target.value }))}
              className="h-20 resize-none"
            />
          </div>

          {/* Urgence */}
          <div className="space-y-2">
            <Label className="text-sm font-medium">Priorité</Label>
            <div className="flex gap-2">
              <Button
                type="button"
                variant={formData.urgency === 'normal' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setFormData(prev => ({ ...prev, urgency: 'normal' }))}
              >
                Normal
              </Button>
              <Button
                type="button"
                variant={formData.urgency === 'urgent' ? 'warning' : 'outline'}
                size="sm"
                onClick={() => setFormData(prev => ({ ...prev, urgency: 'urgent' }))}
              >
                Urgent
              </Button>
            </div>
          </div>

          {/* Bouton de soumission */}
          <Button
            type="submit"
            variant="terrain"
            size="xl"
            className="w-full"
            disabled={!formData.vehicleId || !formData.quantity || !formData.reason || !formData.worksiteId}
          >
            📤 Envoyer la demande
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};