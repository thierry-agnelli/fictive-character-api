// Dépendances
import { useState, useEffect } from "react";
// Composants
import WaitingChar from "./WaitingChar";
// Config
import config from "../../../../config.json";

// Composant de validation des ajouts de personnages
const ValidUpdate = () => {
    // State
    const [waitingCharList, setWaitingCharList] = useState([]);
    const [reload, setReload] = useState(false);

    // CallBacks
    const callbacks = {
        validate: (charID) => {
            console.log(charID + " validate");
            fetch(`${config.API_URL}/char/validate-update/${charID}`)
            .then(() =>{
                setReload(!reload);
            });
        },
        reject: (charID) => {
            console.log(charID + " rejected");
            fetch(`${config.API_URL}/char/reject-update/${charID}`)
            .then(() =>{
                setReload(!reload);
            });
        }
    };

    // Récupération de la liste des personnages en attente de validation d'ajout
    useEffect(() => {
        fetch(`${config.API_URL}/char/waiting-update`)
            .then(response => {
                return response.json();
            })
            .then(jsonResponse => {
                setWaitingCharList(jsonResponse);
            });
    }, [reload]);

    return (
        <div>
            <h2>Validation de modifications de personnages.</h2>
            {waitingCharList.map(char=>
                <WaitingChar key={char._id} char={char} callbacks={callbacks}/>
            )}
        </div>
    );
};
export default ValidUpdate;