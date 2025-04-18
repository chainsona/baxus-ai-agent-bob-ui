import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Search, Loader2 } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

interface UserSearchProps {
  onSearch: (username: string) => void;
  isLoading: boolean;
}

export function UserSearch({ onSearch, isLoading }: UserSearchProps) {
  const [username, setUsername] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (username.trim()) {
      onSearch(username.trim());
    }
  };

  return (
    <Card className="glass-card border-border dark:border-white/10 dark:shadow-lg w-full">
      <CardContent className="p-3 sm:p-5">
        <p className="mb-3 sm:mb-4 text-center text-xs sm:text-sm dark:text-white/90">
          Enter a BAXUS username to discover personalized whisky recommendations
        </p>
        <form onSubmit={handleSubmit} className="relative flex w-full items-center">
          <Input
            type="text"
            placeholder="Enter BAXUS username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="bg-background dark:bg-white/5 border-border dark:border-white/20 focus:border-primary pr-20 sm:pr-32 text-xs sm:text-sm h-9 sm:h-10 dark:text-white dark:placeholder:text-white/50"
            disabled={isLoading}
          />
          <Button 
            type="submit" 
            className="absolute right-0 top-0 rounded-l-none h-9 sm:h-10 text-xs sm:text-sm px-2 sm:px-4 dark:bg-primary dark:text-primary-foreground dark:hover:bg-primary/90"
            disabled={!username.trim() || isLoading}
          >
            {isLoading ? (
              <div className="flex items-center gap-1 sm:gap-2">
                <Loader2 className="h-3 w-3 sm:h-4 sm:w-4 animate-spin" />
                <span className="hidden sm:inline">Analyzing</span>
                <span className="sm:hidden">...</span>
              </div>
            ) : (
              <div className="flex items-center gap-1 sm:gap-2">
                <Search className="h-3 w-3 sm:h-4 sm:w-4" />
                <span>Search</span>
              </div>
            )}
          </Button>
        </form>
        <p className="mt-2 sm:mt-3 text-center text-[10px] sm:text-xs text-muted-foreground dark:text-white/70">
          Try searching for "carriebaxus" for a sample collection
        </p>
      </CardContent>
    </Card>
  );
} 