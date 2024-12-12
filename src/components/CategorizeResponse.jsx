import React, { useState, useEffect } from "react";

const CategorizeResponse = ({ questions, onResponseChange }) => {
  const [categoriesState, setCategoriesState] = useState({});
  const [placedItems, setPlacedItems] = useState({});

  useEffect(() => {
    if (questions && questions.length > 0) {
      const allCategoriesObj = questions.reduce((acc, question, index) => {
        acc[index] = question.categories.reduce((catAcc, category) => {
          catAcc[category] = [];
          return catAcc;
        }, {});
        return acc;
      }, {});
      setCategoriesState(allCategoriesObj);
      setPlacedItems(
        questions.reduce((acc, _, index) => {
          acc[index] = new Set();
          return acc;
        }, {})
      );
    }
  }, [questions]);

  useEffect(() => {
    if (onResponseChange) {
      onResponseChange("categorize", categoriesState);
    }
  }, [categoriesState, onResponseChange]);

  const handleDragStart = (e, item, questionIndex) => {
    e.dataTransfer.setData("text", JSON.stringify({ item, questionIndex }));
  };

  const handleDrop = (e, category, questionIndex) => {
    e.preventDefault();
    const { item } = JSON.parse(e.dataTransfer.getData("text"));

    // Update categories
    setCategoriesState((prev) => {
      const newState = {
        ...prev,
        [questionIndex]: {
          ...prev[questionIndex],
          [category]: [...prev[questionIndex][category], item],
        },
      };
      return newState;
    });

    setPlacedItems((prev) => ({
      ...prev,
      [questionIndex]: new Set([...prev[questionIndex], item]),
    }));
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  if (!questions || questions.length === 0) return null;

  return (
    <div className="space-y-8">
      {questions.map((question, questionIndex) => (
        <div
          key={questionIndex}
          className="bg-white border rounded-lg p-6 shadow-md"
        >
          <div className="flex justify-between mb-4">
            <h2 className="text-xl">{question.description}</h2>
            <div className="flex gap-4">
              <button className="rounded-full p-2">↺</button>
              <div className="rounded-full border px-4 py-2">10 Points</div>
            </div>
          </div>

          <div className="flex gap-4 mb-8 justify-center">
            {question.items
              .filter((item) => !placedItems[questionIndex]?.has(item.text))
              .map((item) => (
                <div
                  key={item.text}
                  draggable
                  onDragStart={(e) =>
                    handleDragStart(e, item.text, questionIndex)
                  }
                  className="border rounded-full px-4 py-2 cursor-move"
                >
                  {item.text}
                </div>
              ))}
          </div>

          <div className="flex gap-8 justify-center">
            {question.categories.map((category, index) => (
              <div
                key={category}
                className={`bg-${getCategoryColor(
                  category,
                  index
                )} rounded-xl p-4 w-64`}
                onDrop={(e) => handleDrop(e, category, questionIndex)}
                onDragOver={handleDragOver}
              >
                <h3 className="text-center mb-4">{category}</h3>
                {categoriesState[questionIndex]?.[category]?.map((item) => (
                  <div
                    key={item}
                    className="border rounded-full px-4 py-2 mb-2 bg-white"
                  >
                    {item}
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

const getCategoryColor = (category, index) => {
  return index % 2 === 0 ? "red-100" : "yellow-100";
};

export default CategorizeResponse;
