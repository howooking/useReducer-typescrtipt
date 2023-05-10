import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import WbSunnyIcon from '@mui/icons-material/WbSunny';
import { Toolbar, Typography, Button, IconButton } from '@mui/material';
import { useDarkMode } from '../context/DarkModeContext';

interface Props {
  filters: string[];
  filter: string;
  setFilter: React.Dispatch<React.SetStateAction<string>>;
}

const isSelected = (value: string, filter: string) => {
  if (value === filter) {
    return { opacity: 1 };
  }
  return { opacity: 0.5 };
};

export default function ButtonAppBar(props: Props) {
  const { filter, filters, setFilter } = props;
  const { darkMode, toggleDarkMode } = useDarkMode();
  return (
    <Box>
      <AppBar position="static" color={darkMode ? 'secondary' : 'primary'}>
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Todos
          </Typography>
          {filters.map((value, index) => (
            <Button
              // eslint-disable-next-line react/no-array-index-key
              key={index}
              variant="contained"
              disableElevation
              onClick={() => setFilter(value)}
              sx={isSelected(value, filter)}
              color={darkMode ? 'secondary' : 'primary'}
            >
              {value}
            </Button>
          ))}
          <IconButton onClick={toggleDarkMode}>
            {darkMode ? (
              <WbSunnyIcon sx={{ color: 'orange' }} />
            ) : (
              <DarkModeIcon sx={{ color: 'yellow' }} />
            )}
          </IconButton>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
