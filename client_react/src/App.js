import React from "react";
import {BrowserRouter} from "react-router-dom";
import AppRouter from "./components/AppRouter";


const App = () =>{
  return (
      <BrowserRouter>
        {/*<NavBar />*/}

        <AppRouter />
        {/*<Footer />*/}
      </BrowserRouter>
  );
}

export default App;
