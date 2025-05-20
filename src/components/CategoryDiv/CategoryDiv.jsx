import React, { useState, useEffect } from "react";
import "./CategoryDiv.css";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import dragimg from "/src/assets/images/icon-images/drag.svg";
import deleteimg from "/src/assets/images/icon-images/delete.svg";
import closeimg from "../../assets/images/icon-images/close.svg"; 

const CategoryDiv = ({ id, category, handleDelete, updateTask, isNew }) => {
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id });

  const style = {
    transition,
    transform: CSS.Transform.toString(transform),
  };

  const [inputValue, setInputValue] = useState(category);

  useEffect(() => {
    setInputValue(category);
  }, [category]);

  const handleChange = (e) => {
    const newValue = e.target.value;
    setInputValue(newValue);
    updateTask(id, newValue);
  };

  return (
    <div ref={setNodeRef} style={style} className="category-div">
      {/* Drag Handle */}
      <div {...listeners} {...attributes}>
        <img src={dragimg} alt="drag-img" className="drag-icon" />
      </div>

      {/* Editable Input Field */}
      <input className="task" value={inputValue} onChange={handleChange}  disabled={!isNew}  />

      {/* Delete Button */}
      {isNew ? (
        <div className="close-img">
          <img src={closeimg} alt="closeimg" onClick={() => handleDelete(id, true, category)} />
        </div>
      ) : (
        <div className="delete-icon">
          <img src={deleteimg} alt="delete-img" onClick={() => handleDelete(id, false, category)} />
        </div>
      )}
    </div>
  );
};

export default CategoryDiv;
