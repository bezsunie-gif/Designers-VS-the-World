import React, { useState } from 'react';
import { 
  FileQuestion, 
  Clock, 
  Thermometer, 
  Bus, 
  Dog, 
  Stethoscope, 
  HeartPulse, 
  Utensils, 
  ChefHat, 
  Palmtree, 
  Moon,
  ArrowRight,
  Sparkles,
  Zap,
  CheckCircle2,
  AlertTriangle
} from 'lucide-react';
import { LifeEvent, LifeEventOption } from '../types/game';
import { sound } from '../audio/soundEngine';

interface LifeEventModalProps {
  event: LifeEvent;
  onSelectOption: (option: LifeEventOption) => void;
}

export const LifeEventModal: React.FC<LifeEventModalProps> = ({ event, onSelectOption }) => {
  const [selectedIdx, setSelectedIdx] = useState<number | null>(null);
  const [resultOutcome, setResultOutcome] = useState<LifeEventOption | null>(null);

  const getEventIcon = (name: string) => {
    switch (name) {
      case 'FileQuestion': return <FileQuestion className="w-8 h-8 text-amber-400" />;
      case 'ClockAlert': return <Clock className="w-8 h-8 text-red-400" />;
      case 'Thermometer': return <Thermometer className="w-8 h-8 text-purple-400" />;
      case 'Bus': return <Bus className="w-8 h-8 text-yellow-400" />;
      case 'Dog': return <Dog className="w-8 h-8 text-orange-400" />;
      case 'Stethoscope': return <Stethoscope className="w-8 h-8 text-cyan-400" />;
      case 'HeartPulse': return <HeartPulse className="w-8 h-8 text-rose-400" />;
      case 'Utensils': return <Utensils className="w-8 h-8 text-emerald-400" />;
      case 'ChefHat': return <ChefHat className="w-8 h-8 text-amber-300" />;
      case 'Palmtree': return <Palmtree className="w-8 h-8 text-teal-400" />;
      case 'Moon': return <Moon className="w-8 h-8 text-indigo-400" />;
      default: return <AlertTriangle className="w-8 h-8 text-yellow-400" />;
    }
  };

  const handleChoose = (opt: LifeEventOption, index: number) => {
    sound.playSelect();
    setSelectedIdx(index);
    setResultOutcome(opt);
  };

  const handleConfirmAndResume = () => {
    if (resultOutcome) {
      sound.playHourToken();
      onSelectOption(resultOutcome);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-sm">
      <div className="w-full max-w-xl bg-[#222222] border-4 border-black rounded-lg p-5 shadow-[6px_6px_0px_0px_rgba(0,0,0,0.95)] font-pixel text-white flex flex-col gap-4 animate-in fade-in zoom-in-95 duration-200">
        
        {/* Header with Retro Icon */}
        <div className="flex items-start gap-3 border-b-2 border-black pb-3">
          <div className="p-2.5 bg-[#18181b] border-2 border-black rounded-lg flex items-center justify-center shadow-[2px_2px_0px_0px_rgba(0,0,0,0.8)]">
            {getEventIcon(event.icon)}
          </div>
          <div className="flex-1">
            <div className="inline-block px-2 py-0.5 bg-[#FFD700] text-black text-[9px] font-bold uppercase tracking-wider border-2 border-black rounded shadow-[2px_2px_0px_0px_rgba(0,0,0,0.8)] mb-1">
              REAL-LIFE EVENT CHECKPOINT
            </div>
            <h2 className="text-sm sm:text-base font-bold text-white mt-0.5 leading-snug">
              {event.title}
            </h2>
            <p className="text-xs font-retro text-zinc-300 mt-0.5">
              {event.subtitle}
            </p>
          </div>
        </div>

        {/* Narrative Prompt */}
        {!resultOutcome ? (
          <>
            <div className="bg-[#18181b] border-2 border-black p-3.5 rounded text-xs sm:text-sm font-retro text-zinc-200 leading-relaxed shadow-[2px_2px_0px_0px_rgba(0,0,0,0.6)]">
              "{event.prompt}"
            </div>

            <div className="text-[10px] text-[#FFD700] uppercase tracking-wider font-bold">
              Choose your response:
            </div>

            {/* Choices */}
            <div className="flex flex-col gap-2.5">
              {event.options.map((opt, idx) => (
                <button
                  key={idx}
                  id={`choice-option-${idx}`}
                  onClick={() => handleChoose(opt, idx)}
                  className="w-full text-left p-3 rounded border-2 border-black bg-[#18181b] hover:bg-[#27272a] hover:border-[#FFD700] active:bg-[#111] transition-all flex flex-col gap-2 group cursor-pointer shadow-[2px_2px_0px_0px_rgba(0,0,0,0.8)]"
                >
                  <div className="flex items-start justify-between gap-2">
                    <span className="text-xs font-bold text-white group-hover:text-[#FFD700]">
                      {idx + 1}. {opt.text}
                    </span>
                    <ArrowRight className="w-4 h-4 text-zinc-400 group-hover:text-[#FFD700] group-hover:translate-x-0.5 transition-transform shrink-0" />
                  </div>

                  {/* Impact Badges */}
                  <div className="flex flex-wrap items-center gap-1.5 text-[9px] font-retro">
                    {opt.impactHours !== 0 && (
                      <span className={`px-1.5 py-0.5 rounded border-2 border-black font-bold ${
                        opt.impactHours > 0 
                          ? 'bg-[#448844] text-white' 
                          : 'bg-[#E52521] text-white'
                      }`}>
                        {opt.impactHours > 0 ? `+${opt.impactHours}h Work Time` : `${opt.impactHours}h Lost Time`}
                      </span>
                    )}

                    {opt.impactQuality !== 0 && (
                      <span className={`px-1.5 py-0.5 rounded border-2 border-black font-bold ${
                        opt.impactQuality > 0 
                          ? 'bg-[#448844] text-white' 
                          : 'bg-[#E76E33] text-white'
                      }`}>
                        {opt.impactQuality > 0 ? `+${opt.impactQuality}% Quality` : `${opt.impactQuality}% Quality`}
                      </span>
                    )}

                    {opt.impactMorale !== 0 && (
                      <span className={`px-1.5 py-0.5 rounded border-2 border-black font-bold ${
                        opt.impactMorale > 0 
                          ? 'bg-pink-600 text-white' 
                          : 'bg-zinc-800 text-zinc-300'
                      }`}>
                        {opt.impactMorale > 0 ? `+${opt.impactMorale}% Morale` : `${opt.impactMorale}% Morale`}
                      </span>
                    )}

                    {opt.impactEnergy !== 0 && (
                      <span className={`px-1.5 py-0.5 rounded border-2 border-black font-bold ${
                        opt.impactEnergy > 0 
                          ? 'bg-teal-600 text-white' 
                          : 'bg-zinc-800 text-zinc-300'
                      }`}>
                        {opt.impactEnergy > 0 ? `+${opt.impactEnergy}% Energy` : `${opt.impactEnergy}% Energy`}
                      </span>
                    )}

                    {opt.overtimeNeeded && (
                      <span className="px-1.5 py-0.5 rounded border-2 border-black bg-purple-700 text-white font-bold">
                        +{opt.overtimeNeeded}h Overtime Unlocked
                      </span>
                    )}
                  </div>
                </button>
              ))}
            </div>
          </>
        ) : (
          /* Result Confirmation State */
          <div className="flex flex-col gap-4 animate-in fade-in duration-150">
            <div className="p-4 bg-[#18181b] rounded border-2 border-black flex flex-col gap-2 shadow-[2px_2px_0px_0px_rgba(0,0,0,0.6)]">
              <div className="flex items-center gap-2 text-[#22c55e] text-xs font-bold">
                <CheckCircle2 className="w-4 h-4 text-[#22c55e]" />
                CHOICE RECORDED
              </div>
              <p className="text-xs font-retro text-zinc-200 leading-relaxed">
                {resultOutcome.narrativeResult}
              </p>
            </div>

            <button
              id="resume-sprint-btn"
              onClick={handleConfirmAndResume}
              className="w-full py-3.5 bg-[#FFD700] hover:bg-yellow-300 active:bg-yellow-500 text-black font-bold text-xs rounded border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,0.9)] transition-transform active:scale-95 flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>RESUME WORK SPRINT</span>
              <ArrowRight className="w-4 h-4 stroke-[3]" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
