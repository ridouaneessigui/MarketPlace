import React from "react";
import {BrowserRouter} from 'react-router-dom'
import {DataProvider}from'./Globalstate'
import  Header   from "./components/Header/Header";
import  Pages  from "./components/pages/Pages";
function App() {
  return (
    <DataProvider>
      <BrowserRouter>
        <div>
          <Header/>
          <Pages/>
        </div>
      </BrowserRouter>
    </DataProvider>
  );
}

export default App;
