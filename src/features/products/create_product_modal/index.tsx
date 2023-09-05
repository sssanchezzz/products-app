import React, { FC } from 'react';
import { useSelector } from 'react-redux';
import {
    dismissCreateProductModal,
    getIsCreateProductModalOpen,
} from 'features/products/create_product_modal/create_product_modal_slice';
import { useAppDispatch } from 'store';
import { Product } from 'features/products/products_slice';
import { createProduct } from 'features/products/create_product_modal/create_product';
import ProductModal from 'components/product_modal';

const initialProduct: Product = {
    id: 0,
    brand: '',
    title: '',
    description: '',
    price: 0,
    thumbnail: '',
    images: [],
    rating: 0,
    stock: 0,
    category: '',
};

const CreateProductModal: FC = () => {
    const isModalOpen = useSelector(getIsCreateProductModalOpen);

    const dispatch = useAppDispatch();

    const handleModalClose = () => {
        dispatch(dismissCreateProductModal());
    };

    const handleProductFormSubmit = (values: Product) => {
        dispatch(createProduct(values));
    };

    return (
        <ProductModal
            open={isModalOpen}
            onClose={handleModalClose}
            onSubmit={handleProductFormSubmit}
            initialValues={initialProduct}
            dialogTitle="Create Product"
        />
    );
};

export default CreateProductModal;
