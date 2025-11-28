import { Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface DashboardHeaderProps {
  setShowNewSaleModal: (show: boolean) => void;
}

export default function DashboardHeader({ setShowNewSaleModal }: DashboardHeaderProps) {
  return (
    <div className="bg-card border-b border-border px-4 md:px-6 py-3 md:py-4 shadow-sm sticky top-0 z-10">
      <div className="flex items-center justify-between gap-4">
        <div className="grid gap-0.5 md:gap-1 flex-1 min-w-0">
          <h1 className="text-xl md:text-2xl lg:text-3xl font-bold tracking-tight truncate">Dashboard</h1>
          <p className="text-xs md:text-sm text-muted-foreground hidden sm:block truncate">
            Acompanhe suas métricas e performance em tempo real
          </p>
        </div>
        <div className="flex items-center">
          <Button
            onClick={() => setShowNewSaleModal(true)}
            className="bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90 shadow-md h-9 md:h-10"
            size="sm"
          >
            <Plus className="h-4 w-4 md:mr-2" />
            <span className="hidden md:inline">Nova Venda</span>
          </Button>
        </div>
      </div>
    </div>
  );
}
