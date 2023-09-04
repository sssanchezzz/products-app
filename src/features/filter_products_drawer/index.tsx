import styled from '@emotion/styled';
import { ChevronLeft } from '@mui/icons-material';
import {
    Drawer,
    FormControl,
    InputAdornment,
    InputLabel,
    OutlinedInput,
    Typography,
    OutlinedInputProps,
    Select,
    SelectChangeEvent,
    MenuItem,
    Checkbox,
    FormControlLabel,
    Button,
    useTheme,
    styled as styledMUI,
} from '@mui/material';
import DoneIcon from '@mui/icons-material/Done';
import {
    dismissFilterProductsDrawer,
    getIsFilterProductsDrawerOpen,
} from 'features/filter_products_drawer/filter_products_drawer_slice';
import { getProductCategories } from 'features/products/categories/categories_slice.';
import {
    getPriceRange,
    getProductBrands,
} from 'features/products/products_slice';
import React, { FC, useState } from 'react';
import { useSelector } from 'react-redux';
import { useAppDispatch } from 'store';
import { camelize } from 'utils/camelize';
import {
    filterProducts,
    filterProductsByBrands,
    filterProductsByPriceRange,
} from 'features/filter_products_drawer/filter_products';

const NumberInput: FC<OutlinedInputProps> = ({
    value,
    label,
    onChange,
    inputProps,
    ...props
}) => {
    const id = label?.toString().toLowerCase();
    return (
        <FormControl>
            <InputLabel htmlFor={id}>{label}</InputLabel>
            <OutlinedInput
                onChange={onChange}
                inputProps={{ ...inputProps, type: 'number' }}
                id={id}
                startAdornment={
                    <InputAdornment position="start">
                        <Adornment>₴</Adornment>
                    </InputAdornment>
                }
                label={label}
                value={value}
                {...props}
            />
        </FormControl>
    );
};

const FilterProducts: FC = () => {
    const theme = useTheme();
    const dispatch = useAppDispatch();

    const priceRange = useSelector(getPriceRange);
    const selectedCategories = useSelector(getProductCategories);
    const brands = useSelector(getProductBrands);
    const isDrawerOpen = useSelector(getIsFilterProductsDrawerOpen);

    const categories: string[] = ['All', ...selectedCategories];

    const [category, setCategory] = useState(categories[0]);
    const [checkedBrands, setCheckedBrands] = useState<string[] | never>([]);
    const [filterRange, setFilterRange] = useState(priceRange);

    const [areBrandsCollapsed, setAreBrandsCollapsed] = useState(false);

    const handleCloseDrawerClick = () => {
        dispatch(dismissFilterProductsDrawer());
    };

    const handleCategoryChange = (e: SelectChangeEvent<string>) => {
        setCategory(e.target.value);
    };

    const handleBrandsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.checked) {
            setCheckedBrands([...checkedBrands, e.target.name]);
        } else {
            setCheckedBrands(checkedBrands.filter(b => b !== e.target.name));
        }
    };

    const handleBrandsLabelClick = () => {
        setAreBrandsCollapsed(!areBrandsCollapsed);
    };

    const handleFromValueChange = (
        e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>,
    ) => {
        setFilterRange([+e.target.value, filterRange[1]]);
    };

    const handleToValueChange = (
        e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>,
    ) => {
        setFilterRange([filterRange[0], +e.target.value]);
    };

    const handleApplyClick = () => {
        dispatch(
            filterProducts({
                category,
                brands: checkedBrands,
                priceRange: [
                    filterRange[0] || priceRange[0],
                    filterRange[1] || priceRange[1],
                ],
            }),
        );
    };

    return (
        <div>
            <Drawer
                sx={{
                    width: 400,
                    flexShrink: 0,
                    '& .MuiDrawer-paper': {
                        width: 400,
                        padding: '15px',
                    },
                }}
                anchor="right"
                open={isDrawerOpen}
                onClose={handleCloseDrawerClick}
            >
                <HeaderContainer>
                    <Button
                        endIcon={<ChevronLeft />}
                        onClick={handleCloseDrawerClick}
                    >
                        Back
                    </Button>
                    <Button endIcon={<DoneIcon />} onClick={handleApplyClick}>
                        Apply
                    </Button>
                </HeaderContainer>
                <Typography>Price Range:</Typography>
                <FormContainer>
                    <NumberInput
                        label="From"
                        value={filterRange[0] || priceRange[0]}
                        sx={{ mr: '10px' }}
                        onChange={handleFromValueChange}
                        inputProps={{ min: priceRange[0] }}
                    />
                    <NumberInput
                        label="To"
                        value={filterRange[1] || priceRange[1]}
                        onChange={handleToValueChange}
                        inputProps={{ max: priceRange[1] }}
                    />
                </FormContainer>

                <Typography>Category:</Typography>
                <CategoryFormContainer>
                    <FormControl fullWidth>
                        <InputLabel id="category-filter">Category</InputLabel>
                        <Select
                            labelId="category-filter"
                            id="category"
                            name="category"
                            value={category}
                            label="Category"
                            onChange={handleCategoryChange}
                        >
                            {categories.map((category, index) => (
                                <MenuItem key={category} value={category}>
                                    {camelize(category)}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </CategoryFormContainer>

                <BrandContainer>
                    <Typography>Brand:</Typography>
                </BrandContainer>

                <BrandsContainer>
                    {(areBrandsCollapsed
                        ? brands
                        : brands
                              .slice(0, 10)
                              .concat(
                                  checkedBrands.filter(
                                      b => brands.indexOf(b) > 9,
                                  ),
                              )
                    ).map(c => (
                        <FormControlLabel
                            key={c}
                            control={
                                <Checkbox
                                    checked={checkedBrands.indexOf(c) !== -1}
                                    onChange={handleBrandsChange}
                                    name={c}
                                />
                            }
                            label={c}
                        />
                    ))}
                </BrandsContainer>
                <Button
                    onClick={handleBrandsLabelClick}
                    sx={{
                        marginLeft: '10px',
                        color: theme.palette.primary.main,
                    }}
                >
                    Show {areBrandsCollapsed ? 'less' : 'more'}
                </Button>
            </Drawer>
        </div>
    );
};
const FormContainer = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 10px 0;
`;

const Adornment = styledMUI('span')(({ theme }) => {
    return {
        color: theme.palette.primary.main,
    };
});

const BrandContainer = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
`;

const BrandsContainer = styled.div`
    display: flex;
    flex-direction: column;
`;

const CategoryFormContainer = styled.div`
    padding: 10px 0;
    width: 100%;
`;

const HeaderContainer = styled.div`
    display: flex;
    justify-content: space-between;
`;

export default FilterProducts;
