'use client';

import { CarSpec } from '@/types/car';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  Car, 
  Fuel, 
  Gauge, 
  Calendar, 
  Zap, 
  Settings,
  Plus,
  X
} from 'lucide-react';
import Image from 'next/image';

interface CarSpecCardProps {
  carSpec: CarSpec;
  onCompare?: () => void;
  onRemove?: () => void;
  showCompareButton?: boolean;
  showRemoveButton?: boolean;
  isComparisonMode?: boolean;
}

export function CarSpecCard({ 
  carSpec, 
  onCompare, 
  onRemove,
  showCompareButton = false,
  showRemoveButton = false,
  isComparisonMode = false
}: CarSpecCardProps) {
  const specs = [
    { icon: Calendar, label: 'Year', value: carSpec.year.toString() },
    { icon: Car, label: 'Engine', value: carSpec.engineType },
    { icon: Zap, label: 'Horsepower', value: `${carSpec.horsepower} HP` },
    { icon: Gauge, label: '0-60 mph', value: carSpec.zeroToSixty },
    { icon: Fuel, label: 'Fuel Type', value: carSpec.fuelType },
    { icon: Settings, label: 'Transmission', value: carSpec.transmission || 'N/A' },
  ];

  return (
    <Card className={`w-full ${isComparisonMode ? 'max-w-md' : 'max-w-2xl'} mx-auto shadow-lg hover:shadow-xl transition-shadow duration-300`}>
      <CardHeader className="pb-4">
        <div className="flex justify-between items-start">
          <div>
            <CardTitle className="text-2xl font-bold text-gray-900">
              {carSpec.make} {carSpec.model}
            </CardTitle>
            <Badge variant="secondary" className="mt-2">
              {carSpec.year} Model
            </Badge>
          </div>
          <div className="flex gap-2">
            {showCompareButton && (
              <Button
                variant="outline"
                size="sm"
                onClick={onCompare}
                className="flex items-center gap-1"
              >
                <Plus className="h-4 w-4" />
                Compare
              </Button>
            )}
            {showRemoveButton && (
              <Button
                variant="outline"
                size="sm"
                onClick={onRemove}
                className="flex items-center gap-1 text-red-600 hover:text-red-700"
              >
                <X className="h-4 w-4" />
                Remove
              </Button>
            )}
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-6">
        {/* Car Image */}
        <div className="relative w-full h-48 bg-gray-100 rounded-lg overflow-hidden">
          <Image
            src={carSpec.imageUrl}
            alt={`${carSpec.make} ${carSpec.model}`}
            fill
            className="object-cover"
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              target.src = `https://picsum.photos/400/300?random=${encodeURIComponent(carSpec.make + carSpec.model).replace(/[^a-zA-Z0-9]/g, '')}`;
            }}
          />
        </div>

        {/* Specifications Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {specs.map((spec, index) => (
            <div key={index} className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
              <spec.icon className="h-5 w-5 text-blue-600" />
              <div>
                <p className="text-sm font-medium text-gray-600">{spec.label}</p>
                <p className="text-lg font-semibold text-gray-900">{spec.value}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Additional Info */}
        {(carSpec.mpg || carSpec.drivetrain) && (
          <div className="pt-4 border-t border-gray-200">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {carSpec.mpg && (
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-gray-600">Fuel Economy:</span>
                  <Badge variant="outline">{carSpec.mpg}</Badge>
                </div>
              )}
              {carSpec.drivetrain && (
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-gray-600">Drivetrain:</span>
                  <Badge variant="outline">{carSpec.drivetrain}</Badge>
                </div>
              )}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
