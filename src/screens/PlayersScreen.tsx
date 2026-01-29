import { useState } from "react";
import { Button, Card, Input } from "../components";
import { useGame } from "../store/game";

/**
 * Écran de configuration des joueurs.
 * Permet d'ajouter/supprimer des joueurs, configurer les rôles et démarrer la partie.
 */
export function PlayersScreen() {
  const [name, setName] = useState("");
  const players = useGame((s) => s.players);
  const settings = useGame((s) => s.settings);
  const addPlayer = useGame((s) => s.addPlayer);
  const removePlayer = useGame((s) => s.removePlayer);
  const updateSettings = useGame((s) => s.updateSettings);
  const startGame = useGame((s) => s.startGame);

  const handleAdd = () => {
    if (name.trim().length > 0) {
      addPlayer(name);
      setName("");
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleAdd();
    }
  };

  const maxUndercover = Math.max(1, Math.floor(players.length / 2) - 1);
  const maxWhite = Math.max(1, Math.floor(players.length / 3));
  const canStart = players.length >= 3;

  return (
    <div className="min-h-screen bg-gradient-to-br from-neutral-950 via-neutral-900 to-neutral-950 p-4 flex items-center justify-center">
      <div className="max-w-2xl w-full">
        <div className="text-center mb-6">
          <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent mb-2">
            Configuration
          </h1>
          <p className="text-neutral-400 text-sm md:text-base">Créez votre partie Undercover</p>
        </div>

        {/* Configuration visible en permanence */}
        <Card className="mb-6 bg-gradient-to-br from-blue-900/20 to-purple-900/20 backdrop-blur border-blue-700/30">
          <h2 className="text-sm font-semibold mb-4 text-center text-neutral-400">
            Configuration de la partie
          </h2>
          <div className="flex items-center justify-around">
            <div className="text-center">
              <div className="text-2xl md:text-3xl mb-1">🔴</div>
              <div className="text-xl md:text-2xl font-bold text-red-400">{settings.undercoverCount}</div>
              <div className="text-xs text-neutral-400">Undercover</div>
            </div>
            <div className="text-center">
              <div className="text-2xl md:text-3xl mb-1">⚪</div>
              <div className="text-xl md:text-2xl font-bold text-neutral-100">{settings.whiteCount}</div>
              <div className="text-xs text-neutral-400">Mr.White</div>
            </div>
            <div className="text-center">
              <div className="text-2xl md:text-3xl mb-1">🟢</div>
              <div className="text-xl md:text-2xl font-bold text-green-400">
                {players.length - settings.undercoverCount - settings.whiteCount}
              </div>
              <div className="text-xs text-neutral-400">Civils</div>
            </div>
          </div>
        </Card>

        {/* Ajout de joueurs */}
        <Card className="mb-6 bg-gradient-to-br from-neutral-800/50 to-neutral-800/30 backdrop-blur border-neutral-700/50">
          <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
            <span className="text-2xl">👥</span>
            Ajouter des joueurs
          </h2>
          <div className="flex gap-2">
            <Input
              placeholder="Nom du joueur"
              value={name}
              onChange={(e) => setName(e.target.value)}
              onKeyDown={handleKeyDown}
              className="flex-1"
            />
            <Button 
              onClick={handleAdd} 
              disabled={name.trim().length === 0}
              variant="primary"
            >
              +
            </Button>
          </div>
        </Card>

        {/* Liste des joueurs */}
        {players.length > 0 && (
          <Card className="mb-6 bg-gradient-to-br from-neutral-800/50 to-neutral-800/30 backdrop-blur border-neutral-700/50">
            <h2 className="font-semibold mb-3 text-neutral-300">
              Joueurs ({players.length})
            </h2>
            <ul className="space-y-2">
              {players.map((p, index) => (
                <li
                  key={p.id}
                  className="flex items-center justify-between p-3 bg-gradient-to-r from-neutral-900/80 to-neutral-900/40 rounded-xl border border-neutral-700/30 hover:border-neutral-600/50 transition-all"
                >
                  <span className="flex items-center gap-3">
                    <span className="text-neutral-500 font-mono text-sm w-6">
                      #{index + 1}
                    </span>
                    <span className="font-medium">{p.name}</span>
                  </span>
                  <button
                    onClick={() => removePlayer(p.id)}
                    className="text-red-400 hover:text-red-300 hover:bg-red-500/10 px-3 py-2 rounded-lg min-h-[44px] min-w-[44px] transition-all"
                    aria-label={`Retirer ${p.name}`}
                  >
                    ✕
                  </button>
                </li>
              ))}
            </ul>
          </Card>
        )}

        {/* Configuration des rôles */}
        <Card className="mb-6 bg-gradient-to-br from-blue-900/20 to-purple-900/20 backdrop-blur border-blue-700/30">
          <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
            <span className="text-2xl">⚙️</span>
            Configuration des rôles
          </h2>
            
            {/* Undercover */}
            <div className="mb-6">
              <div className="flex items-center justify-between mb-3">
                <label className="text-sm font-medium text-neutral-300 flex items-center gap-2">
                  <span className="text-xl">🔴</span>
                  Undercover
                </label>
                <span className="text-2xl font-bold text-red-400">
                  {settings.undercoverCount}
                </span>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() =>
                    updateSettings({
                      undercoverCount: Math.max(1, settings.undercoverCount - 1),
                    })
                  }
                  className="flex-1 px-4 py-3 bg-neutral-800 hover:bg-neutral-700 rounded-xl font-bold text-lg transition-all disabled:opacity-30"
                  disabled={settings.undercoverCount <= 1}
                >
                  −
                </button>
                <button
                  onClick={() =>
                    updateSettings({
                      undercoverCount: Math.min(
                        maxUndercover,
                        settings.undercoverCount + 1
                      ),
                    })
                  }
                  className="flex-1 px-4 py-3 bg-neutral-800 hover:bg-neutral-700 rounded-xl font-bold text-lg transition-all disabled:opacity-30"
                  disabled={settings.undercoverCount >= maxUndercover}
                >
                  +
                </button>
              </div>
            </div>

            {/* Mr.White */}
            <div>
              <div className="flex items-center justify-between mb-3">
                <label className="text-sm font-medium text-neutral-300 flex items-center gap-2">
                  <span className="text-xl">⚪</span>
                  Mr.White
                </label>
                <span className="text-2xl font-bold text-neutral-100">
                  {settings.whiteCount}
                </span>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() =>
                    updateSettings({
                      whiteCount: Math.max(0, settings.whiteCount - 1),
                    })
                  }
                  className="flex-1 px-4 py-3 bg-neutral-800 hover:bg-neutral-700 rounded-xl font-bold text-lg transition-all disabled:opacity-30"
                  disabled={settings.whiteCount <= 0}
                >
                  −
                </button>
                <button
                  onClick={() =>
                    updateSettings({
                      whiteCount: Math.min(maxWhite, settings.whiteCount + 1),
                    })
                  }
                  className="flex-1 px-4 py-3 bg-neutral-800 hover:bg-neutral-700 rounded-xl font-bold text-lg transition-all disabled:opacity-30"
                  disabled={settings.whiteCount >= maxWhite}
                >
                  +
                </button>
              </div>
            </div>

          <div className="mt-4 p-3 bg-neutral-900/50 rounded-xl">
            <p className="text-xs text-neutral-400 text-center">
              Civils : {players.length - settings.undercoverCount - settings.whiteCount}
            </p>
          </div>
        </Card>

        {/* Bouton démarrer */}
        <Button
          fullWidth
          onClick={startGame}
          disabled={!canStart}
          className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-base md:text-lg py-3 md:py-4 shadow-lg shadow-blue-500/20"
        >
          {canStart
            ? "🚀 Démarrer la partie"
            : `Minimum 3 joueurs (${players.length}/3)`}
        </Button>
      </div>
    </div>
  );
}
