// Dépendances
import { useState, useEffect } from "react";
// Components
import Character from "./Character.js";

// Composant de recherche par nom
const Search = () => {
    // State
    const [search, setSearch] = useState("");
    const [character, setCharacter] = useState("");
    const [reload, setReload] = useState(true);

    // Handle
    const handleNameSearchInput = (e) => {
        setSearch(e.target.value);
    };

    const handleClickSearchBtn = () => {
        setCharacter(search);
        setReload(!reload);
    };

    return (
        <div>
            <h2>Recherche de personnage</h2>
            <div>
                <label htmlFor="inputSearchText">Nom du personnage : </label>
                <input onChange={handleNameSearchInput} id="inputSearchName" type="text" />
                <button onClick={handleClickSearchBtn}>Rechercher</button>
                {character != "" ? <Character charName={character} /> : ""}
                {/* <Character charName={character} /> */}
            </div>
        </div>
    );
};

export default Search;