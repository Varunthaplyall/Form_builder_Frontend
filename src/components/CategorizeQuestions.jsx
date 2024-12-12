import React, { useState, useEffect } from "react";
import { Move, PlusCircle } from "lucide-react";
import Draggable from "./Draggable";
const CategorizeQuestions = ({ onSave }) => {
  const [categories, setCategories] = useState([""]);
  const [description, setDescription] = useState("");
  const [items, setItems] = useState([{ text: "", category: "" }]);

  const addCategory = () => {
    setCategories([...categories, ""]);
  };

  const updateCategory = (index, value) => {
    const newCategories = [...categories];
    newCategories[index] = value;
    setCategories(newCategories);
  };

  const addItem = () => {
    setItems([...items, { text: "", category: "" }]);
  };

  const updateItem = (index, field, value) => {
    const newItems = [...items];
    newItems[index][field] = value;
    setItems(newItems);
  };

  const handleSave = () => {
    onSave({
      type: "categorize",
      description,
      categories,
      items,
    });
  };

  useEffect(() => {
    handleSave();
  }, [categories, items, description]);

  const moveCategory = (dragIndex, hoverIndex) => {
    const newCategories = [...categories];
    const [draggedCategory] = newCategories.splice(dragIndex, 1);
    newCategories.splice(hoverIndex, 0, draggedCategory);
    setCategories(newCategories);
  };

  const moveItem = (dragIndex, hoverIndex) => {
    const newItems = [...items];
    const [draggedItem] = newItems.splice(dragIndex, 1);
    newItems.splice(hoverIndex, 0, draggedItem);
    setItems(newItems);
  };

  return (
    <div className="bg-white border rounded-lg p-6 shadow-md">
      <h3 className="text-xl font-semibold mb-4 text-gray-800">
        Categorize Question
      </h3>

      <div className="mt-6">
        <input
          type="text"
          placeholder="Description(Optional)"
          className="block text-sm text-gray-500 border rounded-lg py-2 px-4 outline-none flex-grow w-[500px]"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </div>

      <div className="mt-6">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Categories
        </label>
        {categories.map((category, index) => (
          <Draggable
            key={`category-${index}`}
            id={index}
            index={index}
            moveItem={moveCategory}
          >
            <div key={index} className="flex items-center space-x-2 mb-2">
              <Move
                className="text-gray-500 cursor-move hover:pointer hover:text-gray-700"
                size={20}
              />
              <input
                type="text"
                value={category}
                onChange={(e) => updateCategory(index, e.target.value)}
                placeholder="Enter category"
                className=" border rounded px-3 py-2 bg-white outline-none"
              />
              <button
                onClick={addCategory}
                className="text-green-500 hover:text-green-600"
              >
                <PlusCircle size={20} />
              </button>
            </div>
          </Draggable>
        ))}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Items
        </label>
        {items.map((item, index) => (
          <Draggable
            key={`item-${index}`}
            id={index}
            index={index}
            moveItem={moveItem}
          >
            <div key={index} className="flex items-center space-x-4 mb-2">
              <Move
                className="text-gray-500 cursor-move hover:pointer hover:text-gray-700"
                size={20}
              />
              <input
                type="text"
                value={item.text}
                onChange={(e) => updateItem(index, "text", e.target.value)}
                placeholder="Item text"
                className=" border rounded px-3 py-2 bg-white outline-none"
              />
              <select
                value={item.category}
                onChange={(e) => updateItem(index, "category", e.target.value)}
                className="border rounded px-3 py-2 bg-white outline-none w-[150px]"
              >
                <option value=""></option>
                {categories.map((cat, catIndex) => (
                  <option key={catIndex} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
              <button
                onClick={addItem}
                className="text-green-500 hover:text-green-600"
              >
                <PlusCircle size={20} />
              </button>
            </div>
          </Draggable>
        ))}
      </div>
    </div>
  );
};

export default CategorizeQuestions;
