import React from 'react';
import { X, Keyboard, Coffee, Eye, Shield, Zap, HelpCircle, Heart, Star, Compass } from 'lucide-react';
import { sound } from '../audio/soundEngine';

interface InstructionsModalProps {
  onClose: () => void;
}

export const InstructionsModal: React.FC<InstructionsModalProps> = ({ onClose }) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="w-full max-w-2xl bg-[#222222] border-4 border-black rounded-lg p-5 shadow-[6px_6px_0px_0px_rgba(0,0,0,0.95)] font-pixel text-white flex flex-col gap-4 max-h-[88vh] overflow-y-auto">
        
        {/* Header */}
        <div className="flex items-center justify-between border-b-2 border-black pb-3">
          <div className="flex items-center gap-2 text-[#FFD700]">
            <HelpCircle className="w-5 h-5 text-[#FFD700]" />
            <h2 className="text-sm sm:text-base font-bold">GAME MANUAL & CONTROLS</h2>
          </div>
          <button
            id="close-instructions-modal-btn"
            onClick={() => {
              sound.playSelect();
              onClose();
            }}
            className="p-1 rounded bg-black hover:bg-zinc-800 text-white border-2 border-white/50 cursor-pointer"
          >
            <X className="w-4 h-4 stroke-[3]" />
          </button>
        </div>

        {/* 1. Core Goal */}
        <div className="bg-[#18181b] p-3 rounded border-2 border-black flex flex-col gap-1.5 shadow-[2px_2px_0px_0px_rgba(0,0,0,0.6)]">
          <div className="text-xs font-bold text-[#FFD700]">🎯 MISSION OBJECTIVE</div>
          <p className="text-xs font-retro text-zinc-200 leading-relaxed">
            Reach exactly <b>40.0 hours of productive work</b> across Monday–Friday while keeping <b>Task Quality &gt; 70%</b> and managing your Energy and Morale. Every day brings real-life obstacles (doctor visits, sick kids, laundry, due date shifts, vacation opportunities).
          </p>
        </div>

        {/* 2. Controls Section */}
        <div className="flex flex-col gap-2">
          <div className="text-xs font-bold text-[#5C94FC] flex items-center gap-1.5">
            <Keyboard className="w-4 h-4" />
            <span>PLATFORMING CONTROLS</span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-[11px] font-retro">
            <div className="bg-[#18181b] p-2.5 rounded border-2 border-black flex justify-between items-center shadow-[2px_2px_0px_0px_rgba(0,0,0,0.6)]">
              <span className="text-zinc-300">Move Left / Right:</span>
              <span className="px-2 py-0.5 bg-black text-[#FFD700] rounded border border-zinc-700 font-bold">← / → or A / D</span>
            </div>
            <div className="bg-[#18181b] p-2.5 rounded border-2 border-black flex justify-between items-center shadow-[2px_2px_0px_0px_rgba(0,0,0,0.6)]">
              <span className="text-zinc-300">Jump (Hold higher):</span>
              <span className="px-2 py-0.5 bg-black text-[#FFD700] rounded border border-zinc-700 font-bold">Space / W / ↑</span>
            </div>
            <div className="bg-[#18181b] p-2.5 rounded border-2 border-black flex justify-between items-center shadow-[2px_2px_0px_0px_rgba(0,0,0,0.6)]">
              <span className="text-zinc-300">Enter Warp Pipe:</span>
              <span className="px-2 py-0.5 bg-black text-[#FFD700] rounded border border-zinc-700 font-bold">Press ↓ on Pipe</span>
            </div>
            <div className="bg-[#18181b] p-2.5 rounded border-2 border-black flex justify-between items-center shadow-[2px_2px_0px_0px_rgba(0,0,0,0.6)]">
              <span className="text-zinc-300">Stomp Distraction Bugs:</span>
              <span className="px-2 py-0.5 bg-black text-[#FFD700] rounded border border-zinc-700 font-bold">Jump from above</span>
            </div>
          </div>
        </div>

        {/* 3. Power-ups Guide */}
        <div className="flex flex-col gap-2">
          <div className="text-xs font-bold text-[#FFD700] flex items-center gap-1.5">
            <Star className="w-4 h-4" />
            <span>POWER-UPS & ITEMS</span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs font-retro">
            <div className="bg-[#18181b] p-2.5 rounded border-2 border-black flex items-start gap-2.5 shadow-[2px_2px_0px_0px_rgba(0,0,0,0.6)]">
              <Coffee className="w-5 h-5 text-[#E76E33] shrink-0 mt-0.5" />
              <div>
                <b className="text-[#FFD700]">Espresso Mug</b>
                <p className="text-zinc-300 text-[11px]">Grants 2X run speed and Double Jump ability.</p>
              </div>
            </div>

            <div className="bg-[#18181b] p-2.5 rounded border-2 border-black flex items-start gap-2.5 shadow-[2px_2px_0px_0px_rgba(0,0,0,0.6)]">
              <Eye className="w-5 h-5 text-[#5C94FC] shrink-0 mt-0.5" />
              <div>
                <b className="text-[#5C94FC]">Focus Goggles</b>
                <p className="text-zinc-300 text-[11px]">Reveals invisible blocks and hidden warp routes.</p>
              </div>
            </div>

            <div className="bg-[#18181b] p-2.5 rounded border-2 border-black flex items-start gap-2.5 shadow-[2px_2px_0px_0px_rgba(0,0,0,0.6)]">
              <Shield className="w-5 h-5 text-[#FFD700] shrink-0 mt-0.5" />
              <div>
                <b className="text-[#FFD700]">Delegation Star Shield</b>
                <p className="text-zinc-300 text-[11px]">Invincibility against Jira tickets, bugs, and chaos.</p>
              </div>
            </div>

            <div className="bg-[#18181b] p-2.5 rounded border-2 border-black flex items-start gap-2.5 shadow-[2px_2px_0px_0px_rgba(0,0,0,0.6)]">
              <Zap className="w-5 h-5 text-[#22c55e] shrink-0 mt-0.5" />
              <div>
                <b className="text-[#22c55e]">Healthy Meal / Snack</b>
                <p className="text-zinc-300 text-[11px]">Restores Energy to 100% and cures fatigue.</p>
              </div>
            </div>
          </div>
        </div>

        {/* Close Button */}
        <button
          id="understood-guide-btn"
          onClick={() => {
            sound.playSelect();
            onClose();
          }}
          className="w-full py-3.5 bg-[#FFD700] hover:bg-yellow-300 active:bg-yellow-500 text-black font-bold text-xs rounded border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,0.9)] transition-transform active:scale-95 cursor-pointer"
        >
          GOT IT, BACK TO SPRINT
        </button>
      </div>
    </div>
  );
};
