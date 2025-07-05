import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';

const formSchema = z.object({
  vehicleId: z.string().min(1, 'Veuillez sélectionner un véhicule'),
  quantity: z.number().min(1, 'La quantité doit être supérieure à 0'),
  kmCounter: z.number().min(0, 'Le kilométrage doit être valide'),
  reason: z.string().min(5, 'Veuillez préciser la raison'),
  mission: z.string().min(3, 'Veuillez préciser la mission'),
  site: z.string().min(1, 'Veuillez sélectionner un site')
});

type FormData = z.infer<typeof formSchema>;

interface Vehicle {
  id: string;
  immatriculation: string;
  types_vehicules?: {
    libelle: string;
    seuil_conso_par_km: number;
  };
}

interface FuelRequestFormProps {
  onSubmit: (data: any) => void;
}

export const FuelRequestForm: React.FC<FuelRequestFormProps> = ({ onSubmit }) => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [loading, setLoading] = useState(false);
  const [selectedVehicle, setSelectedVehicle] = useState<Vehicle | null>(null);

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      quantity: 20,
      kmCounter: 0,
      reason: '',
      mission: '',
      site: '',
      vehicleId: ''
    }
  });

  const sites = [
    'Chantier Mvog-Ada',
    'Route Douala-Edéa', 
    'Pont Wouri',
    'Chantier Nkolndongo',
    'Route Yaoundé-Douala'
  ];

  useEffect(() => {
    fetchVehicles();
  }, []);

  const fetchVehicles = async () => {
    try {
      const { data, error } = await supabase
        .from('vehicules')
        .select(`
          id,
          immatriculation,
          types_vehicules (
            libelle,
            seuil_conso_par_km
          )
        `)
        .eq('actif', true);

      if (error) throw error;
      setVehicles(data || []);
    } catch (error) {
      console.error('Erreur lors du chargement des véhicules:', error);
      toast({
        title: "Erreur",
        description: "Impossible de charger les véhicules",
        variant: "destructive"
      });
    }
  };

  const handleVehicleChange = (vehicleId: string) => {
    const vehicle = vehicles.find(v => v.id === vehicleId);
    setSelectedVehicle(vehicle || null);
    form.setValue('vehicleId', vehicleId);
  };

  const handleSubmit = async (data: FormData) => {
    if (!user) {
      toast({
        title: "Erreur",
        description: "Vous devez être connecté pour soumettre une demande",
        variant: "destructive"
      });
      return;
    }

    setLoading(true);
    try {
      const { error } = await supabase
        .from('demandes_carburant')
        .insert({
          id_utilisateur: user.id,
          id_vehicule: data.vehicleId,
          km_compteur: data.kmCounter,
          quantite_demandee: data.quantity,
          raison: data.reason,
          mission: data.mission,
          site: data.site,
          statut: 'en_attente'
        });

      if (error) throw error;

      toast({
        title: "Demande envoyée ✅",
        description: `Votre demande de ${data.quantity}L a été envoyée pour approbation.`
      });

      form.reset();
      onSubmit(data);
    } catch (error) {
      console.error('Erreur lors de la soumission:', error);
      toast({
        title: "Erreur",
        description: "Impossible d'envoyer la demande. Veuillez réessayer.",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="shadow-terrain">
      <CardHeader className="bg-gradient-to-r from-primary to-primary-light text-primary-foreground">
        <CardTitle className="flex items-center gap-2">
          <span className="text-xl">⛽</span>
          Demande de Carburation
        </CardTitle>
      </CardHeader>
      <CardContent className="p-6 space-y-6">
        <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
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
                      <span className="font-medium">{vehicle.immatriculation}</span>
                      {vehicle.types_vehicules && (
                        <Badge variant="outline" className="ml-2">
                          {vehicle.types_vehicules.libelle}
                        </Badge>
                      )}
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {form.formState.errors.vehicleId && (
              <p className="text-sm text-destructive">{form.formState.errors.vehicleId.message}</p>
            )}
          </div>

          {/* Informations véhicule sélectionné */}
          {selectedVehicle && (
            <Card className="bg-terrain-bg border-primary/20">
              <CardContent className="p-4">
                <div className="text-sm">
                  <div className="flex justify-between items-center">
                    <span className="text-muted-foreground">Type:</span>
                    <span className="font-medium">{selectedVehicle.types_vehicules?.libelle}</span>
                  </div>
                  <div className="flex justify-between items-center mt-1">
                    <span className="text-muted-foreground">Consommation:</span>
                    <span className="font-medium">{selectedVehicle.types_vehicules?.seuil_conso_par_km}L/km</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Kilométrage */}
          <div className="space-y-2">
            <Label htmlFor="kmCounter" className="text-sm font-medium">
              Kilométrage compteur *
            </Label>
            <Input
              id="kmCounter"
              type="number"
              placeholder="Entrer le kilométrage actuel"
              {...form.register('kmCounter', { valueAsNumber: true })}
              className="h-12"
            />
            {form.formState.errors.kmCounter && (
              <p className="text-sm text-destructive">{form.formState.errors.kmCounter.message}</p>
            )}
          </div>

          {/* Quantité demandée */}
          <div className="space-y-2">
            <Label htmlFor="quantity" className="text-sm font-medium">
              Quantité demandée (Litres) *
            </Label>
            <div className="flex gap-2 mb-2">
              {[10, 20, 30, 50].map((qty) => (
                <Button
                  key={qty}
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => form.setValue('quantity', qty)}
                  className={form.watch('quantity') === qty ? 'bg-primary text-primary-foreground' : ''}
                >
                  {qty}L
                </Button>
              ))}
            </div>
            <Input
              id="quantity"
              type="number"
              placeholder="Ou saisir une quantité personnalisée"
              {...form.register('quantity', { valueAsNumber: true })}
              className="h-12"
            />
            {form.formState.errors.quantity && (
              <p className="text-sm text-destructive">{form.formState.errors.quantity.message}</p>
            )}
            {form.watch('quantity') > 30 && (
              <div className="text-xs text-fuel-warning">
                ⚠️ Quantité &gt;30L nécessite approbation Direction
              </div>
            )}
          </div>

          {/* Site de destination */}
          <div className="space-y-2">
            <Label htmlFor="site" className="text-sm font-medium">
              Site de destination *
            </Label>
            <Select onValueChange={(value) => form.setValue('site', value)}>
              <SelectTrigger className="h-12">
                <SelectValue placeholder="Sélectionner le site" />
              </SelectTrigger>
              <SelectContent>
                {sites.map((site) => (
                  <SelectItem key={site} value={site}>
                    {site}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {form.formState.errors.site && (
              <p className="text-sm text-destructive">{form.formState.errors.site.message}</p>
            )}
          </div>

          {/* Mission */}
          <div className="space-y-2">
            <Label htmlFor="mission" className="text-sm font-medium">
              Mission *
            </Label>
            <Input
              id="mission"
              placeholder="Ex: Transport matériaux, déplacement équipe..."
              {...form.register('mission')}
              className="h-12"
            />
            {form.formState.errors.mission && (
              <p className="text-sm text-destructive">{form.formState.errors.mission.message}</p>
            )}
          </div>

          {/* Raison de la demande */}
          <div className="space-y-2">
            <Label htmlFor="reason" className="text-sm font-medium">
              Raison de la carburation *
            </Label>
            <Textarea
              id="reason"
              placeholder="Ex: Déplacement chantier, travaux urgents, mission direction..."
              {...form.register('reason')}
              className="h-20 resize-none"
            />
            {form.formState.errors.reason && (
              <p className="text-sm text-destructive">{form.formState.errors.reason.message}</p>
            )}
          </div>

          {/* Bouton de soumission */}
          <Button
            type="submit"
            variant="terrain"
            size="xl"
            className="w-full"
            disabled={loading}
          >
            {loading ? '⏳ Envoi en cours...' : '📤 Envoyer la demande'}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};