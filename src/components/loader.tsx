import { Box, CircularProgress } from '@mui/material';
import { FC } from 'react';

const Loader: FC = () => {
    return (
        <Box sx={{ display: 'flex', justifyContent: 'center' }}>
            <CircularProgress />
        </Box>
    );
};

export default Loader;
