# iHunt

**A Multiplayer Photo Scavenger Hunt Mobile Game**

## Overview

iHunt is a multiplayer mobile game that challenges friends to complete photo-based scavenger hunts. Players take turns receiving random photo prompts and must submit a matching picture before the countdown timer expires.

Players can take a new photo using their device's camera or select an existing photo from their gallery. The opposing player reviews the submission and decides whether it satisfies the prompt. Players lose lives when they fail to submit a photo on time or when their submission is rejected. The game continues until one player runs out of lives.

## Project Motivation

The goal of iHunt is to create an interactive and enjoyable experience that encourages users to explore their surroundings, stay active, and connect with friends.

By combining photography, exploration, and friendly competition, iHunt aims to promote creativity, physical activity, teamwork, and social interaction. The game also provides a way for friends to stay connected even when they cannot spend time together in person.

## Core Features

### 1. User Authentication
- Create an account and securely log in or log out.
- Protect user accounts from unauthorized access.
- Associate game rooms, player information, and submitted photos with the correct users.

### 2. Game Room Management
- Create private multiplayer game rooms.
- Generate unique invitation codes.
- Join existing rooms using an invitation code.
- View players currently connected to a room.
- Allow the host to start the game when the required players have joined.
- Restrict game information to authorized participants.

### 3. Random Photo Prompts
- Generate random challenges from a predefined list.
- Display a new prompt at the beginning of each turn.
- Reduce repeated prompts during a game session.

Example prompts:
- Find something red.
- Take a picture of a tree.
- Find a unique building.
- Take a picture of a flower.

### 4. Photo Submission and Timer
- Display a countdown timer for each turn.
- Capture photos using the device camera.
- Select existing images from the photo library.
- Preview photos before submitting.
- Retake or replace photos before submission.
- Automatically end the turn when the timer expires.

### 5. Turn-Based Gameplay
- Track the current player's turn.
- Prevent multiple players from submitting during the same turn.
- Synchronize game information between players.
- Allow opponents to accept or reject submitted photos.
- Advance to the next turn after a submission is reviewed.
- Preserve game progress so players can reconnect.

### 6. Lives and Game Results
- Assign each player a starting number of lives.
- Deduct one life for missed deadlines or rejected submissions.
- Display each player's remaining lives.
- End the game when a player reaches zero lives.
- Display the winner and final game results.
- Allow players to restart or leave the game.

### 7. Device Integration
- Access the device camera and photo library.
- Support notifications for relevant game events.

## How the Game Works

### Creating and Joining a Game
1. A player creates an account or logs in.
2. The host creates a private game room.
3. The application generates an invitation code.
4. Another player joins using the code.
5. Both players enter the game lobby.
6. The host starts the game.

### Completing a Turn
1. The active player receives a random photo prompt.
2. A countdown timer begins.
3. The player takes a picture or selects one from their gallery.
4. The player previews and submits the image.
5. The opposing player reviews the submission.
6. If accepted, the game advances to the next turn.
7. If rejected or submitted too late, the active player loses one life.
8. The scoreboard updates and gameplay continues.

### Ending the Game
1. Players continue completing photo challenges.
2. Lives are deducted for unsuccessful turns.
3. The game ends when a player runs out of lives.
4. The winner is displayed.
5. Players can restart or return to the lobby.

## Technology Stack

The project plans to use the following technologies:

| Technology | Purpose |
|---|---|
| React Native / Expo | Cross-platform mobile application |
| TypeScript | Frontend and game logic |
| Firebase Authentication | User registration and authentication |
| Firebase Firestore | Game rooms, player data, prompts, and game state |
| Firebase Cloud Storage | Storing uploaded photos |
| Git / GitHub | Version control and team collaboration |
| Visual Studio Code | Development environment |
| Android Studio / Physical Devices | Application testing |
| Figma / draw.io | UI design and software architecture |

## Software Architecture

iHunt follows a client-server architecture with a modular application design.

The system is organized into three primary components:

**Frontend:** React Native provides the mobile interface, navigation, camera integration, and player interactions.

**Application Logic:** TypeScript modules manage authentication flows, game rooms, prompts, timers, turn management, lives, and photo submissions.

**Backend:** Firebase provides authentication, persistent storage, and shared game data to support multiplayer functionality.

This architecture emphasizes separation of concerns, modularity, and maintainability.

## Development Workflow

The project is developed by a team of four using GitHub for collaboration and version control.

The team follows a weekly Scrum-inspired workflow involving:

- Weekly sprint planning and task assignments.
- Progress check-ins and discussion of blockers.
- Feature branches for individual development.
- Pull requests and code reviews.
- Weekly progress reports and sprint reviews.

Development responsibilities are divided across frontend development, backend/database integration, game logic, and photo/device integration.

## Planned Features

The following features are considered optional and will be implemented after the core gameplay is functional.

### AI Photo Scoring
Automatically evaluate submitted photos using image recognition or AI-assisted scoring.

### In-Game Chat
Allow players to communicate and discuss photo submissions without leaving the application.

### Additional Game Modes
- **Custom Mode:** Players create their own prompts and configure time limits.
- **Nature Mode:** Challenges focus on outdoor and nature-related photography.

### Random Matchmaking
Allow players to join games with other users without needing a private invitation.

## Development Challenges

The main technical challenges include:

- Synchronizing game state between multiple devices.
- Managing turn transitions and countdown timers.
- Handling camera and photo-library permissions.
- Uploading and retrieving images reliably.
- Protecting private game rooms and user data.
- Maintaining a responsive and intuitive user interface.

To keep development manageable, the initial version will prioritize two-player private games, predefined prompts, a basic life system, and manual photo review before implementing additional features.

## Project Scope

iHunt is being developed as part of the University of California, Riverside's CS180 Software Engineering course.

The project focuses on applying software engineering concepts such as requirements analysis, software architecture, modular design, version control, collaborative development, and testing.

The primary objective is to deliver a functional multiplayer mobile game within the academic quarter.

## Team

**Team 6 — CS180**

- Stephen He
- Edward Van
- Joshua Mena
- Zami Alam

## Project Status

**In Development — Fall 2026**

The project is currently in the design and early implementation phase. Core functionality, architecture, and development workflows are being established.

The README will be updated as implementation progresses.


