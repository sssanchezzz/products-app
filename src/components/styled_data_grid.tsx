import { styled } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';

const StyledDataGrid = styled(DataGrid)(({ theme }) => ({
    border: 0,
    color: '#757575',
    boxSizing: 'border-box',

    '&.MuiDataGrid-root .MuiDataGrid-cell:focus-within': {
        outline: 'none',
    },
    '& .MuiDataGrid-row': {
        background: '#FFFFFF',
        borderRadius: '7px',
    },
    '& .MuiDataGrid-iconSeparator': {
        display: 'none',
    },
    '& .MuiDataGrid-columnHeaders': {
        backgroundColor: 'rgba(0, 0, 0, 0.04)',
        borderRadius: '7px',
        boxShadow: 'none',
    },
    '& .MuiDataGrid-row.Mui-selected': {
        backgroundColor: 'rgba(58, 134, 255, 0.1)',
        borderRadius: '7px',
    },
    '& .MuiDataGrid-cell': {
        borderBottom: 'none',
    },
    '& .MuiPaginationItem-root': {
        borderRadius: '7px',
    },
    '& .MuiDataGrid-withBorderColor': {
        border: 0,
    },
    '& .MuiDataGrid-virtualScroller::-webkit-scrollbar': { display: 'none' },
}));

export default StyledDataGrid;
