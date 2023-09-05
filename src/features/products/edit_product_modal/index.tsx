import { FC } from 'react';
import { useSelector } from 'react-redux';
import { useAppDispatch } from 'store';
import { Product } from 'features/products/products_slice';
import ProductModal from 'components/product_modal';
import {
    dismissEditProductModal,
    getEditProduct,
    getIsEditProductModalOpen,
} from 'features/products/edit_product_modal/edit_product_modal_slice';
import { saveProduct } from 'features/products/edit_product_modal/edit_product';

const EditProductModal: FC = () => {
    const isModalOpen = useSelector(getIsEditProductModalOpen);
    const selectedProduct = useSelector(getEditProduct);

    const dispatch = useAppDispatch();

    const handleModalClose = () => {
        dispatch(dismissEditProductModal());
    };

    const handleProductFormSubmit = (values: Product) => {
        dispatch(saveProduct(values));
    };
    if (selectedProduct === null) {
        return null;
    }
    return (
        <ProductModal
            open={isModalOpen}
            onClose={handleModalClose}
            onSubmit={handleProductFormSubmit}
            initialValues={selectedProduct}
            dialogTitle="Edit Product"
        />
    );
};

export default EditProductModal;
