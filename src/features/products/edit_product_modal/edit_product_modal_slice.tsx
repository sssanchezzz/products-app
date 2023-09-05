import {
    ActionReducerMapBuilder,
    createAction,
    createAsyncThunk,
    createSlice,
} from '@reduxjs/toolkit';
import { RootState } from 'rootReducer';

export type Product = {
    id: number;
    title: string;
    brand: string;
    description: string;
    price: number;
    thumbnail: string;
    images: string[];
    rating: number;
    stock: number;
    category: string;
};

export const openEditProductModal = createAction(
    'OPEN_EDIT_PRODUCT_MODAL',
    (product: Product) => ({
        payload: { product },
    }),
);

export const dismissEditProductModal = createAction(
    'DISMISS_EDIT_PRODUCT_MODAL',
);

export type EditProductModalState = {
    isOpen: boolean;
    product: Product | null;
};

export const editProductModalState: EditProductModalState = {
    isOpen: false,
    product: null,
};

export const getIsEditProductModalOpen = (state: RootState): boolean =>
    state.editProductModal.isOpen;

export const getEditProduct = (state: RootState): Product | null =>
    state.editProductModal.product;

const editProductModalReducer = (
    builder: ActionReducerMapBuilder<EditProductModalState>,
) => {
    builder
        .addCase(openEditProductModal, (state, action) => {
            return {
                isOpen: true,
                product: action.payload.product,
            };
        })
        .addCase(dismissEditProductModal, (state, action) => {
            return {
                isOpen: false,
                product: null,
            };
        });
};

export const editProductModalSlice = createSlice({
    name: 'editProductModal',
    initialState: editProductModalState,
    reducers: {},
    extraReducers: editProductModalReducer,
});
