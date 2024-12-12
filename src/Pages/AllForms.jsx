import React, { useState, useEffect } from "react";
import FormService from "../services/formServices";
import { useNavigate } from "react-router-dom";

const AllForms = () => {
  const [forms, setForms] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchForms = async () => {
      const response = await FormService.getAllForms();
      setForms(response.data);
    };
    fetchForms();
  }, []);

  const handleFormClick = (formId) => {
    navigate(`/test/${formId}`);
  };

  return (
    <div className="mt-32 mx-[300px]">
      <div className="flex flex-col gap-4">
        <h1 className="text-2xl font-bold">My Forms</h1>
        <span className="text-sm text-gray-500 border-b-2 border-gray-500"></span>
        <div className="grid gap-4">
          {forms.map((form) => (
            <div
              key={form._id}
              onClick={() => handleFormClick(form._id)}
              className="p-4 border rounded-lg shadow-sm hover:shadow-md transition-shadow cursor-pointer bg-white"
            >
              <div className="flex justify-between items-center">
                <h2 className="text-xl font-semibold">{form.title}</h2>
                <span className="text-sm text-gray-500">
                  {new Date(form.createdAt).toLocaleDateString()}
                </span>
              </div>
              <p className="text-gray-600 mt-2">
                {form.questions.length} Questions
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AllForms;
