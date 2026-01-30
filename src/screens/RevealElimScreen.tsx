import { Button, Card } from "../components";
import { useGame } from "../store/game";

/**
 * Écran de révélation de l'élimination.
 * Affiche qui a été éliminé et son rôle.
 */
export function RevealElimScreen() {
  const players = useGame((s) => s.players);
  const eliminatedPlayerId = useGame((s) => s.eliminatedPlayerId);
  const setPhase = useGame((s) => s.setPhase);

  const eliminatedPlayer = players.find((p) => p.id === eliminatedPlayerId);

  if (!eliminatedPlayer) return null;

  const getRoleConfig = () => {
    switch (eliminatedPlayer.role) {
      case "CIVIL":
        return {
          text: "Civil 🟢",
          gradient: "from-green-500 to-emerald-500",
          bg: "from-green-900/30 to-emerald-900/20",
        };
      case "UNDERCOVER":
        return {
          text: "Undercover 🔴",
          gradient: "from-red-500 to-rose-500",
          bg: "from-red-900/30 to-rose-900/20",
        };
      case "WHITE":
        return {
          text: "Mr.White ⚪️",
          gradient: "from-neutral-200 to-neutral-400",
          bg: "from-neutral-800/30 to-neutral-900/20",
        };
    }
  };

  const roleConfig = getRoleConfig();

  const handleContinue = () => {
    // Retourner à la phase de vote pour le prochain tour
    setPhase("VOTE");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-neutral-950 via-neutral-900 to-neutral-950 p-6 md:p-8 flex items-center justify-center">
      <div className="max-w-md w-full">
        <Card className={`text-center bg-gradient-to-br ${roleConfig.bg} backdrop-blur border-neutral-700/50`}>
          <div className="text-6xl mb-6">🚫</div>
          
          <h2 className="text-2xl font-bold mb-6 text-neutral-300">
            Joueur éliminé
          </h2>

          <p className="text-4xl font-bold text-red-400 mb-6">
            {eliminatedPlayer.name}
          </p>

          <div className="mb-8 p-6 bg-neutral-900/50 rounded-2xl border border-neutral-700/50">
            <p className="text-sm text-neutral-500 mb-2">Était</p>
            <p className={`text-3xl font-bold bg-gradient-to-r ${roleConfig.gradient} bg-clip-text text-transparent`}>
              {roleConfig.text}
            </p>
          </div>

          <p className="text-neutral-400 mb-8">
            La partie continue. Passez au vote.
          </p>

          <Button 
            fullWidth 
            onClick={handleContinue}
            className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500"
          >
            Continuer →
          </Button>
        </Card>
      </div>
    </div>
  );
}
