import { useState } from 'react';
import { ArrowLeft, Target, TrendingUp, Calendar, DollarSign } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Progress } from '@/components/ui/progress';
import { useToast } from '@/hooks/use-toast';

interface GoalsPageProps {
  theme: 'light' | 'dark';
  onClose: () => void;
}

const GoalsPage = ({ theme, onClose }: GoalsPageProps) => {
  const { toast } = useToast();
  const [dailyGoal, setDailyGoal] = useState(500);
  const [monthlyGoal, setMonthlyGoal] = useState(15000);
  const [yearlyGoal, setYearlyGoal] = useState(180000);

  // Valores atuais mockados (podem vir de props/hook)
  const currentDaily = 347.50;
  const currentMonthly = 8450.00;
  const currentYearly = 95230.00;

  const handleSaveGoals = () => {
    toast({
      title: "Metas atualizadas!",
      description: "Suas metas foram salvas com sucesso.",
    });
  };

  const getProgressColor = (percentage: number) => {
    if (percentage >= 100) return 'bg-green-500';
    if (percentage >= 75) return 'bg-blue-500';
    if (percentage >= 50) return 'bg-yellow-500';
    return 'bg-orange-500';
  };

  const goals = [
    {
      id: 'daily',
      title: 'Meta Diária',
      icon: Target,
      target: dailyGoal,
      current: currentDaily,
      percentage: (currentDaily / dailyGoal) * 100,
      period: 'Hoje',
      setter: setDailyGoal
    },
    {
      id: 'monthly',
      title: 'Meta Mensal',
      icon: Calendar,
      target: monthlyGoal,
      current: currentMonthly,
      percentage: (currentMonthly / monthlyGoal) * 100,
      period: 'Este mês',
      setter: setMonthlyGoal
    },
    {
      id: 'yearly',
      title: 'Meta Anual',
      icon: TrendingUp,
      target: yearlyGoal,
      current: currentYearly,
      percentage: (currentYearly / yearlyGoal) * 100,
      period: 'Este ano',
      setter: setYearlyGoal
    }
  ];

  return (
    <div className={`min-h-screen ${theme === 'dark' ? 'bg-dashboardBg-dark text-white' : 'bg-dashboardBg-light text-gray-900'}`}>
      {/* Header */}
      <div className={`sticky top-0 z-10 ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'} border-b ${theme === 'dark' ? 'border-gray-700' : 'border-gray-200'}`}>
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="sm"
              onClick={onClose}
              className="gap-2"
            >
              <ArrowLeft className="w-4 h-4" />
              Voltar
            </Button>
            <div>
              <h1 className="text-2xl font-bold">Metas e Objetivos</h1>
              <p className="text-sm text-gray-500">Defina e acompanhe suas metas de faturamento</p>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 py-8">
        <div className="grid gap-6 md:grid-cols-3 mb-8">
          {goals.map((goal) => {
            const Icon = goal.icon;
            return (
              <Card key={goal.id} className={theme === 'dark' ? 'bg-gray-800 border-gray-700' : ''}>
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <div className={`w-12 h-12 rounded-full ${theme === 'dark' ? 'bg-blue-900' : 'bg-blue-100'} flex items-center justify-center`}>
                      <Icon className="w-6 h-6 text-blue-600" />
                    </div>
                    <div>
                      <CardTitle className="text-lg">{goal.title}</CardTitle>
                      <CardDescription>{goal.period}</CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <div className="flex justify-between text-sm mb-2">
                      <span className="text-gray-500">Atual</span>
                      <span className="font-bold">R$ {goal.current.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-sm mb-2">
                      <span className="text-gray-500">Meta</span>
                      <span className="font-bold">R$ {goal.target.toFixed(2)}</span>
                    </div>
                  </div>
                  <div>
                    <Progress 
                      value={goal.percentage} 
                      className={`h-3 ${getProgressColor(goal.percentage)}`}
                    />
                    <p className="text-right text-sm mt-2 font-semibold">
                      {goal.percentage.toFixed(1)}%
                    </p>
                  </div>
                  {goal.percentage >= 100 ? (
                    <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-3 text-center">
                      <p className="text-green-700 dark:text-green-400 font-semibold">
                        🎉 Meta alcançada!
                      </p>
                    </div>
                  ) : (
                    <div className={`${theme === 'dark' ? 'bg-gray-700' : 'bg-gray-100'} rounded-lg p-3 text-center`}>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        Faltam <span className="font-bold text-orange-600">R$ {(goal.target - goal.current).toFixed(2)}</span>
                      </p>
                    </div>
                  )}
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Configurar Metas */}
        <Card className={theme === 'dark' ? 'bg-gray-800 border-gray-700' : ''}>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <DollarSign className="w-5 h-5" />
              Configurar Metas
            </CardTitle>
            <CardDescription>
              Ajuste suas metas de faturamento para cada período
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid gap-6 md:grid-cols-3">
              <div className="space-y-2">
                <Label htmlFor="daily-goal">Meta Diária (R$)</Label>
                <Input
                  id="daily-goal"
                  type="number"
                  step="0.01"
                  value={dailyGoal}
                  onChange={(e) => setDailyGoal(parseFloat(e.target.value) || 0)}
                  className={theme === 'dark' ? 'bg-gray-700 border-gray-600' : ''}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="monthly-goal">Meta Mensal (R$)</Label>
                <Input
                  id="monthly-goal"
                  type="number"
                  step="0.01"
                  value={monthlyGoal}
                  onChange={(e) => setMonthlyGoal(parseFloat(e.target.value) || 0)}
                  className={theme === 'dark' ? 'bg-gray-700 border-gray-600' : ''}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="yearly-goal">Meta Anual (R$)</Label>
                <Input
                  id="yearly-goal"
                  type="number"
                  step="0.01"
                  value={yearlyGoal}
                  onChange={(e) => setYearlyGoal(parseFloat(e.target.value) || 0)}
                  className={theme === 'dark' ? 'bg-gray-700 border-gray-600' : ''}
                />
              </div>
            </div>
            <div className="flex justify-end">
              <Button onClick={handleSaveGoals} className="gap-2">
                <Target className="w-4 h-4" />
                Salvar Metas
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default GoalsPage;
