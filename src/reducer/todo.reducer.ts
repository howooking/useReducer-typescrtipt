import { Todo } from '../models/todo.model';

interface AddAction {
  type: 'add';
  payload: { newTodo: Todo };
}
interface DeleteAction {
  type: 'delete';
  payload: { deletedTodo: Todo };
}
interface UpdateAction {
  type: 'update';
  payload: { updetedTodo: Todo };
}

export default function todoReducer(
  todos: Todo[],
  action: AddAction | DeleteAction | UpdateAction
) {
  switch (action.type) {
    case 'add': {
      const { newTodo } = action.payload;
      return [...todos, newTodo];
    }
    case 'delete': {
      const { deletedTodo } = action.payload;
      return todos.filter((todo) => todo.id !== deletedTodo.id);
    }
    case 'update': {
      const { updetedTodo } = action.payload;
      return todos.map((todo) =>
        todo.id === updetedTodo.id ? updetedTodo : todo
      );
    }
    default: {
      return todos;
    }
  }
}
