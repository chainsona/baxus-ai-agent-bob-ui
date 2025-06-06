import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Search, Loader2, ExternalLink } from 'lucide-react';
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
        <form
          onSubmit={handleSubmit}
          className="relative flex w-full items-center"
        >
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
          Try with{' '}
          <button
            onClick={() => onSearch('heisjoel0x')}
            className="text-primary underline hover:no-underline focus:outline-none focus:ring-0"
            disabled={isLoading}
          >
            heisjoel0x
          </button>{' '}
          for a sample collection
        </p>

        <div className="mt-4 sm:mt-6 relative overflow-hidden rounded-lg shadow-lg">
          <div className="absolute inset-0 bg-gradient-to-r from-amber-500 to-amber-700 dark:from-amber-600 dark:to-amber-900 opacity-90"></div>
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmZmZmYiIGZpbGwtb3BhY2l0eT0iMC4xIj48cGF0aCBkPSJNMzYgMzRjMCAxLjEtLjkgMi0yIDJzLTItLjktMi0yIC45LTIgMi0yIDIgLjkgMiAyem0wLTE3YzAgMS4xLS45IDItMiAyczAtMi45IDAtMiAuOSAwIDIgMCAyIC45IDIgMnptMCAxN2MwIDEuMS0uOSAyLTIgMnMtMi0uOS0yLTIgLjktMiAyLTIgMiAuOSAyIDJ6Ii8+PC9nPjwvZz48L3N2Zz4=')] opacity-20"></div>

          <a
            href="https://baxus.co/boozapp"
            target="_blank"
            rel="noopener noreferrer"
            className="relative z-10 block p-4 sm:p-5"
          >
            <div className="flex flex-col items-center">
              <div className="flex items-center justify-center mb-2">
                <span className="inline-block bg-white/90 dark:bg-white text-amber-800 font-bold text-xs sm:text-sm px-3 py-1 rounded-full transform -rotate-2 shadow-sm">
                  🥃 NOT REGISTERED YET? 🥃
                </span>
              </div>

              <h3 className="text-white font-bold text-xl sm:text-2xl tracking-tight text-center drop-shadow-sm mb-1">
                BOOZAPP
              </h3>

              <p className="text-white/90 text-center text-xs sm:text-sm mb-3 max-w-xs">
                Create your own whisky collection and get personalized
                recommendations
              </p>

              <div className="bg-white hover:bg-white/90 text-amber-800 font-medium rounded-full px-5 py-2 flex items-center gap-2 transition-all transform hover:scale-105 shadow-md">
                <ExternalLink className="h-4 w-4" />
                <span className="text-xs sm:text-sm">Download Free</span>
              </div>

              <p className="text-white/80 text-[10px] sm:text-xs mt-2">
                Join thousands of whisky enthusiasts tracking their collections
              </p>
            </div>
          </a>
        </div>
      </CardContent>
    </Card>
  );
}
