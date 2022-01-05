// Dépendances
import { useState, useEffect, useRef } from "react";
import { Redirect, Link } from "react-router-dom";
// Styles
import "../../../styles/body/Content/Inscription/Inscription.css";
// config
import config from "../../../../config.json";

// Composant Inscription
const Inscription = () => {
    //Références
    const pwdInputRef = useRef(null);
    // States
    const [newUser, setNewUser] = useState({});
    const [userName, setUserName] = useState("");
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");
    const [userSaved, setUserSaved] = useState(false);

    // Handles
        // UserName
    const handeUserNameInput = (e) => {
        setUserName(e.target.value);
    };
        // Password 
    const handlePasswordInput = (e) => {
        // Enregistrement si le mot de pass répété est le même
        if(pwdInputRef.current.value == e.target.value){
            e.target.classList.remove("unvalidPwd");
            setPassword(e.target.value);
        }
        // Changement de couleur de la case répéter pwd si ce n'est pas le même
        else{
            e.target.classList.add("unvalidPwd");
        }
    };
        // e-mail
    const handleEmailInput = (e) =>{
        setEmail(e.target.value);
    }
        // subscribe
    const handleSubscribeBtnClick = (e) => {
        e.preventDefault();
        setNewUser({
            userName: userName,
            password: password,
            email: email
        });
    }

    // Hook d'envoie des données
    useEffect(()=>{
        fetch(`${config.API_URL}/user/create`,{
            method: "post",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
              },
            body: JSON.stringify(newUser),
        })
        .then( (response) => {
            if (response.status == 500)
                throw new Error("Inscription failed");
            else{
            console.log("OK");
            console.log(response);
            setUserSaved("true");}
        })
        .catch( (response)=>{
            console.log("Error");
            console.log(response);
        });        
    },[newUser])

    return(
        <div id="subscribeContainer">
            <h2>Création de compte</h2>
            <form>
                <div className="inputItem">
                    <label htmlfor="userNameInput">Nom d'utilisateur <span className="required">*</span> :</label><br/>
                    <input id="userNameInput" type="text" onChange={handeUserNameInput}/>
                </div>
                <div className="inputItem">
                    <label htmlfor="pwdInput">Mot de passe <span className="required">*</span> :</label><br/>
                    <input id="pwdInput" ref={pwdInputRef} type="password"/>
                </div>
                <div className="inputItem">
                    <label htmlfor="RepeatPwdInput">Répéter mot de passe <span className="required">*</span> :</label><br/>
                    <input id="RepeatPwdInput" onChange={handlePasswordInput} type="password"/>
                </div>
                <div className="inputItem">
                    <label htmlfor="emailInput">email <span className="required">*</span> :</label><br/>
                    <input id="emailInput" onChange={handleEmailInput} type="text"/>
                </div>
                <div className="inputItem">
                    <button onClick={handleSubscribeBtnClick}>S'inscrire</button>
                </div>
            </form>
            {userSaved?<Redirect to="/"/>:""}
        </div>
    );
};

export default Inscription;