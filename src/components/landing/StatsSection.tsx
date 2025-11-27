import { stats } from './landingData';

const StatsSection = () => {
  return (
    <section className="py-16 bg-gradient-to-r from-primary via-primary/95 to-accent">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <div key={index} className="text-center">
              <div className="text-3xl md:text-5xl font-bold text-white mb-2">
                {stat.number}
              </div>
              <div className="text-sm md:text-base text-white/80 font-medium">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StatsSection;
