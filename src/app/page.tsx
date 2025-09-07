'use client';

import { useState } from 'react';
import { CarSearch } from '@/components/CarSearch';
import { CarSpecCard } from '@/components/CarSpecCard';
import { CarComparison } from '@/components/CarComparison';
import { CarSpec, CarSearchResult } from '@/types/car';
import { Button } from '@/components/ui/button';
import { Car, GitCompare } from 'lucide-react';

type ViewMode = 'search' | 'comparison';

export default function Home() {
  const [currentCar, setCurrentCar] = useState<CarSpec | null>(null);
  const [comparisonCars, setComparisonCars] = useState<CarSpec[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [viewMode, setViewMode] = useState<ViewMode>('search');

  const searchCar = async (carModel: string) => {
    setIsLoading(true);
    setError(null);
    
    try {
      const response = await fetch(`/api/car-specs?model=${encodeURIComponent(carModel)}`);
      const result: CarSearchResult = await response.json();
      
      if (result.success && result.data) {
        setCurrentCar(result.data);
      } else {
        setError(result.error || 'Failed to fetch car specifications');
        setCurrentCar(null);
      }
    } catch {
      setError('Network error. Please try again.');
      setCurrentCar(null);
    } finally {
      setIsLoading(false);
    }
  };

  const addToComparison = () => {
    if (currentCar && comparisonCars.length < 4) {
      // Check if car is already in comparison
      const isAlreadyAdded = comparisonCars.some(
        car => car.make === currentCar.make && car.model === currentCar.model && car.year === currentCar.year
      );
      
      if (!isAlreadyAdded) {
        setComparisonCars([...comparisonCars, currentCar]);
      }
    }
  };

  const removeFromComparison = (index: number) => {
    setComparisonCars(comparisonCars.filter((_, i) => i !== index));
  };

  const switchToComparison = () => {
    setViewMode('comparison');
  };

  const switchToSearch = () => {
    setViewMode('search');
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center mb-4">
            <Car className="h-12 w-12 text-blue-600 mr-3" />
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900">AutoSpecs</h1>
          </div>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Discover detailed specifications for any car model and compare them side by side
          </p>
        </div>

        {/* Navigation */}
        <div className="flex justify-center mb-8">
          <div className="flex bg-white rounded-lg p-1 shadow-md">
            <Button
              variant={viewMode === 'search' ? 'default' : 'ghost'}
              onClick={switchToSearch}
              className="flex items-center gap-2"
            >
              <Car className="h-4 w-4" />
              Search Cars
            </Button>
            <Button
              variant={viewMode === 'comparison' ? 'default' : 'ghost'}
              onClick={switchToComparison}
              className="flex items-center gap-2"
            >
              <GitCompare className="h-4 w-4" />
              Compare ({comparisonCars.length})
            </Button>
          </div>
        </div>

        {/* Content */}
        {viewMode === 'search' ? (
          <div className="space-y-8">
            {/* Search Section */}
            <CarSearch onSearch={searchCar} isLoading={isLoading} />

            {/* Error Display */}
            {error && (
              <div className="max-w-2xl mx-auto p-4 bg-red-50 border border-red-200 rounded-lg">
                <p className="text-red-700 text-center">{error}</p>
              </div>
            )}

            {/* Results Section */}
            {currentCar && !isLoading && (
              <div className="space-y-6">
                <CarSpecCard
                  carSpec={currentCar}
                  onCompare={addToComparison}
                  showCompareButton={comparisonCars.length < 4}
                />
                
                {comparisonCars.length > 0 && (
                  <div className="text-center">
                    <Button
                      onClick={switchToComparison}
                      variant="outline"
                      className="flex items-center gap-2 mx-auto"
                    >
                      <GitCompare className="h-4 w-4" />
                      View Comparison ({comparisonCars.length} cars)
                    </Button>
                  </div>
                )}
              </div>
            )}

            {/* Loading State */}
            {isLoading && (
              <div className="text-center py-12">
                <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
                <p className="mt-4 text-gray-600">Searching for car specifications...</p>
              </div>
            )}

            {/* Empty State */}
            {!currentCar && !isLoading && !error && (
              <div className="text-center py-12">
                <Car className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-600 text-lg">
                  Enter a car model above to get started
                </p>
                <p className="text-gray-500 text-sm mt-2">
                  Try searching for popular models like &quot;Toyota Camry&quot; or &quot;BMW 3 Series&quot;
                </p>
              </div>
            )}
          </div>
        ) : (
          <CarComparison
            cars={comparisonCars}
            onRemoveCar={removeFromComparison}
            onBackToSearch={switchToSearch}
          />
        )}
      </div>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 mt-16">
        <div className="container mx-auto px-4 py-8 text-center">
          <p className="text-gray-600">
            AutoSpecs - Your go-to source for car specifications
          </p>
          <p className="text-sm text-gray-500 mt-2">
            Data powered by Perplexity AI with fallback placeholder data
          </p>
        </div>
      </footer>
    </main>
  );
}