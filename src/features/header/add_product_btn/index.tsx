import { ButtonProps } from '@mui/material';
import StyledButton from 'components/styled_button';
import { openCreateProductModal } from 'features/products/create_product_modal/create_product_modal_slice';
import React, { FC } from 'react';
import { useAppDispatch } from 'store';

const AddProductBtn: FC<ButtonProps> = props => {
    const dispatch = useAppDispatch();
    const handleAddProductClick = () => {
        dispatch(openCreateProductModal());
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
