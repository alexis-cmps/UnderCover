import { useState } from "react";
import { Button, Card, Modal } from "../components";
import { useGame } from "../store/game";

/**
 * Écran de révélation des rôles (pass-the-phone).
 * Anti-spoiler: affiche le rôle une seule fois, puis demande confirmation.
 */
export function RevealScreen() {
  const players = useGame((s) => s.players);
  const words = useGame((s) => s.words);
  const revealIndex = useGame((s) => s.revealIndex);
  const nextReveal = useGame((s) => s.nextReveal);

  const [revealed, setRevealed] = useState(false);
  const [showTransition, setShowTransition] = useState(false);

  const currentPlayer = players[revealIndex];

  if (!currentPlayer || !words) return null;

  const handleReveal = () => {
    setRevealed(true);
  };

  const handleNext = () => {
    setRevealed(false);
    setShowTransition(true);
  };

  const handleContinue = () => {
    setShowTransition(false);
    nextReveal();
  };

  const getWord = () => {
    switch (currentPlayer.role) {
      case "CIVIL":
        return words.civilian;
      case "UNDERCOVER":
        return words.undercover;
      case "WHITE":
        return null;
    }
  };

  const getRoleConfig = () => {
    switch (currentPlayer.role) {
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

  const word = getWord();
  const roleConfig = getRoleConfig();

  return (
    <div className="min-h-screen bg-gradient-to-br from-neutral-950 via-neutral-900 to-neutral-950 p-4 flex items-center justify-center">
      <div className="max-w-md w-full">
        {!revealed ? (
          <Card className="text-center bg-gradient-to-br from-neutral-800/50 to-neutral-800/30 backdrop-blur border-neutral-700/50">
            <div className="mb-6">
              <div className="text-6xl mb-4 animate-pulse">📱</div>
            </div>
            <h2 className="text-2xl font-bold mb-4 text-neutral-300">
              Passez le téléphone à
            </h2>
            <p className="text-4xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent mb-6">
              {currentPlayer.name}
            </p>
            <p className="text-neutral-400 mb-8 text-sm">
              ⚠️ Personne d'autre ne doit regarder l'écran
            </p>
            <Button 
              fullWidth 
              onClick={handleReveal}
              className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500"
            >
              👁️ Voir mon rôle
            </Button>
          </Card>
        ) : (
          <Card className={`text-center bg-gradient-to-br ${roleConfig.bg} backdrop-blur border-neutral-700/50`}>
            <h2 className="text-lg font-semibold mb-3 text-neutral-400">
              Votre rôle
            </h2>
            <p className={`text-4xl font-bold mb-8 bg-gradient-to-r ${roleConfig.gradient} bg-clip-text text-transparent`}>
              {roleConfig.text}
            </p>

            {word ? (
              <>
                <h3 className="text-md font-semibold mb-3 text-neutral-400">
                  Votre mot secret
                </h3>
                <div className="mb-8 p-6 bg-neutral-900/50 rounded-2xl border-2 border-neutral-700/50">
                  <p className="text-5xl font-bold text-blue-400">
                    {word}
                  </p>
                </div>
              </>
            ) : (
              <div className="mb-8 p-6 bg-neutral-900/50 rounded-2xl border-2 border-neutral-700/50">
                <p className="text-lg text-neutral-300 mb-2">
                  Vous n'avez pas de mot
                </p>
                <p className="text-sm text-neutral-500">
                  Vous devez deviner le mot des civils !
                </p>
              </div>
            )}

            <p className="text-sm text-neutral-500 mb-6">
              💡 Mémorisez bien ces informations
            </p>

            <Button 
              fullWidth 
              onClick={handleNext}
              className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-500 hover:to-emerald-500"
            >
              ✓ J'ai mémorisé
            </Button>
          </Card>
        )}
      </div>

      <Modal
        isOpen={showTransition}
        onClose={() => {}}
        title="Prêt pour le suivant ?"
        footer={
          <Button 
            fullWidth 
            onClick={handleContinue}
            className="bg-gradient-to-r from-blue-600 to-purple-600"
          >
            Continuer →
          </Button>
        }
      >
        <p className="text-neutral-300 text-center">
          Assurez-vous que personne d'autre ne regarde l'écran avant de
          continuer.
        </p>
      </Modal>
    </div>
  );
}
