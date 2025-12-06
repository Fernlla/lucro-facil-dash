import { Card } from '@/components/ui/card';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { ArrowUpCircle, ArrowDownCircle, Wallet } from 'lucide-react';

interface CashFlowData {
  month: string;
  entrada: number;
  saida: number;
  saldo: number;
}

interface MonthlyCashFlowProps {
  data: CashFlowData[];
  isMobile: boolean;
}

export default function MonthlyCashFlow({ data, isMobile }: MonthlyCashFlowProps) {
  const totalEntrada = data.reduce((acc, item) => acc + item.entrada, 0);
  const totalSaida = data.reduce((acc, item) => acc + item.saida, 0);
  const saldoFinal = totalEntrada - totalSaida;
  const isGrowing = data[data.length - 1].saldo > data[0].saldo;

  return (
    <Card className="border-2 shadow-md overflow-hidden">
      <div className="p-4 md:p-6">
        <div className="mb-4">
          <h3 className="text-base md:text-lg font-semibold"> Fluxo de Caixa Mensal</h3>
          <p className="text-xs md:text-sm text-muted-foreground mt-1">
          </p>
        </div>

        <div className="grid grid-cols-3 gap-2 md:gap-4 mb-4">
          <div className="bg-green-50 dark:bg-green-900/20 rounded-lg p-3 border border-green-200 dark:border-green-800">
            <div className="flex items-center gap-2 mb-1">
              <ArrowUpCircle className="h-4 w-4 text-green-600" />
              <span className="text-xs font-medium text-green-700 dark:text-green-400">Entrada</span>
            </div>
            <p className="text-sm md:text-base font-bold text-green-700 dark:text-green-400">
              R$ {totalEntrada.toFixed(2)}
            </p>
          </div>

          <div className="bg-red-50 dark:bg-red-900/20 rounded-lg p-3 border border-red-200 dark:border-red-800">
            <div className="flex items-center gap-2 mb-1">
              <ArrowDownCircle className="h-4 w-4 text-red-600" />
              <span className="text-xs font-medium text-red-700 dark:text-red-400">Saída</span>
            </div>
            <p className="text-sm md:text-base font-bold text-red-700 dark:text-red-400">
              R$ {totalSaida.toFixed(2)}
            </p>
          </div>

          <div className={`rounded-lg p-3 border ${
            saldoFinal >= 0 
              ? 'bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800' 
              : 'bg-orange-50 dark:bg-orange-900/20 border-orange-200 dark:border-orange-800'
          }`}>
            <div className="flex items-center gap-2 mb-1">
              <Wallet className={`h-4 w-4 ${saldoFinal >= 0 ? 'text-blue-600' : 'text-orange-600'}`} />
              <span className={`text-xs font-medium ${
                saldoFinal >= 0 ? 'text-blue-700 dark:text-blue-400' : 'text-orange-700 dark:text-orange-400'
              }`}>
                Saldo
              </span>
            </div>
            <p className={`text-sm md:text-base font-bold ${
              saldoFinal >= 0 ? 'text-blue-700 dark:text-blue-400' : 'text-orange-700 dark:text-orange-400'
            }`}>
              R$ {saldoFinal.toFixed(2)}
            </p>
          </div>
        </div>
        
        <ResponsiveContainer width="100%" height={isMobile ? 220 : 300}>
          <AreaChart data={data}>
            <defs>
              <linearGradient id="colorEntrada" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="hsl(145 70% 50%)" stopOpacity={0.8}/>
                <stop offset="95%" stopColor="hsl(145 70% 50%)" stopOpacity={0.1}/>
              </linearGradient>
              <linearGradient id="colorSaida" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="hsl(0 70% 50%)" stopOpacity={0.8}/>
                <stop offset="95%" stopColor="hsl(0 70% 50%)" stopOpacity={0.1}/>
              </linearGradient>
              <linearGradient id="colorSaldo" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="hsl(215 90% 55%)" stopOpacity={0.8}/>
                <stop offset="95%" stopColor="hsl(215 90% 55%)" stopOpacity={0.1}/>
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
            <XAxis 
              dataKey="month" 
              stroke="hsl(var(--muted-foreground))"
              fontSize={11}
            />
            <YAxis 
              stroke="hsl(var(--muted-foreground))"
              fontSize={12}
              tickFormatter={(value) => `R$ ${value}`}
            />
            <Tooltip 
              contentStyle={{ 
                backgroundColor: 'hsl(var(--popover))', 
                border: '1px solid hsl(var(--border))',
                borderRadius: '8px'
              }}
              formatter={(value: number) => [`R$ ${value.toFixed(2)}`, '']}
            />
            <Legend />
            <Area 
              type="monotone" 
              dataKey="entrada" 
              stroke="hsl(145 70% 50%)" 
              fillOpacity={1}
              fill="url(#colorEntrada)"
              name="Entrada"
              strokeWidth={2}
            />
            <Area 
              type="monotone" 
              dataKey="saida" 
              stroke="hsl(0 70% 50%)" 
              fillOpacity={1}
              fill="url(#colorSaida)"
              name="Saída"
              strokeWidth={2}
            />
            <Area 
              type="monotone" 
              dataKey="saldo" 
              stroke="hsl(215 90% 55%)" 
              fillOpacity={1}
              fill="url(#colorSaldo)"
              name="Saldo"
              strokeWidth={2}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
}
