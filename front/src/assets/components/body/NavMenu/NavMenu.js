// Dépendances
import { useState } from "react";
import {
  Link,
  useHistory
} from "react-router-dom";
// Styles
import "../../../styles/body/NavMenu/NavMenu.css"
// Config
import config from "../../../../config.json";

// Composant menu de navugation
const NavMenu = (props) => {
  const history = useHistory();
  const params = new URLSearchParams(history.location.search);

  // State
  const [accountLvl, setAccountLvl] = useState(0);

  // Maj options du menu de navigations
  const token = params.get("token");
  fetch(`${config.API_URL}/user/infos/${token}`)
    .then((response) => response.json())
    .then(jsonResponse => {
      setAccountLvl(jsonResponse.userLvl);
    });


  return (
    <div id="NavMenu">
      <nav>
        <div>
          {/* Options tout utilisateur */}
          <Link className="navMenuItem" to={{
            pathname: "/",
            search: props.queryParams.toString()
          }}>Accueil</Link>
        </div>
        <div>
          <Link className="navMenuItem" to={{
            pathname: "/liste",
            search: props.queryParams.toString()
          }}>liste</Link>
        </div>
        <div>
          <Link className="navMenuItem" to={{
            pathname: "/search",
            search: props.queryParams.toString()
          }}>Recherche</Link>
        </div>
        {/* Options utilisateur enregistré (lvl=1) */}
        {accountLvl >= 1 ?
          <div>
            <Link className="navMenuItem" to={{
              pathname: "/add-proposal",
              search: props.queryParams.toString()
            }}>Ajout de personnage</Link>
          </div>
          : ""}
          {accountLvl >= 1 ?
          <div>
            <Link className="navMenuItem" to={{
              pathname: "/update-proposal",
              search: props.queryParams.toString()
            }}>Modifier un personnages</Link>
          </div>
          : ""}
          {/* Options modérateur (lvl=2) */}
          {accountLvl >= 2 ?
          <div>
            <Link className="navMenuItem" to={{
              pathname: "/valid-add",
              search: props.queryParams.toString()
            }}>Valider un ajout</Link>
          </div>
          : ""}
          {accountLvl >= 2 ?
          <div>
            <Link className="navMenuItem" to={{
              pathname: "/valid-update",
              search: props.queryParams.toString()
            }}>Valider une modification</Link>
          </div>
          : ""}
          {/* Options Admin (lvl=4) */}
          {accountLvl >= 4 ?
          <div>
            <Link className="navMenuItem" to={{
              pathname: "/users-admin",
              search: props.queryParams.toString()
            }}>Gestion des utilisateurs</Link>
          </div>
          : ""}
      </nav>
    </div>
  );
};

export default NavMenu;