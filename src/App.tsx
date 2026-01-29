import { useGame } from "./store/game";
import {
  HomeScreen,
  PlayersScreen,
  RevealScreen,
  VoteScreen,
  RevealElimScreen,
  WhiteGuessScreen,
  EndScreen,
} from "./screens";

function Screen() {
  const phase = useGame((s) => s.phase);

  switch (phase) {
    case "HOME":
      return <HomeScreen />;
    case "PLAYERS":
      return <PlayersScreen />;
    case "REVEAL":
      return <RevealScreen />;
    case "VOTE":
      return <VoteScreen />;
    case "WHITE_GUESS":
      return <WhiteGuessScreen />;
    case "REVEAL_ELIM":
      return <RevealElimScreen />;
    case "END":
      return <EndScreen />;
    default:
      return null;
  }
}

export default function App() {
  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-50">
      <Screen />
    </div>
  );
}
