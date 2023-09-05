import styled from '@emotion/styled';
import { Button } from '@mui/material';
import React, { FC } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Roots } from 'utils/roots';

const Nav: FC = () => {
    const location = useLocation();

    return (
        <NavContainer>
            <Link to={Roots.home}>
                <StyledButton data-is-active={location.pathname === Roots.home}>
                    Home
                </StyledButton>
            </Link>
            <Link to={Roots.stats}>
                <StyledButton
                    data-is-active={location.pathname === Roots.stats}
                >
                    Stats
                </StyledButton>
            </Link>
        </NavContainer>
    );
};

const NavContainer = styled.nav`
    display: flex;
    justify-content: center;
    a {
        text-decoration: none;
    }
`;

const StyledButton = styled(Button)<{ 'data-is-active': boolean }>`
    color: ${props => (props['data-is-active'] ? '#3a86ff' : '#000000')};
`;

export default Nav;
