// Dépendances
import { useState, useEffect } from "react";
// Styles
import "../../../styles/body/Content/Character/Character.css"

// Composant de personnage en attente de validation (ajout/modif)
const WaitingChar = (props) => {
    // State 
    const [character, setCharacter] = useState({});

    // handles
        // Validation
    const handleValidateChar = () => {
        props.callbacks.validate(character._id);
    };
        // Refus
    const handleRejectChar = () => {
        props.callbacks.reject(character._id);
    };
    
    useEffect(()=> {
        setCharacter(props.char);
    }, []);

    return (
        <div className="character">
            <h3>{character.name}</h3>
            <span className="charLicence">{character.licence}</span>
            <p><label>Alias : </label>{character.alias}</p>
            <p><label>Phrase fétiche : </label>{character.sentence}</p>
            <button onClick={handleValidateChar}>Valider</button>
            <button onClick={handleRejectChar}>Refuser</button>
        </div>
    );
};
export default WaitingChar;