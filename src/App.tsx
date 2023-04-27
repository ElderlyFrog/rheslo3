import React from 'react';
import {Heslo} from "./komponenty/Context";
import './App.css';
import {HesloProvider} from "./komponenty/Context";
function App() {
  return (
    <div >
      <HesloProvider> <Heslo/>   </HesloProvider>

    </div>
  );
}

export default App;
