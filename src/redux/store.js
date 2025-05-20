import { combineReducers, configureStore } from "@reduxjs/toolkit";
import counterReducer from "../redux/features/counter/CounterSlice";

const rootReducer = combineReducers({
  documents: counterReducer,
  counter: counterReducer, // Ensure both slices are included in a single reducer
});

export const store = configureStore({
  reducer: rootReducer,
});
