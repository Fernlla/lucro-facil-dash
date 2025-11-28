import { Card } from '@/components/ui/card';

interface GoalProgressProps {
  dailyProgress: number;
  totalProfit: number;
  dailyGoal: number;
}

export default function GoalProgress({ dailyProgress, totalProfit, dailyGoal }: GoalProgressProps) {
  return (
    <Card className="border-2 shadow-md">
      <div className="p-4 md:p-6">
        <div className="flex items-center justify-between mb-3 md:mb-4 gap-2">
          <h3 className="text-sm md:text-base lg:text-lg font-semibold">Progresso da Meta Diária</h3>
          {dailyProgress >= 100 && (
            <span className="bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300 text-xs px-2 py-1 rounded-full font-medium whitespace-nowrap">
              🎉 Meta batida!
            </span>
          )}
        </div>
        
        <div className="space-y-2">
          <div className="flex justify-between text-xs md:text-sm text-muted-foreground">
            <span className="font-medium">R$ {totalProfit.toFixed(2)}</span>
            <span>Meta: R$ {dailyGoal.toFixed(2)}</span>
          </div>
          <div className="w-full bg-secondary rounded-full h-2.5 md:h-3 overflow-hidden">
            <div 
              className="bg-gradient-to-r from-primary to-accent h-full rounded-full transition-all duration-500 ease-out"
              style={{ width: `${Math.min(dailyProgress, 100)}%` }}
            />
          </div>
          <p className="text-xs text-center text-muted-foreground">
            {dailyProgress.toFixed(0)}% da meta
          </p>
        </div>
      </div>
    </Card>
  );
}
