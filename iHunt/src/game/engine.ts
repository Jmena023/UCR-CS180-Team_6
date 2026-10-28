export type Mode = "album" | "live" | "battle";
export type Phase =
  "lobby" | "submission" | "reveal" | "voting" | "summary" | "over";
export type Player = {
  id: string;
  name: string;
  color: string;
  lives: number;
  score: number;
  departed?: boolean;
  photo?: string;
  review?: "checking" | "accepted" | "rejected" | "unavailable";
  voted?: boolean;
};
export type Game = {
  mode: Mode;
  phase: Phase;
  round: number;
  timer: number;
  maxLives: number;
  rounds: number;
  deadline: number;
  players: Player[];
  code: string;
  host: string;
  applied: boolean;
  votes: Record<string, string>;
};
export const prompts = [
  "Find something orange.",
  "Find a flower.",
  "Find something round.",
  "Find a tree.",
  "Find an interesting building.",
  "Find something that makes you smile.",
];
export const photos = [
  "https://images.unsplash.com/photo-1611080626919-7cf5a9dbab5b?w=700&q=85",
  "https://images.unsplash.com/photo-1490750967868-88aa4486c946?w=700&q=85",
  "https://images.unsplash.com/photo-1501004318641-b39e6451bec6?w=700&q=85",
  "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=700&q=85",
];
export function createGame(mode: Mode, name = "Zami", guest = false): Game {
  return {
    mode,
    phase: "lobby",
    round: 1,
    timer: mode === "album" ? 30 : 60,
    maxLives: 3,
    rounds: 5,
    deadline: 0,
    code: "JNGLE6",
    host: guest ? "1" : "0",
    applied: false,
    votes: {},
    players: ["You", "Stephen", "Edward", "Joshua"].map((n, i) => ({
      id: String(i),
      name: i ? n : name,
      color: ["#FFD85A", "#BDD9F2", "#FFBA95", "#C5D6B1"][i],
      lives: 3,
      score: 0,
    })),
  };
}
export type Action =
  | {
      type:
        | "start"
        | "close"
        | "settle"
        | "next"
        | "rematch"
        | "forfeit"
        | "leave-lobby";
    }
  | { type: "photo"; id: string; uri: string }
  | { type: "review"; id: string; result: NonNullable<Player["review"]> }
  | { type: "vote"; voter: string; target: string }
  | { type: "settings"; timer: number; lives: number; rounds: number };
export function reduceGame(g: Game, a: Action, now = Date.now()): Game {
  if (a.type === "leave-lobby" && g.phase === "lobby") {
    const players = g.players.filter((p) => p.id !== "0");
    return {
      ...g,
      players,
      host: g.host === "0" ? players[0]?.id || "" : g.host,
    };
  }
  if (a.type === "settings" && g.phase === "lobby")
    return {
      ...g,
      timer: a.timer,
      maxLives: a.lives,
      rounds: a.rounds,
      players: g.players.map((p) => ({ ...p, lives: a.lives })),
    };
  if (a.type === "start" && g.phase === "lobby" && g.players.length >= 2)
    return { ...g, phase: "submission", deadline: now + g.timer * 1000 };
  if (a.type === "photo" && g.phase === "submission" && now < g.deadline)
    return {
      ...g,
      players: g.players.map((p) =>
        p.id === a.id &&
        !p.departed &&
        !p.photo &&
        (g.mode === "battle" || p.lives > 0)
          ? { ...p, photo: a.uri }
          : p,
      ),
    };
  if (a.type === "close" && g.phase === "submission")
    return {
      ...g,
      phase: g.mode === "battle" ? "voting" : "reveal",
      deadline: now + (g.mode === "battle" ? 15 : 10) * 1000,
    };
  if (a.type === "review" && g.phase === "reveal")
    return {
      ...g,
      players: g.players.map((p) =>
        p.id === a.id &&
        p.id !== "0" &&
        p.photo &&
        ((!p.review && a.result === "checking" && now < g.deadline) ||
          (p.review === "checking" && a.result !== "checking"))
          ? { ...p, review: a.result }
          : p,
      ),
    };
  if (
    a.type === "vote" &&
    g.phase === "voting" &&
    now < g.deadline &&
    a.voter !== a.target &&
    !g.votes[a.voter] &&
    g.players.some((p) => p.id === a.voter && !p.departed) &&
    g.players.filter((p) => p.photo).length >= 2 &&
    g.players.some((p) => p.id === a.target && p.photo && !p.departed)
  )
    return { ...g, votes: { ...g.votes, [a.voter]: a.target } };
  if (
    a.type === "settle" &&
    ["reveal", "voting"].includes(g.phase) &&
    !g.applied &&
    !g.players.some((p) => p.review === "checking")
  ) {
    const players = g.players.map((p) => ({
      ...p,
      lives:
        g.mode === "battle"
          ? p.lives
          : Math.max(
              0,
              p.lives - (!p.photo || p.review === "rejected" ? 1 : 0),
            ),
      score:
        p.score + Object.values(g.votes).filter((id) => id === p.id).length,
    }));
    return {
      ...g,
      players,
      applied: true,
      phase: "summary",
      deadline: now + 8_000,
    };
  }
  if (a.type === "next" && g.phase === "summary") {
    if (
      g.mode === "battle"
        ? g.round >= g.rounds
        : g.players.filter((p) => p.lives > 0).length <= 1
    )
      return { ...g, phase: "over" };
    return {
      ...g,
      round: g.round + 1,
      phase: "submission",
      applied: false,
      votes: {},
      deadline: now + g.timer * 1000,
      players: g.players.map((p) => ({
        ...p,
        photo: undefined,
        review: undefined,
      })),
    };
  }
  if (a.type === "rematch")
    return {
      ...g,
      phase: "lobby",
      round: 1,
      applied: false,
      votes: {},
      deadline: 0,
      players: g.players.map((p) => ({
        ...p,
        lives: g.maxLives,
        score: 0,
        photo: undefined,
        review: undefined,
      })),
    };
  if (a.type === "forfeit") {
    const players = g.players.map((p) =>
      p.id === "0" ? { ...p, lives: 0, departed: true, photo: undefined } : p,
    );
    const remaining = players.filter(
      (p) => !p.departed && (g.mode === "battle" || p.lives > 0),
    );
    return { ...g, players, phase: remaining.length <= 1 ? "over" : g.phase };
  }
  return g;
}
