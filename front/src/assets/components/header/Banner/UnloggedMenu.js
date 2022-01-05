// Dépendances
import {
    Link,
} from "react-router-dom";



// Composant Menu Unlog
const UnloggedMenu = (props) => {

    // Handles
    const handleLoginClick = () => {
        props.callback();
    };
    
    return (
        <div className="logMenu">
            <span className="logMenuItem" onClick={handleLoginClick}>Connexion</span>
                <Link className="logMenuItem" to="/inscription">S'inscrire</Link>
        </div>
    )
}

export default UnloggedMenu;