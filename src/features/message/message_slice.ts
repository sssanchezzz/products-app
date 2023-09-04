import {
    ActionReducerMapBuilder,
    createAction,
    createSlice,
} from '@reduxjs/toolkit';
import { createProduct } from 'features/products/add_product_modal/create_product_form/create_product_slice';

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

export type MessageState = {
    message: string | null;
};

export const messageState: MessageState = {
    message: null,
};
export const getMessage = (state: any) => state.messages.message;

export const dismissMessage = createAction('DISMISS_MESSAGE');

const messagesReducer = (builder: ActionReducerMapBuilder<MessageState>) => {
    builder
        .addCase(createProduct.fulfilled, (state, action) => {
            return {
                message: 'Product added successfully',
            };
        })
        .addCase(dismissMessage, (state, action) => {
            return {
                message: null,
            };
        });
};

export const messagesSlice = createSlice({
    name: 'messages',
    initialState: messageState,
    reducers: {},
    extraReducers: messagesReducer,
});
