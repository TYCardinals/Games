# Battleship

Battleship is a classic game where one player tries to sink the computer's ships. In this game, the computer has a board with
hidden ships and the player takes turns guessing where the computer's ships are located. The game ends when the player has sunk
all of the computer's ships.

To create a Battleship game using Node for player vs computer, you could start by creating a server that handles the game logic 
and communication between the player and the computer. The player would have a client that connects to the server and sends their
guesses and updates to the board, while the computer's guesses are generated randomly by the server.

The server would keep track of the player's board and the location of the computer's ships, as well as which ships have been 
hit and sunk. It would also keep track of whose turn it is and notify the player when it's their turn to guess.

When the player makes a guess, the server would check to see if it's a hit or a miss and update the board accordingly.
If a ship is hit, the server would check to see if it's been sunk and notify the player if it has. Then, the computer would make
a guess and the server would notify the player whether the computer's guess was a hit or a miss.

The game would continue until the player has sunk all of the computer's ships, at which point the server would declare the
player the winner and end the game.

Overall, a Battleship game using Node for player vs computer would require implementing the game logic on the server side 
and creating a simple client for the player that can send and receive updates to the server.
