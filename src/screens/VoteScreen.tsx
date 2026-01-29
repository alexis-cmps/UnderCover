import { Card } from "../components";
import { useGame } from "../store/game";

/**
 * Écran de phase vote.
 * On choisit directement qui éliminer.
 */
export function VoteScreen() {
  const players = useGame((s) => s.players);
  const eliminatePlayer = useGame((s) => s.eliminatePlayer);

  const alivePlayers = players.filter((p) => p.alive);

  return (
    <div className="min-h-screen bg-gradient-to-br from-neutral-950 via-neutral-900 to-neutral-950 p-4 flex items-center justify-center">
      <div className="max-w-md w-full">
        <div className="text-center mb-6">
          <div className="text-6xl mb-4">🗳️</div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent mb-2">
            Phase de vote
          </h1>
          <p className="text-neutral-400">
            Qui voulez-vous éliminer ?
          </p>
        </div>

        <Card className="bg-gradient-to-br from-neutral-800/50 to-neutral-800/30 backdrop-blur border-neutral-700/50">
          <div className="space-y-3">
            {alivePlayers.map((p) => (
              <button
                key={p.id}
                onClick={() => eliminatePlayer(p.id)}
                className="
                  w-full p-4 rounded-xl text-left transition-all transform
                  bg-gradient-to-r from-purple-900/30 to-pink-900/20 
                  hover:from-purple-600 hover:to-pink-600 
                  text-white hover:scale-105 shadow-lg
                  border border-purple-700/30 hover:border-purple-500
                "
              >
                <span className="font-medium text-lg">{p.name}</span>
              </button>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}
