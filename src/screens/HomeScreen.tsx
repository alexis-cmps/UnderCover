import { Button } from "../components";
import { useGame } from "../store/game";

/**
 * Écran d'accueil - point d'entrée de l'application.
 */
export function HomeScreen() {
  const setPhase = useGame((s) => s.setPhase);

  return (
    <div className="min-h-screen bg-gradient-to-br from-neutral-950 via-blue-950/20 to-purple-950/20 flex items-center justify-center p-4">
      <div className="text-center max-w-md w-full">
        <div className="mb-8 animate-bounce">
          <h1 className="text-8xl mb-4">🕵️</h1>
        </div>
        <h2 className="text-5xl font-bold mb-4 bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
          Undercover
        </h2>
        <p className="text-neutral-400 mb-12 text-lg">
          Jeu de société pass-the-phone
        </p>
        <Button 
          fullWidth 
          onClick={() => setPhase("PLAYERS")}
          className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-lg py-4 shadow-2xl shadow-blue-500/30 hover:scale-105 transition-transform"
        >
          ✨ Nouvelle partie
        </Button>
      </div>
    </div>
  );
}
