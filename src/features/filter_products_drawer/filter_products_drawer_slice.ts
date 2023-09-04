import {
    ActionReducerMapBuilder,
    createAction,
    createSlice,
} from '@reduxjs/toolkit';

export type FilterProductsDrawerState = {
    isOpen: boolean;
};

export const filterProductsDrawerState: FilterProductsDrawerState = {
    isOpen: false,
};

export const getIsFilterProductsDrawerOpen = (state: any): boolean =>
    state.filterProductsDrawer.isOpen;

export const openFilterProductsDrawer = createAction(
    'OPEN_FILTER_PRODUCTS_DRAWER',
);
export const dismissFilterProductsDrawer = createAction(
    'DISMISS_FILTER_PRODUCTS_DRAWER',
);

const filterProductsDrawerReducer = (
    builder: ActionReducerMapBuilder<FilterProductsDrawerState>,
) => {
    builder
        .addCase(openFilterProductsDrawer, (state, action) => {
            return {
                isOpen: true,
            };
        })
        .addCase(dismissFilterProductsDrawer, (state, action) => {
            return {
                isOpen: false,
            };
        });
};

export const filterProductsDrawerSlice = createSlice({
    name: 'filterProductsDrawer',
    initialState: filterProductsDrawerState,
    reducers: {},
    extraReducers: filterProductsDrawerReducer,
});
