'use client';

import { CarSpec } from '@/types/car';
import { CarSpecCard } from './CarSpecCard';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';

interface CarComparisonProps {
  cars: CarSpec[];
  onRemoveCar: (index: number) => void;
  onBackToSearch: () => void;
}

export function CarComparison({ cars, onRemoveCar, onBackToSearch }: CarComparisonProps) {
  if (cars.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-600 mb-4">No cars selected for comparison</p>
        <Button onClick={onBackToSearch} variant="outline">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Search
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold text-gray-900">Car Comparison</h2>
        <Button onClick={onBackToSearch} variant="outline">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Search
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {cars.map((car, index) => (
          <CarSpecCard
            key={`${car.make}-${car.model}-${index}`}
            carSpec={car}
            onRemove={() => onRemoveCar(index)}
            showRemoveButton={true}
            isComparisonMode={true}
          />
        ))}
      </div>

      {cars.length === 1 && (
        <div className="text-center py-8 border-2 border-dashed border-gray-300 rounded-lg">
          <p className="text-gray-600 mb-2">Add another car to compare</p>
          <Button onClick={onBackToSearch} variant="outline">
            Search for Another Car
          </Button>
        </div>
      )}

      {cars.length >= 2 && (
        <div className="mt-8 p-6 bg-blue-50 rounded-lg">
          <h3 className="text-xl font-semibold text-blue-900 mb-4">Quick Comparison</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="text-center">
              <p className="text-sm font-medium text-blue-700">Most Powerful</p>
              <p className="text-lg font-bold text-blue-900">
                {cars.reduce((prev, current) => 
                  prev.horsepower > current.horsepower ? prev : current
                ).make} {cars.reduce((prev, current) => 
                  prev.horsepower > current.horsepower ? prev : current
                ).model}
              </p>
              <p className="text-sm text-blue-600">
                {Math.max(...cars.map(car => car.horsepower))} HP
              </p>
            </div>
            
            <div className="text-center">
              <p className="text-sm font-medium text-blue-700">Newest</p>
              <p className="text-lg font-bold text-blue-900">
                {cars.reduce((prev, current) => 
                  prev.year > current.year ? prev : current
                ).make} {cars.reduce((prev, current) => 
                  prev.year > current.year ? prev : current
                ).model}
              </p>
              <p className="text-sm text-blue-600">
                {Math.max(...cars.map(car => car.year))}
              </p>
            </div>

            <div className="text-center">
              <p className="text-sm font-medium text-blue-700">Fastest 0-60</p>
              <p className="text-lg font-bold text-blue-900">
                {cars.reduce((prev, current) => {
                  const prevTime = parseFloat(prev.zeroToSixty.replace(/[^\d.]/g, ''));
                  const currentTime = parseFloat(current.zeroToSixty.replace(/[^\d.]/g, ''));
                  return prevTime < currentTime ? prev : current;
                }).make} {cars.reduce((prev, current) => {
                  const prevTime = parseFloat(prev.zeroToSixty.replace(/[^\d.]/g, ''));
                  const currentTime = parseFloat(current.zeroToSixty.replace(/[^\d.]/g, ''));
                  return prevTime < currentTime ? prev : current;
                }).model}
              </p>
              <p className="text-sm text-blue-600">
                {cars.reduce((prev, current) => {
                  const prevTime = parseFloat(prev.zeroToSixty.replace(/[^\d.]/g, ''));
                  const currentTime = parseFloat(current.zeroToSixty.replace(/[^\d.]/g, ''));
                  return prevTime < currentTime ? prev : current;
                }).zeroToSixty}
              </p>
            </div>

            <div className="text-center">
              <p className="text-sm font-medium text-blue-700">Total Cars</p>
              <p className="text-lg font-bold text-blue-900">{cars.length}</p>
              <p className="text-sm text-blue-600">in comparison</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
