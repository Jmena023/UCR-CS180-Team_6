# iHunt

An Expo SDK 58 / React Native / TypeScript frontend with an original jungle arcade design. The entry screen offers Sign In, Create Account, and Skip. Skip opens the playable demo without credentials.

## Run on your phone

```sh
cd iHunt
npm install
npm start
```

Scan the terminal QR code with Expo Go (iPhone: Camera app; Android: Expo Go scanner). The phone and computer should share Wi-Fi. For a connection across networks:

```sh
npm run start:tunnel
```

Keep the terminal/server running. Each server session can generate a different URL, so old QR images may expire. Use an Expo Go version that supports SDK 58 (including Expo Go 58.0.5 on iPhone). Node 22.13+ is required; a project-local Node 22 runtime is included in dev dependencies for this workspace's older system Node installation. Run Expo inside the `iHunt` folder, not the repository root. The tunnel script selects the ngrok transport so an Expo account login is not required.

## Playable frontend

- Home, three illustrated mode cards, invitations, mode instructions, join-code validation, lobby, editable host settings, copy/share, friend search, requests, invitations, demo login/signup/reset, profile editing, and haptics.
- Album Hunt: native photo library picker. Live Hunt: camera capture only. Photo Battle: camera or library. All modes have an explicit sample-photo fallback.
- Shared-deadline rounds, hidden submissions, replace-before-submit, upload/wait states, locked entries, reveal, challenge confirmation, deterministic review, life deductions, elimination, round summaries, final standings, and preserved-room rematches.
- Anonymous Battle entries, disabled self-votes, one confirmed vote, cumulative points, shared winners, and no AI challenge in Battle.
- Permission errors, full/unavailable/invalid room codes, missed submissions, review failure with preserved lives, simulated disconnect/reconnect, and upload failure/retry.

Demo room code: **JNGLE6**. Full room: **FULL00**. Expired room: **EXPIRE**. Set the round timer and lives/rounds in the host lobby for a quick test.

The simulated crew is Zami, Stephen, Edward, and Joshua. Other players submit after 7–13 seconds; after round one, one player deliberately misses each round to exercise elimination. Review outcomes are Stephen accepted, Edward rejected, Joshua unavailable. Gameplay exposes labeled controls to simulate disconnection and a failed next upload. A retry then succeeds.

## Integration boundaries

This is a **local prototype**, not networked multiplayer. Authentication only validates input; it creates no account, stores no password, and sends no reset email. Friends, rooms, invitations, uploads, AI decisions, and opponent votes are simulated. The disconnect control preserves the existing in-memory phase/deadline; app termination and page refresh do not restore a session. Sample photography uses remote Unsplash URLs and needs network access. Native camera and picker behavior must be checked on a physical phone.

`src/game/engine.ts` contains the typed game model and reducer. `src/game/services.ts` defines the service interface and mock implementation; `src/game/context.tsx` runs the simulated opponents and deadlines. `src/ui` contains shared design tokens, typography, controls, vector illustrations, and photo frames. Routes live under `src/app`.

Production still needs authenticated accounts, persisted profiles/friends, real rooms/invites, object storage, realtime synchronization, and server-authoritative deadlines, voting, review decisions, departures, and reconnect recovery. Private AI credentials belong on the server. Push notifications and game sounds are explicitly unavailable in the demo.

## Verify

```sh
npm run typecheck
npm run lint
npm test
npm run test:visual
node tests/battle-visual.cjs
```

Visual checks require the Expo server on port 8081 and Chrome. Set `CHROME_PATH` for another Chrome installation. Browser screenshots are saved in `preview/`. The reducer tests cover submission locking, deadline enforcement, one-time life deductions, delayed review completion, review deduplication, review failure, self-vote prevention, scoring, draws, and rematch reset.
