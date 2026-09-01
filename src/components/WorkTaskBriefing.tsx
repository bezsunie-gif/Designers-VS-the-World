import React, { useState, useEffect } from 'react';
import { Briefcase, User, Sparkles, CheckCircle, ArrowRight, Play, Compass, Palette, Layers, Lightbulb, Dice5, ShieldCheck } from 'lucide-react';
import { CharacterProfile, CharacterType, WorkTask } from '../types/game';
import { CHARACTERS, TASKS_BY_ROLE, WORK_TASKS } from '../data/gameData';
import { sound } from '../audio/soundEngine';

interface WorkTaskBriefingProps {
  onStartGame: (selectedTask: WorkTask, selectedChar: CharacterType, playerName: string) => void;
  onOpenGuide: () => void;
}

const DESIGNER_ICONS: Record<CharacterType, React.ElementType> = {
  structure_designer: Layers,
  graphic_designer: Palette,
  floor_plan_designer: Compass,
  conceptual_designer: Lightbulb,
};

const RANDOM_NAMES = [
  'Alex Rivera',
  'Jordan Blake',
  'Taylor Morgan',
  'Casey Chen',
  'Samira Vance',
  'Devon Wright',
  'Rowan Scott',
  'Elena Rostova',
];

export const WorkTaskBriefing: React.FC<WorkTaskBriefingProps> = ({ onStartGame, onOpenGuide }) => {
  const [selectedTaskDifficultyIdx, setSelectedTaskDifficultyIdx] = useState(0);
  const [selectedCharId, setSelectedCharId] = useState<CharacterType>('structure_designer');
  const [playerName, setPlayerName] = useState<string>(() => {
    return localStorage.getItem('odyssey_player_name') || 'Alex Rivera';
  });

  const availableTasks = TASKS_BY_ROLE[selectedCharId] || TASKS_BY_ROLE.structure_designer;
  const currentTask = availableTasks[selectedTaskDifficultyIdx] || availableTasks[0];
  const currentChar = CHARACTERS.find((c) => c.id === selectedCharId) || CHARACTERS[0];
  const IconComponent = DESIGNER_ICONS[selectedCharId] || Layers;

  const handleRandomizeName = () => {
    sound.playSelect();
    const available = RANDOM_NAMES.filter((n) => n !== playerName);
    const chosen = available[Math.floor(Math.random() * available.length)];
    setPlayerName(chosen);
  };

  const handleLaunch = () => {
    const finalName = playerName.trim() || 'Lead Designer';
    try {
      localStorage.setItem('odyssey_player_name', finalName);
    } catch {
      // ignore localstorage errors
    }
    sound.playPowerup();
    sound.startBgm();
    onStartGame(currentTask, selectedCharId, finalName);
  };

  return (
    <div className="w-full max-w-4xl mx-auto p-4 sm:p-6 flex flex-col gap-5 text-white font-pixel animate-in fade-in duration-300">
      
      {/* Title & Retro Arcade Header */}
      <div className="text-center flex flex-col items-center gap-2">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-[#5C94FC] border-2 border-black rounded text-white text-[10px] font-bold shadow-[2px_2px_0px_0px_rgba(0,0,0,0.8)]">
          <Sparkles className="w-3.5 h-3.5 text-[#FFD700]" />
          <span>SUPER 40-HOUR ARCHITECT & DESIGN SPRINT</span>
        </div>
        <h1 className="text-2xl sm:text-4xl font-bold text-[#FFD700] drop-shadow-[3px_3px_0px_rgba(0,0,0,1)] tracking-wider">
          WORK-LIFE ODYSSEY
        </h1>
        <p className="text-xs sm:text-sm font-retro text-zinc-300 max-w-xl">
          Pick your designer discipline, enter your badge name, and balance 40 productive sprint hours through expansive drafting levels against authentic design challenges and life obstacles!
        </p>
      </div>

      {/* Designer Name Entry Section */}
      <div className="bg-[#222222] border-4 border-black rounded-lg p-4 shadow-[4px_4px_0px_0px_rgba(0,0,0,0.9)] flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3 w-full sm:w-auto">
          <div className="w-11 h-11 rounded border-2 border-black bg-[#FFD700] flex items-center justify-center text-black shrink-0 shadow-[2px_2px_0px_0px_rgba(0,0,0,0.8)]">
            <User className="w-6 h-6" />
          </div>
          <div>
            <div className="text-[10px] text-[#FFD700] font-bold tracking-wider">DESIGNER ID BADGE</div>
            <div className="text-xs text-zinc-300 font-retro">Name appears on scoreboard & sprint results:</div>
          </div>
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto flex-1 max-w-md justify-end">
          <div className="relative w-full">
            <input
              id="player-name-input"
              type="text"
              maxLength={22}
              value={playerName}
              onChange={(e) => setPlayerName(e.target.value)}
              placeholder="Enter your name..."
              className="w-full bg-[#18181b] border-2 border-black rounded px-3 py-2 text-xs sm:text-sm text-white font-pixel placeholder:text-zinc-500 focus:outline-none focus:border-[#FFD700] shadow-[2px_2px_0px_0px_rgba(0,0,0,0.6)]"
            />
          </div>
          <button
            id="random-name-btn"
            onClick={handleRandomizeName}
            title="Randomize Name"
            className="p-2 bg-[#333333] hover:bg-[#444444] text-[#FFD700] border-2 border-black rounded shadow-[2px_2px_0px_0px_rgba(0,0,0,0.8)] transition-transform active:scale-95 cursor-pointer shrink-0"
          >
            <Dice5 className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Main Two-Column Setup: Character Selection & Task Briefing */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        
        {/* Left Column: Designer Avatar Selection */}
        <div className="bg-[#222222] border-4 border-black rounded-lg p-4 flex flex-col gap-4 shadow-[4px_4px_0px_0px_rgba(0,0,0,0.9)]">
          <div className="flex items-center justify-between border-b-2 border-black pb-2">
            <div className="flex items-center gap-2 text-[#5C94FC] text-xs font-bold">
              <User className="w-4 h-4 text-[#5C94FC]" />
              <span>1. SELECT DESIGNER DISCIPLINE</span>
            </div>
            <span className="text-[10px] text-zinc-400 font-retro">4 DISCIPLINES</span>
          </div>

          {/* 4 Designer Avatar Grid */}
          <div className="grid grid-cols-2 gap-2">
            {CHARACTERS.map((char) => {
              const CharIcon = DESIGNER_ICONS[char.id] || User;
              const isSelected = selectedCharId === char.id;
              return (
                <button
                  key={char.id}
                  id={`select-char-${char.id}`}
                  onClick={() => {
                    sound.playSelect();
                    setSelectedCharId(char.id);
                  }}
                  className={`p-2.5 rounded border-2 text-left flex flex-col gap-1.5 transition-all cursor-pointer ${
                    isSelected
                      ? 'bg-[#5C94FC] border-black text-white shadow-[2px_2px_0px_0px_rgba(0,0,0,0.9)]'
                      : 'bg-[#18181b] border-black text-zinc-300 hover:bg-[#27272a]'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div
                      className="w-5 h-5 rounded border-2 border-black flex items-center justify-center text-white"
                      style={{ backgroundColor: char.avatarColor }}
                    >
                      <CharIcon className="w-3 h-3" />
                    </div>
                    <span className={`text-[8px] font-retro font-bold px-1.5 py-0.5 rounded ${isSelected ? 'bg-black text-[#FFD700]' : 'bg-zinc-800 text-zinc-400'}`}>
                      ACTIVE
                    </span>
                  </div>
                  <div className="text-[10px] font-bold leading-tight">{char.name}</div>
                </button>
              );
            })}
          </div>

          {/* Selected Character Perk & Profile Card */}
          <div className="bg-[#18181b] p-3 rounded border-2 border-black flex flex-col gap-2 shadow-[2px_2px_0px_0px_rgba(0,0,0,0.6)]">
            <div className="flex items-center justify-between">
              <div className="text-xs font-bold text-[#FFD700] flex items-center gap-1.5">
                <IconComponent className="w-4 h-4 text-[#FFD700]" />
                <span>{currentChar.name}</span>
              </div>
              <span className="text-[10px] text-zinc-400 font-retro">
                {currentChar.role}
              </span>
            </div>
            <p className="text-xs font-retro text-zinc-300">
              {currentChar.description}
            </p>
            <div className="p-2 bg-[#222222] border-2 border-black rounded text-[10px] text-zinc-200 font-retro">
              <b className="text-[#FFD700]">PERK:</b> {currentChar.perk}
            </div>
          </div>
        </div>

        {/* Right Column: Work Task Assignment Tailored to Selected Role */}
        <div className="bg-[#222222] border-4 border-black rounded-lg p-4 flex flex-col gap-4 shadow-[4px_4px_0px_0px_rgba(0,0,0,0.9)]">
          <div className="flex items-center justify-between border-b-2 border-black pb-2">
            <div className="flex items-center gap-2 text-[#FFD700] text-xs font-bold">
              <Briefcase className="w-4 h-4 text-[#FFD700]" />
              <span>2. {currentChar.name.toUpperCase()} SPRINT</span>
            </div>
            <span className="text-[10px] text-[#FFD700] font-retro">TARGET: 40.0 HOURS</span>
          </div>

          {/* Task Select Tabs */}
          <div className="grid grid-cols-3 gap-2">
            {availableTasks.map((task, idx) => (
              <button
                key={task.id}
                id={`select-task-${idx}`}
                onClick={() => {
                  sound.playSelect();
                  setSelectedTaskDifficultyIdx(idx);
                }}
                className={`p-2 rounded text-[9px] font-bold border-2 transition-all cursor-pointer ${
                  selectedTaskDifficultyIdx === idx
                    ? 'bg-[#FFD700] border-black text-black shadow-[2px_2px_0px_0px_rgba(0,0,0,0.9)]'
                    : 'bg-[#18181b] border-black text-zinc-300 hover:bg-[#27272a]'
                }`}
              >
                {task.difficulty}
              </button>
            ))}
          </div>

          {/* Active Task Details */}
          <div className="bg-[#18181b] p-3.5 rounded border-2 border-black flex flex-col gap-2.5 shadow-[2px_2px_0px_0px_rgba(0,0,0,0.6)]">
            <div className="text-xs font-bold text-white">{currentTask.title}</div>
            <div className="text-[11px] text-[#FFD700] font-retro">
              Client: {currentTask.clientOrBoss}
            </div>
            <p className="text-xs font-retro text-zinc-300 leading-relaxed">
              "{currentTask.description}"
            </p>
            <div className="flex items-center justify-between text-[10px] text-zinc-300 pt-2 border-t border-zinc-800 font-retro">
              <span>Sprint Target: <b className="text-[#FFD700]">40.0 Hours</b></span>
              <span>Min Quality: <b className="text-[#22c55e]">70%+</b></span>
            </div>
          </div>

          {/* Quick Rules */}
          <div className="text-[10px] font-retro text-zinc-300 flex flex-col gap-1.5 bg-[#18181b] p-2.5 rounded border-2 border-black">
            <div className="flex items-center gap-1.5 text-zinc-200">
              <CheckCircle className="w-3.5 h-3.5 text-[#22c55e] shrink-0" />
              <span>Explore longer multi-tier levels & collect Golden Hour Tokens (+1h)</span>
            </div>
            <div className="flex items-center gap-1.5 text-zinc-200">
              <CheckCircle className="w-3.5 h-3.5 text-[#5C94FC] shrink-0" />
              <span>Enter green Warp Pipes for secret drafting studio overtime zones</span>
            </div>
            <div className="flex items-center gap-1.5 text-zinc-200">
              <CheckCircle className="w-3.5 h-3.5 text-[#E76E33] shrink-0" />
              <span>Resolve real design dilemmas tailored to your {currentChar.name}</span>
            </div>
          </div>
        </div>

      </div>

      {/* Action Footer */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-1">
        <button
          id="open-guide-modal-btn"
          onClick={onOpenGuide}
          className="w-full sm:w-auto px-4 py-3 bg-[#333333] hover:bg-[#444444] text-white text-xs rounded border-4 border-black shadow-[3px_3px_0px_0px_rgba(0,0,0,0.9)] transition-transform active:scale-95 cursor-pointer"
        >
          VIEW RETRO MANUAL & CONTROLS
        </button>

        <button
          id="start-sprint-btn"
          onClick={handleLaunch}
          className="w-full sm:w-auto px-8 py-3.5 bg-[#FFD700] hover:bg-yellow-300 active:bg-yellow-500 text-black font-bold text-sm rounded border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,0.9)] transition-transform hover:scale-105 active:scale-95 flex items-center justify-center gap-2 cursor-pointer"
        >
          <Play className="w-4 h-4 fill-black text-black" />
          <span>START 40-HOUR SPRINT AS {currentChar.name.toUpperCase()}</span>
        </button>
      </div>
    </div>
  );
};
