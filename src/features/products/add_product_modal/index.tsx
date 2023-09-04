import { Dialog, DialogTitle, DialogContent } from '@mui/material';
import React, { FC } from 'react';
import { useSelector } from 'react-redux';
import {
    dismissAddProductModal,
    getIsAddProductModalOpen,
} from 'features/products/add_product_modal/add_product_modal_slice';
import { useAppDispatch } from 'store';
import CreateProductForm from 'features/products/add_product_modal/create_product_form';

const AddProductModal: FC = () => {
    const isModalOpen = useSelector(getIsAddProductModalOpen);

    const dispatch = useAppDispatch();

    const handleModalClose = () => {
        dispatch(dismissAddProductModal());
    };

    return (
        <Dialog
            open={isModalOpen}
            onClose={handleModalClose}
            PaperProps={{ sx: { borderRadius: '7px', padding: '10px 0' } }}
        >
            <DialogTitle textAlign="center">Add Product</DialogTitle>
            <DialogContent>
                <CreateProductForm />
            </DialogContent>
        </Dialog>
    );
};

export default AddProductModal;
