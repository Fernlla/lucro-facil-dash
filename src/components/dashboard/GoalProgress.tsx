import { Card } from '@/components/ui/card';

interface GoalProgressProps {
  dailyProgress: number;
  totalProfit: number;
  dailyGoal: number;
}

export default function GoalProgress({ dailyProgress, totalProfit, dailyGoal }: GoalProgressProps) {
  return (
    <Card className="border-2 shadow-md">
      <div className="p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold">Progresso da Meta Diária</h3>
          {dailyProgress >= 100 && (
            <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full font-medium">
              🎉 Meta batida!
            </span>
          )}
        </div>
        
        <div className="space-y-2">
          <div className="flex justify-between text-sm text-muted-foreground">
            <span>R$ {totalProfit.toFixed(2)}</span>
            <span>R$ {dailyGoal.toFixed(2)}</span>
          </div>
          <div className="w-full bg-secondary rounded-full h-2">
            <div 
              className="bg-gradient-to-r from-primary to-accent h-2 rounded-full transition-all duration-500 ease-out"
              style={{ width: `${Math.min(dailyProgress, 100)}%` }}
            />
          </div>
        </div>
      </div>
    </Card>
  );
}
