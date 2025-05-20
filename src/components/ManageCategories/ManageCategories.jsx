import React, { useState, useEffect } from "react";
import SafetyFooter from "../SafetyFooter/SafetyFooter";
import btnImg from "/src/assets/images/icon-images/grey-plus.svg";
import "./ManageCategories.css";
import {
  closestCorners,
  DndContext,
  KeyboardSensor,
  PointerSensor,
  TouchSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import { arrayMove, sortableKeyboardCoordinates } from "@dnd-kit/sortable";
import { useDispatch, useSelector } from "react-redux";
import {
  post_manage_categories,
  get_manage_categories,
  delete_manage_category,
  post_safety_categories,
} from "../../api/api_calls/apiCalls";
import closeimg from "../../assets/images/icon-images/close.svg";
import { counterSliceActions } from "../../redux/features/counter/CounterSlice";
import Category from "../Category/Category";
import RemoveModal from "../RemoveModal/RemoveModal";
// import { Snackbar, Alert } from "@mui/joy";
import Joi from "joi";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";

const ManageCategories = ({ handleCloseManage }) => {
  const [tasks, setTasks] = useState(
    useSelector((state) => state?.documents?.allDocumentCategory)
  );
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [hasValidCategory, setHasValidCategory] = useState(false);
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "error", // 'error' | 'success' | 'warning' | 'info'
  });

  const categorySchema = Joi.object({
    name: Joi.string().min(2).max(50).required().messages({
      "string.empty": "Category name cannot be empty",
      "string.min": "Category name must be at least 2 characters long",
      "string.max": "Category name cannot exceed 50 characters",
    }),
  });

  const showSnackbar = (message, severity = "error") => {
    setSnackbar({ open: true, message, severity });
    setTimeout(() => {
      setSnackbar((prev) => ({ ...prev, open: false }));
    }, 3000);
  };

  const dispatch = useDispatch();

  const cat_ = useSelector((state) => state?.documents?.allDocumentCategory);

  console.log(cat_, "this is the state ");

  const fetchCategories = async () => {
    try {
      const response = await get_manage_categories();
      console.log("areey", response);

      const categoriesWithIds = response.categories.map((category, index) => ({
        id: category?._id,
        name: category?.name,
        order: index + 1,
        isNew: false,
      }));
      setTasks(categoriesWithIds);
      dispatch(
        counterSliceActions.storeAllDocumentCategories(categoriesWithIds)
      );
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  const handleClose = (id) => {
    setTasks((prevTasks) => prevTasks.filter((task) => task.id !== id));
  };

  const handleDeleteClick = (id, isNew, name) => {
    if (isNew) {
      setTasks((prevTasks) => prevTasks.filter((task) => task.id !== id));
    } else {
      setSelectedCategory({ id, isNew, name });
      setShowDeleteModal(true);
    }
  };

  const handleCloseModal = () => {
    setShowDeleteModal(false);
    setSelectedCategory(null);
  };

  const handleConfirmDelete = async () => {
    if (!selectedCategory) return;
    const { id } = selectedCategory;

    try {
      await delete_manage_category(id);
      fetchCategories();
      setTasks((prevTasks) => prevTasks.filter((task) => task.id !== id));
    } catch (error) {
      console.error("Error deleting category:", error);
    } finally {
      setShowDeleteModal(false);
      setSelectedCategory(null);
    }
  };

  const handleClick = () => {
    setTasks((prevTasks) => [
      ...prevTasks,
      {
        id: `new-${Date.now()}`,
        name: "",
        order: prevTasks.length + 1,
        isNew: true,
      },
    ]);
  };

  const updateTask = (id, newCategory) => {
    const validation = categorySchema.validate({ name: newCategory });

    setErrors((prevErrors) => ({
      ...prevErrors,
      [id]: validation.error ? validation.error.details[0].message : null,
    }));

    setTasks((tasks) =>
      tasks.map((task) =>
        task.id === id ? { ...task, name: newCategory } : task
      )
    );

    setHasValidCategory(tasks.some((task) => task.name.trim() !== ""));
  };

  const handleSave = async () => {
    const validationErrors = {};

    tasks.forEach((task) => {
      const validation = categorySchema.validate({ name: task.name });
      if (validation.error) {
        validationErrors[task.id] = validation.error.details[0].message;
      }
    });

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      showSnackbar("Please fix the errors before saving.", "error"); // ✅ Add this
      return; // Stop saving if there are errors
    }

    const validCategories = tasks
      .map((task) => task.name.trim())
      .filter(Boolean);

    try {
      setIsLoading(true);
      console.log("Sending data to backend:", validCategories);
      const res = await post_manage_categories(validCategories);
      if (res?.message === "Categories created successfully") {
        dispatch(counterSliceActions.storeAllSafetyCategories(validCategories));
        fetchCategories();
        showSnackbar("Categories saved successfully!", "success"); // ✅ Show success
        setTimeout(() => {
          handleCloseManage();
        }, 1000);
      }
      
    } catch (error) {
      console.error("Error saving categories:", error);
      showSnackbar("Failed to save categories. Please try again.", "error"); // ✅ Show error
    } finally {
      setIsLoading(false); // Hide loader when done
    }
  };

  const getTaskPos = (id) => tasks.findIndex((task) => task.id === id);

  const handleDragEnd = (event) => {
    const { active, over } = event;
    if (!over || active.id === over.id) return;
    setTasks((tasks) => {
      const originalPos = getTaskPos(active.id);
      const newPos = getTaskPos(over.id);

      return arrayMove(tasks, originalPos, newPos).map((task, index) => ({
        ...task,
        order: index + 1,
      }));
    });
  };

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(TouchSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  // const hasValidCategory = tasks.some((task) => task.name.trim() !== "");

  useEffect(() => {
    fetchCategories();
  }, []);

  return (
    <div className="container">
      <div className="manage-heading">
        <div className="close-manage">
          <img
            className="close-img"
            src={closeimg}
            alt="Close"
            onClick={handleCloseManage}
          />
        </div>
        <div className="nav-title">
          <p>Manage Categories</p>
        </div>
      </div>

      <div className="category-body">
        <div className="category-heading">
          <span className="category-heading-text">Categories</span>
          <button className="manage-btn" onClick={handleClick}>
            <img className="icon" src={btnImg} alt="plus-img" />
            Add New Category
          </button>
        </div>

        <DndContext
          sensors={sensors}
          onDragEnd={handleDragEnd}
          collisionDetection={closestCorners}
        >
          <Category
            tasks={tasks}
            handleDelete={handleDeleteClick}
            updateTask={updateTask}
            errors={errors}
          />
        </DndContext>
      </div>

      <div className="manage-category-footer">
        <SafetyFooter
          label="Cancel"
          className="cancel-btn"
          handleCloseManage={handleCloseManage}
          style={{ backgroundColor: "#E8E8E8", color: "#808080" }}
        />
        {hasValidCategory && (
          <SafetyFooter
            label="Save & Next"
            className="save-btn"
            handleSave={handleSave}
            loader={isLoading}
          />
        )}
      </div>

      {/* Delete Confirmation Modal */}
      <RemoveModal
        mainHeading="Delete Category"
        subHeading="Are you sure you want to remove this category?"
        isOpen={showDeleteModal}
        onClose={handleCloseModal}
        onConfirm={handleConfirmDelete}
      />
      <Snackbar
        open={snackbar.open}
        autoHideDuration={3000}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <Alert
          severity={snackbar.severity}
          onClose={() => setSnackbar({ ...snackbar, open: false })}
          sx={{
            width: "100%",
            zIndex: 40,
            backgroundColor:
              snackbar.severity === "error" ? "#D32F2F" : "#333333", // ✅ Red for errors, dark for success
            display: "flex",
            alignItems: "center",
            color: "white", // Ensure text is visible
            "& .MuiAlert-icon": { color: "white" }, // Change icon color
          }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </div>
  );
};

export default ManageCategories;
