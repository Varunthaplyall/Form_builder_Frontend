import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Form from "../Pages/Form";
import Test from "../Pages/Test";
import AllForms from "../Pages/AllForms";
import Success from "../Pages/Success";
const AppRoutes = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Navigate to="/form" />} />
        <Route path="/form" element={<Form />} />
        <Route path="/test/:id" element={<Test />} />
        <Route path="/all" element={<AllForms />} />
        <Route path="/success" element={<Success />} />
      </Routes>
    </div>
  );
};

export default AppRoutes;
