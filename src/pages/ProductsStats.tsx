import styled from '@emotion/styled';
import { useTheme } from '@mui/material';
import { BarChart } from '@mui/x-charts';
import Nav from 'features/nav';
import { getProductCategories } from 'features/products/categories/categories_slice.';
import { getFetchedProducts } from 'features/products/products_slice';
import React, { FC } from 'react';
import { useSelector } from 'react-redux';
import { camelize } from 'utils/camelize';

const ProductsStats: FC = () => {
    const theme = useTheme();
    const products = useSelector(getFetchedProducts);
    const categories = useSelector(getProductCategories);

    const categoryCount: { [key: string]: number } = products.reduce(
        (acc, product) => {
            const { category } = product;

            acc[category] = (acc[category] || 0) + product.stock;

            return acc;
        },
        {} as { [key: string]: number },
    );
    const seriesData = Object.values(categoryCount);
    const yAxisData = categories.map(category => camelize(category));

    return (
        <>
            <Nav />
            <BarWrapper>
                <BarChart
                    yAxis={[
                        {
                            id: 'product_categories',
                            data: yAxisData,
                            scaleType: 'band',
                        },
                    ]}
                    series={[
                        {
                            data: seriesData,
                            label: 'Products in stock per category',
                            color: theme.palette.primary.main,
                        },
                    ]}
                    width={1000}
                    height={1000}
                    layout="horizontal"
                />
            </BarWrapper>
        </>
    );
};

const BarWrapper = styled.div`
    width: 100%;
    display: flex;
    margin: 0 auto;
`;
export default ProductsStats;
