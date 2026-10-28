import React, {
  createContext,
  useContext,
  useEffect,
  useReducer,
  useState,
} from "react";
import {
  createGame,
  reduceGame,
  photos,
  type Game,
  type Action,
  type Mode,
} from "./engine";
const Context = createContext<{
  game: Game;
  send: (a: Action) => void;
  create: (mode: Mode, guest?: boolean) => void;
  name: string;
  setName: (n: string) => void;
  haptics: boolean;
  setHaptics: (v: boolean) => void;
} | null>(null);
export function GameProvider({ children }: { children: React.ReactNode }) {
  const [name, setName] = useState("Zami");
  const [haptics, setHaptics] = useState(true);
  const [game, dispatch] = useReducer(
    (g: Game, a: Action | { type: "create"; mode: Mode; guest?: boolean }) =>
      a.type === "create"
        ? createGame(a.mode, name, a.guest)
        : reduceGame(g, a),
    createGame("album"),
  );
  useEffect(() => {
    const id = setInterval(() => {
      const now = Date.now();
      if (game.phase === "submission") {
        game.players.forEach((p, i) => {
          if (
            i &&
            (game.mode === "battle" || p.lives > 0) &&
            !p.photo &&
            now >= game.deadline - game.timer * 1000 + (4 + i * 3) * 1000 &&
            !(game.round > 1 && i === (game.round % 3) + 1)
          )
            dispatch({ type: "photo", id: p.id, uri: photos[i] });
        });
        if (
          now >= game.deadline ||
          game.players
            .filter((p) => game.mode === "battle" || p.lives > 0)
            .every((p) => p.photo)
        )
          dispatch({ type: "close" });
      }
      if (game.phase === "voting")
        game.players.forEach((p, i) => {
          if (i && now > game.deadline - 10000) {
            const target = game.players.find((q) => q.id !== p.id && q.photo);
            if (target)
              dispatch({ type: "vote", voter: p.id, target: target.id });
          }
        });
      if (
        (game.phase === "voting" || game.phase === "reveal") &&
        now >= game.deadline
      )
        dispatch({ type: "settle" });
      if (game.phase === "summary" && now >= game.deadline)
        dispatch({ type: "next" });
    }, 400);
    return () => clearInterval(id);
  }, [game]);
  return (
    <Context.Provider
      value={{
        game,
        send: dispatch,
        create: (mode, guest) => dispatch({ type: "create", mode, guest }),
        name,
        setName,
        haptics,
        setHaptics,
      }}
    >
      {children}
    </Context.Provider>
  );
}
export function useGame() {
  const c = useContext(Context);
  if (!c) throw Error("Missing provider");
  return c;
}
