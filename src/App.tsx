import { Global, css } from '@emotion/react';
import styled from '@emotion/styled';
import { fetchCategories } from 'features/products/categories/categories_slice.';
import { fetchProducts } from 'features/products/products_slice';
import Home from 'pages/Home';
import ProductsStats from 'pages/ProductsStats';
import { useEffect } from 'react';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { useAppDispatch } from 'store';
import { Roots } from 'utils/roots';

const GlobalStyles = css`
    body::-webkit-scrollbar {
        display: none;
    }
`;

const GlobalStylesComponent = () => <Global styles={GlobalStyles} />;

const router = createBrowserRouter([
    {
        path: Roots.home,
        element: <Home />,
    },
    {
        path: Roots.stats,
        element: <ProductsStats />,
    },
]);

function App() {
    const dispatch = useAppDispatch();
    useEffect(() => {
        dispatch(fetchProducts());
        dispatch(fetchCategories());
    }, []);
    return (
        <AppContainer>
            <GlobalStylesComponent />
            <RouterProvider router={router} />
        </AppContainer>
    );
}

const AppContainer = styled.div`
    max-width: 1440px;
    margin: 0 auto;
`;

export default App;
