import React, { useEffect } from 'react';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { useContentStore } from '@/stores/contentStore';

interface GenreSelectorProps {
  selectedGenres: string[];
  onSelectionChange: (genreIds: string[]) => void;
}

const GenreSelector: React.FC<GenreSelectorProps> = ({ selectedGenres, onSelectionChange }) => {
  const { genres, fetchGenres } = useContentStore();

  useEffect(() => {
    fetchGenres();
  }, [fetchGenres]);

  const handleGenreToggle = (genreId: string) => {
    const updatedGenres = selectedGenres.includes(genreId)
      ? selectedGenres.filter(id => id !== genreId)
      : [...selectedGenres, genreId];
    
    onSelectionChange(updatedGenres);
  };

  return (
    <div className="space-y-3">
      <Label className="text-sm font-medium">Genres</Label>
      <div className="grid grid-cols-2 gap-3 max-h-40 overflow-y-auto">
        {genres.map((genre) => (
          <div key={genre.id} className="flex items-center space-x-2">
            <Checkbox
              id={genre.id}
              checked={selectedGenres.includes(genre.id)}
              onCheckedChange={() => handleGenreToggle(genre.id)}
            />
            <Label htmlFor={genre.id} className="text-sm cursor-pointer">
              {genre.name}
            </Label>
          </div>
        ))}
      </div>
      {genres.length === 0 && (
        <p className="text-sm text-muted-foreground">No genres available. Create some genres first.</p>
      )}
    </div>
  );
};

export default GenreSelector;