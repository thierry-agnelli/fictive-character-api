// Dépendances
import { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
// Config
import config from "../../../../config.json";

// Composant Menu logged
const LoggedMenu = (props) => {
    // Historique
    const history = useHistory();
    const params = new URLSearchParams(history.location.search);
    // State
    const [accoutName, setAccountName] = useState("");
    // Handles
    const handleClickLogOut = () => {
        props.callbacks.queryParamsCallbacks("token", null, history);
        props.callbacks.loggedCallback();
    };

    // Affichage nom du compte
    const token = params.get("token");
    fetch(`${config.API_URL}/user/infos/${token}`)
        .then((response) => response.json())
        .then(jsonResponse => {
            setAccountName(jsonResponse.userName);
        });
    
    return (
        <div className="logMenu">
            <span className="logMenuItem">{accoutName}</span>
            <span className="logMenuItem" onClick={handleClickLogOut}>Deconnexion</span>
        </div>
    )
}

export default LoggedMenu;