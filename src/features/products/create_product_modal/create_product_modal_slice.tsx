import {
    ActionReducerMapBuilder,
    createAction,
    createSlice,
} from '@reduxjs/toolkit';
import { RootState } from 'rootReducer';

export type Product = {
    id: number;
    title: string;
    description: string;
    price: number;
    thumbnail: string;
    images: string[];
    rating: number;
    stock: number;
    category: string;
};

export type CreateProductModalState = {
    isOpen: boolean;
};

export const createProductModalState: CreateProductModalState = {
    isOpen: false,
};

export const getIsCreateProductModalOpen = (state: RootState): boolean =>
    state.createProductModal.isOpen;

export const openCreateProductModal = createAction('OPEN_CREATE_PRODUCT_MODAL');
export const dismissCreateProductModal = createAction(
    'DISMISS_CREATE_PRODUCT_MODAL',
);

const createProductModalReducer = (
    builder: ActionReducerMapBuilder<CreateProductModalState>,
) => {
    builder
        .addCase(openCreateProductModal, (state, action) => {
            return {
                isOpen: true,
            };
        })
        .addCase(dismissCreateProductModal, (state, action) => {
            return {
                isOpen: false,
            };
        });
};

export const createProductModalSlice = createSlice({
    name: 'createProductModal',
    initialState: createProductModalState,
    reducers: {},
    extraReducers: createProductModalReducer,
});
