import React, { useState, useEffect } from 'react';
import { Trophy, Award, CheckCircle, RotateCcw, Sparkles, Heart, Zap, Coffee, Star, ShieldCheck, User, Medal, Crown, Flame } from 'lucide-react';
import { CharacterProfile, PlayerStats, ScoreboardEntry, WorkTask } from '../types/game';
import { INITIAL_LEADERBOARD } from '../data/gameData';
import { sound } from '../audio/soundEngine';

interface VictoryReportModalProps {
  stats: PlayerStats;
  task: WorkTask;
  character: CharacterProfile;
  playerName: string;
  onRestart: () => void;
}

export const VictoryReportModal: React.FC<VictoryReportModalProps> = ({
  stats,
  task,
  character,
  playerName,
  onRestart,
}) => {
  const [activeTab, setActiveTab] = useState<'report' | 'scoreboard'>('report');
  const [leaderboard, setLeaderboard] = useState<ScoreboardEntry[]>([]);
  const [currentPlayerId, setCurrentPlayerId] = useState<string>('');

  // Calculate Final Performance Grade
  const hoursMet = stats.hoursLogged >= 39.5;
  const highQuality = stats.taskQuality >= 80;
  const goodMorale = stats.morale >= 50;

  let grade = 'B';
  let gradeColor = 'text-[#FFD700] border-[#FFD700] bg-[#FFD700]/20';
  let title = 'Solid 40-Hour Delivery';
  let evaluation = 'You successfully juggled heavy real-life demands while keeping the sprint on track!';

  if (hoursMet && highQuality && goodMorale) {
    grade = 'A+';
    gradeColor = 'text-[#22c55e] border-[#22c55e] bg-[#22c55e]/20';
    title = 'Master of Work-Life Harmony';
    evaluation = 'Phenomenal performance! You achieved the full 40 hours of productive delivery without sacrificing design quality or personal health.';
  } else if (hoursMet && highQuality) {
    grade = 'A';
    gradeColor = 'text-[#22c55e] border-[#22c55e] bg-[#22c55e]/20';
    title = 'High-Precision Designer';
    evaluation = 'The work product was delivered with exceptional architectural precision right on schedule!';
  } else if (!hoursMet) {
    grade = 'C+';
    gradeColor = 'text-[#E76E33] border-[#E76E33] bg-[#E76E33]/20';
    title = 'Sprint Incomplete (Under 40h)';
    evaluation = 'Life events took priority, but sprint hours fell slightly short of the 40-hour requirement.';
  }

  // Badges Earned
  const badges: { title: string; desc: string; icon: any }[] = [];
  if (stats.hoursLogged >= 40) {
    badges.push({ title: '40-Hour Champion', desc: 'Completed full work week target', icon: Trophy });
  }
  if (stats.taskQuality >= 85) {
    badges.push({ title: 'Pristine Quality', desc: 'Delivered >= 85% task quality', icon: ShieldCheck });
  }
  if (stats.hiddenZonesFound > 0) {
    badges.push({ title: 'Secret Explorer', desc: `Found ${stats.hiddenZonesFound} secret warp zones`, icon: Star });
  }
  if (stats.morale >= 60) {
    badges.push({ title: 'Zen Mindset', desc: 'Maintained high morale amidst chaos', icon: Sparkles });
  }

  // Load and Record to Scoreboard
  useEffect(() => {
    try {
      const stored = localStorage.getItem('odyssey_scoreboard');
      let existingList: ScoreboardEntry[] = stored ? JSON.parse(stored) : INITIAL_LEADERBOARD;

      const newId = `run_${Date.now()}`;
      setCurrentPlayerId(newId);

      const currentEntry: ScoreboardEntry = {
        id: newId,
        playerName: playerName.trim() || 'Lead Designer',
        role: character.name,
        characterRole: character.name,
        characterType: character.id,
        score: stats.score,
        hoursLogged: stats.hoursLogged,
        quality: stats.taskQuality,
        taskQuality: stats.taskQuality,
        grade,
        date: new Date().toLocaleDateString(undefined, { month: 'short', day: 'numeric' }),
      };

      const merged = [currentEntry, ...existingList.filter((e) => e.id !== newId)];
      merged.sort((a, b) => b.score - a.score);

      const topEntries = merged.slice(0, 10);
      setLeaderboard(topEntries);
      localStorage.setItem('odyssey_scoreboard', JSON.stringify(topEntries));
    } catch {
      setLeaderboard(INITIAL_LEADERBOARD);
    }
  }, [stats.score, stats.hoursLogged, stats.taskQuality, grade, playerName, character]);

  const playerRankIndex = leaderboard.findIndex((e) => e.id === currentPlayerId);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/90 backdrop-blur-md animate-in fade-in zoom-in-95 duration-300">
      <div className="w-full max-w-2xl bg-[#222222] border-4 border-black rounded-lg p-4 sm:p-6 shadow-[6px_6px_0px_0px_rgba(0,0,0,0.95)] font-pixel text-white flex flex-col gap-4 max-h-[92vh] overflow-y-auto">
        
        {/* Top Victory Header */}
        <div className="text-center flex flex-col items-center gap-1.5 border-b-2 border-black pb-3">
          <div className="w-11 h-11 rounded bg-[#FFD700] border-2 border-black flex items-center justify-center shadow-[2px_2px_0px_0px_rgba(0,0,0,0.8)] text-black">
            <Crown className="w-6 h-6" />
          </div>
          
          <div className="inline-block px-2.5 py-0.5 bg-[#FFD700] text-black text-[9px] font-bold tracking-widest uppercase border-2 border-black rounded shadow-[2px_2px_0px_0px_rgba(0,0,0,0.8)]">
            40-HOUR SPRINT COMPLETED
          </div>

          <h1 className="text-lg sm:text-2xl font-bold text-white tracking-wide">
            {title}
          </h1>

          <div className="flex items-center gap-2 text-xs font-retro text-zinc-300">
            <span className="text-[#5C94FC] font-bold">DESIGNER: {playerName.toUpperCase()}</span>
            <span>•</span>
            <span className="text-[#FFD700]">{character.name}</span>
          </div>
        </div>

        {/* Tab Navigation: Sprint Report vs. Scoreboard */}
        <div className="grid grid-cols-2 gap-2">
          <button
            id="tab-report-btn"
            onClick={() => {
              sound.playSelect();
              setActiveTab('report');
            }}
            className={`py-2 px-3 rounded border-2 text-xs font-bold transition-all cursor-pointer flex items-center justify-center gap-2 ${
              activeTab === 'report'
                ? 'bg-[#5C94FC] border-black text-white shadow-[2px_2px_0px_0px_rgba(0,0,0,0.9)]'
                : 'bg-[#18181b] border-black text-zinc-400 hover:bg-[#27272a]'
            }`}
          >
            <Award className="w-4 h-4" />
            <span>SPRINT EVALUATION</span>
          </button>

          <button
            id="tab-scoreboard-btn"
            onClick={() => {
              sound.playSelect();
              setActiveTab('scoreboard');
            }}
            className={`py-2 px-3 rounded border-2 text-xs font-bold transition-all cursor-pointer flex items-center justify-center gap-2 ${
              activeTab === 'scoreboard'
                ? 'bg-[#FFD700] border-black text-black shadow-[2px_2px_0px_0px_rgba(0,0,0,0.9)]'
                : 'bg-[#18181b] border-black text-zinc-400 hover:bg-[#27272a]'
            }`}
          >
            <Trophy className="w-4 h-4" />
            <span>HALL OF FAME SCOREBOARD</span>
          </button>
        </div>

        {/* Tab Content: Sprint Report */}
        {activeTab === 'report' && (
          <div className="flex flex-col gap-4 animate-in fade-in duration-200">
            {/* Grade Banner */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-3 bg-[#18181b] p-3.5 rounded-lg border-2 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,0.6)]">
              <div className="flex items-center gap-3">
                <div className={`w-14 h-14 rounded border-2 border-black flex items-center justify-center text-2xl sm:text-3xl font-bold ${gradeColor} shadow-[2px_2px_0px_0px_rgba(0,0,0,0.8)]`}>
                  {grade}
                </div>
                <div>
                  <div className="text-xs font-bold text-white flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-[#FFD700]" />
                    <span>PERFORMANCE EVALUATION</span>
                  </div>
                  <p className="text-xs font-retro text-zinc-300 mt-1 max-w-sm">
                    {evaluation}
                  </p>
                </div>
              </div>
              <div className="text-center sm:text-right">
                <div className="text-[9px] text-zinc-400 font-retro">TOTAL SPRINT SCORE</div>
                <div className="text-sm sm:text-base font-bold text-[#FFD700]">{stats.score.toLocaleString()} PTS</div>
                {playerRankIndex !== -1 && (
                  <div className="text-[10px] text-[#5C94FC] font-retro mt-0.5">
                    Scoreboard Rank #{playerRankIndex + 1}
                  </div>
                )}
              </div>
            </div>

            {/* Core Metrics Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              <div className="bg-[#18181b] p-2.5 rounded border-2 border-black text-center shadow-[2px_2px_0px_0px_rgba(0,0,0,0.6)]">
                <div className="text-[9px] text-zinc-400 font-retro">HOURS LOGGED</div>
                <div className={`text-xs sm:text-sm font-bold mt-1 ${hoursMet ? 'text-[#22c55e]' : 'text-[#FFD700]'}`}>
                  {stats.hoursLogged.toFixed(1)} / 40.0h
                </div>
              </div>

              <div className="bg-[#18181b] p-2.5 rounded border-2 border-black text-center shadow-[2px_2px_0px_0px_rgba(0,0,0,0.6)]">
                <div className="text-[9px] text-zinc-400 font-retro">DESIGN QUALITY</div>
                <div className="text-xs sm:text-sm font-bold text-[#22c55e] mt-1">
                  {stats.taskQuality}%
                </div>
              </div>

              <div className="bg-[#18181b] p-2.5 rounded border-2 border-black text-center shadow-[2px_2px_0px_0px_rgba(0,0,0,0.6)]">
                <div className="text-[9px] text-zinc-400 font-retro">ENERGY BALANCE</div>
                <div className="text-xs sm:text-sm font-bold text-teal-400 mt-1">
                  {Math.round(stats.energy)}%
                </div>
              </div>

              <div className="bg-[#18181b] p-2.5 rounded border-2 border-black text-center shadow-[2px_2px_0px_0px_rgba(0,0,0,0.6)]">
                <div className="text-[9px] text-zinc-400 font-retro">MORALE INDEX</div>
                <div className="text-xs sm:text-sm font-bold text-pink-400 mt-1">
                  {Math.round(stats.morale)}%
                </div>
              </div>
            </div>

            {/* Unlocked Badges */}
            {badges.length > 0 && (
              <div className="flex flex-col gap-1.5">
                <div className="text-[10px] text-[#FFD700] font-bold uppercase tracking-wider">
                  Earned Badges & Achievements:
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {badges.map((b, idx) => (
                    <div
                      key={idx}
                      className="bg-[#18181b] p-2 rounded border-2 border-black flex items-center gap-2.5 shadow-[2px_2px_0px_0px_rgba(0,0,0,0.6)]"
                    >
                      <div className="p-1 bg-[#FFD700] border-2 border-black rounded shadow-[1px_1px_0px_0px_rgba(0,0,0,0.8)] text-black">
                        <b.icon className="w-3.5 h-3.5" />
                      </div>
                      <div>
                        <div className="text-xs font-bold text-white">{b.title}</div>
                        <div className="text-[10px] font-retro text-zinc-400">{b.desc}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {/* Tab Content: Studio Scoreboard */}
        {activeTab === 'scoreboard' && (
          <div className="flex flex-col gap-3 animate-in fade-in duration-200">
            <div className="flex items-center justify-between text-xs text-zinc-300 font-retro px-1">
              <span className="text-[#FFD700] font-bold">ALL-TIME SPRINT HIGH SCORES</span>
              <span>Goal: 40 Hours</span>
            </div>

            <div className="bg-[#18181b] border-2 border-black rounded-lg overflow-hidden shadow-[2px_2px_0px_0px_rgba(0,0,0,0.6)]">
              {/* Scoreboard Header */}
              <div className="grid grid-cols-12 gap-1 bg-[#111111] p-2 border-b-2 border-black text-[9px] font-bold text-zinc-400">
                <div className="col-span-1 text-center">#</div>
                <div className="col-span-4">DESIGNER</div>
                <div className="col-span-3">ROLE</div>
                <div className="col-span-2 text-right">HOURS</div>
                <div className="col-span-2 text-right">SCORE</div>
              </div>

              {/* Scoreboard Rows */}
              <div className="divide-y divide-zinc-800">
                {leaderboard.map((entry, idx) => {
                  const isCurrent = entry.id === currentPlayerId;
                  const rank = idx + 1;
                  return (
                    <div
                      key={entry.id || idx}
                      className={`grid grid-cols-12 gap-1 items-center p-2 text-xs transition-colors ${
                        isCurrent
                          ? 'bg-[#5C94FC]/25 text-white font-bold border-l-4 border-l-[#FFD700]'
                          : 'text-zinc-300 hover:bg-zinc-800/40'
                      }`}
                    >
                      {/* Rank */}
                      <div className="col-span-1 text-center font-pixel">
                        {rank === 1 ? (
                          <span className="inline-block px-1 bg-[#FFD700] text-black text-[9px] rounded font-bold">1</span>
                        ) : rank === 2 ? (
                          <span className="inline-block px-1 bg-zinc-300 text-black text-[9px] rounded font-bold">2</span>
                        ) : rank === 3 ? (
                          <span className="inline-block px-1 bg-[#E76E33] text-white text-[9px] rounded font-bold">3</span>
                        ) : (
                          <span className="text-zinc-500 font-retro">{rank}</span>
                        )}
                      </div>

                      {/* Name */}
                      <div className="col-span-4 flex items-center gap-1.5 truncate">
                        <span className="font-bold truncate">{entry.playerName}</span>
                        {isCurrent && (
                          <span className="text-[8px] bg-[#FFD700] text-black px-1 rounded font-bold shrink-0">
                            YOU
                          </span>
                        )}
                      </div>

                      {/* Role */}
                      <div className="col-span-3 text-[10px] font-retro text-zinc-400 truncate">
                        {entry.characterRole}
                      </div>

                      {/* Hours */}
                      <div className="col-span-2 text-right font-retro text-[11px] text-zinc-300">
                        {entry.hoursLogged.toFixed(1)}h
                      </div>

                      {/* Score */}
                      <div className="col-span-2 text-right font-bold text-[#FFD700]">
                        {entry.score.toLocaleString()}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        {/* Restart Action Button */}
        <div className="pt-2 border-t-2 border-black">
          <button
            id="restart-game-btn"
            onClick={() => {
              sound.playSelect();
              onRestart();
            }}
            className="w-full py-3.5 bg-[#FFD700] hover:bg-yellow-300 active:bg-yellow-500 text-black font-bold text-xs sm:text-sm rounded border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,0.9)] transition-transform active:scale-95 flex items-center justify-center gap-2 cursor-pointer"
          >
            <RotateCcw className="w-4 h-4 stroke-[3]" />
            <span>START NEW 40-HOUR SPRINT / CHANGE AVATAR</span>
          </button>
        </div>
      </div>
    </div>
  );
};
