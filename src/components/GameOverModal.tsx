import React from 'react';
import { AlertOctagon, RotateCcw, HeartCrack } from 'lucide-react';
import { PlayerStats, WorkTask } from '../types/game';
import { sound } from '../audio/soundEngine';

interface GameOverModalProps {
  reason: string;
  stats: PlayerStats;
  task: WorkTask;
  onRetry: () => void;
}

export const GameOverModal: React.FC<GameOverModalProps> = ({
  reason,
  stats,
  task,
  onRetry,
}) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-md animate-in fade-in zoom-in-95 duration-200">
      <div className="w-full max-w-md bg-[#222222] border-4 border-black rounded-lg p-5 shadow-[6px_6px_0px_0px_rgba(0,0,0,0.95)] font-pixel text-white flex flex-col gap-4 text-center">
        
        <div className="w-14 h-14 mx-auto rounded bg-[#E52521] border-2 border-black flex items-center justify-center text-white shadow-[2px_2px_0px_0px_rgba(0,0,0,0.8)]">
          <HeartCrack className="w-7 h-7" />
        </div>

        <div className="flex flex-col gap-1">
          <div className="text-[10px] text-[#E52521] font-bold uppercase tracking-widest">
            [ SPRINT CRASHED / BURNOUT ]
          </div>
          <h2 className="text-xl font-bold text-[#E52521]">GAME OVER</h2>
          <p className="text-xs font-retro text-zinc-300 mt-1">
            {reason || 'Exhausted sick days & sprint capacity collapsed.'}
          </p>
        </div>

        <div className="bg-[#18181b] p-3 rounded border-2 border-black flex justify-around text-xs shadow-[2px_2px_0px_0px_rgba(0,0,0,0.6)]">
          <div>
            <div className="text-[9px] text-zinc-400 font-retro">HOURS COMPLETED</div>
            <div className="text-[#FFD700] font-bold">{stats.hoursLogged.toFixed(1)} / 40.0h</div>
          </div>
          <div>
            <div className="text-[9px] text-zinc-400 font-retro">FINAL QUALITY</div>
            <div className="text-zinc-200 font-bold">{stats.taskQuality}%</div>
          </div>
        </div>

        <button
          id="retry-sprint-btn"
          onClick={() => {
            sound.playSelect();
            onRetry();
          }}
          className="w-full py-3.5 bg-[#E52521] hover:bg-red-500 active:bg-red-700 text-white font-bold text-xs rounded border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,0.9)] transition-transform active:scale-95 flex items-center justify-center gap-2 cursor-pointer"
        >
          <RotateCcw className="w-4 h-4 stroke-[3]" />
          <span>RETRY SPRINT</span>
        </button>
      </div>
    </div>
  );
};
