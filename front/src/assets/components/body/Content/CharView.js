// Dépendances
import {
    Link, useParams,
} from "react-router-dom";
// Composants
import Character from "./Character";

// Composant d'affichage des personnages avec les liens de la liste
const CharView = () => {
    const { charName } = useParams();
    return (
        <div>
            <Character charName={charName}/>
            <Link className="contentLink" to="/Liste">Retour</Link>
        </div>
    );
};
export default CharView;