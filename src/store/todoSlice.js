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
    AddTodo: (state, action) => {
      const {selectedDate, todoText, todoDescText, repeatType, recurringId} =
        action.payload;

      function AddTodoHandler(newSelectedDate) {
        if (!state.todoData.hasOwnProperty(newSelectedDate)) {
          state.todoData[newSelectedDate] = [];
        }
        const newTodo = {
          todoId: `${newSelectedDate}-${
            state.todoData[newSelectedDate].length + 1
          }`,
          todoName: todoText,
          recurringId: recurringId,
          description: todoDescText,
          completed: false,
          repeatType: repeatType,
        };
        state.todoData[newSelectedDate].push(newTodo);
        console.log('skjfksdkfjskdfksd', recurringId);
      }

      function getNewDate(day) {
        const currentDateStr = new Date(selectedDate);
        const newDateAfterAdding = new Date(currentDateStr);
        newDateAfterAdding.setDate(currentDateStr.getDate() + day);

        const newDateAfterAddingFormatted = newDateAfterAdding
          .toISOString()
          .split('T')[0];

        return newDateAfterAddingFormatted;
      }

      if (repeatType === 'norepeat') {
        AddTodoHandler(selectedDate);
      } else if (repeatType === 'daily' || repeatType === 'oneYear') {
        for (let day = 0; day < 365; day++) {
          const newDateAfterAddingFormatted = getNewDate(day);
          AddTodoHandler(newDateAfterAddingFormatted);
        }
      } else if (repeatType === 'weekday') {
        for (let day = 0; day < 365; day++) {
          const newDateAfterAddingFormatted = getNewDate(day);
          // console.log(newDateAfterAddingFormatted);
          const date = new Date(newDateAfterAddingFormatted);
          const dayName = new Intl.DateTimeFormat('en-US', {
            weekday: 'short',
          }).format(date);

          if (dayName !== 'Sun' && dayName !== 'Sat') {
            AddTodoHandler(newDateAfterAddingFormatted);
          }
        }
      } else if (repeatType === 'oneWeek') {
        for (let day = 0; day < 7; day++) {
          const newDateAfterAddingFormatted = getNewDate(day);
          AddTodoHandler(newDateAfterAddingFormatted);
        }
      } else if (repeatType === 'oneMonth') {
        for (let day = 0; day < 30; day++) {
          const newDateAfterAddingFormatted = getNewDate(day);
          AddTodoHandler(newDateAfterAddingFormatted);
        }
      }
    },
  },
});
