client - serwer (ws)

on run app, in main app connects to the serwer using ws.
on 'network' button it registers itself sending "ReadyToJoinEvent" to the serwer.
when serwer detects 2 players taht are ReadyToJoinEvent -> starts an new game: 
1. send to the players: prepareToGameEvent
2. each player must send an "ReadyToPlayEvent" to game to be started.
3. serwer send the "StartGameEvent" with initial game state

each move made (any chnge to the game is an event sent)