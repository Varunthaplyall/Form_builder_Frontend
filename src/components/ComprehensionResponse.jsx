import React, { useState, useEffect } from "react";

const ComprehensionResponse = ({ questions, onResponseChange }) => {
  const [selectedOptions, setSelectedOptions] = useState({});
  const [question, setQuestion] = useState([]);

  useEffect(() => {
    setQuestion(questions);
  }, [questions]);

  useEffect(() => {
    if (onResponseChange) {
      onResponseChange("comprehension", selectedOptions);
    }
  }, [selectedOptions, onResponseChange]);

  const handleOptionChange = (questionIndex, value) => {
    setSelectedOptions((prev) => ({
      ...prev,
      [questionIndex]: value,
    }));
  };

  if (!question.length) return null;

  return (
    <div className="p-6 bg-white rounded-lg shadow-md">
      <div className="flex justify-between items-start">
        <h2 className="text-lg font-semibold mb-2">Comprehension Questions</h2>
        <button className="text-gray-400">
          <span className="sr-only">Bookmark</span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z"
            />
          </svg>
        </button>
      </div>

      <p className="mb-4 text-gray-700">{question[0].passage}</p>

      {question[0].questions.map((q, questionIndex) => (
        <div key={questionIndex} className="border rounded-lg p-4 mb-4">
          <div className="flex items-center mb-3">
            <svg
              className="w-4 h-4 text-gray-500 transform rotate-90"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 9l-7 7-7-7"
              />
            </svg>
            <span className="ml-2 font-medium">
              Question {questionIndex + 1}
            </span>
          </div>

          <p className="mb-4">{q.text}</p>

          <div className="space-y-3">
            {q.options.map((option, index) => (
              <label key={index} className="flex items-center">
                <input
                  type="radio"
                  name={`question-${questionIndex}`}
                  value={option}
                  checked={selectedOptions[questionIndex] === option}
                  onChange={(e) =>
                    handleOptionChange(questionIndex, e.target.value)
                  }
                  className="mr-3"
                />
                <span>{option}</span>
              </label>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default ComprehensionResponse;
