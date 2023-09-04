import { ActionReducerMapBuilder, createAction } from '@reduxjs/toolkit';
import { Product, ProductsState } from 'features/products/products_slice';

export const SORTING_CATEGORIES: SortingCategory[] = ['price', 'rating'];
export type SortingCategory = keyof Pick<Product, 'price' | 'rating' | 'id'>;
export enum SortingTypes {
    ASC = 'asc',
    DESC = 'desc',
}

export const sortProducts = createAction(
    'SORT_PRODUCTS',
    (category: SortingCategory, order: SortingTypes) => ({
        payload: {
            category,
            order,
        },
    }),
);

export const sortProductsReducer = (
    builder: ActionReducerMapBuilder<ProductsState>,
) => {
    builder.addCase(sortProducts, (state, action) => {
        const sortedProducts = [...state.products].sort(
            productComparator(action.payload.category, action.payload.order),
        );

        return {
            ...state,
            products: sortedProducts,
        };
    });
};

const productComparator = <Product>(
    field: keyof Product,
    order: 'asc' | 'desc' = 'asc',
) => {
    return (a: Product, b: Product) => {
        const aValue = a[field];
        const bValue = b[field];

        if (aValue === bValue) {
            return 0;
        }

        if (order === 'asc') {
            return aValue < bValue ? -1 : 1;
        } else {
            return aValue > bValue ? -1 : 1;
        }
    };
};
