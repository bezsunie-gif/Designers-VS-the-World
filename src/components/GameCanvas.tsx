import React, { useEffect, useRef, useState, useCallback } from 'react';
import { CharacterType, LifeEventOption, PlayerStats, TileMap, WorkTask } from '../types/game';
import { PlatformerEngine, GameInputState } from '../game/engine';
import { GameRenderer } from '../game/renderer';
import { GameHUD } from './GameHUD';
import { LifeEventModal } from './LifeEventModal';
import { LevelCompleteModal } from './LevelCompleteModal';
import { GameOverModal } from './GameOverModal';
import { InstructionsModal } from './InstructionsModal';
import { TouchControls } from './TouchControls';
import { LIFE_EVENTS } from '../data/gameData';
import { sound } from '../audio/soundEngine';
import { TILE_SIZE, getLevelByIndex } from '../game/levels';

interface GameCanvasProps {
  task: WorkTask;
  character: CharacterType;
  playerName: string;
  onFinishVictory: (finalStats: PlayerStats) => void;
  onExitToTitle: () => void;
}

export const GameCanvas: React.FC<GameCanvasProps> = ({
  task,
  character,
  playerName,
  onFinishVictory,
  onExitToTitle,
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const engineRef = useRef<PlatformerEngine | null>(null);
  const rendererRef = useRef<GameRenderer | null>(null);

  // Core Game Stats State
  const [stats, setStats] = useState<PlayerStats>({
    hoursLogged: 0,
    targetHours: task.targetHours, // 40.0
    taskQuality: 100,
    energy: 100,
    morale: 80,
    lives: 3,
    score: 0,
    overtimeHours: 0,
    activePowerup: null,
    powerupTimer: 0,
    hiddenZonesFound: 0,
    lifeChoicesMade: 0,
    dayIndex: 0, // 0 = Monday
  });

  // Modal / Game Status states
  const [activeLifeEventId, setActiveLifeEventId] = useState<string | null>(null);
  const [isDayCleared, setIsDayCleared] = useState(false);
  const [isGameOver, setIsGameOver] = useState(false);
  const [gameOverReason, setGameOverReason] = useState('');
  const [isPaused, setIsPaused] = useState(false);
  const [showInstructions, setShowInstructions] = useState(false);
  const [isMuted, setIsMuted] = useState(sound.getMuted());

  // Input state
  const inputRef = useRef<GameInputState>({
    left: false,
    right: false,
    up: false,
    down: false,
    jump: false,
    jumpPressed: false,
    dash: false,
  });

  // Initialize Engine & Renderer
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Enable crisp pixelated scaling
    ctx.imageSmoothingEnabled = false;

    const renderer = new GameRenderer(ctx);
    rendererRef.current = renderer;

    const engine = new PlatformerEngine(stats, character);
    engineRef.current = engine;

    // Callbacks
    engine.onStatUpdate = (updated) => {
      setStats((prev) => {
        const next = { ...prev, ...updated };
        engine.updateStats(next);
        return next;
      });
    };

    engine.onTriggerLifeEvent = (eventId) => {
      sound.playEventChime();
      setActiveLifeEventId(eventId);
    };

    engine.onDayCompleted = () => {
      if (engine.stats.dayIndex >= 4 || engine.stats.hoursLogged >= 40) {
        // Friday finished or 40h fulfilled!
        onFinishVictory(engine.stats);
      } else {
        setIsDayCleared(true);
      }
    };

    engine.onGameOver = (reason) => {
      setGameOverReason(reason);
      setIsGameOver(true);
    };

    // Keyboard Listeners
    const handleKeyDown = (e: KeyboardEvent) => {
      // Prevent default scrolling for arrows/space
      if (['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'Space'].includes(e.code)) {
        e.preventDefault();
      }

      if (e.code === 'ArrowLeft' || e.code === 'KeyA') {
        inputRef.current.left = true;
      } else if (e.code === 'ArrowRight' || e.code === 'KeyD') {
        inputRef.current.right = true;
      } else if (e.code === 'ArrowUp' || e.code === 'KeyW') {
        inputRef.current.up = true;
      } else if (e.code === 'ArrowDown' || e.code === 'KeyS') {
        inputRef.current.down = true;
      } else if (e.code === 'Space' || e.code === 'KeyZ') {
        if (!inputRef.current.jump) {
          inputRef.current.jumpPressed = true;
        }
        inputRef.current.jump = true;
      } else if (e.code === 'ShiftLeft' || e.code === 'KeyX') {
        inputRef.current.dash = true;
      } else if (e.code === 'Escape') {
        setIsPaused((p) => !p);
      }
    };

    const handleKeyUp = (e: KeyboardEvent) => {
      if (e.code === 'ArrowLeft' || e.code === 'KeyA') {
        inputRef.current.left = false;
      } else if (e.code === 'ArrowRight' || e.code === 'KeyD') {
        inputRef.current.right = false;
      } else if (e.code === 'ArrowUp' || e.code === 'KeyW') {
        inputRef.current.up = false;
      } else if (e.code === 'ArrowDown' || e.code === 'KeyS') {
        inputRef.current.down = false;
      } else if (e.code === 'Space' || e.code === 'KeyZ') {
        inputRef.current.jump = false;
      } else if (e.code === 'ShiftLeft' || e.code === 'KeyX') {
        inputRef.current.dash = false;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);

    // Animation Game Loop
    let lastTime = performance.now();
    let animationFrameId: number;

    const gameLoop = (currentTime: number) => {
      const dt = Math.min((currentTime - lastTime) / 1000, 0.05); // Cap delta time to prevent tunneling
      lastTime = currentTime;

      const isModalOpen = !!activeLifeEventId || isDayCleared || isGameOver || isPaused;

      if (!isModalOpen && engineRef.current && rendererRef.current) {
        // Physics update
        engineRef.current.update(dt, inputRef.current);
        // Reset jumpPressed single frame trigger
        inputRef.current.jumpPressed = false;

        // Render Frame
        const eng = engineRef.current;
        const ren = rendererRef.current;
        const width = canvas.width;
        const height = canvas.height;

        ren.clear(width, height);
        ren.drawBackground(eng.currentLevel.theme, eng.cameraX, width, height, eng.gameTime);
        ren.drawTiles(eng.currentLevel.tiles, eng.cameraX, eng.cameraY, eng.gameTime, eng.stats.activePowerup);

        // Draw entities (enemies, items)
        eng.entities.forEach((ent) => {
          ren.drawEntity(ent, eng.cameraX, eng.cameraY, eng.gameTime);
        });

        // Draw Player
        ren.drawPlayer(eng.player, character, eng.cameraX, eng.cameraY, eng.gameTime);

        // Draw particles & floating text
        ren.drawParticles(eng.particles, eng.cameraX, eng.cameraY);
      }

      animationFrameId = requestAnimationFrame(gameLoop);
    };

    animationFrameId = requestAnimationFrame(gameLoop);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
      cancelAnimationFrame(animationFrameId);
    };
  }, [character, onFinishVictory]);

  // Handle choosing a life event option
  const handleSelectLifeEventOption = (option: LifeEventOption) => {
    setActiveLifeEventId(null);

    setStats((prev) => {
      const nextHours = Math.max(0, +(prev.hoursLogged + option.impactHours).toFixed(1));
      const nextQuality = Math.max(0, Math.min(100, prev.taskQuality + option.impactQuality));
      const nextMorale = Math.max(0, Math.min(100, prev.morale + option.impactMorale));
      const nextEnergy = Math.max(0, Math.min(100, prev.energy + option.impactEnergy));
      const nextOvertime = prev.overtimeHours + (option.overtimeNeeded || 0);

      const updated = {
        ...prev,
        hoursLogged: nextHours,
        taskQuality: nextQuality,
        morale: nextMorale,
        energy: nextEnergy,
        overtimeHours: nextOvertime,
        lifeChoicesMade: prev.lifeChoicesMade + 1,
      };

      engineRef.current?.updateStats(updated);

      // Check for quality failure
      if (nextQuality <= 0) {
        setIsGameOver(true);
        setGameOverReason('Work Task Quality dropped to 0% due to unmitigated blockers.');
      }

      return updated;
    });
  };

  // Next Day Progression
  const handleNextDay = () => {
    setIsDayCleared(false);
    const nextDayIdx = stats.dayIndex + 1;
    
    setStats((prev) => {
      const updated = {
        ...prev,
        dayIndex: nextDayIdx,
        energy: Math.min(100, prev.energy + 40), // Overnight rest restore
      };
      if (engineRef.current) {
        const nextLevel = getLevelByIndex(nextDayIdx, character);
        engineRef.current.stats = updated;
        engineRef.current.loadLevel(nextLevel);
      }
      return updated;
    });
  };

  const handleRetry = () => {
    setIsGameOver(false);
    setStats((prev) => {
      const reset = {
        ...prev,
        hoursLogged: 0,
        taskQuality: 100,
        energy: 100,
        morale: 80,
        lives: 3,
        dayIndex: 0,
      };
      if (engineRef.current) {
        engineRef.current.stats = reset;
        engineRef.current.loadLevel(getLevelByIndex(0, character));
      }
      return reset;
    });
  };

  const currentLevelDayName = engineRef.current?.currentLevel.dayName || 'Monday 09:00 AM - Kickoff';

  return (
    <div className="w-full max-w-5xl mx-auto flex flex-col items-center gap-3 p-2 sm:p-4">
      {/* Top HUD */}
      <GameHUD
        stats={stats}
        currentTask={task}
        character={character}
        playerName={playerName}
        dayName={currentLevelDayName}
        isMuted={isMuted}
        onToggleMute={() => setIsMuted(sound.toggleMute())}
        onPause={() => setIsPaused((p) => !p)}
        onOpenHelp={() => setShowInstructions(true)}
      />

      {/* Main Canvas Screen Wrapper with Arcade Bezel */}
      <div className="relative w-full aspect-[16/9] max-h-[540px] bg-[#5C94FC] rounded-lg overflow-hidden border-8 border-[#333333] ring-4 ring-black shadow-[6px_6px_0px_0px_rgba(0,0,0,0.9)]">
        <canvas
          id="mario-game-canvas"
          ref={canvasRef}
          width={800}
          height={450}
          className="w-full h-full object-contain pixelated block"
        />

        {/* Scanlines Overlay for authentic retro monitor vibes */}
        <div className="absolute inset-0 pointer-events-none bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%)] bg-[length:100%_4px] opacity-35" />

        {/* Pause Overlay */}
        {isPaused && (
          <div className="absolute inset-0 bg-black/85 backdrop-blur-sm flex flex-col items-center justify-center p-4 font-pixel text-white gap-5 z-20">
            <div className="text-center flex flex-col items-center gap-1">
              <span className="text-[#FFD700] text-xs uppercase tracking-widest">[ SPRINT PAUSED ]</span>
              <h2 className="text-2xl font-bold text-white mt-1 drop-shadow-[2px_2px_0px_rgba(0,0,0,1)]">GAME PAUSED</h2>
            </div>
            
            <div className="flex gap-4">
              <button
                id="resume-btn"
                onClick={() => setIsPaused(false)}
                className="px-6 py-3 bg-[#FFD700] hover:bg-yellow-300 text-black font-bold text-xs rounded border-4 border-black shadow-[3px_3px_0px_0px_rgba(0,0,0,0.9)] transition-transform active:scale-95 cursor-pointer"
              >
                RESUME
              </button>
              <button
                id="exit-to-title-btn"
                onClick={onExitToTitle}
                className="px-6 py-3 bg-[#E52521] hover:bg-red-500 text-white font-bold text-xs rounded border-4 border-black shadow-[3px_3px_0px_0px_rgba(0,0,0,0.9)] transition-transform active:scale-95 cursor-pointer"
              >
                QUIT SPRINT
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Virtual Touch Controls for Mobile / Tablet */}
      <div className="w-full max-w-3xl">
        <TouchControls onInputStateChange={(updater) => {
          inputRef.current = updater(inputRef.current);
        }} />
      </div>

      {/* Modals */}
      {activeLifeEventId && LIFE_EVENTS[activeLifeEventId] && (
        <LifeEventModal
          event={LIFE_EVENTS[activeLifeEventId]}
          onSelectOption={handleSelectLifeEventOption}
        />
      )}

      {isDayCleared && (
        <LevelCompleteModal
          stats={stats}
          task={task}
          dayIndex={stats.dayIndex}
          onNextDay={handleNextDay}
        />
      )}

      {isGameOver && (
        <GameOverModal
          reason={gameOverReason}
          stats={stats}
          task={task}
          onRetry={handleRetry}
        />
      )}

      {showInstructions && (
        <InstructionsModal onClose={() => setShowInstructions(false)} />
      )}
    </div>
  );
};
