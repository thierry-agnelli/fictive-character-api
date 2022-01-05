// Dépendances
import { useState, useEffect } from "react";
// Styles
import "../../../styles/body/Content/AddProposal/AddProposal.css"
// config
import config from "../../../../config.json";


// Composant proposition de personnages
const AddProposal = () => {
    // State
    // const [newCharacter, setNewCharacter] = useState({});
    const [charName, setCharName] = useState("");
    const [charAlias, setCharAlias] = useState("");
    const [charLicence, setCharLicence] = useState("");
    const [charSentence, setCharSentence] = useState("");

    // Handle
        // Nom de personnage
    const handleNameInput = (e) => {
        setCharName(e.target.value);
    }
        // Alias du personnage
    const handleAliasInput = (e) => {
        setCharAlias(e.target.value);
    }
        // Licence du personnage
    const handleLicenceInput = (e) => {
        setCharLicence(e.target.value);
    }
        // Phrase fétiche du personnage
    const handleSentenceInput = (e) => {
        setCharSentence(e.target.value);
    }
        // Click sur le bouton proposer
    const handleProposalBtnClick = (e) => {
        e.preventDefault();
        const newCharacter = {
            name: charName,
            alias: charAlias,
            licence: charLicence,
            sentence: charSentence
        };

        fetch(`${config.API_URL}/char/add-proposal`, {
            method: "post",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newCharacter),
        })
            .then((response) => {
                if (response.status == 500)
                    throw new Error("Request failed");
                else {
                    console.log(response);
                }
            })
            .catch((response) => {
                console.log("Error");
                console.log(response);
            });
    };

    // Hook d'envoie des données
    // useEffect(() => {
    //     fetch("http://localhost:3001/char/add-proposal", {
    //         method: "post",
    //         headers: {
    //             'Accept': 'application/json',
    //             'Content-Type': 'application/json'
    //         },
    //         body: JSON.stringify(newCharacter),
    //     })
    //         .then((response) => {
    //             if (response.status == 500)
    //                 throw new Error("Request failed");
    //             else {
    //                 console.log(response);
    //             }
    //         })
    //         .catch((response) => {
    //             console.log("Error");
    //             console.log(response);
    //         });
    // }, [newCharacter])


    return (
        <div id="addProposalContainer">
            <h2>Ajouter un personnage</h2>
            <form>
                <div className="inputItem">
                    <label htmlfor="charNameInput">Nom de personnage <span className="required">*</span> :</label><br />
                    <input id="charNameInput" type="text" onChange={handleNameInput} />
                </div>
                <div className="inputItem">
                    <label htmlfor="aliasInput">Alias :</label><br />
                    <input id="aliasInput" onChange={handleAliasInput} type="text" />
                </div>
                <div className="inputItem">
                    <label htmlfor="licenceInput">Licence <span className="required">*</span> :</label><br />
                    <input id="licenceInput" onChange={handleLicenceInput} type="text" />
                </div>
                <div className="inputItem">
                    <label htmlfor="sentenceInput">Phrase fétiche <span className="required">*</span> :</label><br />
                    <input id="sentenceInput" onChange={handleSentenceInput} type="text" />
                </div>
                <div className="inputItem">
                    <button onClick={handleProposalBtnClick}>Proposer</button>
                </div>
            </form>
            {/* {userSaved ? <Redirect to="/" /> : ""} */}
        </div>
    );
}

export default AddProposal;