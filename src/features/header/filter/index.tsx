import FilterListIcon from '@mui/icons-material/FilterList';
import { IconButton, IconButtonProps, useTheme } from '@mui/material';
import { openFilterProductsDrawer } from 'features/filter_products_drawer/filter_products_drawer_slice';
import React, { FC } from 'react';
import { useAppDispatch } from 'store';

const Filter: FC<IconButtonProps> = props => {
    const theme = useTheme();
    const dispatch = useAppDispatch();
    const handleFilterBtnClick = () => {
        dispatch(openFilterProductsDrawer());
    };

    return (
        <IconButton {...props} onClick={handleFilterBtnClick}>
            <FilterListIcon sx={{ color: theme.palette.primary.main }} />
        </IconButton>
    );
};

export default Filter;
