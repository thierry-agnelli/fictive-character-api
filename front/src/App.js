// Dépendances
import { useState } from "react";
import {
  BrowserRouter as Router
} from "react-router-dom";
// Components
import Title from "./assets/components/header/Title/Title.js"
import Banner from "./assets/components/header/Banner/Banner.js"
import NavMenu from "./assets/components/body/NavMenu/NavMenu.js"
import Content from "./assets/components/body/Content/Content.js"
// Styles
import './App.css';

function App() {

  // State
  const [queryParams, setQueryParams] = useState(new URLSearchParams);
  const [reload, setReload] = useState(false);
  const [focusCharName, setFocusCharName] = useState("");
  
  // Callback
  const queryParamsCallback = (name, value, history) => {
    
    if (value != null) {
      //maj de l'url avec les queryParams
      if (queryParams.get(name) == null)
        queryParams.append(name, value);
      
      history.replace({
        pathname: history.location.pathname,
        search: queryParams.toString()
      });
    }
    else{
      // Supression de l'url des queryParams
      queryParams.delete(name);
      history.replace({
        pathname: history.location.pathname,
        search: ""
      });
    }
    setReload(!reload);
  };

  return (
    <div className="App">
      <Router>
        <header className="App-header">
          <Title />
          <Banner queryParamsCallbacks={queryParamsCallback} />
        </header>
        <section id="pageBody">
          <NavMenu queryParams={queryParams} />
          <Content />
        </section>
      </Router>
    </div>
  );
}

export default App;
