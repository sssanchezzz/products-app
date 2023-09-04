import * as React from 'react';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import { Button } from '@mui/material';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import {
    SORTING_CATEGORIES,
    SortingCategory,
    SortingTypes,
    sortProducts,
} from 'features/header/sort/sort_products';
import { useAppDispatch } from 'store';

export const SORTING_TYPES: SortingTypes[] = [
    SortingTypes.ASC,
    SortingTypes.DESC,
];

const categories: [SortingCategory, SortingTypes][] = [
    ['id', SortingTypes.ASC],
];

SORTING_CATEGORIES.forEach(category => {
    SORTING_TYPES.forEach(type => {
        if (category) {
            categories.push([category, type]);
        }
    });
});

const Filter: React.FC<React.HTMLAttributes<HTMLDivElement>> = props => {
    const dispatch = useAppDispatch();
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const [selectedIndex, setSelectedIndex] = React.useState(0);
    const open = Boolean(anchorEl);

    React.useEffect(() => {
        dispatch(
            sortProducts(
                categories[selectedIndex][0],
                categories[selectedIndex][1],
            ),
        );
    }, [dispatch, selectedIndex]);

    const handleClickListItem = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleSortingCategoryClick = (
        event: React.MouseEvent<HTMLElement>,
        index: number,
    ) => {
        setSelectedIndex(index);
        setAnchorEl(null);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <div {...props}>
            <Button
                endIcon={
                    categories[selectedIndex][0] === 'id' ? null : categories[
                          selectedIndex
                      ][1] === SortingTypes.DESC ? (
                        <ArrowDownwardIcon
                            sx={{ width: '20px', height: '20px' }}
                        />
                    ) : (
                        <ArrowUpwardIcon
                            sx={{ width: '20px', height: '20px' }}
                        />
                    )
                }
                variant="outlined"
                aria-controls="lock-menu"
                aria-expanded={open ? 'true' : undefined}
                onClick={handleClickListItem}
            >
                Sort by{' '}
                {categories[selectedIndex][0] === 'id'
                    ? 'default'
                    : categories[selectedIndex][0]}
            </Button>

            <Menu
                id="lock-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                MenuListProps={{
                    'aria-labelledby': 'lock-button',
                    role: 'listbox',
                }}
            >
                {categories.map((option, index) => (
                    <MenuItem
                        key={index}
                        selected={index === selectedIndex}
                        onClick={event =>
                            handleSortingCategoryClick(event, index)
                        }
                    >
                        <span style={{ paddingRight: '10px' }}>
                            {option[0] === 'id' ? 'default' : option[0]}
                        </span>
                        {option[0] === 'id' ? null : categories[index][1] ===
                          SortingTypes.DESC ? (
                            <ArrowDownwardIcon
                                sx={{ width: '15px', height: '15px' }}
                            />
                        ) : (
                            <ArrowUpwardIcon
                                sx={{ width: '15px', height: '15px' }}
                            />
                        )}
                    </MenuItem>
                ))}
            </Menu>
        </div>
    );
};

export default Filter;
