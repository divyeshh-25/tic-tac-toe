import { useState } from "react"
import GameBoard from "./Components/GameBoard"
import Player from "./Components/Player"
import Log from "./Components/Log";
import { WINNING_COMBINATIONS } from "./winning_combination";
import GameOver from "./Components/GameOver";

const PLAYERS = {
  X: 'Player 1',
  O: 'Player 2'
};
const INITAL_GAME_BOARD = [
  [null, null, null],
  [null, null, null],
  [null, null, null]
];

function deriveActivePlayer(gameTurns) {
  let currentPlayer = "X";
  if (gameTurns.length > 0 && gameTurns[0].player == "X") {
    currentPlayer = "O";
  }
  return currentPlayer;
}

function deriveWinner(gameBoard,playersName){
  let winner = null;
  for( const combination of WINNING_COMBINATIONS){
    const firstSquare = gameBoard[combination[0].row][combination[0].column];
    const secSquare = gameBoard[combination[1].row][combination[1].column];
    const thirdSquare = gameBoard[combination[2].row][combination[2].column];
    
    if(firstSquare != null && firstSquare === secSquare && firstSquare === thirdSquare){
        winner = playersName[firstSquare];
    }
  }
  return winner;
}

function deriveGameBoard(gameTurns){
  const gameBoard = [...INITAL_GAME_BOARD.map(array => [...array])];
  
  for( const turn of gameTurns ){
      const { square, player } = turn;
      const { row, col } = square;
      gameBoard[row][col] = player;
  }
  return gameBoard;
}

function App() {
  const [playersName , setPlayersName] = useState(PLAYERS);
  const [gameTurns, setGameTurns] = useState([]);
  
  const activePlayer = deriveActivePlayer(gameTurns);
  const gameBoard = deriveGameBoard(gameTurns);
  const winner = deriveWinner(gameBoard,playersName);
  let hasDraw = gameTurns.length == 9 && !winner;

  function onRestart(){
      setGameTurns([]);
  }

  function handleSelectSquare(rowIndex, colIndex) {
    setGameTurns((prevGameTurns) => {
      const currentPlayer = deriveActivePlayer(prevGameTurns);
      const updateTurns = [
        { square: { row: rowIndex, col: colIndex }, player: currentPlayer },
        ...prevGameTurns
      ];
      return updateTurns;
    });
  }

  function handlePlayerNameChange(symbol,playerName){
    setPlayersName(prevPlayers => {
      return {
        ...prevPlayers,
        [symbol]: playerName
      }
    });

  }

  return (
    <main>
      <div id="game-container">
        <ol id="players" className="highlight-player ">
          <Player name={"Player 1"} symbol={"X"} isActive={activePlayer === "X"} onChangeName={handlePlayerNameChange}/>
          <Player name={"Player 2"} symbol={"O"} isActive={activePlayer === "O"} onChangeName={handlePlayerNameChange}/>
        </ol>
        { (winner || hasDraw) && <GameOver winner={winner} onRematch={onRestart}/>}
        <GameBoard selectSquare={handleSelectSquare} board={gameBoard} />
      </div>
      <Log turns={gameTurns} />
    </main>
  )
}

export default App
