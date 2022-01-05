// Dépendances
import { useState, useEffect } from "react";
// Styles
import "../../../styles/body/Content/Character/Character.css";
// config
import config from "../../../../config.json";

// Component Personnage
const Character = (props) => {
    const [character, setCharacter] = useState({});
    const [responseOK, setResponseOK] = useState(false);

    // Récupération de la fiche personange
    useEffect(() => {
        fetch(`${config.API_URL}/char/search/${props.charName}`)
            .then(response => {
                if (response.status == 200)
                    return response.json();
                else
                    throw new Error("Character not found !");
            })
            .then(jsonResponse => {
                setResponseOK(true);
                setCharacter(jsonResponse);
            })
            .catch((err) => {
                console.log(err.message);
                setResponseOK(false);
            });
    }, [props.charName]);

    return (
        <div>
            {responseOK
                ? (<div className="character">
                    <h3>{character.name}</h3>
                    <span className="charLicence">{character.licence}</span>
                    <p><label>Alias : </label>{character.alias}</p>
                    <p><label>Phrase fétiche : </label>{character.sentence}</p>
                </div>)
                : <div className="error">Pas de données en base pour ce personnage.</div>
            }
        </div>
    );
};

export default Character;