import {
    ActionReducerMapBuilder,
    createAsyncThunk,
    createSlice,
} from '@reduxjs/toolkit';
import axios from 'axios';
import { API_URLs } from 'utils/API';

export type CategoriesState = {
    isLoading: boolean;
    categories: string[];
};

export const categoriesState: CategoriesState = {
    isLoading: false,
    categories: [],
};

export const getIsLoading = (state: any): boolean =>
    state.getCategories.isLoading;

export const getProductCategories = (state: any): string[] =>
    state.getCategories.categories;

export const fetchCategories = createAsyncThunk('categories', async () => {
    const response = await axios.get(
        `${API_URLs.BASE_URL}${API_URLs.CATEGORIES}`,
    );

    return response.data;
});

const fetchCategoriesReducer = (
    builder: ActionReducerMapBuilder<CategoriesState>,
) => {
    builder
        .addCase(fetchCategories.pending, (state, action) => {
            return {
                ...state,
                isLoading: true,
            };
        })
        .addCase(fetchCategories.fulfilled, (state, action) => {
            return {
                isLoading: false,
                categories: action.payload,
            };
        })
        .addCase(fetchCategories.rejected, (state, action) => {
            return {
                isLoading: false,
                categories: [],
            };
        });
};

export const getCategoriesSlice = createSlice({
    name: 'getCategories',
    initialState: categoriesState,
    reducers: {},
    extraReducers: fetchCategoriesReducer,
});
