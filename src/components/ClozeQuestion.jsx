import React, { useState, useRef, useEffect } from "react";
import { PlusCircle, Underline, Move } from "lucide-react";
import Draggable from "./Draggable";

const ClozeQuestion = ({ onSave }) => {
  const [sentence, setSentence] = useState("");
  const [blanks, setBlanks] = useState([]);
  const [options, setOptions] = useState([]);
  const [originalSentence, setOriginalSentence] = useState("");
  const inputRef = useRef(null);
  const underlineRef = useRef(null);

  const handleUnderline = (e) => {
    e.preventDefault();
    const input = inputRef.current;
    const selectedText = input.value
      .substring(input.selectionStart, input.selectionEnd)
      .trim();

    if (selectedText) {
      const start = input.selectionStart;
      const end = input.selectionEnd;

      console.log("Start position:", start);

      const newBlank = {
        text: selectedText,
        start,
        end,
      };

      console.log("New blank:", newBlank);

      const newBlanks = [...blanks, newBlank].sort((a, b) => a.start - b.start);
      setBlanks(newBlanks);
      setOptions([...options, selectedText]);

      let previewSentence = originalSentence;
      newBlanks
        .slice()
        .reverse()
        .forEach((blank) => {
          previewSentence =
            previewSentence.substring(0, blank.start) +
            "____" +
            previewSentence.substring(blank.end);
        });

      setSentence(previewSentence);
    }
  };

  const handleInputChange = (e) => {
    const value = e.target.value;
    setOriginalSentence(value);
    setSentence(value);
    setBlanks([]);
    setOptions([]);
  };

  const addExtraOption = () => {
    setOptions([...options, ""]);
  };

  const updateOption = (index, value) => {
    const newOptions = [...options];
    newOptions[index] = value;
    setOptions(newOptions);
  };

  const handleSave = () => {
    onSave({
      type: "cloze",
      sentence,
      blanks: blanks.map((blank) => blank.text),
      options,
    });
  };

  useEffect(() => {
    handleSave();
  }, [sentence, blanks, options]);

  const moveItem = (dragIndex, hoverIndex) => {
    const newOptions = [...options];
    const [draggedOption] = newOptions.splice(dragIndex, 1);
    newOptions.splice(hoverIndex, 0, draggedOption);
    setOptions(newOptions);
  };

  return (
    <div className="bg-white border rounded-lg p-6 shadow-md">
      <h3 className="text-xl font-semibold mb-4 text-gray-800">
        Cloze (Fill-in-the-Blanks) Question
      </h3>

      <div className="mb-4">
        <label htmlFor="">Preview</label>
        <div className="border p-2 h-10 rounded-lg">
          <p>{sentence}</p>
        </div>
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Sentence
        </label>
        <div className="flex items-center space-x-2">
          <input
            ref={inputRef}
            type="text"
            value={originalSentence}
            onChange={handleInputChange}
            placeholder="Type your sentence. Select text to create blanks."
            className="w-full border rounded px-3 py-2 outline-none"
          />
          <Underline
            ref={underlineRef}
            size={20}
            className="cursor-pointer hover:text-blue-500"
            onClick={handleUnderline}
          />
        </div>
      </div>

      {options.length > 0 && (
        <div key={options.length} className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Options
          </label>
          {options.map((option, index) => (
            <Draggable
              key={index}
              id={`option-${index}`}
              index={index}
              moveItem={moveItem}
            >
              <div className="flex items-center space-x-2 mb-2">
                <Move
                  className="text-gray-500 cursor-move hover:pointer hover:text-gray-700"
                  size={20}
                />
                <input
                  type="text"
                  value={option}
                  onChange={(e) => updateOption(index, e.target.value)}
                  placeholder={`Option ${index + 1}`}
                  className="flex-grow border rounded px-3 py-2"
                />
              </div>
            </Draggable>
          ))}
          <button
            onClick={addExtraOption}
            className="text-green-500 hover:text-green-600 flex items-center"
          >
            <PlusCircle size={20} className="mr-1" /> Add Option
          </button>
        </div>
      )}
    </div>
  );
};

export default ClozeQuestion;
