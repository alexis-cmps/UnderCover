import { useState } from "react";
import { Button, Card, Input } from "../components";
import { useGame } from "../store/game";

/**
 * Écran de guess de Mr.White.
 * Si Mr.White est éliminé, il a une chance de deviner le mot des civils.
 */
export function WhiteGuessScreen() {
  const [guess, setGuess] = useState("");
  const words = useGame((s) => s.words);
  const whiteGuess = useGame((s) => s.whiteGuess);
  const eliminatedPlayerId = useGame((s) => s.eliminatedPlayerId);
  const players = useGame((s) => s.players);

  const whitePlayer = players.find((p) => p.id === eliminatedPlayerId);

  if (!whitePlayer || !words) return null;

  const handleSubmit = () => {
    if (guess.trim().length > 0) {
      whiteGuess(guess);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSubmit();
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-neutral-950 via-neutral-900 to-neutral-950 p-4 flex items-center justify-center">
      <div className="max-w-md w-full">
        <Card className="text-center bg-gradient-to-br from-neutral-800/30 to-neutral-900/20 backdrop-blur border-neutral-700/50">
          <div className="text-7xl mb-6 animate-pulse">⚪️</div>
          
          <h2 className="text-3xl font-bold mb-4 bg-gradient-to-r from-neutral-200 to-neutral-400 bg-clip-text text-transparent">
            Mr.White éliminé
          </h2>

          <p className="text-2xl mb-8 text-neutral-300">
            {whitePlayer.name}
          </p>

          <div className="mb-8 p-6 bg-gradient-to-r from-yellow-900/20 to-orange-900/20 rounded-2xl border border-yellow-700/30">
            <p className="text-lg text-yellow-300 mb-2 font-semibold">
              🎯 Dernière chance !
            </p>
            <p className="text-sm text-neutral-400">
              Devinez le mot des civils pour gagner immédiatement
            </p>
          </div>

          <Input
            placeholder="Votre réponse..."
            value={guess}
            onChange={(e) => setGuess(e.target.value)}
            onKeyDown={handleKeyDown}
            className="mb-6 text-center text-xl"
          />

          <Button
            fullWidth
            onClick={handleSubmit}
            disabled={guess.trim().length === 0}
            className="bg-gradient-to-r from-yellow-600 to-orange-600 hover:from-yellow-500 hover:to-orange-500 text-lg py-4"
          >
            ✓ Valider ma réponse
          </Button>
        </Card>
      </div>
    </div>
  );
}
