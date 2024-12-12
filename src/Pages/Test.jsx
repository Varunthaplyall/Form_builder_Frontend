import React, { useEffect, useState } from "react";
import CategorizeResponse from "../components/CategorizeResponse";
import ClozeResponse from "../components/ClozeResponse";
import ComprehensionResponse from "../components/ComprehensionResponse";
import { ChevronRight } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import FormService from "../services/formServices";

const Test = () => {
  const [title, setTitle] = useState("");
  const [categoriseQuestions, setCategoriseQuestions] = useState([]);
  const [clozeQuestions, setClozeQuestions] = useState([]);
  const [comprehensionQuestions, setComprehensionQuestions] = useState([]);
  const [categorizeResponses, setCategorizeResponses] = useState({});
  const [clozeResponses, setClozeResponses] = useState({});
  const [comprehensionResponses, setComprehensionResponses] = useState({});
  const { id } = useParams();
  const navigate = useNavigate();
  const getForm = async () => {
    const response = await FormService.getFormById(id);
    if (response.success) {
      setTitle(response.data.title);

      const categorizeQuestions = response.data.questions
        .filter((q) => q.type === "categorize")
        .map((q) => q.questionData);

      const clozeQuestions = response.data.questions
        .filter((q) => q.type === "cloze")
        .map((q) => q.questionData);

      const comprehensionQuestions = response.data.questions
        .filter((q) => q.type === "comprehension")
        .map((q) => q.questionData);

      setCategoriseQuestions(categorizeQuestions);
      setClozeQuestions(clozeQuestions);
      setComprehensionQuestions(comprehensionQuestions);
    } else {
      console.log(response.message);
    }
  };

  const handleResponseChange = (type, answers) => {
    if (type === "categorize") {
      setCategorizeResponses(answers);
    } else if (type === "cloze") {
      setClozeResponses(answers);
    } else if (type === "comprehension") {
      setComprehensionResponses(answers);
    }
  };

  const handleSubmit = async () => {
    const responses = {
      formId: id,
      responses: [
        ...Object.entries(categorizeResponses).map(([questionId, answer]) => ({
          questionId,
          answer,
        })),
        ...Object.entries(clozeResponses).map(([questionId, answer]) => ({
          questionId,
          answer,
        })),
        ...Object.entries(comprehensionResponses).map(
          ([questionId, answer]) => ({
            questionId,
            answer,
          })
        ),
      ],
    };

    console.log(responses);

    const res = await FormService.submitResponse(responses);
    if (res.success) {
      console.log("Response submitted successfully", res.data);
      navigate("/success");
    } else {
      console.log("Response submission failed");
    }
  };

  useEffect(() => {
    getForm();
  }, [id]);

  return (
    <div className="bg-white flex flex-col gap-14 p-6 mt-32 mx-[300px]">
      <div className="flex items-center justify-between p-4 border-b border-gray-300 bg-purple-200 rounded-md">
        <div>
          <span className="text-2xl font-bold text-gray-800">{title}</span>
        </div>
      </div>
      <CategorizeResponse
        questions={categoriseQuestions}
        onResponseChange={handleResponseChange}
      />
      <ClozeResponse
        questions={clozeQuestions}
        onResponseChange={handleResponseChange}
      />
      <ComprehensionResponse
        questions={comprehensionQuestions}
        onResponseChange={handleResponseChange}
      />

      <div className="flex justify-center">
        <button
          onClick={handleSubmit}
          className="bg-purple-500 text-white px-6 py-3 text-lg mb-10 font-medium rounded shadow hover:bg-purple-600 transition-all flex items-center gap-2"
        >
          Submit
          <ChevronRight size={16} />
        </button>
      </div>
    </div>
  );
};

export default Test;
