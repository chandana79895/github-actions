import React from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';

interface LoaderProps {
  size?: number;
  color?: 'primary' | 'secondary' | 'inherit';
  thickness?: number;
}

const Loader: React.FC<LoaderProps> = ({
  size = 100,
  color = 'primary',
  thickness = 4.5,
}) => {
  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      height="50vh"
      width="100%"
    >
      <CircularProgress size={size} color={color} thickness={thickness} />
    </Box>
  );
};

export default Loader;
