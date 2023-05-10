import { useState, useEffect, useReducer } from 'react';
import { Card, Box } from '@mui/material/';
import AppBar from './AppBar';
import { Todo } from '../models/todo.model';
import InputField from './InputField';
import SingleTodo from './SingleTodo';
import { useDarkMode } from '../context/DarkModeContext';
import todoReducer from '../reducer/todo.reducer';

const filters = ['All', 'Done', 'Not Done'];

// eslint-disable-next-line consistent-return
const filteredTodoList = (todos: Todo[], filter: string) => {
  if (filter === 'All') {
    return todos;
  }
  if (filter === 'Done') {
    return todos.filter((todo) => todo.isDone === true);
  }
  if (filter === 'Not Done') {
    return todos.filter((todo) => todo.isDone === false);
  }
};

const backgroundColor = (darkMode: boolean) => {
  if (darkMode) {
    return 'rgb(201, 201, 201);';
  }
  return 'white';
};

function readTodosFromLocal() {
  const todos = localStorage.getItem('todos');
  return todos ? JSON.parse(todos) : [];
}

export default function TodoList() {
  const [filter, setFilter] = useState('All');

  const [todos, dispatch] = useReducer(todoReducer, readTodosFromLocal());

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  const { darkMode } = useDarkMode();
  const filtered = filteredTodoList(todos, filter);

  const handleAdd = (newTodo: Todo) => {
    dispatch({ type: 'add', payload: { newTodo } });
  };
  const handleDelete = (deletedTodo: Todo) => {
    dispatch({ type: 'delete', payload: { deletedTodo } });
  };
  const handleUpdate = (updetedTodo: Todo) => {
    dispatch({ type: 'update', payload: { updetedTodo } });
  };

  return (
    <Card
      sx={{
        width: 500,
        height: 600,
        display: 'flex',
        flexDirection: 'column',
        backgroundColor: backgroundColor(darkMode),
      }}
    >
      <AppBar filters={filters} filter={filter} setFilter={setFilter} />
      <Box sx={{ flexGrow: 1, overflowY: 'auto' }}>
        {filtered?.map((todo) => (
          <SingleTodo
            key={todo.id}
            todo={todo}
            onDelete={handleDelete}
            onUpdate={handleUpdate}
          />
        ))}
      </Box>
      <InputField onAdd={handleAdd} />
    </Card>
  );
}
