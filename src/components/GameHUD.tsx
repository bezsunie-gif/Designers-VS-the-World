import React from 'react';
import { Coffee, Eye, Shield, Zap, Heart, Clock, Award, Volume2, VolumeX, Sparkles, AlertCircle, User } from 'lucide-react';
import { CharacterType, PlayerStats, PowerupType, WorkTask } from '../types/game';
import { CHARACTERS } from '../data/gameData';

interface GameHUDProps {
  stats: PlayerStats;
  currentTask: WorkTask;
  character: CharacterType;
  playerName: string;
  dayName: string;
  isMuted: boolean;
  onToggleMute: () => void;
  onPause: () => void;
  onOpenHelp: () => void;
}

export const GameHUD: React.FC<GameHUDProps> = ({
  stats,
  currentTask,
  character,
  playerName,
  dayName,
  isMuted,
  onToggleMute,
  onPause,
  onOpenHelp,
}) => {
  const hoursPercent = Math.min(100, (stats.hoursLogged / stats.targetHours) * 100);
  const charProfile = CHARACTERS.find((c) => c.id === character) || CHARACTERS[0];

  // Quality badge styling
  let qualityColor = 'text-emerald-300 bg-[#448844]/80 border-2 border-[#22c55e]';
  let qualityLabel = 'PRISTINE';
  if (stats.taskQuality < 50) {
    qualityColor = 'text-white bg-[#E52521] border-2 border-white animate-pulse';
    qualityLabel = 'CRITICAL';
  } else if (stats.taskQuality < 75) {
    qualityColor = 'text-zinc-950 bg-[#FFD700] border-2 border-black font-bold';
    qualityLabel = 'ACCEPTABLE';
  }

  const getPowerupInfo = (type: PowerupType | null) => {
    switch (type) {
      case 'espresso':
        return { name: 'Espresso', icon: Coffee, color: 'text-zinc-950 bg-[#FFD700] border-2 border-black' };
      case 'focus_goggles':
        return { name: 'Focus Goggles', icon: Eye, color: 'text-white bg-cyan-600 border-2 border-white' };
      case 'delegation_shield':
        return { name: 'Star Shield', icon: Shield, color: 'text-zinc-950 bg-yellow-300 border-2 border-black animate-pulse' };
      case 'time_buffer':
        return { name: 'Time Buffer', icon: Zap, color: 'text-white bg-purple-600 border-2 border-white' };
      default:
        return null;
    }
  };

  const powerup = getPowerupInfo(stats.activePowerup);

  return (
    <header className="w-full bg-[#222222]/95 backdrop-blur border-4 border-black px-3 sm:px-4 py-2.5 text-white font-pixel text-xs select-none shadow-[4px_4px_0px_0px_rgba(0,0,0,0.9)]">
      {/* Top Row: Worker / Day Sprint Banner & Header Controls */}
      <div className="flex flex-wrap items-center justify-between gap-2 mb-2 pb-2 border-b-2 border-black/60">
        <div className="flex items-center gap-2 sm:gap-3 flex-wrap">
          {/* Day Badge */}
          <div className="px-2.5 py-1 bg-[#5C94FC] border-2 border-black text-white font-bold rounded flex items-center gap-1.5 shadow-[2px_2px_0px_0px_rgba(0,0,0,0.8)]">
            <Clock className="w-3.5 h-3.5 text-white" />
            <span className="text-[11px] sm:text-xs">{dayName.toUpperCase()}</span>
          </div>

          {/* Designer Profile Badge */}
          <div className="flex items-center gap-1.5 px-2.5 py-1 bg-[#18181b] border-2 border-black rounded shadow-[2px_2px_0px_0px_rgba(0,0,0,0.6)]">
            <div
              className="w-2.5 h-2.5 rounded-full border border-black"
              style={{ backgroundColor: charProfile.avatarColor }}
            />
            <span className="text-[#FFD700] font-bold text-[11px]">
              {playerName.toUpperCase()}
            </span>
            <span className="text-zinc-400 text-[10px] hidden sm:inline font-retro">
              ({charProfile.name})
            </span>
          </div>

          {/* Task Preview */}
          <div className="hidden lg:flex items-center gap-1.5 text-xs text-zinc-300 font-retro">
            <span className="text-[#FFD700] font-bold">TASK:</span>
            <span className="text-white font-bold truncate max-w-xs">{currentTask.title}</span>
          </div>
        </div>

        {/* Action Controls (Audio, Guide, Pause) */}
        <div className="flex items-center gap-1.5 sm:gap-2">
          <button
            id="toggle-audio-btn"
            onClick={onToggleMute}
            className="px-2.5 py-1 bg-[#333] hover:bg-[#444] active:bg-[#222] text-white rounded border-2 border-black flex items-center gap-1 transition-all shadow-[2px_2px_0px_0px_rgba(0,0,0,0.8)] cursor-pointer"
            title="Toggle Sound"
          >
            {isMuted ? <VolumeX className="w-3.5 h-3.5 text-zinc-400" /> : <Volume2 className="w-3.5 h-3.5 text-[#FFD700]" />}
            <span className="text-[10px] font-bold">{isMuted ? 'MUTE' : 'SFX'}</span>
          </button>
          <button
            id="open-instructions-btn"
            onClick={onOpenHelp}
            className="px-2.5 py-1 bg-[#5C94FC] hover:bg-blue-400 active:bg-blue-600 text-white font-bold rounded border-2 border-black text-[10px] shadow-[2px_2px_0px_0px_rgba(0,0,0,0.8)] cursor-pointer"
          >
            MANUAL
          </button>
          <button
            id="pause-game-btn"
            onClick={onPause}
            className="px-2.5 py-1 bg-[#E76E33] hover:bg-orange-500 active:bg-orange-700 text-white font-bold rounded border-2 border-black text-[10px] shadow-[2px_2px_0px_0px_rgba(0,0,0,0.8)] cursor-pointer"
          >
            PAUSE
          </button>
        </div>
      </div>

      {/* Main Stats Bar with Vibrant Palette High-Contrast Indicators */}
      <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-6 gap-2 sm:gap-3 items-center">
        {/* 1. 40-Hour Sprint Target Bar with Golden #FFD700 readout */}
        <div className="col-span-2 bg-[#18181b] p-2 rounded border-2 border-black flex flex-col gap-1.5 shadow-[2px_2px_0px_0px_rgba(0,0,0,0.6)]">
          <div className="flex justify-between items-center text-[10px]">
            <span className="text-[#FFD700] flex items-center gap-1 font-bold">
              <Clock className="w-3 h-3 text-[#FFD700]" /> 40H SPRINT HOURS
            </span>
            <span className="text-lg sm:text-xl font-bold text-[#FFD700] tracking-wider">
              {stats.hoursLogged.toFixed(1)} <span className="text-xs text-zinc-400 font-normal">/ {stats.targetHours}.0h</span>
            </span>
          </div>
          <div className="w-full bg-black h-3.5 border-2 border-white/80 p-0.5 rounded-none overflow-hidden">
            <div
              className="h-full bg-[#E76E33] transition-all duration-300"
              style={{ width: `${hoursPercent}%` }}
            />
          </div>
        </div>

        {/* 2. Task Quality */}
        <div className="bg-[#18181b] p-2 rounded border-2 border-black flex flex-col gap-1 justify-center shadow-[2px_2px_0px_0px_rgba(0,0,0,0.6)]">
          <div className="text-zinc-400 text-[9px] flex justify-between font-retro text-xs">
            <span>TASK QUALITY</span>
            <span className="font-bold text-white">{stats.taskQuality}%</span>
          </div>
          <div className={`px-1.5 py-0.5 rounded-none text-[9px] text-center font-bold truncate ${qualityColor}`}>
            {qualityLabel}
          </div>
        </div>

        {/* 3. Energy & Stamina */}
        <div className="bg-[#18181b] p-2 rounded border-2 border-black flex flex-col gap-1.5 shadow-[2px_2px_0px_0px_rgba(0,0,0,0.6)]">
          <div className="flex justify-between text-[9px] text-zinc-400 font-retro text-xs">
            <span className="flex items-center gap-1 text-[#22c55e] font-bold">
              <Zap className="w-3 h-3 text-[#22c55e]" /> ENERGY
            </span>
            <span className="text-white font-bold">{Math.round(stats.energy)}%</span>
          </div>
          <div className="w-full bg-black h-2.5 border border-white/60 p-0.5">
            <div
              className="h-full bg-[#22c55e] transition-all duration-200"
              style={{ width: `${stats.energy}%` }}
            />
          </div>
        </div>

        {/* 4. Morale & Work-Life Balance */}
        <div className="bg-[#18181b] p-2 rounded border-2 border-black flex flex-col gap-1.5 shadow-[2px_2px_0px_0px_rgba(0,0,0,0.6)]">
          <div className="flex justify-between text-[9px] text-zinc-400 font-retro text-xs">
            <span className="flex items-center gap-1 text-pink-400 font-bold">
              <Sparkles className="w-3 h-3 text-pink-400" /> MORALE
            </span>
            <span className="text-white font-bold">{Math.round(stats.morale)}%</span>
          </div>
          <div className="w-full bg-black h-2.5 border border-white/60 p-0.5">
            <div
              className="h-full bg-pink-500 transition-all duration-200"
              style={{ width: `${stats.morale}%` }}
            />
          </div>
        </div>

        {/* 5. Sick Days / Respawns & Active Powerup */}
        <div className="col-span-2 sm:col-span-4 lg:col-span-1 bg-[#18181b] p-2 rounded border-2 border-black flex items-center justify-between gap-2 shadow-[2px_2px_0px_0px_rgba(0,0,0,0.6)]">
          <div className="flex items-center gap-1.5" title="Sick Days / Respawns">
            <div className="w-4 h-4 bg-[#E52521] border border-white flex items-center justify-center">
              <Heart className="w-3 h-3 text-white fill-white" />
            </div>
            <span className="text-white text-xs font-bold">x{stats.lives}</span>
          </div>

          {powerup ? (
            <div className={`flex items-center gap-1 px-1.5 py-0.5 text-[9px] font-bold ${powerup.color}`}>
              <powerup.icon className="w-3 h-3" />
              <span>{Math.ceil(stats.powerupTimer)}s</span>
            </div>
          ) : (
            <span className="text-zinc-500 text-[8px]">ITEM: NONE</span>
          )}
        </div>
      </div>
    </header>
  );
};
