# iHunt design and app flow

This document describes the current mobile frontend and playable demo. It is a snapshot of the design so far and can evolve with the project.

## The idea

iHunt is a social photo scavenger hunt. Friends respond to the same prompt by finding or taking a photo, then compete through survival or voting. The experience should feel playful, welcoming, and easy to start.

## Design principles

- **Make the next action clear.** Screens lead with a prominent action, such as Sign In, Create a room, or Start the hunt. Secondary actions are quieter but easy to find.
- **Keep the experience friendly.** Short, conversational labels, illustrated game cards, rounded shapes, and game-like language make the app feel approachable.
- **Design for phones.** Use a single-column layout, generous touch targets, readable text, safe areas, and scrolling when content needs more space.
- **Show the state of play.** Display the prompt, countdown, players, lives or points, and progress through the round so players know what is happening.
- **Make social play visible.** The main page includes an invitation with a player count and group status. Friends and profile controls are available in the top bar.
- **Provide feedback and recovery.** Loading states, validation messages, permission guidance, and retry options help players understand what happened and continue.
- **Keep the demo honest.** Clearly identify simulated actions and sample content where they appear; the current frontend does not yet provide real multiplayer or accounts.

## Visual identity

- **Logo:** the supplied `assets/ihunt Logo.png` wordmark appears on the welcome screen and in shared app screens.
- **Colors:** deep green (`#123D2A`) anchors text and outlines; cream (`#FFF7E5`) provides the background. Orange (`#FF962E`) highlights primary actions, while leaf green (`#57B847`) and yellow (`#FFD85A`) add energy. Pale greens and warm pastels distinguish cards and modes.
- **Typography:** Fredoka gives headings a rounded, playful feel. Plus Jakarta Sans is used for body copy, labels, and controls.
- **Components:** rounded cards, strong outlines, simple icons, illustrated photo and camera artwork, and subtle button shadows create a consistent jungle arcade style.
- **Action hierarchy:** orange filled buttons signal primary actions; lighter outlined buttons and text controls indicate secondary actions.

## How the app works

### Welcome and accounts

The welcome screen offers **Sign In**, **Create Account**, and **Skip**. Sign In and Create Account open their respective forms; Skip goes directly to the demo. Authentication is simulated: the forms validate input but do not create an account or store credentials. Password reset is also simulated.

### Main page and invitations

The main page shows the available game modes, a sample invitation, and an option to join using a room code. The invitation displays the host, game mode, player count, and group status. The player can accept it or decline it. The current invitation is sample data rather than a live group update.

The Friends and profile controls are in the top bar. Friends can be searched and invited through the demo interface. Profile and settings screens provide local demo controls.

### Choosing a game

| Mode | How to play | How to win |
| --- | --- | --- |
| **Album Hunt** | Select a matching photo from the photo library before time runs out. | Keep lives by submitting valid photos; the last player with lives wins. |
| **Live Hunt** | Take a new photo matching the prompt before time runs out. | Keep lives by submitting valid photos; the last player with lives wins. |
| **Photo Battle** | Choose or capture a photo for the shared prompt. Players vote on anonymous entries. | Earn points from votes across the configured rounds; ties can share the win. |

Each mode has an introduction screen with its instructions and options to create a room or join one. Default round timers are 30 seconds for Album Hunt and 60 seconds for Live Hunt and Photo Battle. The host can change the timer and lives or round count in the lobby.

### Rooms and lobby

A player can create a room, accept the sample invitation, or enter a room code. In the demo, `JNGLE6` opens a sample room; `FULL00` and `EXPIRE` demonstrate error states. The lobby shows the room code, players, host, and game settings. It includes controls to copy or share the code, invite friends, start the game, and leave the room. A host needs at least two players to start.

### A round

1. Everyone receives the same prompt and a countdown begins.
2. Players choose or capture a photo as allowed by the mode, preview it, and submit before the deadline. A sample photo is available in the demo.
3. In Album Hunt and Live Hunt, photos are revealed and can be challenged. A missed submission or a rejected challenge costs a life. Review outcomes are simulated.
4. In Photo Battle, players vote on anonymous entries. Players cannot vote for their own photo, and each player gets one vote.
5. The app shows a round summary, continues to the next round, and eventually displays final results. Players can start a rematch in the same demo room.

## Current limitations

The app is a local frontend prototype. Other players, invitations, room membership, votes, uploads, and photo reviews are simulated; the invite count and status are not live. Game state is held in memory and is not restored after the app is closed or refreshed. Camera and photo-library access use device permissions, and sample photos need a network connection.

Real accounts, persistent profiles and friends, live rooms and invitations, photo storage, synchronized game state, and server-controlled deadlines and results still need backend integration. Push notifications and game sounds are not connected.

For setup instructions and demo codes, see [README.md](README.md).
