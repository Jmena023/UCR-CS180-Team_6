const { test } = require("node:test");
const assert = require("node:assert/strict");
const ts = require("typescript");
const fs = require("fs");
const vm = require("vm");
const code = ts.transpileModule(fs.readFileSync("src/game/engine.ts", "utf8"), {
  compilerOptions: { module: ts.ModuleKind.CommonJS },
}).outputText;
const m = { exports: {} };
vm.runInNewContext(code, { module: m, exports: m.exports, Date, Math });
const { createGame, reduceGame } = m.exports;
const move = (g, a, n = 1000) => reduceGame(g, a, n);
const setup = (mode = "album") => move(createGame(mode), { type: "start" });
test("submissions lock and deadlines reject late photos", () => {
  let g = setup();
  g = move(g, { type: "photo", id: "0", uri: "first" });
  g = move(g, { type: "photo", id: "0", uri: "second" });
  assert.equal(g.players[0].photo, "first");
  g = move(g, { type: "photo", id: "1", uri: "late" }, g.deadline);
  assert.equal(g.players[1].photo, undefined);
});
test("life deductions are applied once and simultaneous elimination draws", () => {
  let g = setup();
  g = move(g, { type: "close" });
  g = move(g, { type: "settle" });
  assert.equal(g.players[0].lives, 2);
  g = move(g, { type: "settle" });
  assert.equal(g.players[0].lives, 2);
  g = { ...g, players: g.players.map((p) => ({ ...p, lives: 0 })) };
  g = move(g, { type: "next" });
  assert.equal(g.phase, "over");
});
test("reviews deduplicate and can finish after the deadline", () => {
  let g = setup();
  g = move(g, { type: "photo", id: "1", uri: "x" });
  g = move(g, { type: "close" });
  g = move(g, { type: "review", id: "1", result: "checking" });
  assert.equal(move(g, { type: "settle" }).phase, "reveal");
  g = move(
    g,
    { type: "review", id: "1", result: "rejected" },
    g.deadline + 500,
  );
  g = move(g, { type: "review", id: "1", result: "accepted" });
  assert.equal(g.players[1].review, "rejected");
  g = move(g, { type: "settle" });
  assert.equal(g.players[1].lives, 2);
});
test("unavailable review preserves life and self challenge is blocked", () => {
  let g = setup();
  for (const id of ["0", "3"]) g = move(g, { type: "photo", id, uri: "x" });
  g = move(g, { type: "close" });
  g = move(g, { type: "review", id: "0", result: "checking" });
  assert.equal(g.players[0].review, undefined);
  g = move(g, { type: "review", id: "3", result: "checking" });
  g = move(g, { type: "review", id: "3", result: "unavailable" });
  g = move(g, { type: "settle" });
  assert.equal(g.players[3].lives, 3);
});
test("battle blocks self vote and duplicate votes and counts once", () => {
  let g = setup("battle");
  for (const id of ["0", "1"]) g = move(g, { type: "photo", id, uri: "x" });
  g = move(g, { type: "close" });
  g = move(g, { type: "vote", voter: "0", target: "0" });
  assert.equal(g.votes["0"], undefined);
  g = move(g, { type: "vote", voter: "0", target: "1" });
  g = move(g, { type: "vote", voter: "0", target: "2" });
  assert.equal(g.votes["0"], "1");
  g = move(g, { type: "settle" });
  g = move(g, { type: "settle" });
  assert.equal(g.players[1].score, 1);
  assert.equal(g.players[0].lives, 3);
});
test("not enough entries awards no votes and rematch preserves crew", () => {
  let g = setup("battle");
  g = move(g, { type: "photo", id: "1", uri: "x" });
  g = move(g, { type: "close" });
  g = move(g, { type: "vote", voter: "0", target: "1" });
  assert.equal(g.votes["0"], undefined);
  const room = g.code;
  g = move(g, { type: "rematch" });
  assert.equal(g.code, room);
  assert.equal(g.players.length, 4);
  assert.equal(g.round, 1);
  assert.equal(g.phase, "lobby");
  assert.ok(g.players.every((p) => !p.photo && p.score === 0));
});
test('host departure transfers lobby ownership', () => {
  const g = move(createGame('album'), {type:'leave-lobby'});
  assert.equal(g.host,'1'); assert.equal(g.players.length,3); assert.ok(!g.players.some(p=>p.id==='0'));
});
test('active departure forfeits only that player and allows the crew to continue', () => {
  let g = move(setup(), {type:'forfeit'}); assert.equal(g.players[0].lives,0); assert.equal(g.players[0].departed,true); assert.equal(g.phase,'submission');
  g=setup();g={...g,players:g.players.slice(0,2)};g=move(g,{type:'forfeit'});assert.equal(g.phase,'over');
});
