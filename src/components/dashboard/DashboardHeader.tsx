import { Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface DashboardHeaderProps {
  setShowNewSaleModal: (show: boolean) => void;
}

export default function DashboardHeader({ setShowNewSaleModal }: DashboardHeaderProps) {
  return (
    <div className="bg-card border-b-2 border-border px-4 lg:px-6 py-4 shadow-sm">
      <div className="flex items-center justify-between">
        <div className="grid gap-1">
          <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
          <p className="text-muted-foreground">
            Acompanhe suas métricas e performance em tempo real
          </p>
        </div>
        <div className="flex items-center space-x-2">
          <Button
            onClick={() => setShowNewSaleModal(true)}
            className="bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90 shadow-md"
          >
            <Plus className="mr-2 h-4 w-4" />
            Nova Venda
          </Button>
        </div>
      </div>
    </div>
  );
}
