import { Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface MobileHeaderProps {
  title: string;
  subtitle?: string;
  onNewSale: () => void;
}

const MobileHeader = ({ title, subtitle, onNewSale }: MobileHeaderProps) => {
  return (
    <div className="md:hidden sticky top-0 z-10 bg-card border-b border-border px-4 py-3 shadow-sm">
      <div className="flex items-center justify-between gap-3">
        <div className="flex-1 min-w-0">
          <h1 className="text-xl font-bold tracking-tight truncate">{title}</h1>
          {subtitle && (
            <p className="text-xs text-muted-foreground truncate mt-0.5">{subtitle}</p>
          )}
        </div>
        <Button
          onClick={onNewSale}
          size="sm"
          className="bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90 shadow-md h-9 px-3"
        >
          <Plus className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};

export default MobileHeader;
