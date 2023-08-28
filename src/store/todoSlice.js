import {createSlice} from '@reduxjs/toolkit';
import todoData from '../data/todoData';

const initialState = {
  todoData: todoData,
  selectedTodo: null,
};

export const todoSlice = createSlice({
  name: 'todo',
  initialState,
  reducers: {
    setSelectedTodo: (state, action) => {
      state.selectedTodo = state.todoData.find(
        item => item.todoId === action.payload,
      );
    },
    setCompleteStatus: (state, action) => {
      const {todoId, selectedDate} = action.payload;
      const tappedTodoIndex = state.todoData[selectedDate].findIndex(
        todo => todo.todoId === todoId,
      );
      const selectedTodo = state.todoData[selectedDate][tappedTodoIndex];
      selectedTodo.completed = !selectedTodo.completed;
    },
  },
});
