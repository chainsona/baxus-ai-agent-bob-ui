import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Search } from 'lucide-react';

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
    <form onSubmit={handleSubmit} className="flex w-full max-w-lg items-center space-x-2">
      <Input
        type="text"
        placeholder="Enter BAXUS username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        className="flex-1"
        disabled={isLoading}
      />
      <Button type="submit" disabled={!username.trim() || isLoading}>
        {isLoading ? (
          <div className="flex items-center gap-2">
            <div className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
            <span>Searching</span>
          </div>
        ) : (
          <div className="flex items-center gap-2">
            <Search className="h-4 w-4" />
            <span>Search</span>
          </div>
        )}
      </Button>
    </form>
  );
} 