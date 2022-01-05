// Dépendances
import {
    BrowserRouter as Router,
    Switch,
    Route
} from "react-router-dom";
// Composants
import Liste from "./Liste.js";
import Search from "./Search.js";
import CharView from "./CharView.js";
import AddProposal from "./AddProposal.js";
import UpdateProposal from "./UpdateProposal.js";
import ValidAdd from "./ValidAdd.js";
import ValidUpdate from "./ValidUpdate";
import Inscription from "./Inscription.js";

// Styles
import "../../../styles/body/Content/Content.css"



// Composant Contenu de la page
const Content = (props) => {

    return (
        <div id="pageContent">
            <Switch>
                <Route path="/liste">
                    <Liste />
                </Route>
                <Route path="/search">
                    <Search />
                </Route>
                <Route path="/add-proposal">
                    <AddProposal />
                </Route>
                <Route path="/update-proposal">
                    <UpdateProposal />
                </Route>
                <Route path="/valid-add">
                    <ValidAdd />
                </Route>
                <Route path="/valid-update">
                    <ValidUpdate />
                </Route>
                <Route path="/inscription">
                    <Inscription />
                </Route>
                <Route path="/char/:charName" children={<CharView />} />
                <Route path="/">
                    <h2>Accueil</h2>
                </Route>
            </Switch>

        </div>
    )
}

export default Content;