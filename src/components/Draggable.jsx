import React, { useRef } from "react";
import { useDrag, useDrop } from "react-dnd";

const Draggable = ({ id, index, children, moveItem }) => {
  const ref = useRef(null);
  const [{ isDragging }, drag] = useDrag(() => ({
    type: "item",
    item: () => ({ id, index }),
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  }));

  const [, drop] = useDrop({
    accept: "item",
    hover: (draggedItem, monitor) => {
      if (!ref.current) return;

      const dragIndex = draggedItem.index;
      const hoverIndex = index;

      if (dragIndex === hoverIndex) return;

      moveItem(dragIndex, hoverIndex);

      draggedItem.index = hoverIndex;
    },
  });

  return (
    <div
      ref={(node) => {
        ref.current = node;
        drag(drop(node));
      }}
      style={{ opacity: isDragging ? 0.5 : 1 }}
      className="draggable-item"
    >
      {children}
    </div>
  );
};

export default Draggable;
