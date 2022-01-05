// Dépendances
import { useState, useEffect } from "react";
import {
    Link,
  } from "react-router-dom";
// Config
import config from "../../../../config.json";

// Composant Liste de personnages
const List = () => {
    // State
    const [list, setList] = useState([]);

    useEffect(() => {
        fetch(`${config.API_URL}/char/list`)
            .then(response => response.json())
            .then(jsonResponse => {
                setList(jsonResponse);
            });
    }, []);

    return (
        <div>
            <h2>Liste des personnages</h2>
            <ul>
                {list.map((char) =><li  key={char._id}><Link className="contentLink" to={`/char/${char.name}`}>{char.name}</Link></li>)}
            </ul>
        </div>
    );
};

export default List;