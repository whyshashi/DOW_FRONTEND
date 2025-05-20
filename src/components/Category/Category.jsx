import React from "react";
import "./Category.css";
import { SortableContext, verticalListSortingStrategy } from "@dnd-kit/sortable";
import CategoryDiv from "../CategoryDiv/CategoryDiv";

const Category = ({ tasks, handleDelete, updateTask, errors }) => { // Added `errors` prop
  return (
    <div className="column">
      {tasks && tasks.length > 0 ? (
        <SortableContext items={tasks.map((task) => task.id)} strategy={verticalListSortingStrategy}>
          {tasks.map((task) => (
            <div key={task.id}> {/* Wrap in a div to avoid JSX error */}
              <CategoryDiv
                id={task.id}
                category={task.name}
                isNew={task.isNew}
                handleDelete={handleDelete}
                updateTask={updateTask}
              />
              {errors && errors[task.id] && <p className="error-text">{errors[task.id]}</p>}
            </div>
          ))}
        </SortableContext>
      ) : (
        <p>No categories available.</p>
      )}
    </div>
  );
};

export default Category;
