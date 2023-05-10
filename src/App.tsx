import TodoList from './components/TodoList';
import { DarkModeProvider } from './context/DarkModeContext';

export default function App() {
  return (
    <DarkModeProvider>
      <TodoList />
    </DarkModeProvider>
  );
}
