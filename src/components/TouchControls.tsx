import React from 'react';
import { ArrowLeft, ArrowRight, ArrowDown, ArrowUp } from 'lucide-react';
import { GameInputState } from '../game/engine';

interface TouchControlsProps {
  onInputStateChange: (updater: (prev: GameInputState) => GameInputState) => void;
}

export const TouchControls: React.FC<TouchControlsProps> = ({ onInputStateChange }) => {
  const handleTouch = (key: keyof GameInputState, active: boolean) => {
    onInputStateChange((prev) => {
      if (key === 'jump') {
        return {
          ...prev,
          jump: active,
          jumpPressed: active ? true : prev.jumpPressed,
        };
      }
      return {
        ...prev,
        [key]: active,
      };
    });
  };

  return (
    <div className="w-full bg-[#333333] border-4 border-black rounded-lg p-3 sm:p-4 select-none touch-none pointer-events-auto shadow-[4px_4px_0px_0px_rgba(0,0,0,0.9)] flex flex-col sm:flex-row items-center justify-between gap-3">
      {/* Virtual D-Pad (Directional controls) */}
      <div className="flex items-center gap-1.5 sm:gap-2">
        <button
          id="btn-touch-left"
          onMouseDown={() => handleTouch('left', true)}
          onMouseUp={() => handleTouch('left', false)}
          onMouseLeave={() => handleTouch('left', false)}
          onTouchStart={(e) => { e.preventDefault(); handleTouch('left', true); }}
          onTouchEnd={(e) => { e.preventDefault(); handleTouch('left', false); }}
          className="w-13 h-13 sm:w-14 sm:h-14 bg-[#555555] active:bg-[#333333] border-4 border-black rounded-lg flex items-center justify-center text-white/90 shadow-[3px_3px_0px_0px_rgba(0,0,0,0.9)] transition-transform active:translate-x-0.5 active:translate-y-0.5 cursor-pointer"
          title="Move Left (A / Left Arrow)"
        >
          <ArrowLeft className="w-6 h-6 stroke-[3]" />
        </button>

        <button
          id="btn-touch-down"
          onMouseDown={() => handleTouch('down', true)}
          onMouseUp={() => handleTouch('down', false)}
          onMouseLeave={() => handleTouch('down', false)}
          onTouchStart={(e) => { e.preventDefault(); handleTouch('down', true); }}
          onTouchEnd={(e) => { e.preventDefault(); handleTouch('down', false); }}
          className="w-13 h-13 sm:w-14 sm:h-14 bg-[#555555] active:bg-[#333333] border-4 border-black rounded-lg flex items-center justify-center text-white/90 shadow-[3px_3px_0px_0px_rgba(0,0,0,0.9)] transition-transform active:translate-x-0.5 active:translate-y-0.5 cursor-pointer"
          title="Crouch / Enter Warp Pipe (S / Down Arrow)"
        >
          <ArrowDown className="w-6 h-6 stroke-[3]" />
        </button>

        <button
          id="btn-touch-right"
          onMouseDown={() => handleTouch('right', true)}
          onMouseUp={() => handleTouch('right', false)}
          onMouseLeave={() => handleTouch('right', false)}
          onTouchStart={(e) => { e.preventDefault(); handleTouch('right', true); }}
          onTouchEnd={(e) => { e.preventDefault(); handleTouch('right', false); }}
          className="w-13 h-13 sm:w-14 sm:h-14 bg-[#555555] active:bg-[#333333] border-4 border-black rounded-lg flex items-center justify-center text-white/90 shadow-[3px_3px_0px_0px_rgba(0,0,0,0.9)] transition-transform active:translate-x-0.5 active:translate-y-0.5 cursor-pointer"
          title="Move Right (D / Right Arrow)"
        >
          <ArrowRight className="w-6 h-6 stroke-[3]" />
        </button>
      </div>

      {/* Middle Console Badge / Goal reminder */}
      <div className="hidden md:flex flex-col items-center gap-1 bg-black/40 border-2 border-white/20 px-3 py-1.5 rounded">
        <span className="text-white text-[10px] font-pixel font-bold">GOAL: 40.0H SPRINT</span>
        <span className="text-[#FFD700] text-[9px] font-pixel">AVOID CHORE OVERLOAD</span>
      </div>

      {/* Chunky Arcade Pushbuttons (A = Work Task/Jump, B = Personal/Dash) */}
      <div className="flex items-center gap-3 sm:gap-4">
        {/* B Button: Dash / Speed */}
        <div className="flex flex-col items-center">
          <button
            id="btn-touch-dash"
            onMouseDown={() => handleTouch('dash', true)}
            onMouseUp={() => handleTouch('dash', false)}
            onMouseLeave={() => handleTouch('dash', false)}
            onTouchStart={(e) => { e.preventDefault(); handleTouch('dash', true); }}
            onTouchEnd={(e) => { e.preventDefault(); handleTouch('dash', false); }}
            className="w-14 h-14 sm:w-16 sm:h-16 bg-[#E52521] active:bg-[#b91c1c] border-4 border-black rounded-full flex flex-col items-center justify-center text-white font-pixel text-base font-bold shadow-[inset_-4px_-4px_0px_rgba(0,0,0,0.4),3px_3px_0px_0px_rgba(0,0,0,0.9)] transition-transform active:scale-95 cursor-pointer"
            title="Dash / Run Faster (Shift / X)"
          >
            <span>B</span>
          </button>
          <span className="text-white/70 text-[9px] font-pixel mt-1 uppercase tracking-wider">Dash</span>
        </div>

        {/* A Button: Jump / Work Action */}
        <div className="flex flex-col items-center">
          <button
            id="btn-touch-jump"
            onMouseDown={() => handleTouch('jump', true)}
            onMouseUp={() => handleTouch('jump', false)}
            onMouseLeave={() => handleTouch('jump', false)}
            onTouchStart={(e) => { e.preventDefault(); handleTouch('jump', true); }}
            onTouchEnd={(e) => { e.preventDefault(); handleTouch('jump', false); }}
            className="w-16 h-16 sm:w-18 sm:h-18 bg-[#FFD700] active:bg-[#eab308] border-4 border-black rounded-full flex flex-col items-center justify-center text-black font-pixel text-lg font-bold shadow-[inset_-4px_-4px_0px_rgba(0,0,0,0.3),3px_3px_0px_0px_rgba(0,0,0,0.9)] transition-transform active:scale-95 cursor-pointer"
            title="Jump (Space / W / Up Arrow)"
          >
            <span>A</span>
          </button>
          <span className="text-white/70 text-[9px] font-pixel mt-1 uppercase tracking-wider">Jump</span>
        </div>
      </div>
    </div>
  );
};
