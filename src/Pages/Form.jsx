import React, { useState, useCallback } from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import CategorizeQuestions from "../components/CategorizeQuestions";
import ClozeQuestion from "../components/ClozeQuestion";
import ComprehensionQuestion from "../components/ComprehensionQuestion";
import FormService from "../services/formServices";
import { Eye, ChevronDown } from "lucide-react";
import { useNavigate } from "react-router-dom";
const Form = () => {
  const [categoriesData, setCategoriesData] = useState([null]);
  const [clozeData, setClozeData] = useState([]);
  const [comprehensionData, setComprehensionData] = useState([]);
  const [title, setTitle] = useState("");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const navigate = useNavigate();

  const handleAddCategorizeQuestion = useCallback((data, index) => {
    setCategoriesData((prev) => {
      const newData = [...prev];
      newData[index] = data;
      return newData;
    });
  }, []);

  const handleAddClozeQuestion = useCallback((data, index) => {
    setClozeData((prev) => {
      const newData = [...prev];
      newData[index] = data;
      return newData;
    });
  }, []);

  const handleAddComprehensionQuestion = useCallback((data, index) => {
    setComprehensionData((prev) => {
      const newData = [...prev];
      newData[index] = data;
      return newData;
    });
  }, []);

  const handleSave = async () => {
    const questions = [
      ...categoriesData.map((data) => ({
        type: "categorize",
        questionData: {
          categories: data.categories,
          description: data.description,
          items: data.items,
        },
      })),
      ...clozeData.map((data) => ({
        type: "cloze",
        questionData: {
          blanks: data.blanks,
          options: data.options,
          sentence: data.sentence,
        },
      })),
      ...comprehensionData.map((data) => ({
        type: "comprehension",
        questionData: {
          passage: data.passage,
          questions: data.questions,
        },
      })),
    ];

    if (questions.length === 0) {
      alert("Please add at least one question before saving");
      return;
    }

    const response = await FormService.createForm({ questions, title });
    if (response.success) {
      console.log(response.data);
      navigate("/all");
    } else {
      console.log(response.message);
    }
  };

  const questionTypes = [
    {
      name: "Categorize Question",
      action: () => setCategoriesData((prev) => [...prev, null]),
    },
    {
      name: "Cloze Question",
      action: () => setClozeData((prev) => [...prev, null]),
    },
    {
      name: "Comprehension Question",
      action: () => setComprehensionData((prev) => [...prev, null]),
    },
  ];

  return (
    <div className="bg-white flex flex-col gap-4 p-6 mt-32 mx-[300px]">
      <div className="flex items-center justify-between p-4 border-b border-gray-300 bg-gray-50 rounded-md">
        <div>
          <span className="text-2xl font-bold text-gray-800">Form</span>
        </div>
        <div className="flex items-center gap-4">
          <div className="relative">
            <button
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className="bg-blue-500 text-white px-6 py-2 text-sm font-medium rounded shadow hover:bg-blue-600 transition-all flex items-center gap-2"
            >
              Add Question
              <ChevronDown size={16} />
            </button>
            {isDropdownOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg z-10 border border-gray-200">
                {questionTypes.map((type, index) => (
                  <button
                    key={index}
                    onClick={() => {
                      type.action();
                      setIsDropdownOpen(false);
                    }}
                    className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 first:rounded-t-md last:rounded-b-md"
                  >
                    {type.name}
                  </button>
                ))}
              </div>
            )}
          </div>
          <button
            onClick={handleSave}
            className="bg-blue-500 text-white px-6 py-2 text-sm font-medium rounded shadow hover:bg-blue-600 transition-all"
          >
            Save
          </button>
          <Eye className="text-2xl text-gray-800 hover:text-blue-500 cursor-pointer" />
        </div>
      </div>

      <div className="flex flex-col flex-start gap-4">
        <div className="w-[1000px] flex flex-col gap-8">
          <div className="flex gap-4">
            <span className="text-3xl text-black">Title :</span>
            <input
              type="text"
              placeholder="Enter title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="border-b-2 justify-self-end border-gray-300 p-2 outline-none"
            />
          </div>
          <DndProvider backend={HTML5Backend}>
            {categoriesData.map((_, index) => (
              <CategorizeQuestions
                key={index}
                onSave={(data) => handleAddCategorizeQuestion(data, index)}
              />
            ))}
            {clozeData.map((_, index) => (
              <ClozeQuestion
                key={index}
                onSave={(data) => handleAddClozeQuestion(data, index)}
              />
            ))}
            {comprehensionData.map((_, index) => (
              <ComprehensionQuestion
                key={index}
                onSave={(data) => handleAddComprehensionQuestion(data, index)}
              />
            ))}
          </DndProvider>
        </div>
      </div>
    </div>
  );
};

export default Form;
