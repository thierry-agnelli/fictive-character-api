// Dépendances
import { useState } from "react";
import { Redirect } from "react-router-dom";
// Components
import UnloggedMenu from "./UnloggedMenu.js";
import LoggedMenu from "./LoggedMenu.js";
import LogInMenu from "./LogInMenu.js";
// Styles
import "../../../styles/header/Banner/Banner.css";

// Composant Titre de la page
const Banner = (props) => {
    const [logged, setLogged] = useState(false);
    const [logIn, setLogIn] = useState(false);

    
    // CallBack de conenxion
    const logInCallback = () => {
        setLogIn(true);
    }

    const loggedCallback = () => {
        setLogged(!logged);
        setLogIn(false);
    }

    const logInCallbacks = {
        queryParamsCallbacks: props.queryParamsCallbacks,
        loggedCallback: loggedCallback
    }

    return (
        <div id="banner">
            {!logged ?
                !logIn ? <UnloggedMenu callback={logInCallback} />
                 : <LogInMenu callbacks={logInCallbacks}/>
                : <LoggedMenu callbacks={logInCallbacks} />
            }
            {!logged ? <Redirect to="/" /> : ""}
        </div>
    );
}

export default Banner;