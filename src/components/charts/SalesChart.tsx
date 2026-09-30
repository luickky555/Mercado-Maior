export function SalesChart() {
  return (
    <div className="w-full h-64 bg-slate-50 border border-carnauba/10 rounded-lg flex items-end justify-between p-4 gap-2">
      {/* Barras de mock para o gráfico */}
      {[40, 70, 45, 90, 65, 80, 100].map((height, i) => (
        <div key={i} className="w-full flex flex-col items-center gap-2 group">
          <div 
            className="w-full bg-carnauba/20 group-hover:bg-terracota rounded-t-sm transition-colors"
            style={{ height: `${height}%` }}
          />
          <span className="text-xs text-carnauba/50 block">Dia {i + 1}</span>
        </div>
      ))}
    </div>
  );
}