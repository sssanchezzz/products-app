import Nav from 'features/nav';
import ProductsTable from 'features/products/products_table';
import { FC } from 'react';
import Header from 'features/header';
import CreateProductModal from 'features/products/create_product_modal';
import Message from 'features/message';
import EditProductModal from 'features/products/edit_product_modal';

const Home: FC = () => {
    return (
        <>
            <Nav />
            <Header />
            <ProductsTable />
            <CreateProductModal />
            <EditProductModal />
            <Message />
        </>
    );
};

export default Home;
