'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Search, Loader2 } from 'lucide-react';

interface CarSearchProps {
  onSearch: (carModel: string) => void;
  isLoading?: boolean;
}

export function CarSearch({ onSearch, isLoading = false }: CarSearchProps) {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      onSearch(searchTerm.trim());
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSubmit(e);
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto">
      <form onSubmit={handleSubmit} className="flex gap-2">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <Input
            type="text"
            placeholder="Enter car model (e.g., Toyota Camry, BMW 3 Series)"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onKeyPress={handleKeyPress}
            className="pl-10 pr-4 py-2 text-lg"
            disabled={isLoading}
          />
        </div>
        <Button 
          type="submit" 
          disabled={isLoading || !searchTerm.trim()}
          className="px-6"
        >
          {isLoading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Searching...
            </>
          ) : (
            'Search'
          )}
        </Button>
      </form>
      
      <div className="mt-4 text-center">
        <p className="text-sm text-gray-600 mb-2">Popular searches:</p>
        <div className="flex flex-wrap justify-center gap-2">
          {['Toyota Camry', 'Honda Civic', 'BMW 3 Series', 'Tesla Model 3', 'Ford Mustang'].map((car) => (
            <Button
              key={car}
              variant="outline"
              size="sm"
              onClick={() => {
                setSearchTerm(car);
                onSearch(car);
              }}
              disabled={isLoading}
              className="text-xs"
            >
              {car}
            </Button>
          ))}
        </div>
      </div>
    </div>
  );
}
