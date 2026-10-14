Project Motivation
The motivation behind this project is to provide the community with a fun game that friends can enjoy together. The game will encourage people to go outside, explore their surroundings, and discover new places. It will help friends stay connected and communicate, even during long and busy days. In addition, the game can promote physical activity, reduce stress, strengthen teamwork, and help people build lasting memories and stronger relationships within their community.
Specifications:
iHunt is a multiplayer mobile game where a person can create or join a private game room with their friends or a random user. They each have a turn where a player gets a random photo prompt and have a limited amount of time to complete it. Players can either take a new picture with their camera or choose one from their photo library to submit for the prompt. If a player does not submit a photo before the time expires, then they lose a life depending on the game mode. The game continues until one player runs out of lives. 
Functionalities
1. Main Functions
Login page/authentication method
As a player, I should be able to create an account, log in, and log out securely.
The authentication system will:
Allow users to register and log in.
Prevent unauthorized users from accessing another player’s account.
Keep game rooms and submitted photos connected to the correct users.
Allow users to log out safely.

Game Room Creation and Joining
As a player, I should be able to create or join a game room with another player.
The game-room system will:
Allow a user to create a private game room.
Generate a room code or invitation code.
Allow another user to join using the code.
Display the players currently in the room.
Allow the host to start the game after the required players have joined.
Prevent users who are not in the room from viewing that game’s photos or information.
Private rooms will be the main room feature in the minimum viable product. Random matchmaking may be added as a bonus feature if the main game is completed early.

Random Photo Prompts
As a player, I should receive a random photo prompt when my turn begins.
The prompt system will:
Select a prompt from a predefined list.
Display the prompt clearly on the game screen.
Use prompts such as “Find something red,” “Take a picture of a tree,” or “Find a unique building.”
Prevent the same prompt from being repeated too frequently in one game.
The initial version will use a predefined prompt list so that the team can focus on completing and testing the main game.

Timer and Photo Submission
As the active player, I should have a limited amount of time to complete the prompt.
The game will:
Display a countdown timer during each turn.
Allow the player to take a new picture using the device camera.
Allow the player to select a picture from their photo library.
Show a preview before the photo is submitted.
Allow the player to retake or select a different picture before submitting.
Automatically end the turn when time expires.
The initial game mode will use a simple timer and life system. The exact time limit can be adjusted during testing.

Lives, Scoreboard, and Game Results
As a player, I should be able to see my remaining lives and the other player’s game status.
The game will:
Give each player a starting number of lives.
Remove one life when a player fails to submit a photo on time.
Remove one life when a submitted photo is rejected.
Display the current number of lives for each player.
End the game when one player reaches zero lives.
Display a winner screen when the game ends.
Allow players to start another game or leave the room.

Turn-Based Game System
As a player, I should be able to take turns completing photo challenges.
The game system will:
Keep track of whose turn it is.
Prevent multiple players from submitting at the same time during a turn.
Show the current player and the other player the correct game status.
Move to the next turn after a submission is reviewed.
Save the game state so that players can reconnect if they temporarily leave the app.


Uses device capabilities (Camera, notifications)
Players use a camera or photo album to complete the prompt 
Players get notifications if the other player completed the prompt 

2. Optional/Bonus Functions
Auto Photo Scoring
Using AI to score photos uploaded by users to generate an unbiased winner/scoring.

A Chat System
A convenient way to communicate between players instead of having to switch tabs.

Different Game Modes
Expand on later on after the default game mode has been completed. EX: 
Custom mode = the user can write the prompt and set the time limit themselves
Natural mode = This game session will only generate prompts related to nature

3. Some Use Case
Use Case 1: Creating and Joining a Game
A user opens iHunt and logs in.
The user selects Create Game from the home screen.
The app creates a private room and displays an invitation code.
A friend logs in and selects Join Game.
The friend enters the invitation code.
Both players appear in the game lobby.
The host starts the game.
The app moves both players to the game screen.
Use Case 2: Completing a Turn
The app randomly selects a prompt, such as “Find a flower.”
The active player sees the prompt and the countdown timer.
The player either takes a new picture or chooses one from their photo library.
The player previews and submits the photo.
The other player receives a notification.
The other player reviews the photo and selects Accept or Reject.
If the photo is accepted, the turn changes to the other player.
If the photo is rejected, the active player loses one life before the turn changes.
If the timer reaches zero before submission, the active player loses one life.
The app updates the scoreboard and displays the next player’s turn.

Use Case 3: Ending a Game
Players continue taking turns and reviewing photos.
The app updates the life count after every turn.
When a player loses all of their lives, the game ends.
The app displays the winner and the final game results.
Players can choose to play again or leave the game room.
Feasibility Analysis and Challenges

Hunt is feasible within a 10-week quarter because the project will be developed by a four-person team with programming experience. The team can divide the work between user authentication and backend development, interface design, game logic, camera and photo-library integration, notifications, and testing.

The core version does not require advanced artificial intelligence or complicated computer vision. It can use a predefined list of prompts, a basic timer, a life system, player review, and a simple screen-based user interface. This keeps the main project realistic while still providing a complete and enjoyable multiplayer game.

On the other hand, some existing development tools we can use to produce iHunt is 
React Native with Expo: Used to build the mobile application and user interface.
JavaScript or TypeScript: Used to program the application logic.
Firebase Authentication: Used for user registration, login, and account security.
Firebase Firestore or Realtime Database: Used to store users, game rooms, prompts, turns, timers, and player lives.
Firebase Cloud Storage: Used to store submitted photos securely.
Visual Studio Code: Used as the main code editor.
Android Studio Emulator and physical smartphones: Used to test the application on mobile devices.
Figma: Used to design and plan the user interface before programming.
GitHub and Git: Used for version control, collaboration, and keeping track of each team member’s code.
Another possible framework is Flutter, which also allows applications to be created from one codebase. However, Flutter requires the team to learn Dart. React Native with Expo may be more convenient if team members already have experience with JavaScript or web programming.
The main challenges will be keeping both players synchronized, handling camera and photo permissions, uploading images reliably, making sure timers and turns work correctly, and creating an interface that is easy to understand. These challenges can be reduced by using a managed backend, limiting the number of players in the first version, testing on real mobile devices, and completing the core features before adding bonus features.



