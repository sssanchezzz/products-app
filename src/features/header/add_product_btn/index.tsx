import { ButtonProps } from '@mui/material';
import StyledButton from 'components/styled_button';
import { openAddProductModal } from 'features/products/add_product_modal/add_product_modal_slice';
import React, { FC } from 'react';
import { useAppDispatch } from 'store';

const AddProductBtn: FC<ButtonProps> = props => {
    const dispatch = useAppDispatch();
    const handleAddProductClick = () => {
        dispatch(openAddProductModal());
    };
    return (
        <StyledButton
            {...props}
            variant="contained"
            onClick={handleAddProductClick}
        >
            Add Product
        </StyledButton>
    );
};
export default AddProductBtn;
