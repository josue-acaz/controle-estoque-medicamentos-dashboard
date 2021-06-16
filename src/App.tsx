import React from "react";
import {BrowserRouter} from "react-router-dom";

// contexts
import {AuthProvider} from "./contexts/auth/auth.context";

// routes
import Routes from "./routes";

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes />
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
