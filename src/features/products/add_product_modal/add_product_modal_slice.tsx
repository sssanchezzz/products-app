import {
    ActionReducerMapBuilder,
    createAction,
    createSlice,
} from '@reduxjs/toolkit';

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

export type AddProductModalState = {
    isOpen: boolean;
};

export const addProductModalState: AddProductModalState = {
    isOpen: false,
};

export const getIsAddProductModalOpen = (state: any): boolean =>
    state.addProductModal.isOpen;

export const openAddProductModal = createAction('OPEN_ADD_PRODUCT_MODAL');
export const dismissAddProductModal = createAction('DISMISS_ADD_PRODUCT_MODAL');

const addProductModalReducer = (
    builder: ActionReducerMapBuilder<AddProductModalState>,
) => {
    builder
        .addCase(openAddProductModal, (state, action) => {
            return {
                isOpen: true,
            };
        })
        .addCase(dismissAddProductModal, (state, action) => {
            return {
                isOpen: false,
            };
        });
};

export const addProductModalSlice = createSlice({
    name: 'addProductModal',
    initialState: addProductModalState,
    reducers: {},
    extraReducers: addProductModalReducer,
});
