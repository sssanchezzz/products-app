import Nav from 'features/nav';
import ProductsTable from 'features/products/products_table';
import { fetchProducts } from 'features/products/products_slice';
import { FC, useEffect } from 'react';

import { useAppDispatch } from 'store';
import Header from 'features/header';
import AddProductModal from 'features/products/add_product_modal';
import { fetchCategories } from 'features/products/categories/categories_slice.';
import Message from 'features/message';
import ProductsBarChart from 'features/graph';

const Home: FC = () => {
    const dispatch = useAppDispatch();
    useEffect(() => {
        dispatch(fetchProducts());
        dispatch(fetchCategories());
    }, []);

    return (
        <div style={{ maxWidth: '1440px', margin: '0 auto' }}>
            <Nav />
            <Header />
            <ProductsTable />
            <ProductsBarChart />
            <AddProductModal />
            <Message />
        </div>
    );
};

export default Home;
