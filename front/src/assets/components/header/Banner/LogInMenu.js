// Dépendances
import { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
// Config
import config from "../../../../config.json";
// Styles
import "../../../styles/header/Banner/logInMenu/logInMenu.css"



// Composant Log In
const LogInMenu = (props) => {
    // History react-router
    const history = useHistory();

    // States
    const [userName, setUserName] = useState("");
    const [password, setPassword] = useState("");
    const [logInError, setLogInError] = useState("");

    // Handles
    const handleUserNameInput = (e) => {
        setUserName(e.target.value);
    }
    const handlePwdNameInput = (e) => {
        setPassword(e.target.value);
    }
    const handlelogInBtnClick = () => {
        const connectionData = {
            userName: userName,
            password: password
        }

        fetch(`${config.API_URL}/user/connect`, {
            method: "post",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(connectionData),
        }).then((response) => {
            if (response.status == 500)
                throw new Error("Erreur login ou password erroné");
            else
                return response.json();
        })
            .then(jsonResponse => {
                // set up token en query param
                props.callbacks.queryParamsCallbacks("token", jsonResponse.token, history);
                setLogInError("");
                // maj affichage du menu log
                props.callbacks.loggedCallback(connectionData.userName);
            })
            .catch((err) => {
                console.log(err.message);
                setLogInError("Nom d'utilisateur ou mot de passe incorrect");
            });        
    }

    return (
        <div id="logInMenu">
            <div id="logInForm">
                <div>
                    <label className="logMenuItem" htmlFor="userNameLogInInput">Nom d'utilisateur :</label>
                    <input id="userNameLogInInput" onChange={handleUserNameInput} type="text" />
                </div>
                <div>
                    <label className="logMenuItem" htmlFor="pwdLogInInput">Mot de passe: :</label>
                    <input id="pwdLogInInput" onChange={handlePwdNameInput} type="password" />
                </div>
            </div>
            <div>
                <button onClick={handlelogInBtnClick}>Connexion</button>
                <span className="error">{logInError}</span>
            </div>
        </div>
    );
}

export default LogInMenu;