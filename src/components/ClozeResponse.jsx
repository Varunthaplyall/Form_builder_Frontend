import React, { useState, useEffect } from "react";

const ClozeResponse = ({ questions, onResponseChange }) => {
  const [answers, setAnswers] = useState({});
  const [usedOptions, setUsedOptions] = useState({});

  const handleDragStart = (e, option) => {
    e.dataTransfer.setData("text", option);
  };

  const handleDrop = (e, questionIndex, blankId) => {
    e.preventDefault();
    const option = e.dataTransfer.getData("text");

    const previousAnswer = answers[`q${questionIndex}_${blankId}`];

    if (previousAnswer) {
      setUsedOptions((prev) => ({
        ...prev,
        [`${questionIndex}_${previousAnswer}`]: false,
      }));
    }

    // Set the new answer
    setAnswers((prev) => {
      const newAnswers = {
        ...prev,
        [`q${questionIndex}_${blankId}`]: option,
      };
      return newAnswers;
    });

    setUsedOptions((prev) => ({
      ...prev,
      [`${questionIndex}_${option}`]: true,
    }));
  };

  const handleReset = (questionIndex) => {
    const currentAnswerKeys = Object.keys(answers).filter((key) =>
      key.startsWith(`q${questionIndex}_`)
    );
    const newAnswers = { ...answers };
    currentAnswerKeys.forEach((key) => delete newAnswers[key]);
    setAnswers(newAnswers);

    setUsedOptions((prev) => {
      const newUsedOptions = { ...prev };
      Object.keys(newUsedOptions).forEach((key) => {
        if (key.startsWith(`${questionIndex}_`)) {
          delete newUsedOptions[key];
        }
      });
      return newUsedOptions;
    });
  };

  useEffect(() => {
    if (onResponseChange) {
      onResponseChange("cloze", answers);
    }
  }, [answers, onResponseChange]);

  if (!questions?.length) return null;

  return (
    <div className="bg-white border rounded-lg p-6 shadow-md space-y-8">
      {questions.map((question, questionIndex) => (
        <div key={questionIndex} className="border-b pb-8 last:border-b-0">
          <div className="flex justify-between mb-4">
            <h2 className="text-xl">Question {questionIndex + 1}</h2>
            <div className="flex gap-4 items-center">
              <button
                onClick={() => handleReset(questionIndex)}
                className="rounded-full p-2 hover:bg-gray-100"
              >
                ↺
              </button>
              <div className="rounded-full border px-4 py-2">10 Points</div>
            </div>
          </div>

          <div className="flex gap-4 mb-8 justify-center">
            {question.options.map(
              (option, index) =>
                !usedOptions[`${questionIndex}_${option}`] && (
                  <div
                    key={index}
                    draggable
                    onDragStart={(e) => handleDragStart(e, option)}
                    className="border rounded-full px-4 py-2 cursor-move hover:bg-gray-50"
                  >
                    {option}
                  </div>
                )
            )}
          </div>

          <div className="bg-blue-50 rounded-xl p-8 text-lg text-center leading-loose">
            {question.sentence.split("____").map((part, index, array) => (
              <React.Fragment key={index}>
                {part}
                {index < array.length - 1 && (
                  <span
                    className="blank inline-block min-w-[80px] px-4 py-2 mx-1 rounded-full"
                    onDrop={(e) =>
                      handleDrop(e, questionIndex, `blank${index}`)
                    }
                    onDragOver={(e) => e.preventDefault()}
                    style={{
                      backgroundColor: answers[
                        `q${questionIndex}_blank${index}`
                      ]
                        ? "white"
                        : "#E0E0E0",
                    }}
                  >
                    {answers[`q${questionIndex}_blank${index}`] || ""}
                  </span>
                )}
              </React.Fragment>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default ClozeResponse;
