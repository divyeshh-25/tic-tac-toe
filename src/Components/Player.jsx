import { useState } from "react";

export default function Player({ name, symbol,isActive, onChangeName }) {
    const [isEditing, setIsEditing] = useState(false);
    const [playerName,setPlayerName] = useState(name);
    function editClickHandler() {
        setIsEditing(editing => !editing);
        if(isEditing){
            onChangeName(symbol,playerName);
        }
    }
    function inputChangeHandler(event) {
        setPlayerName(event.target.value);
    }
    let editablePlayerName = <span className="player-name">{playerName}</span>;
    if(isEditing){
        editablePlayerName = <input className="player-name" type="text" 
        value={playerName} onChange={inputChangeHandler}/>;
    }
    return (
        <li className={isActive ? 'active' : undefined}>
            <span className="player">
                { editablePlayerName }
                <span className="player-symbol">{symbol}</span>
            </span>
            <button onClick={editClickHandler}>
                {isEditing ? "Save" : "Edit"}
            </button>
        </li>
    );
}