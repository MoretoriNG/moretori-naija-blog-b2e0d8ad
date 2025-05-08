
interface HeroAutoplayIndicatorProps {
  autoplayEnabled: boolean;
  setAutoplayEnabled: (enabled: boolean) => void;
}

export const HeroAutoplayIndicator = ({ 
  autoplayEnabled, 
  setAutoplayEnabled 
}: HeroAutoplayIndicatorProps) => {
  return (
    <div className="absolute bottom-4 right-5 z-20 flex items-center gap-2">
      <div className="w-12 h-1 bg-white/20 rounded-full overflow-hidden">
        <div 
          className="h-full bg-blue-500 transition-all duration-200" 
          style={{ 
            width: autoplayEnabled ? '100%' : '0%',
            animation: autoplayEnabled ? 'progress 5s linear infinite' : 'none'
          }}
        ></div>
      </div>
      <button 
        className="text-white/70 hover:text-white text-[10px] flex items-center"
        onClick={() => setAutoplayEnabled(!autoplayEnabled)}
      >
        {autoplayEnabled ? 'Pause' : 'Play'}
      </button>
    </div>
  );
};
