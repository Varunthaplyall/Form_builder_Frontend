import React, { useState, useEffect } from "react";
import { Plus } from "lucide-react";
import Draggable from "./Draggable";

const ComprehensionQuestion = ({ onSave }) => {
  const [passage, setPassage] = useState("");
  const [questions, setQuestions] = useState([]);

  const addQuestion = () => {
    setQuestions([
      ...questions,
      {
        text: "",
        options: ["", "", "", ""],
        correctAnswer: null,
      },
    ]);
  };

  const updateQuestion = (index, field, value) => {
    const newQuestions = [...questions];
    newQuestions[index][field] = value;
    setQuestions(newQuestions);
  };

  const updateOption = (qIndex, oIndex, value) => {
    const newQuestions = [...questions];
    newQuestions[qIndex].options[oIndex] = value;
    setQuestions(newQuestions);
  };

  const handleSave = () => {
    onSave({
      type: "comprehension",
      passage,
      questions,
    });
  };

  useEffect(() => {
    handleSave();
  }, [questions, passage]);

  const moveOption = (questionIndex, dragIndex, hoverIndex) => {
    const newQuestions = [...questions];
    const options = [...newQuestions[questionIndex].options];
    const [draggedOption] = options.splice(dragIndex, 1);
    options.splice(hoverIndex, 0, draggedOption);

    let correctAnswer = newQuestions[questionIndex].correctAnswer;
    if (correctAnswer === dragIndex) {
      correctAnswer = hoverIndex;
    } else if (correctAnswer === hoverIndex) {
      correctAnswer = dragIndex;
    }

    newQuestions[questionIndex] = {
      ...newQuestions[questionIndex],
      options,
      correctAnswer,
    };
    setQuestions(newQuestions);
  };
  return (
    <div className="bg-white border rounded-lg p-6 shadow-md">
      <h3 className="text-xl font-semibold mb-4 text-gray-800">
        Comprehension Question
      </h3>

      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Passage
        </label>
        <textarea
          value={passage}
          onChange={(e) => setPassage(e.target.value)}
          placeholder="Enter the comprehension passage"
          className="w-full border rounded px-3 py-2"
          rows={6}
        />
      </div>

      {/* MCQ Questions */}
      <div>
        <h4 className="text-lg font-semibold mb-4">
          Multiple Choice Questions
        </h4>
        {questions.map((question, qIndex) => (
          <div key={qIndex} className="border-t pt-4 mt-4">
            <div className="mb-3">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Question {qIndex + 1}
              </label>
              <input
                type="text"
                value={question.text}
                onChange={(e) => updateQuestion(qIndex, "text", e.target.value)}
                placeholder="Enter question text"
                className="w-full border rounded px-3 py-2 mb-2"
              />
            </div>
            {question.options.map((option, oIndex) => (
              <Draggable
                key={oIndex}
                id={`option-${qIndex}-${oIndex}`}
                index={oIndex}
                moveItem={(dragIndex, hoverIndex) =>
                  moveOption(qIndex, dragIndex, hoverIndex)
                }
              >
                <div className="flex items-center space-x-2 mb-2">
                  <input
                    type="text"
                    value={option}
                    onChange={(e) =>
                      updateOption(qIndex, oIndex, e.target.value)
                    }
                    placeholder={`Option ${oIndex + 1}`}
                    className="flex-grow border rounded px-3 py-2"
                  />
                  <input
                    type="radio"
                    name={`correct-${qIndex}`}
                    checked={question.correctAnswer === oIndex}
                    onChange={() =>
                      updateQuestion(qIndex, "correctAnswer", oIndex)
                    }
                  />
                </div>
              </Draggable>
            ))}
          </div>
        ))}

        <div className="mt-4 flex space-x-2">
          <button
            onClick={addQuestion}
            className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 flex items-center"
          >
            <Plus size={16} className="mr-2" /> Add MCQ Question
          </button>
        </div>
      </div>
    </div>
  );
};

export default ComprehensionQuestion;
