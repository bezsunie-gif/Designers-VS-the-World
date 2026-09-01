import React, { useState } from 'react';
import { GameState, CharacterProfile, CharacterType, PlayerStats, WorkTask } from './types/game';
import { CHARACTERS, WORK_TASKS } from './data/gameData';
import { WorkTaskBriefing } from './components/WorkTaskBriefing';
import { GameCanvas } from './components/GameCanvas';
import { VictoryReportModal } from './components/VictoryReportModal';
import { InstructionsModal } from './components/InstructionsModal';
import { sound } from './audio/soundEngine';

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<'briefing' | 'playing' | 'victory'>('briefing');
  const [selectedTask, setSelectedTask] = useState<WorkTask>(WORK_TASKS[0]);
  const [selectedCharId, setSelectedCharId] = useState<CharacterType>('structure_designer');
  const [playerName, setPlayerName] = useState<string>(() => {
    return localStorage.getItem('odyssey_player_name') || 'Alex Rivera';
  });
  const [finalStats, setFinalStats] = useState<PlayerStats | null>(null);
  const [showGlobalGuide, setShowGlobalGuide] = useState(false);

  const selectedCharacterProfile = 
    CHARACTERS.find((c) => c.id === selectedCharId) || CHARACTERS[0];

  const handleStartGame = (task: WorkTask, char: CharacterType, name: string) => {
    setSelectedTask(task);
    setSelectedCharId(char);
    setPlayerName(name);
    setCurrentScreen('playing');
  };

  const handleFinishVictory = (stats: PlayerStats) => {
    setFinalStats(stats);
    setCurrentScreen('victory');
  };

  const handleRestart = () => {
    setFinalStats(null);
    setCurrentScreen('briefing');
  };

  return (
    <main className="min-h-screen bg-zinc-950 text-zinc-100 flex flex-col items-center justify-center p-2 sm:p-4 selection:bg-amber-500 selection:text-zinc-950">
      {currentScreen === 'briefing' && (
        <WorkTaskBriefing
          onStartGame={handleStartGame}
          onOpenGuide={() => setShowGlobalGuide(true)}
        />
      )}

      {currentScreen === 'playing' && (
        <GameCanvas
          task={selectedTask}
          character={selectedCharId}
          playerName={playerName}
          onFinishVictory={handleFinishVictory}
          onExitToTitle={handleRestart}
        />
      )}

      {currentScreen === 'victory' && finalStats && (
        <VictoryReportModal
          stats={finalStats}
          task={selectedTask}
          character={selectedCharacterProfile}
          playerName={playerName}
          onRestart={handleRestart}
        />
      )}

      {showGlobalGuide && (
        <InstructionsModal onClose={() => setShowGlobalGuide(false)} />
      )}
    </main>
  );
}
