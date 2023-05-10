import { Box, Button, Checkbox, FormLabel, Typography } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { Todo } from '../models/todo.model';
import { useDarkMode } from '../context/DarkModeContext';

interface Props {
  todo: Todo;
  onDelete: (deletedTodo: Todo) => void;
  onUpdate: (updatedTodo: Todo) => void;
}

const fontColor = (darkMode: boolean) => {
  if (darkMode) {
    return 'white';
  }
  return 'rgb(68, 67, 67)';
};

export default function SingleTodo(props: Props) {
  const { darkMode } = useDarkMode();
  const { todo, onDelete, onUpdate } = props;
  const handleDelete = () => {
    // eslint-disable-next-line no-alert, no-restricted-globals
    if (confirm(`${todo.task}를 삭제하시겠습니까?`)) {
      onDelete(todo);
    }
  };
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const isDone = !!event.target.checked;
    onUpdate({ ...todo, isDone });
  };
  return (
    <Box
      sx={{
        margin: 2,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Checkbox
        id={todo.id}
        checked={todo.isDone}
        color={darkMode ? 'secondary' : 'primary'}
        onChange={handleChange}
      />
      <FormLabel htmlFor={todo.id} sx={{ flexGrow: 1 }}>
        <Typography
          variant="h6"
          sx={{ color: fontColor(darkMode), fontWeight: '700' }}
        >
          {todo.task}
        </Typography>
      </FormLabel>
      <Button onClick={handleDelete}>
        <DeleteIcon color={darkMode ? 'secondary' : 'primary'} />
      </Button>
    </Box>
  );
}
