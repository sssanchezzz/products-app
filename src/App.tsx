import { Global, css } from '@emotion/react';
import Home from 'pages/Home';
import React from 'react';

const GlobalStyles = css`
    body::-webkit-scrollbar {
        display: none;
    }
`;

const GlobalStylesComponent = () => <Global styles={GlobalStyles} />;

function App() {
    return (
        <>
            <GlobalStylesComponent />
            <Home />
        </>
    );
}

export default App;
