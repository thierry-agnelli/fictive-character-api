// Dépendances
import { placeholder } from "@babel/types";
import { useState, useRef } from "react";
// Config
import config from "../../../../config.json";

const UpdateProposal = () => {
    // States
    const [search, setSearch] = useState("");
    const [charToUpdate, setCharToUpdate] = useState({});
    const [nameUpdate, setNameUpdate] = useState("");
    const [aliasUpdate, setAliasUpdate] = useState("");
    const [licenceUpdate, setLicenceUpdate] = useState("");
    const [sentenceUpdate, setSentenceUpdate] = useState("");

    // Références
    const nameUpdateRef = useRef(null);
    const aliasUpdateRef = useRef(null);
    const licenceUpdateRef = useRef(null);
    const sentenceUpdateRef = useRef(null);

    // Handle
    const handleNameSearchInput = (e) => {
        setSearch(e.target.value);
    };

    // Récupération du personnage à modifier
    const handleClickSearchBtn = () => {
        fetch(`${config.API_URL}/char/search/${search}`)
            .then(response => {
                if (response.status == 200)
                    return response.json();
                else
                    throw new Error("Character not found !");
            })
            .then(jsonResponse => {
                setCharToUpdate(jsonResponse);
            })
            .catch((err) => {
                console.log(err.message);
            });
    };


    // Nom de personnage
    const handleNameInput = (e) => {
        setNameUpdate(e.target.value);
    }
    // Alias du personnage
    const handleAliasInput = (e) => {
        setAliasUpdate(e.target.value);
    }
    // Licence du personnage
    const handleLicenceInput = (e) => {
        setLicenceUpdate(e.target.value);
    }
    // Phrase fétiche du personnage
    const handleSentenceInput = (e) => {
        setSentenceUpdate(e.target.value);
    }

    // Click sur le bouton proposer
    const handleProposalBtnClick = (e) => {
        e.preventDefault();

        // Préparation du personnage à modifié
        const updatedChar = {
            originalID: charToUpdate._id,
            name: charToUpdate.name,
            alias: charToUpdate.alias,
            licence: charToUpdate.licence,
            sentence: charToUpdate.sentence
        };

        let charChanged = false;

        // Vérification si il y a eu un changement dans les champs :
            // Nom
        if(nameUpdate != ""){
            charChanged += true;
            updatedChar.name = nameUpdate;
        }
            // Alias
        if(aliasUpdate != ""){
            charChanged += true;
            updatedChar.alias = aliasUpdate;
        }
            // License
        if(licenceUpdate != ""){
            charChanged += true;
            updatedChar.licence = licenceUpdate;
        }
            // Phrase fétiche
        if(sentenceUpdate != ""){
            charChanged += true;
            updatedChar.sentence = sentenceUpdate;
        }
        
        if(charChanged){
            fetch(`${config.API_URL}/char/update-proposal`, {
            method: "post",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(updatedChar),
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
        }
    };

    return (
        <div>
            <h2>Proposer une modification</h2>
            <div>
                <label htmlFor="inputSearchText">Nom du personnage : </label>
                <input onChange={handleNameSearchInput} id="inputSearchName" type="text" />
                <button onClick={handleClickSearchBtn}>Rechercher</button>
            </div>
            <form>
                <div className="inputItem">
                    <label htmlfor="charNameInput" >Nom de personnage <span className="required">*</span> :</label><br />
                    <input useRef={nameUpdateRef} id="charNameInput" type="text" onChange={handleNameInput} placeholder={charToUpdate.name}/>
                </div>
                <div className="inputItem">
                    <label htmlfor="aliasInput">Alias :</label><br />
                    <input useRef={aliasUpdateRef} id="aliasInput" onChange={handleAliasInput} type="text" placeholder={charToUpdate.alias}/>
                </div>
                <div className="inputItem">
                    <label htmlfor="licenceInput">Licence <span className="required">*</span> :</label><br />
                    <input useRef={licenceUpdateRef} id="licenceInput" onChange={handleLicenceInput} type="text" placeholder={charToUpdate.licence}/>
                </div>
                <div className="inputItem">
                    <label htmlfor="sentenceInput">Phrase fétiche <span className="required">*</span> :</label><br />
                    <input useRef={sentenceUpdateRef} id="sentenceInput" onChange={handleSentenceInput} type="text" placeholder={charToUpdate.sentence}/>
                </div>
                <div className="inputItem">
                    <button onClick={handleProposalBtnClick}>Proposer</button>
                </div>
            </form>
        </div>
    );
};

export default UpdateProposal;