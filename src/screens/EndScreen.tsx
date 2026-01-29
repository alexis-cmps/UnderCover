import { Button, Card } from "../components";
import { useGame } from "../store/game";

/**
 * Écran de fin de partie.
 * Affiche le résultat et permet de rejouer.
 */
export function EndScreen() {
  const players = useGame((s) => s.players);
  const winnerText = useGame((s) => s.winnerText);
  const words = useGame((s) => s.words);
  const reset = useGame((s) => s.reset);
  const restartWithSamePlayers = useGame((s) => s.restartWithSamePlayers);
  const setPhase = useGame((s) => s.setPhase);

  const handleNewGame = () => {
    reset();
    setPhase("HOME");
  };

  const handleReplayWithSamePlayers = () => {
    restartWithSamePlayers();
  };

  const getWinnerEmoji = () => {
    if (winnerText?.includes("civils")) return "🟢";
    if (winnerText?.includes("Undercover")) return "🔴";
    if (winnerText?.includes("White")) return "⚪";
    return "🎉";
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-neutral-950 via-blue-950/20 to-purple-950/20 p-4 flex items-center justify-center">
      <div className="max-w-md w-full">
        <Card className="text-center mb-6 bg-gradient-to-br from-neutral-800/50 to-neutral-800/30 backdrop-blur border-neutral-700/50">
          <div className="text-7xl mb-6 animate-bounce">{getWinnerEmoji()}</div>
          
          <h1 className="text-4xl font-bold mb-6 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
            Partie terminée !
          </h1>

          {winnerText && (
            <div className="mb-8 p-6 bg-gradient-to-r from-blue-900/30 to-purple-900/30 rounded-2xl border border-blue-700/30">
              <p className="text-3xl font-bold text-blue-300">
                {winnerText}
              </p>
            </div>
          )}

          {words && (
            <div className="mb-8 p-6 bg-neutral-900/50 rounded-2xl border border-neutral-700/50">
              <h2 className="text-sm font-semibold text-neutral-400 mb-4">
                Les mots de la partie
              </h2>
              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 bg-green-900/20 rounded-xl border border-green-700/30">
                  <span className="text-green-400 font-semibold">🟢 Civil</span>
                  <span className="text-xl font-bold">{words.civilian}</span>
                </div>
                <div className="flex items-center justify-between p-3 bg-red-900/20 rounded-xl border border-red-700/30">
                  <span className="text-red-400 font-semibold">🔴 Undercover</span>
                  <span className="text-xl font-bold">{words.undercover}</span>
                </div>
              </div>
            </div>
          )}

          <div className="mb-8">
            <h2 className="text-sm font-semibold text-neutral-400 mb-4">
              Rôles révélés
            </h2>
            <ul className="space-y-2">
              {players.map((p) => (
                <li
                  key={p.id}
                  className={`flex items-center justify-between p-3 rounded-xl border transition-all ${
                    p.alive
                      ? "bg-neutral-800/50 border-neutral-700/50"
                      : "bg-neutral-900/30 border-neutral-800/30 opacity-60"
                  }`}
                >
                  <span className={p.alive ? "" : "line-through"}>
                    {p.name}
                  </span>
                  <div className="flex items-center gap-2">
                    {!p.alive && <span className="text-xs text-neutral-500">💀</span>}
                    <span className="text-xl">
                      {p.role === "CIVIL" && "🟢"}
                      {p.role === "UNDERCOVER" && "🔴"}
                      {p.role === "WHITE" && "⚪"}
                    </span>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          <div className="space-y-3">
            <Button 
              fullWidth 
              onClick={handleReplayWithSamePlayers}
              className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-500 hover:to-emerald-500 text-lg py-4"
            >
              🔄 Rejouer (mêmes joueurs)
            </Button>
            <Button 
              fullWidth 
              onClick={handleNewGame}
              className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-lg py-4"
            >
              ✨ Nouvelle partie
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
}
