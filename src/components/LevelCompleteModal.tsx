import React from 'react';
import { Award, CheckCircle, ArrowRight, Clock, Sparkles, Heart, Zap, Coffee } from 'lucide-react';
import { PlayerStats, WorkTask } from '../types/game';
import { sound } from '../audio/soundEngine';

interface LevelCompleteModalProps {
  stats: PlayerStats;
  task: WorkTask;
  dayIndex: number;
  onNextDay: () => void;
}

export const LevelCompleteModal: React.FC<LevelCompleteModalProps> = ({
  stats,
  task,
  dayIndex,
  onNextDay,
}) => {
  const dayNames = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];
  const currentDayName = dayNames[dayIndex] || `Day ${dayIndex + 1}`;
  const nextDayName = dayNames[dayIndex + 1] || 'Final Review';

  const hoursRemaining = Math.max(0, +(stats.targetHours - stats.hoursLogged).toFixed(1));
  const percentComplete = Math.min(100, (stats.hoursLogged / stats.targetHours) * 100);

  const handleContinue = () => {
    sound.playPowerup();
    onNextDay();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="w-full max-w-lg bg-[#222222] border-4 border-black rounded-lg p-5 shadow-[6px_6px_0px_0px_rgba(0,0,0,0.95)] font-pixel text-white flex flex-col gap-4">
        
        {/* Banner */}
        <div className="text-center flex flex-col items-center gap-1.5 border-b-2 border-black pb-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-[#448844] border-2 border-black rounded text-white text-[10px] font-bold shadow-[2px_2px_0px_0px_rgba(0,0,0,0.8)]">
            <Sparkles className="w-3.5 h-3.5 text-[#FFD700]" />
            <span>DAY STAGE CLEARED!</span>
          </div>
          <h2 className="text-lg sm:text-xl font-bold text-[#FFD700]">
            {currentDayName} Sprint Finished
          </h2>
          <p className="text-xs font-retro text-zinc-300">
            Flagpole reached and work progress logged!
          </p>
        </div>

        {/* Progress Card */}
        <div className="bg-[#18181b] p-4 rounded border-2 border-black flex flex-col gap-3 shadow-[2px_2px_0px_0px_rgba(0,0,0,0.6)]">
          <div className="flex justify-between items-center text-xs">
            <span className="text-[#FFD700] font-bold flex items-center gap-1">
              <Clock className="w-3.5 h-3.5 text-[#FFD700]" /> 40H SPRINT STATUS
            </span>
            <span className="text-[#FFD700] font-bold">
              {stats.hoursLogged.toFixed(1)} / {stats.targetHours}.0h ({percentComplete.toFixed(0)}%)
            </span>
          </div>

          <div className="w-full bg-black h-3.5 border-2 border-white/80 p-0.5 overflow-hidden">
            <div
              className="h-full bg-[#E76E33] transition-all duration-500"
              style={{ width: `${percentComplete}%` }}
            />
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-2 border-t border-zinc-800 text-center">
            <div className="bg-[#222222] p-2 rounded border-2 border-black">
              <div className="text-[9px] text-zinc-400 font-retro">QUALITY</div>
              <div className="text-xs font-bold text-[#22c55e]">{stats.taskQuality}%</div>
            </div>
            <div className="bg-[#222222] p-2 rounded border-2 border-black">
              <div className="text-[9px] text-zinc-400 font-retro">ENERGY</div>
              <div className="text-xs font-bold text-teal-400">{Math.round(stats.energy)}%</div>
            </div>
            <div className="bg-[#222222] p-2 rounded border-2 border-black">
              <div className="text-[9px] text-zinc-400 font-retro">MORALE</div>
              <div className="text-xs font-bold text-pink-400">{Math.round(stats.morale)}%</div>
            </div>
            <div className="bg-[#222222] p-2 rounded border-2 border-black">
              <div className="text-[9px] text-zinc-400 font-retro">SECRETS</div>
              <div className="text-xs font-bold text-[#5C94FC]">{stats.hiddenZonesFound} found</div>
            </div>
          </div>
        </div>

        {/* Motivational Status */}
        <div className="p-3 bg-[#18181b] border-2 border-black rounded text-xs font-retro text-zinc-300">
          {hoursRemaining > 0 ? (
            <span>
              💡 <b className="text-[#FFD700]">{hoursRemaining} hours remaining</b> to hit the 40-hour requirement before Friday delivery! Look out for question blocks, coffee boosts, and secret warp pipes tomorrow.
            </span>
          ) : (
            <span className="text-[#22c55e] font-bold">
              🎉 40.0 Work Hours Target Reached! Maintain your task quality through the final deployment!
            </span>
          )}
        </div>

        {/* Action Button */}
        <button
          id="proceed-next-day-btn"
          onClick={handleContinue}
          className="w-full py-3.5 bg-[#FFD700] hover:bg-yellow-300 active:bg-yellow-500 text-black font-bold text-xs rounded border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,0.9)] transition-transform active:scale-95 flex items-center justify-center gap-2 cursor-pointer"
        >
          <span>PROCEED TO {nextDayName.toUpperCase()}</span>
          <ArrowRight className="w-4 h-4 stroke-[3]" />
        </button>
      </div>
    </div>
  );
};
