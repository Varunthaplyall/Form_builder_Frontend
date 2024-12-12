import React from "react";
import AppRoutes from "./Routes/AppRoutes";
import Navbar from "./components/Navbar";
const App = () => {
  return (
    <div>
      <AppRoutes />
      <Navbar />
    </div>
  );
};

export default App;
