import styled from '@emotion/styled';
import FilterProducts from 'features/filter_products_drawer';
import AddProductBtn from 'features/header/add_product_btn';
import Filter from 'features/header/filter';
import SearchField from 'features/header/search_field';
import Sort from 'features/header/sort';
import React, { FC } from 'react';

const Header: FC = () => {
    return (
        <>
            <HeaderContainer>
                <SearchField />
                <ButtonsContainer>
                    <AddProductBtn />
                    <SortProductsBtn />
                    <FilterProductsBtn />
                </ButtonsContainer>
            </HeaderContainer>
            <FilterProducts />
        </>
    );
};

const HeaderContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
`;

const ButtonsContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: flex-end;
`;

const SortProductsBtn = styled(Sort)`
    margin-left: 10px;
`;

const FilterProductsBtn = styled(Filter)`
    margin-left: 10px;
`;

export default Header;
