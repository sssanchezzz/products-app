import React from 'react';
import ReactDOM from 'react-dom/client';

import App from './App';
import reportWebVitals from './reportWebVitals';
import { Provider } from 'react-redux';
import { store } from 'store';
import { ThemeProvider, createTheme } from '@mui/material';

const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement,
);

const theme = createTheme({
    palette: {
        primary: {
            main: '#3a86ff',
        },
    },
});

root.render(
    <React.StrictMode>
        <Provider store={store}>
            <ThemeProvider theme={theme}>
                <App />
            </ThemeProvider>
        </Provider>
    </React.StrictMode>,
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
