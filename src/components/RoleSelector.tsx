
import { cn } from '@/src/lib/utils';
import { UserRole } from '@/src/types';
import { Building2, User } from 'lucide-react';

interface RoleSelectorProps {
  currentRole: UserRole;
  setRole: (role: UserRole) => void;
}

export function RoleSelector({ currentRole, setRole }: RoleSelectorProps) {
  return (
    <div className="flex gap-2 p-4 bg-bento-bg border-b border-bento-border">
      <button
        onClick={() => setRole('NGO_ADMIN')}
        className={cn(
          "flex-1 flex items-center justify-center gap-2 py-2 rounded-xl text-sm font-medium transition-all",
          currentRole === 'NGO_ADMIN' 
            ? "bg-bento-accent text-white shadow-lg" 
            : "bg-bento-card text-bento-text-dim hover:bg-bento-border"
        )}
      >
        <Building2 size={16} />
        Admin
      </button>
      <button
        onClick={() => setRole('VOLUNTEER')}
        className={cn(
          "flex-1 flex items-center justify-center gap-2 py-2 rounded-xl text-sm font-medium transition-all",
          currentRole === 'VOLUNTEER' 
            ? "bg-bento-accent text-white shadow-lg" 
            : "bg-bento-card text-bento-text-dim hover:bg-bento-border"
        )}
      >
        <User size={16} />
        Volunteer
      </button>
    </div>
  );
}
